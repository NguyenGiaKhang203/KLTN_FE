import React, { useEffect, useState } from "react";
import { Input, InputNumber, Select, Table, Modal, Button } from "antd";
import { useSelector } from "react-redux";
import * as ScoreService from "../../services/ScoreService";
import * as ClassService from "../../services/ClassService";
import * as ExamService from "../../services/ExamService";
import { PageHeader, FilterContainer, TableWrapper } from "./style";
import { toast } from "react-toastify";

const { Search } = Input;
const { Option } = Select;

const CreateScoreManagement = () => {
  const [classList, setClassList] = useState([]);
  const [examList, setExamList] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedExam, setSelectedExam] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [studentsInClass, setStudentsInClass] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { user } = useSelector((state) => state.user);
  const userId = user?._id;
  const token = user?.access_token;

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await ClassService.getClassbyTeacher(userId);
        const data = Array.isArray(res?.data) ? res.data : res;
        setClassList(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách lớp:", err);
        setClassList([]);
      }
    };
    if (token) fetchClasses();
  }, [token]);

  useEffect(() => {
    const fetchExams = async () => {
      if (selectedClass) {
        try {
          const res = await ExamService.getExamsByClassId(selectedClass, token);
          const data = Array.isArray(res?.data) ? res.data : res;
          setExamList(Array.isArray(data) ? data : []);
        } catch (err) {
          console.error("Lỗi khi lấy danh sách bài thi:", err);
          setExamList([]);
        }
      } else {
        setExamList([]);
      }
    };
    fetchExams();
  }, [selectedClass, token]);

  const handleExamSelect = async (examId) => {
    setSelectedExam(examId);
    try {
      const res = await ClassService.getStudentsInClass(selectedClass, token);
      if (res?.students && Array.isArray(res.students)) {
        setStudentsInClass(res.students);
        toast.success("Đã chọn bài thi, hãy nhập điểm cho học viên.");
      } else {
        setStudentsInClass([]);
      }
      setIsModalVisible(true);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách học viên:", err);
      setStudentsInClass([]);
    }
  };

  const filteredData = studentsInClass.filter((student) =>
    student.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleCancel = () => {
    setIsModalVisible(false);
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
      const response = await ScoreService.createScore(scoreData, token);

      if (
        response.status === "ERROR" &&
        response.message === "Bảng điểm cho bài thi này đã tồn tại!"
      ) {
        toast.error(response.message);
      } else {
        toast.success("Điểm đã được gửi thành công!");
        setIsModalVisible(false);
      }
    } catch (error) {
      console.error("Lỗi khi gửi điểm:", error);
      if (
        error.response &&
        error.response.data.message === "Bảng điểm cho bài thi này đã tồn tại!"
      ) {
        toast.error("Bảng điểm cho bài thi này đã tồn tại!");
      } else {
        toast.error("Đã xảy ra lỗi, vui lòng thử lại.");
      }
    }
  };

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
              title: "Chọn",
              render: (_, record) =>
                selectedClass ? (
                  <Button type="primary" onClick={() => handleExamSelect(record._id)}>
                    Tạo bảng điểm
                  </Button>
                ) : (
                  <span style={{ color: "#888" }}>Chưa chọn lớp</span>
                ),
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
        bodyStyle={{ padding: 24, borderRadius: 12 }}
        style={{ borderRadius: 12 }}
      >
        <div
          style={{
            marginBottom: 16,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
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
          style={{ borderRadius: 10 }}
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
            🚀 Gửi điểm
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default CreateScoreManagement;
