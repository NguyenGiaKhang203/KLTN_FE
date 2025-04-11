import { useState, useEffect } from "react";
import {
  Table,
  Input,
  Button,
  Select,
  Tooltip,
  Modal,
  Form,
  DatePicker,
  Tag,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  SortAscendingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import {
  PageHeader,
  FilterContainer,
  HeaderActions,
  CenteredAction,
} from "./style";
import * as ExamService from "../../../services/ExamService";
import * as UserService from "../../../services/UserService";
import * as ClassService from "../../../services/ClassService";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { Option } = Select;

export default function ExamPage() {
  const [form] = Form.useForm();
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [exams, setExams] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingExam, setEditingExam] = useState(null);
  const [teacherList, setTeacherList] = useState([]);
  const [classList, setClassList] = useState([]);
  const [deleteExamId, setDeleteExamId] = useState(null);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

  const user = useSelector((state) => state.user);
  const token = user?.access_token;

  const fetchTeachers = async () => {
    try {
      const res = await UserService.getAllUser(token);
      const teachers = res.data
        .filter((u) => u.isTeacher)
        .map((t) => ({ _id: t._id, name: t.name }));
      setTeacherList(teachers);
    } catch {
      toast.error("Lỗi khi tải danh sách giảng viên");
    }
  };

  const fetchClasses = async () => {
    try {
      const res = await ClassService.getAllClasses(token);
      const mapped = res.data.map((cls) => ({
        _id: cls._id,
        name: cls.name,
      }));
      setClassList(mapped);
    } catch {
      toast.error("Lỗi khi tải danh sách lớp");
    }
  };

  const fetchExams = async () => {
    try {
      const res = await ExamService.getAllExams(token);
      const examList = Array.isArray(res) ? res : res.data;

      const mapped = examList.map((exam) => ({
        ...exam,
        title: exam.examName,
        teacher: exam.teacher,
        class: exam.class,
        date: dayjs(exam.examDeadline).format("YYYY-MM-DD"),
        examUrl: exam.examUrl,
        status: exam.status || "Chưa thi",
      }));
      setExams(mapped);
    } catch {
      toast.error("Lỗi khi tải danh sách bài thi.");
    }
  };

  useEffect(() => {
    if (user && token) {
      fetchTeachers();
      fetchClasses();
      fetchExams();
    }
  }, [user]);

  useEffect(() => {
    let results = exams.filter((exam) => {
      const title = exam.title || "";
      const teacherName =
        typeof exam.teacher === "object"
          ? exam.teacher?.name
          : teacherList.find((t) => t._id === exam.teacher)?.name || "";
      return (
        title.toLowerCase().includes(search.toLowerCase()) ||
        teacherName.toLowerCase().includes(search.toLowerCase())
      );
    });

    if (sortOrder === "asc") {
      results.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    } else if (sortOrder === "desc") {
      results.sort((a, b) => (b.title || "").localeCompare(a.title || ""));
    }

    setFilteredData(results);
  }, [search, sortOrder, exams, teacherList]);

  const handleDelete = (record) => {
    setDeleteExamId(record._id);
    setIsConfirmDeleteOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await ExamService.deleteExam(deleteExamId, token);
      toast.success("Đã xóa bài thi");
      fetchExams();
    } catch {
      toast.error("Xóa thất bại!");
    } finally {
      setIsConfirmDeleteOpen(false);
      setDeleteExamId(null);
    }
  };

  const handleEdit = async (record) => {
    setIsEditMode(true);
    setEditingExam(record);
    setIsModalOpen(true);

    const waitUntilReady = () =>
      new Promise((resolve) => {
        const interval = setInterval(() => {
          if (teacherList.length && classList.length) {
            clearInterval(interval);
            resolve();
          }
        }, 100);
      });

    await waitUntilReady();

    form.setFieldsValue({
      ...record,
      teacher:
        typeof record.teacher === "object"
          ? record.teacher._id
          : record.teacher,
      class:
        typeof record.class === "object" ? record.class._id : record.class,
      date: dayjs(record.date),
    });
  };

  const handleAddOrUpdate = async (values) => {
    const payload = {
      examName: values.title,
      examDeadline: values.date.format("YYYY-MM-DD"),
      examUrl: values.examUrl,
      class: values.class,
      teacher: values.teacher,
      status: values.status,
      userId: user?.id,
    };

    try {
      if (isEditMode) {
        await ExamService.updateExam(editingExam._id, payload, token);
        toast.success("Đã cập nhật bài thi!");
      } else {
        await ExamService.createExam(payload, token);
        toast.success("Đã thêm bài thi mới!");
      }

      form.resetFields();
      setIsModalOpen(false);
      setIsEditMode(false);
      setEditingExam(null);
      fetchExams();
    } catch {
      toast.error("Thao tác thất bại!");
    }
  };

  const columns = [
    {
      title: "Tên bài thi",
      dataIndex: "title",
    },
    {
      title: "Giáo viên ra đề",
      dataIndex: "teacher",
      render: (teacher) =>
        typeof teacher === "object"
          ? teacher?.name || "Không rõ"
          : teacherList.find((t) => t._id === teacher)?.name || "Không rõ",
    },
    {
      title: "Ngày thi",
      dataIndex: "date",
    },
    {
      title: "Lớp áp dụng",
      dataIndex: "class",
      render: (cls) =>
        typeof cls === "object"
          ? cls?.name || "Không rõ"
          : classList.find((c) => c._id === cls)?.name || "Không rõ",
    },
    {
      title: "Link bài thi",
      dataIndex: "examUrl",
      render: (text) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (status) => (
        <Tag color={status === "Đã thi" ? "green" : "orange"}>{status}</Tag>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <CenteredAction>
          <Tooltip title="Sửa">
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Button
              danger
              type="link"
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record)}
            />
          </Tooltip>
        </CenteredAction>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <PageHeader>
        <h2>Quản lý bài thi</h2>
        <HeaderActions>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setIsModalOpen(true);
              setIsEditMode(false);
              form.resetFields();
            }}
          >
            Thêm bài thi
          </Button>
        </HeaderActions>
      </PageHeader>

      <FilterContainer>
        <Input
          placeholder="Tìm theo tên hoặc giáo viên"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 250 }}
        />
        <Button
          icon={<SortAscendingOutlined />}
          ghost
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        >
          Sắp xếp {sortOrder === "asc" ? "↓ Z-A" : "↑ A-Z"}
        </Button>
      </FilterContainer>

      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 5 }}
        rowKey="_id"
        bordered
      />

      <Modal
        title={isEditMode ? "Cập nhật bài thi" : "Thêm bài thi"}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setIsEditMode(false);
          form.resetFields();
        }}
        onOk={() => form.submit()}
        okText={isEditMode ? "Cập nhật" : "Thêm"}
        cancelText="Hủy"
      >
        <Form layout="vertical" form={form} onFinish={handleAddOrUpdate}>
          <Form.Item
            label="Tên bài thi"
            name="title"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Giáo viên ra đề"
            name="teacher"
            rules={[{ required: true }]}
          >
            <Select placeholder="Chọn giáo viên">
              {teacherList.map((t) => (
                <Option key={t._id} value={t._id}>
                  {t.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Ngày thi"
            name="date"
            rules={[{ required: true }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Lớp áp dụng"
            name="class"
            rules={[{ required: true }]}
          >
            <Select placeholder="Chọn lớp">
              {classList.map((cls) => (
                <Option key={cls._id} value={cls._id}>
                  {cls.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Link bài thi"
            name="examUrl"
            rules={[
              {
                required: true,
                type: "url",
                message: "Vui lòng nhập đúng URL",
              },
            ]}
          >
            <Input placeholder="https://..." />
          </Form.Item>

          <Form.Item
            label="Trạng thái"
            name="status"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="Chưa thi">Chưa thi</Option>
              <Option value="Đã thi">Đã thi</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      {/* ✅ Modal xác nhận xoá */}
      <Modal
        title="Xác nhận xóa bài thi"
        open={isConfirmDeleteOpen}
        onOk={confirmDelete}
        onCancel={() => {
          setIsConfirmDeleteOpen(false);
          setDeleteExamId(null);
        }}
        okText="Xóa"
        cancelText="Hủy"
        okType="danger"
      >
        <p>Bạn có chắc chắn muốn xóa bài thi này không?</p>
      </Modal>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
