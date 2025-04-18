import React, { useEffect, useState } from "react";
import { Table, Tag } from "antd";
import dayjs from "dayjs";
import * as ScoreService from "../../services/ScoreService"; // ← Đổi sang ScoreService
import { useSelector } from "react-redux";
import {
  PageContainer,
  PageTitle,
  StyledTableWrapper,
} from "./style";

const ExamResultPage = () => {
  const [results, setResults] = useState([]);
  const { user } = useSelector((state) => state.user);
  const token = user?.access_token;

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await ScoreService.getAllScores(token); // ← Gọi điểm từ ScoreService
        const userResults = res?.filter((item) => item.student === user?.id); // Lọc điểm theo học viên hiện tại (nếu cần)
        setResults(userResults || []);
      } catch (err) {
        console.error("Lỗi khi lấy kết quả bài thi:", err);
      }
    };
    if (token) fetchResults();
  }, [token, user?.id]);

  const columns = [
    {
      title: "Bài thi",
      dataIndex: "examTitle",
      key: "examTitle",
      render: (_, record) => record.exam?.title || "Không rõ",
    },
    {
      title: "Thời gian nộp",
      dataIndex: "submittedAt",
      key: "submittedAt",
      render: (text) =>
        text ? dayjs(text).format("HH:mm DD/MM/YYYY") : "Chưa nộp",
    },
    {
      title: "Điểm số",
      dataIndex: "score",
      key: "score",
      render: (score) =>
        score >= 8 ? (
          <Tag color="green">{score}</Tag>
        ) : score >= 5 ? (
          <Tag color="orange">{score}</Tag>
        ) : (
          <Tag color="red">{score}</Tag>
        ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) =>
        status === "passed" ? (
          <Tag color="blue">Đạt</Tag>
        ) : (
          <Tag color="volcano">Chưa đạt</Tag>
        ),
    },
  ];

  return (
    <PageContainer>
      <PageTitle>Kết quả bài thi của bạn</PageTitle>
      <StyledTableWrapper>
        <Table
          columns={columns}
          dataSource={results}
          rowKey="_id"
          bordered
          pagination={{ pageSize: 5 }}
        />
      </StyledTableWrapper>
    </PageContainer>
  );
};

export default ExamResultPage;
