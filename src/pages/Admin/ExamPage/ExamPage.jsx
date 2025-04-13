import { useState, useEffect } from "react";
import {
  Table,
  Input,
  Button,
  Tooltip,
  Modal,
  Form,
  DatePicker,
  Select,
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
  const [classList, setClassList] = useState([]);
  const [deleteExamId, setDeleteExamId] = useState(null);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

  const user = useSelector((state) => state.user);
  const token = user?.access_token;

  const fetchClasses = async () => {
    try {
      const res = await ClassService.getClassbyTeacher(user?.user._id);
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
      const res = await ExamService.getExamsByTeacherId(user?.user._id,token);
      const examList = Array.isArray(res) ? res : res.data;

      const mapped = examList.map((exam) => ({
        _id: exam._id,
        title: exam.examName,
        class: exam.class,
        date: dayjs(exam.examDeadline).format("YYYY-MM-DD HH:mm"),
        examUrl: exam.examUrl,
      }));
      setExams(mapped);
    } catch {
      toast.error("Lỗi khi tải danh sách bài thi.");
    }
  };

  useEffect(() => {
    console.log("🔍 classList", classList);
    console.log("🔍 exams", exams);
    if (user && token) {
      fetchClasses();
      fetchExams();
    }
  }, [user]);

  useEffect(() => {
    let results = exams.filter((exam) => {
      const title = exam.title || "";
      const className =
        classList.find((c) => c._id === exam.class)?.name || "";
      return (
        title.toLowerCase().includes(search.toLowerCase()) ||
        className.toLowerCase().includes(search.toLowerCase())
      );
    });

    if (sortOrder === "asc") {
      results.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    } else if (sortOrder === "desc") {
      results.sort((a, b) => (b.title || "").localeCompare(a.title || ""));
    }

    setFilteredData(results);
  }, [search, sortOrder, exams, classList]);

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

    await new Promise((resolve) => {
      const interval = setInterval(() => {
        if (classList.length) {
          clearInterval(interval);
          resolve();
        }
      }, 100);
    });

    form.setFieldsValue({
      ...record,
      class: record.class,
      date: dayjs(record.date, "YYYY-MM-DD HH:mm"),
    });
  };
 
  const handleAddOrUpdate = async (values) => {
    const payload = {
      examName: values.title,
      examDeadline: values.date.toDate(),
      examUrl: values.examUrl,
      class: values.class,
      teacher: user?.user?._id,
      status: values.status,
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
    } catch (error) {
      console.error("Lỗi khi gửi bài thi:", error);
      toast.error("Thao tác thất bại!");
    }
  };

  const columns = [
    {
      title: "Tên bài thi",
      dataIndex: "title",
    },
    {
      title: "Ngày thi",
      dataIndex: "date",
    },
    {
      title: "Lớp áp dụng",
      dataIndex: "class",
      render: (cls) => {
        if (typeof cls === "object" && cls?.name) return cls.name;
    
        const found = classList.find((c) => c._id === cls);
        return found ? found.name : "Không rõ";
      },
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
          placeholder="Tìm theo tên hoặc lớp"
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
            label="Ngày và giờ thi"
            name="date"
            rules={[{ required: true }]}
          >
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm"
              style={{ width: "100%" }}
            />
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
        </Form>
      </Modal>

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
