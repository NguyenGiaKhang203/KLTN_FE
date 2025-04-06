import { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Tag,
  Select,
  Tooltip,
  DatePicker,
  message,
} from "antd";
import { EyeOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import {
  PageHeader,
  FilterContainer,
  CenteredAction,
  StatusTag,
} from "./style";

const { Option } = Select;

const sampleData = [
  {
    key: "1",
    className: "Cờ vua cơ bản - Lớp 1",
    teacher: "Nguyễn Văn Phú",
    date: "2025-04-06",
    timeSlot: "Ca 1 - 07:00 - 09:00",
    students: [
      { name: "Học viên A", status: "Có mặt" },
      { name: "Học viên B", status: "Vắng" },
    ],
    teacherStatus: null,
  },
  {
    key: "2",
    className: "Cờ vua nâng cao - Lớp 2",
    teacher: "Nguyễn Văn Phú",
    date: "2025-04-06",
    timeSlot: "Ca 2 - 09:00 - 11:00",
    students: [
      { name: "Học viên C", status: "Có mặt" },
      { name: "Học viên D", status: "Có mặt" },
    ],
    teacherStatus: "Có dạy",
  },
  {
    key: "3",
    className: "Chiến thuật trung cuộc - Lớp 3",
    teacher: "Lê Văn C",
    date: "2025-04-06",
    timeSlot: "Ca 4 - 15:00 - 17:00",
    students: [
      { name: "Học viên E", status: "Vắng" },
      { name: "Học viên F", status: "Có mặt" },
    ],
    teacherStatus: "Có dạy",
  },
  {
    key: "4",
    className: "Cờ vua nâng cao - Lớp 4",
    teacher: "Bùi Gia Luân",
    date: "2025-04-06",
    timeSlot: "Ca 5 - 19:00 - 21:00",
    students: [
      { name: "Học viên G", status: "Có mặt" },
      { name: "Học viên H", status: "Có mặt" },
    ],
    teacherStatus: "Có dạy",
  },
];

export default function AdminAttendancePage() {
  const [data, setData] = useState(sampleData);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const handleOpenModal = (record) => {
    setSelectedRecord(record);
    setModalOpen(true);
  };

  const handleTeacherStatusChange = (value) => {
    const updated = data.map((item) =>
      item.key === selectedRecord.key ? { ...item, teacherStatus: value } : item
    );
    setData(updated);
    setModalOpen(false);
    message.success("Đã cập nhật điểm danh giảng viên.");
  };

  const columns = [
    {
      title: "Lớp học",
      dataIndex: "className",
      key: "className",
    },
    {
      title: "Giảng viên",
      dataIndex: "teacher",
      key: "teacher",
    },
    {
      title: "Ngày",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Khung giờ",
      dataIndex: "timeSlot",
      key: "timeSlot",
    },
    {
      title: "Giảng viên đi dạy",
      dataIndex: "teacherStatus",
      key: "teacherStatus",
      render: (status) =>
        status ? (
          <Tag color={status === "Có dạy" ? "green" : "red"}>{status}</Tag>
        ) : (
          <Tag color="orange">Chưa xác nhận</Tag>
        ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <CenteredAction>
          <Tooltip title="Xem điểm danh">
            <Button
              icon={<EyeOutlined />}
              onClick={() => handleOpenModal(record)}
            />
          </Tooltip>
        </CenteredAction>
      ),
    },
  ];

  const filteredData = data.filter((item) =>
    dayjs(item.date).isSame(selectedDate, "day")
  );

  return (
    <div style={{ padding: 24 }}>
      <PageHeader>
        <h2>Quản lý điểm danh</h2>
      </PageHeader>

      <FilterContainer>
        <span>
          <strong>Chọn ngày:</strong>
        </span>
        <DatePicker
          value={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          format="YYYY-MM-DD"
          allowClear={false}
        />
      </FilterContainer>

      <Table columns={columns} dataSource={filteredData} bordered />

      <Modal
        title={`Điểm danh lớp: ${selectedRecord?.className}`}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        width={600}
      >
        <p>
          <strong>Ngày:</strong> {selectedRecord?.date}
        </p>
        <p>
          <strong>Khung giờ:</strong> {selectedRecord?.timeSlot}
        </p>
        <p>
          <strong>Giảng viên:</strong> {selectedRecord?.teacher}
        </p>

        <h4 style={{ marginTop: 12 }}>Danh sách học viên:</h4>
        <ul style={{ paddingLeft: 16 }}>
          {selectedRecord?.students.map((student, index) => (
            <li key={index}>
              {student.name}{" "}
              <StatusTag status={student.status}>{student.status}</StatusTag>
            </li>
          ))}
        </ul>

        <div style={{ marginTop: 16 }}>
          <p>
            <strong>Xác nhận giảng viên có đi dạy:</strong>
          </p>
          <Select
            style={{ width: 200 }}
            placeholder="Chọn trạng thái"
            onChange={handleTeacherStatusChange}
            defaultValue={selectedRecord?.teacherStatus || undefined}
          >
            <Option value="Có dạy">Có dạy</Option>
            <Option value="Vắng">Vắng</Option>
          </Select>
        </div>
      </Modal>
    </div>
  );
}
