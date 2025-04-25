import React, { useEffect, useState } from "react";
import { Input, InputNumber, Select, Table, Modal, Button, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import * as ScoreService from "../../services/ScoreService";
import * as ClassService from "../../services/ClassService";
import * as ExamService from "../../services/ExamService";
import { PageHeader, FilterContainer, TableWrapper } from "./style";
import { toast } from "react-toastify";

const { Search } = Input;
const { Option } = Select;

const ScoreManagement = () => {
  const [classList, setClassList] = useState([]);
  const [examList, setExamList] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedExam, setSelectedExam] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [studentsInClass, setStudentsInClass] = useState([]);
  const [scoreList, setScoreList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingScoreId, setEditingScoreId] = useState(null);

  const { user } = useSelector((state) => state.user);
  const userId = user?._id;
  const token = user?.access_token;

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await ClassService.getClassbyTeacher(userId);
        setClassList(Array.isArray(res?.data) ? res.data : res);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách lớp:", err);
      }
    };
    if (token) fetchClasses();
  }, [token]);

  useEffect(() => {
    const fetchExams = async () => {
      if (selectedClass) {
        try {
          const res = await ExamService.getExamsByClassId(selectedClass, token);
          setExamList(Array.isArray(res?.data) ? res.data : res);
        } catch (err) {
          console.error("Lỗi khi lấy danh sách bài thi:", err);
          setExamList([]);
        }
      } else setExamList([]);
    };
    fetchExams();
  }, [selectedClass, token]);

  useEffect(() => {
    const fetchScores = async () => {
      if (selectedClass) {
        try {
          const res = await ScoreService.getAllScores(token);
          setScoreList(Array.isArray(res?.data) ? res.data : res);
        } catch (err) {
          console.error("Lỗi khi lấy bảng điểm:", err);
        }
      }
    };
    fetchScores();
  }, [selectedClass, token]);

  const refreshScores = async () => {
    try {
      const res = await ScoreService.getAllScores(token);
      setScoreList(Array.isArray(res?.data) ? res.data : res);
    } catch (err) {
      console.error("Lỗi khi làm mới bảng điểm:", err);
    }
  };

  const checkScoreExists = (examId) => {
    return scoreList.some((score) => score.examId === examId);
  };

  const handleExamSelect = async (examId) => {
    setSelectedExam(examId);
    setIsEditMode(false);
    setEditingScoreId(null);
    try {
      const res = await ClassService.getStudentsInClass(selectedClass, token);
      setStudentsInClass(Array.isArray(res?.students) ? res.students : []);
      toast.success("Đã chọn bài thi, hãy nhập điểm cho học viên.");
      setIsModalVisible(true);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách học viên:", err);
    }
  };

  const handleEditScore = async (examId) => {
    try {
      const res = await ScoreService.getScoreById(examId, token);
      const scores = res?.data?.scores || [];
      setEditingScoreId(res?.data?._id);
      setIsEditMode(true);

      const studentRes = await ClassService.getStudentsInClass(selectedClass, token);
      const studentsInThisClass = studentRes?.students || [];

      const mergedStudents = scores.map((scoreObj) => {
        const studentInfo = studentsInThisClass.find(
          (student) => student._id === scoreObj.studentId
        );
        return {
          _id: scoreObj.studentId,
          name: studentInfo?.name || "Không rõ",
          email: studentInfo?.email || "Không rõ",
          score: scoreObj.score,
        };
      });

      setStudentsInClass(mergedStudents);
      setSelectedExam(examId);
      setIsModalVisible(true);
    } catch (error) {
      toast.error("Không thể tải bảng điểm.");
      console.error(error);
    }
  };

  const handleDeleteScore = async (examId) => {
    const scoreToDelete = scoreList.find((score) => score.examId === examId);
    if (!scoreToDelete) return;
    try {
      await ScoreService.deleteScore(scoreToDelete._id, token);
      toast.success("Xoá bảng điểm thành công!");
      setScoreList((prev) => prev.filter((score) => score.examId !== examId));
    } catch (error) {
      toast.error("Lỗi khi xoá bảng điểm.");
      console.error(error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsEditMode(false);
    setEditingScoreId(null);
  };

  const handleScoreChange = (e, studentId) => {
    const updatedScore = e?.target?.value ?? e;
    setStudentsInClass((prev) =>
      prev.map((student) =>
        student._id === studentId ? { ...student, score: updatedScore } : student
      )
    );
  };

  const handleSubmitScores = async () => {
    const invalidScores = studentsInClass.filter(
      (student) => student.score === undefined || student.score === null || student.score === ""
    );
    if (invalidScores.length > 0) {
      toast.error("Vui lòng nhập điểm cho tất cả học viên.");
      return;
    }

    const scoreData = {
      examId: selectedExam,
      scores: studentsInClass.map((student) => ({
        studentId: student._id,
        score: Number(student.score),
      })),
    };

    try {
      if (isEditMode) {
        await ScoreService.updateScore(editingScoreId, scoreData, token);
        toast.success("Cập nhật bảng điểm thành công!");
      } else {
        const response = await ScoreService.createScore(scoreData, token);
        if (
          response.status === "ERROR" &&
          response.message === "Bảng điểm cho bài thi này đã tồn tại!"
        ) {
          toast.error(response.message);
          return;
        }
        toast.success("Điểm đã được gửi thành công!");
      }

      setIsModalVisible(false);
      setIsEditMode(false);
      setEditingScoreId(null);
      refreshScores();
    } catch (error) {
      console.error("Lỗi khi gửi/cập nhật điểm:", error);
      toast.error("Đã xảy ra lỗi, vui lòng thử lại.");
    }
  };

  const filteredData = studentsInClass.filter((student) =>
    (student?.name || "").toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "STT",
      render: (_, __, index) => index + 1,
      width: 60,
    },
    {
      title: "Họ tên học viên",
      render: (_, record) => record.name || "Không rõ",
    },
    {
      title: "Email",
      render: (_, record) => record.email || "Không rõ",
    },
    {
      title: "Điểm",
      render: (_, record) => (
        <InputNumber
          min={0}
          max={10}
          step={0.1}
          value={record.score || null}
          onChange={(value) => handleScoreChange(value, record._id)}
          style={{ width: 100 }}
        />
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <PageHeader>
        <h2>Quản lý điểm học viên</h2>
      </PageHeader>

      <FilterContainer>
        <Select
          placeholder="Chọn lớp học"
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
      </FilterContainer>

      <TableWrapper>
        <Table
          dataSource={examList}
          rowKey="_id"
          pagination={false}
          locale={{ emptyText: "Không có dữ liệu" }}
          columns={[
            {
              title: "STT",
              render: (_, __, index) => index + 1,
              width: 60,
            },
            {
              title: "Bài thi",
              render: (_, record) => record.examName || "Không rõ",
            },
            {
              title: "Hành động",
              render: (_, record) => {
                const hasScore = checkScoreExists(record._id);
                if (!selectedClass) {
                  return <span style={{ color: "#888" }}>Chưa chọn lớp</span>;
                }
                return hasScore ? (
                  <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
                    <Tooltip title="Sửa bảng điểm">
                      <Button
                        type="text"
                        icon={<EditOutlined style={{ color: "#1677ff" }} />}
                        onClick={() => handleEditScore(record._id)}
                      />
                    </Tooltip>
                    <Tooltip title="Xoá bảng điểm">
                      <Button
                        type="text"
                        icon={<DeleteOutlined style={{ color: "red" }} />}
                        onClick={() => handleDeleteScore(record._id)}
                      />
                    </Tooltip>
                  </div>
                ) : (
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => handleExamSelect(record._id)}
                  >
                    Tạo bảng điểm
                  </Button>
                );
              },
            },
          ]}
        />
      </TableWrapper>

      <Modal
        title={<h3 style={{ margin: 0, fontWeight: 600 }}>📋 Danh sách học viên</h3>}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={900}
        bodyStyle={{ padding: 24 }}
      >
        <div
          style={{
            marginBottom: 16,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Search
            placeholder="🔍 Tìm kiếm học viên..."
            onSearch={(value) => setSearchText(value)}
            style={{ width: 300 }}
            allowClear
          />
        </div>

        <Table
          dataSource={filteredData}
          columns={columns}
          rowKey="_id"
          bordered
          pagination={{ pageSize: 8 }}
          locale={{ emptyText: "Chưa có dữ liệu học viên" }}
        />

        <div style={{ textAlign: "center", marginTop: 30 }}>
          <Button
            type="primary"
            size="large"
            onClick={handleSubmitScores}
            style={{
              borderRadius: 8,
              padding: "6px 24px",
              fontWeight: 600,
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            {isEditMode ? "💾 Lưu chỉnh sửa" : "🚀 Gửi điểm"}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ScoreManagement;
