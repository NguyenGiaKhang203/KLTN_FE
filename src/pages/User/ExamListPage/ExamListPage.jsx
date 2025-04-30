import React, { useEffect, useState } from "react";
import { Table, Button, Tag, Select, Radio, message } from "antd";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import {
  PageContainer,
  StyledHeader,
  StyledTableWrapper,
  FilterContainer
} from "./style";

import { toast } from "react-toastify";
import { getExamsByClassId } from "../../../services/ExamService";
import * as ClassService from "../../../services/ClassService";
import axios from "axios";
const { Option } = Select;

const ExamListPage = () => {
  const [exams, setExams] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedClassRecord, setSelectedClassRecord] = useState(null);
  const [data, setData] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false); // Thêm trạng thái để theo dõi việc đã nộp bài
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await ClassService.getClassbyStudent(user?.user?._id);
        const transformed = response.data.map((item, index) => ({
          key: item._id || index.toString(),
          className: item.name,
        }));
        setData(transformed);
      } catch (error) {
        toast.error("Lỗi khi lấy dữ liệu lớp học.");
      }
    };

    if (user?.user?._id) {
      fetchClasses();
    }
  }, [user]);

  const handleSelectClass = async (value) => {
    const selected = data.find((item) => item.className === value);
    if (!selected) {
      setSelectedClass(undefined);
      setSelectedClassRecord(null);
      setExams([]);
      return;
    }

    setSelectedClass(selected.className);
    setSelectedClassRecord(selected);
    setExams([]);

    await fetchExams(selected.key);
  };

  const fetchExams = async (classId) => {
    try {
      const res = await getExamsByClassId(classId);
      if (res.status === "OK") {
        setExams(res.data);
      } else {
        message.warning(res.message || "Không thể lấy danh sách bài thi.");
      }
    } catch (err) {
      message.error("Không thể tải danh sách bài thi.");
    }
  };

  const handleStartExam = (record) => {
    setSelectedExam(record);
    setAnswers({}); // reset lại bài làm
    setIsSubmitted(false); // Reset trạng thái nộp bài khi bắt đầu làm bài mới
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleSubmit = async () => {
    if (isSubmitted) {
      toast.warning("Bạn đã nộp bài trước đó.");
      return; // Nếu đã nộp bài rồi, không cho nộp lại
    }

    try {
      const response = await axios.post('http://localhost:3001/api/exam/submit', {
        examId: selectedExam._id,
        answers: answers,
        studentId: user?.user._id
      });

      const { score } = response.data;
      toast.success(`Đã nộp bài thành công`);
      setIsSubmitted(true); 
      setSelectedExam(null); 
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi khi nộp bài. Vui lòng thử lại!");
    }
  };

  const columns = [
    {
      title: "Tên bài thi",
      dataIndex: "examName",
      key: "examName",
    },
    {
      title: "Hạn cuối",
      key: "deadline",
      render: (_, record) => (
        <div>Kết thúc: {dayjs(record.examDeadline).format("HH:mm DD/MM/YYYY")}</div>
      ),
    },
    {
      title: "Trạng thái",
      key: "status",
      render: (_, record) => {
        const now = dayjs();
        const deadline = dayjs(record.examDeadline);
        if (now.isBefore(deadline)) return <Tag color="green">Còn hạn</Tag>;
        return <Tag color="red">Hết hạn</Tag>;
      },
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => {
        const now = dayjs();
        const deadline = dayjs(record.examDeadline);
        const canDo = now.isBefore(deadline);
        return (
          <Button
            type="primary"
            disabled={!canDo || isSubmitted}
            onClick={() => handleStartExam(record)}
          >
            {isSubmitted ? "Đã nộp bài" : "Làm bài"}
          </Button>
        );
      },
    },
  ];

  return (
    <PageContainer>
      <StyledHeader>
        <h2>Danh sách bài thi</h2>
      </StyledHeader>

      <FilterContainer>
        <span><strong>Chọn lớp học:</strong></span>
        <Select
          style={{ width: 240 }}
          placeholder="Chọn lớp học"
          value={selectedClass}
          onChange={handleSelectClass}
          allowClear
        >
          {data.map((item) => (
            <Option key={item.className} value={item.className}>
              {item.className}
            </Option>
          ))}
        </Select>
      </FilterContainer>

      <StyledTableWrapper>
        <Table
          dataSource={exams}
          rowKey={(record) => record._id}
          pagination={false}
          bordered
          locale={{
            emptyText: (
              <span style={{ color: "#999" }}>
                {selectedClass
                  ? "Không có bài thi nào cho lớp này."
                  : "Chưa chọn lớp học."}
              </span>
            ),
          }}
          columns={columns}
        />
      </StyledTableWrapper>

      {/* PHẦN HIỂN THỊ BÀI THI */}
      {selectedExam && (
        <div style={{ marginTop: "32px", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
          <h3>Bài thi: {selectedExam.examName}</h3>
          {selectedExam.questions.map((q, index) => (
            <div key={q._id} style={{ marginBottom: "16px" }}>
              <strong>Câu {index + 1}: {q.questionText}</strong>
              <Radio.Group
                onChange={(e) => handleAnswerChange(q.questionId, e.target.value)}
                value={answers[q.questionId]}
                style={{ display: "flex", flexDirection: "column", marginTop: "8px" }}
              >
                {q.options.map((opt, idx) => (
                  <Radio key={idx} value={String.fromCharCode(65 + idx)}>
                    {String.fromCharCode(65 + idx)}. {opt}
                  </Radio>
                ))}
              </Radio.Group>
            </div>
          ))}
          <Button type="primary" onClick={handleSubmit} disabled={isSubmitted}>
            {isSubmitted ? "Đã nộp bài" : "Nộp bài"}
          </Button>
        </div>
      )}
    </PageContainer>
  );
};

export default ExamListPage;
