import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import {
  PageContainer,
  StyledHeader,
  StyledTableWrapper,
} from "./style";

// Mock dữ liệu (thay bằng API thật sau)
const mockExams = [
  {
    _id: "1",
    title: "Bài thi Chiến thuật cơ bản",
    startTime: "2025-04-16T08:00:00",
    endTime: "2025-04-20T23:59:59",
    url: "/exam/do/1",
  },
  {
    _id: "2",
    title: "Bài thi Khai cuộc nâng cao",
    startTime: "2025-04-10T08:00:00",
    endTime: "2025-04-15T23:59:59",
    url: "/exam/do/2",
  },
];

const ExamListPage = () => {
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setExams(mockExams); // Gọi API sau
  }, []);

  const handleConfirm = () => {
    if (selectedExam) {
      navigate(selectedExam.url);
    }
  };

  const columns = [
    {
      title: "Tên bài thi",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Thời gian",
      key: "time",
      render: (_, record) => (
        <>
          <div>Bắt đầu: {dayjs(record.startTime).format("HH:mm DD/MM/YYYY")}</div>
          <div>Kết thúc: {dayjs(record.endTime).format("HH:mm DD/MM/YYYY")}</div>
        </>
      ),
    },
    {
      title: "Trạng thái",
      key: "status",
      render: (_, record) => {
        const now = dayjs();
        if (now.isBefore(record.startTime)) {
          return <Tag color="default">Chưa đến giờ</Tag>;
        } else if (now.isAfter(record.endTime)) {
          return <Tag color="red">Hết hạn</Tag>;
        } else {
          return <Tag color="green">Đang mở</Tag>;
        }
      },
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => {
        const now = dayjs();
        const canDo = now.isAfter(record.startTime) && now.isBefore(record.endTime);
        return (
          <Button
            type="primary"
            disabled={!canDo}
            onClick={() => setSelectedExam(record)}
          >
            Làm bài
          </Button>
        );
      },
    },
  ];

  return (
    <PageContainer>
      <StyledHeader>Danh sách bài thi</StyledHeader>
      <StyledTableWrapper>
        <Table rowKey="_id" columns={columns} dataSource={exams} pagination={false} />
      </StyledTableWrapper>

      <Modal
        title="Xác nhận làm bài thi"
        open={!!selectedExam}
        onCancel={() => setSelectedExam(null)}
        onOk={handleConfirm}
        okText="Bắt đầu"
        cancelText="Hủy"
      >
        <p>
          Bạn có chắc chắn muốn làm bài{" "}
          <strong>{selectedExam?.title}</strong> không?
        </p>
      </Modal>
    </PageContainer>
  );
};

export default ExamListPage;
