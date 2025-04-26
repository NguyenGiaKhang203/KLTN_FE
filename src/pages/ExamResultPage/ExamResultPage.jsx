import React, { useEffect, useState } from "react";
import { Table, Button, Tag, Select, message, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import * as ClassService from "../../services/ClassService";
import * as ScoreService from "../../services/ScoreService";
import * as ExamService from "../../services/ExamService";
import {
  PageContainer,
  StyledHeader,
  StyledTableWrapper,
  TopBar,
} from "./style";
import { FilterContainer } from "../Admin/AttendancePage/style";

const { Option } = Select;

const ExamListPage = () => {
  const [exams, setExams] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedExam, setSelectedExam] = useState(null);
  const [studentScore, setStudentScore] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await ClassService.getClassbyStudent(user?.user?._id);
        const transformed = response.data.map((item) => ({
          key: item._id,
          className: item.name,
        }));
        setClasses(transformed);
      } catch (error) {
        toast.error("Lỗi khi lấy dữ liệu lớp học.");
      }
    };

    if (user?.user?._id) {
      fetchClasses();
    }
  }, [user]);

  const handleSelectClass = async (className) => {
    const selected = classes.find((item) => item.className === className);
    if (!selected) {
      setSelectedClass(null);
      setExams([]);
      return;
    }

    setSelectedClass(className);
    try {
      const res = await ExamService.getExamsByClassId(selected.key);
      if (res.status === "OK") {
        setExams(res.data);
      } else {
        message.warning(res.message || "Không thể lấy danh sách bài thi.");
      }
    } catch (err) {
      message.error("Không thể tải danh sách bài thi.");
    }
  };

  const handleViewScore = async (exam) => {
    setSelectedExam(exam);
    try {
      const scoreData = await ScoreService.getScoreByExamIdandStudenId(
        exam._id,
        user?.user?._id
      );
      if (scoreData && scoreData.status !== "ERROR") {
        setStudentScore(scoreData.score);
      } else {
        setStudentScore(null);
        message.error(scoreData?.message || "Không thể lấy điểm của bài thi.");
      }
    } catch (err) {
      setStudentScore(null);
      message.error("Không thể lấy điểm của bài thi.");
    } finally {
      setIsModalVisible(true);
    }
  };

  const columns = [
    {
      title: "Tên bài thi",
      dataIndex: "examName",
      key: "examName",
    },
    {
      title: "Link bài thi",
      key: "examUrl",
      render: (_, record) => <a href={record.examUrl} target="_blank" rel="noreferrer">{record.examUrl}</a>,
    },
    {
      title: "Hạn làm bài",
      key: "status",
      render: (_, record) => {
        const now = dayjs();
        const deadline = dayjs(record.examDeadline);
        return now.isBefore(deadline) ? (
          <Tag color="green">Còn hạn</Tag>
        ) : (
          <Tag color="red">Hết hạn</Tag>
        );
      },
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Button type="primary" onClick={() => handleViewScore(record)}>
          Xem điểm
        </Button>
      ),
    },
  ];

  return (
    <PageContainer>
      <StyledHeader>
        <h2>Kết quả bài thi:</h2>
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
          {classes.map((item) => (
            <Option key={item.key} value={item.className}>
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

      <Modal
        title="Kết quả bài thi:" 
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <p><strong>Điểm: </strong>{studentScore !== null ? studentScore : 'Chưa có điểm cho bài thi này'}</p>
      </Modal>
    </PageContainer>
  );
};

export default ExamListPage;
