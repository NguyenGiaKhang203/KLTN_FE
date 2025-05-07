import React, { useEffect, useState } from "react";
import { Input, InputNumber, Select, Table, Modal, Button, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import * as ScoreService from "../../../services/ScoreService";
import * as ClassService from "../../../services/ClassService";
import * as ExamService from "../../../services/ExamService";
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
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false); // Modal xác nhận xóa
  const [scoreToDelete, setScoreToDelete] = useState(null); // Dữ liệu bảng điểm cần xóa

  const { user } = useSelector((state) => state.user);
  const userId = user?._id;
  const token = user?.access_token;

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await ClassService.getClassbyTeacher(userId);
        setClassList(res?.data || []);
      } catch (err) {
        toast.error("Lỗi khi lấy danh sách lớp:", err);
      }
    };
    if (token) fetchClasses();
  }, [token, userId]);

  useEffect(() => {
    const fetchExams = async () => {
      if (selectedClass) {
        try {
          const res = await ExamService.getExamsByClassId(selectedClass, token);
          setExamList(res?.data || []);
        } catch (err) {
          toast.error("Lỗi khi lấy danh sách bài thi:", err);
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
          const data = res?.data || [];
          setScoreList(Array.isArray(data.scores) ? data.scores : data);
        } catch (err) {
          toast.error("Lỗi khi lấy bảng điểm:", err);
          setScoreList([]);
        }
      }
    };
    fetchScores();
  }, [selectedClass, token]);

  const refreshScores = async () => {
    try {
      const res = await ScoreService.getAllScores(token);
      const data = res?.data || [];
      setScoreList(Array.isArray(data.scores) ? data.scores : data);
    } catch (err) {
      toast.error("Lỗi khi làm mới bảng điểm:", err);
      setScoreList([]);
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
      setStudentsInClass(res?.students || []);
      toast.success("Đã chọn bài thi, hãy nhập điểm cho học viên.");
      setIsModalVisible(true);
    } catch (err) {
      toast.error("Lỗi khi lấy danh sách học viên:", err);
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

  const handleDeleteScore = (examId) => {
    const scoreToDelete = scoreList.find((score) => score.examId === examId);
    if (!scoreToDelete) return;
    setScoreToDelete(scoreToDelete);
    setIsDeleteModalVisible(true); // Hiển thị modal xác nhận
  };

  const handleConfirmDelete = async () => {
    try {
      await ScoreService.deleteScore(scoreToDelete._id, token);
      toast.success("Xoá bảng điểm thành công!");
      setScoreList((prev) => prev.filter((score) => score.examId !== scoreToDelete.examId));
      setIsDeleteModalVisible(false); // Đóng modal xác nhận
    } catch (error) {
      toast.error("Lỗi khi xoá bảng điểm.");
      console.error(error);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false); // Đóng modal nếu người dùng không xác nhận
    setScoreToDelete(null);
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
        title={isEditMode ? "Cập nhật điểm" : "Nhập điểm học viên"}
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={handleSubmitScores}
        okText={isEditMode ? "Cập nhật" : "Gửi điểm"}
        cancelText="Hủy"
        width={700}
      >
        <Search
          placeholder="Tìm kiếm học viên"
          onChange={(e) => setSearchText(e.target.value)}
          style={{ marginBottom: 16 }}
          allowClear
        />
        <Table
          dataSource={filteredData}
          columns={columns}
          rowKey="_id"
          pagination={false}
          locale={{ emptyText: "Không có học viên" }}
        />
      </Modal>

      {/* Modal xác nhận xóa bảng điểm */}
      <Modal
        title="Xác nhận xóa bảng điểm"
        open={isDeleteModalVisible}
        onCancel={handleCancelDelete}
        onOk={handleConfirmDelete}
        okText="Xoá"
        cancelText="Hủy"
      >
        <p>Bạn có chắc chắn muốn xóa bảng điểm này không?</p>
      </Modal>
    </div>
  );
};

export default ScoreManagement;
