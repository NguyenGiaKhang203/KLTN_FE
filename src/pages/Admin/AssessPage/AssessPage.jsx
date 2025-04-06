import { useState, useEffect } from "react";
import {
  Table,
  Input,
  Button,
  Tooltip,
  Rate,
  Space,
  message,
  Select,
} from "antd";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import {
  PageHeader,
  FilterContainer,
  HeaderActions,
  CenteredAction,
} from "./style";

const { Option } = Select;

const sampleReviews = [
  {
    key: "1",
    student: "Nguyễn Văn A",
    course: "Cờ vua cơ bản",
    rating: 5,
    comment: "Khóa học rất hay và dễ hiểu!",
    date: "2024-04-05",
  },
  {
    key: "2",
    student: "Trần Thị B",
    course: "Cờ vua nâng cao",
    rating: 4,
    comment: "Giảng viên giỏi, kiến thức thực tiễn.",
    date: "2024-03-29",
  },
  {
    key: "3",
    student: "Lê Văn C",
    course: "Chiến thuật khai cuộc",
    rating: 3,
    comment: "Ổn nhưng còn hơi nhanh.",
    date: "2024-03-20",
  },
  {
    key: "4",
    student: "Phạm Thị D",
    course: "Cờ vua cơ bản",
    rating: 4,
    comment: "Tốt nhưng cần nhiều ví dụ hơn.",
    date: "2024-04-01",
  },
];

export default function AssessPage() {
  const [reviews, setReviews] = useState(sampleReviews);
  const [search, setSearch] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [filtered, setFiltered] = useState(sampleReviews);

  const courseOptions = [...new Set(sampleReviews.map((r) => r.course))];

  useEffect(() => {
    const lower = search.toLowerCase();

    const result = reviews.filter(
      (r) =>
        (r.student.toLowerCase().includes(lower) ||
          r.comment.toLowerCase().includes(lower)) &&
        (selectedCourses.length === 0 || selectedCourses.includes(r.course))
    );

    setFiltered(result);
  }, [search, selectedCourses, reviews]);

  const handleDelete = (record) => {
    const updated = reviews.filter((r) => r.key !== record.key);
    setReviews(updated);
    message.success("Đã xoá đánh giá");
  };

  const columns = [
    {
      title: "Học viên",
      dataIndex: "student",
      key: "student",
    },
    {
      title: "Khoá học",
      dataIndex: "course",
      key: "course",
    },
    {
      title: "Đánh giá",
      dataIndex: "rating",
      key: "rating",
      render: (rating) => <Rate disabled defaultValue={rating} />,
    },
    {
      title: "Nội dung",
      dataIndex: "comment",
      key: "comment",
    },
    {
      title: "Ngày",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <CenteredAction>
          <Tooltip title="Xoá">
            <Button
              icon={<DeleteOutlined />}
              danger
              type="link"
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
        <h2>Quản lý đánh giá</h2>
        <HeaderActions />
      </PageHeader>

      <FilterContainer>
        <Input
          placeholder="Tìm theo học viên hoặc nội dung"
          prefix={<SearchOutlined />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 300 }}
        />
        <Select
          mode="multiple"
          placeholder="Lọc theo khóa học"
          value={selectedCourses}
          onChange={setSelectedCourses}
          style={{ width: 300 }}
          allowClear
        >
          {courseOptions.map((course) => (
            <Option key={course} value={course}>
              {course}
            </Option>
          ))}
        </Select>
      </FilterContainer>

      <Table
        columns={columns}
        dataSource={filtered}
        pagination={{ pageSize: 5 }}
        bordered
      />
    </div>
  );
}
