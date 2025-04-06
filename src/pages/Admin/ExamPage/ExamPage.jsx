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
import {
  PageHeader,
  FilterContainer,
  HeaderActions,
  CenteredAction,
} from "./style";

const { Option } = Select;

const examData = [
  {
    key: "1",
    title: "Bài kiểm đầu vào",
    subject: "Chess-Lv1",
    date: "2025-04-15",
    className: "Level 1",
    status: "Chưa thi",
    link: "https://example.com/exam1",
  },
  {
    key: "2",
    title: "Bài kiểm đầu vào",
    subject: "Chess-Lv2",
    date: "2025-05-20",
    className: "Level 2",
    status: "Đã thi",
    link: "https://example.com/exam2",
  },
  {
    key: "3",
    title: "Bài kiểm đầu vào",
    subject: "Chess-Lv3",
    date: "2025-05-20",
    className: "Level 3",
    status: "Chưa thi",
    link: "https://example.com/exam3",
  },
  {
    key: "4",
    title: "Bài kiểm đầu vào",
    subject: "Chess-Lv4",
    date: "2025-05-20",
    className: "Level 4",
    status: "Đang chấm điểm",
    link: "https://example.com/exam4",
  },
  {
    key: "5",
    title: "Bài kiểm đầu vào",
    subject: "Chess-Lv5",
    date: "2025-05-20",
    className: "Level 5",
    status: "Đã thi",
    link: "https://example.com/exam5",
  },
];

export default function ExamPage() {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [filteredData, setFilteredData] = useState(examData);
  const [exams, setExams] = useState(examData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    let results = exams.filter(
      (exam) =>
        exam.title.toLowerCase().includes(search.toLowerCase()) ||
        exam.subject.toLowerCase().includes(search.toLowerCase())
    );

    if (sortOrder === "asc") {
      results = results.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === "desc") {
      results = results.sort((a, b) => b.title.localeCompare(a.title));
    }

    setFilteredData(results);
  }, [search, sortOrder, exams]);

  const handleEdit = (record) => {
    message.info(`Chỉnh sửa bài thi: ${record.title}`);
  };

  const handleDelete = (record) => {
    const newData = exams.filter((item) => item.key !== record.key);
    setExams(newData);
    message.success(`Đã xóa bài thi: ${record.title}`);
  };

  const handleAddExam = (values) => {
    const newExam = {
      key: Date.now().toString(),
      title: values.title,
      subject: values.subject,
      date: values.date.format("YYYY-MM-DD"),
      className: values.className,
      status: values.status,
      link: values.link,
    };
    setExams([newExam, ...exams]);
    setIsModalOpen(false);
    form.resetFields();
    message.success("Đã thêm bài thi mới!");
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
            onClick={() => setIsModalOpen(true)}
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
        bordered
      />

      <Modal
        title="Thêm bài thi"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
        okText="Thêm"
        cancelText="Hủy"
      >
        <Form layout="vertical" form={form} onFinish={handleAddExam}>
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
          <Form.Item label="Ngày thi" name="date" rules={[{ required: true }]}>
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Lớp áp dụng"
            name="className"
            rules={[{ required: true }]}
          >
            <Select placeholder="Chọn lớp áp dụng">
              {[1, 2, 3, 4, 5].map((lv) => (
                <Option key={lv} value={`Level ${lv}`}>{`Level ${lv}`}</Option>
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
