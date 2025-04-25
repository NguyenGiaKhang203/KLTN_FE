import React, { useEffect, useState } from "react";
import { Input, Select, Table, Button, Popconfirm } from "antd";
import { useSelector } from "react-redux";
import * as ScoreService from "../../services/ScoreService";
import * as ClassService from "../../services/ClassService";
import * as ExamService from "../../services/ExamService";
import { PageHeader, FilterContainer, TableWrapper } from "./style";
import { toast } from "react-toastify";

const { Option } = Select;

const ScoreManagementPage = () => {
  const [classList, setClassList] = useState([]);
  const [examList, setExamList] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedExam, setSelectedExam] = useState(null);

  const { user } = useSelector((state) => state.user);
  const token = user?.access_token;
  const userId = user?._id;

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await ClassService.getClassbyTeacher(userId);
        setClassList(Array.isArray(res?.data) ? res.data : []);
      } catch (error) {
        toast.error("Không thể lấy danh sách lớp.");
      }
    };

    if (token) fetchClasses();
  }, [token]);

  useEffect(() => {
    const fetchExams = async () => {
      if (!selectedClass) {
        setExamList([]);
        return;
      }

      try {
        const res = await ExamService.getExamsByClassId(selectedClass, token);
        setExamList(Array.isArray(res?.data) ? res.data : []);
      } catch (error) {
        toast.error("Không thể lấy danh sách bài thi.");
      }
    };

    fetchExams();
  }, [selectedClass, token]);

  useEffect(() => {
    const fetchStudentsAndScores = async () => {
      if (!selectedClass || !selectedExam) return;

      try {
        const res = await ClassService.getStudentsInClass(selectedClass, token);
        const allStudents = res.students || [];

        const scoreRes = await ScoreService.getAllScores();
        const examScores = scoreRes?.data.filter(
          (s) => s.examId === selectedExam
        ) || [];

        const merged = allStudents.map((student) => {
          const existingScore = examScores.find(
            (score) => score.studentId === student._id
          );
          return {
            ...student,
            score: existingScore ? existingScore.score : 0,
            scoreId: existingScore?._id || null,
          };
        });

        setStudents(merged);
      } catch (error) {
        toast.error("Không thể tải học viên hoặc điểm.");
      }
    };

    fetchStudentsAndScores();
  }, [selectedClass, selectedExam, token]);

  const handleScoreChange = (e, studentId) => {
    const newScore = parseFloat(e.target.value);
    if (newScore < 0 || newScore > 10) return;

    setStudents((prev) =>
      prev.map((student) =>
        student._id === studentId
          ? { ...student, score: isNaN(newScore) ? 0 : newScore }
          : student
      )
    );
  };

  const handleUpdateScore = async (student) => {
    try {
      if (student.scoreId) {
        await ScoreService.updateScore(
          student.scoreId,
          { score: student.score },
          token
        );
        toast.success(`✅ Đã cập nhật điểm cho ${student.name}`);
      } else {
        await ScoreService.createScore(
          {
            examId: selectedExam,
            scores: [{ studentId: student._id, score: student.score }],
          },
          token
        );
        toast.success(`✅ Đã tạo điểm cho ${student.name}`);
      }
    } catch (error) {
      toast.error("❌ Lỗi khi cập nhật điểm.");
    }
  };

  const handleDeleteScore = async (student) => {
    try {
      if (student.scoreId) {
        await ScoreService.deleteScore(student.scoreId, token);
        setStudents((prev) =>
          prev.map((s) =>
            s._id === student._id ? { ...s, score: 0, scoreId: null } : s
          )
        );
        toast.success(`🗑️ Đã xoá điểm của ${student.name}`);
      }
    } catch (error) {
      toast.error("❌ Không thể xoá điểm.");
    }
  };

  const columns = [
    {
      title: "STT",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Họ tên",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Điểm",
      render: (_, record) => (
        <Input
          type="number"
          value={record.score}
          onChange={(e) => handleScoreChange(e, record._id)}
          style={{ width: 80 }}
          min={0}
          max={10}
          step={0.1}
        />
      ),
    },
    {
      title: "Hành động",
      render: (_, record) => (
        <div style={{ display: "flex", gap: 8 }}>
          <Button type="primary" onClick={() => handleUpdateScore(record)}>
            Lưu
          </Button>
          {record.scoreId && (
            <Popconfirm
              title="Xác nhận xoá điểm?"
              onConfirm={() => handleDeleteScore(record)}
              okText="Xoá"
              cancelText="Huỷ"
            >
              <Button danger>Xoá</Button>
            </Popconfirm>
          )}
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <PageHeader>
        <h2>📚 Quản lý điểm học viên</h2>
      </PageHeader>

      <FilterContainer>
        <Select
          placeholder="🎓 Chọn lớp học"
          style={{ width: 220 }}
          onChange={setSelectedClass}
          allowClear
        >
          {classList.map((cls) => (
            <Option key={cls._id} value={cls._id}>
              {cls.name}
            </Option>
          ))}
        </Select>

        <Select
          placeholder="📝 Chọn bài thi"
          style={{ width: 220 }}
          onChange={setSelectedExam}
          value={selectedExam}
          allowClear
          disabled={!selectedClass}
        >
          {examList.map((exam) => (
            <Option key={exam._id} value={exam._id}>
              {exam.examName}
            </Option>
          ))}
        </Select>
      </FilterContainer>

      <TableWrapper>
        <Table
          columns={columns}
          dataSource={students}
          rowKey="_id"
          pagination={{ pageSize: 10 }}
          locale={{ emptyText: "Không có dữ liệu học viên" }}
        />
      </TableWrapper>
    </div>
  );
};

export default ScoreManagementPage;
