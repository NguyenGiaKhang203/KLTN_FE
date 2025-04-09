import { useState, useEffect } from "react";
import {
  Table,
  Input,
  Button,
  Select,
  Tooltip,
  message,
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
import { useSelector } from "react-redux";

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

  const user = useSelector((state) => state.user);
  console.log("userid", user?.user?._id);
  console.log("access-token", user?.access_token);
  console.log()


  const fetchExams = async () => {
    try {
      const id = user?.user?._id;
      const token = user?.access_token;
      const res = await ExamService.getExamById(id, token);
      const mapped = res.data.map((exam) => ({
        ...exam,
        title: exam.examName,
        subject: exam.subject || "",
        date: dayjs(exam.examDeadline).format("YYYY-MM-DD"),
        className: exam.className || "Level 1",
        link: exam.link || "#",
        status: exam.status || "Chưa thi",
      }));
      setExams(mapped);
    } catch (err) {
      message.error("Lỗi khi tải danh sách bài thi.");
    }
  };

  useEffect(() => {
    if (user && user.user && user.access_token) {
      fetchExams();
    }
  }, [user]);


  useEffect(() => {
    let results = exams.filter((exam) => {
      const title = exam.title || "";
      const subject = exam.subject || "";
      return (
        title.toLowerCase().includes(search.toLowerCase()) ||
        subject.toLowerCase().includes(search.toLowerCase())
      );
    });

    if (sortOrder === "asc") {
      results.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    } else if (sortOrder === "desc") {
      results.sort((a, b) => (b.title || "").localeCompare(a.title || ""));
    }

    setFilteredData(results);
  }, [search, sortOrder, exams]);

  const handleDelete = async (record) => {
    try {
      await ExamService.deleteExam(record._id, user?.access_token);
      message.success("Đã xóa bài thi");
      fetchExams();
    } catch {
      message.error("Xóa thất bại!");
    }
  };

  const handleEdit = (record) => {
    setIsEditMode(true);
    setEditingExam(record);
    setIsModalOpen(true);
    form.setFieldsValue({
      ...record,
      date: dayjs(record.date),
    });
  };

  const handleAddOrUpdate = async (values) => {
    try {
      const payload = {
        examName: values.title,
        subject: values.subject,
        examDeadline: values.date.format("YYYY-MM-DD"),
        className: values.className,
        link: values.link,
        status: values.status,
        userId: user?.id,
      };

      if (isEditMode) {
        await ExamService.updateExam(editingExam._id, payload, user?.access_token);
        message.success("Đã cập nhật bài thi!");
      } else {
        await ExamService.createExam(payload, user?.access_token);
        message.success("Đã thêm bài thi mới!");
      }

      form.resetFields();
      setIsModalOpen(false);
      setIsEditMode(false);
      setEditingExam(null);
      fetchExams();
    } catch {
      message.error("Thao tác thất bại!");
    }
  };

  const columns = [
    {
      title: "Tên bài thi",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Môn học",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Ngày thi",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Lớp áp dụng",
      dataIndex: "className",
      key: "className",
    },
    {
      title: "Link bài thi",
      dataIndex: "link",
      key: "link",
      render: (text) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "";
        switch (status) {
          case "Đã thi":
            color = "green";
            break;
          case "Chưa thi":
            color = "orange";
            break;
          case "Đang chấm điểm":
            color = "blue";
            break;
          default:
            color = "default";
        }
        return <Tag color={color}>{status}</Tag>;
      },
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
          placeholder="Tìm theo tên hoặc môn học"
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
            label="Môn học"
            name="subject"
            rules={[{ required: true }]}
          >
            <Input />
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
            name="className"
            rules={[{ required: true }]}
          >
            <Select placeholder="Chọn lớp áp dụng">
              {[1, 2, 3, 4, 5].map((lv) => (
                <Option key={lv} value={`Level ${lv}`}>
                  {`Level ${lv}`}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Link bài thi"
            name="link"
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
              <Option value="Đang chấm điểm">Đang chấm điểm</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
