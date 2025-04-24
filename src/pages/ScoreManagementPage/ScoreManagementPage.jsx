import React, { useEffect, useState } from "react";
import { Input, Select, Table, Modal, Button } from "antd";
import { useSelector } from "react-redux";
import * as ScoreService from "../../services/ScoreService";
import * as ClassService from "../../services/ClassService";
import * as ExamService from "../../services/ExamService";
import { PageHeader, FilterContainer, CreateScoreButton } from "./style";
import { toast } from 'react-toastify';  // Import toastify

const { Search } = Input;
const { Option } = Select;

const ScoreManagementPage = () => {
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

  // Fetch danh sách bài thi khi chọn lớp học
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
        <Input
          defaultValue={record.score || ""}
          onChange={(e) => handleScoreChange(e, record._id)} // Gọi hàm để xử lý thay đổi điểm
          style={{ width: 100, marginRight: 8 }}
        />
      ),
    },
  ];

  const handleScoreChange = (e, studentId) => {
    const updatedScore = e.target.value;
    setStudentsInClass((prev) =>
      prev.map((student) =>
        student._id === studentId ? { ...student, score: updatedScore } : student
      )
    );
  };

  const handleSubmitScores = async () => {
    const invalidScores = studentsInClass.filter((student) => !student.score);
    if (invalidScores.length > 0) {
      toast.error("Vui lòng nhập điểm cho tất cả học viên.");
      return;
    }
  
    const scoreData = {
      examId: selectedExam,
      scores: studentsInClass.map((student) => ({
        studentId: student._id,
        score: student.score,
      })),
    };
  
    try {
      const response = await ScoreService.createScore(scoreData, token);
  
      if (response.status === "ERROR" && response.message === "Bảng điểm cho bài thi này đã tồn tại!") {
        toast.error(response.message);  
      } else {
        toast.success("Điểm đã được gửi thành công!");
        const updatedStudents = studentsInClass.map((student) => ({
          ...student,
          score: student.score,  
        }));
        setStudentsInClass(updatedStudents); 
      
        setIsModalVisible(false);
      }
    } catch (error) {
      console.error("Lỗi khi gửi điểm:", error);
      if (error.response && error.response.data.message === "Bảng điểm cho bài thi này đã tồn tại!") {
        toast.error("Bảng điểm cho bài thi này đã tồn tại!");
      } else {
        toast.error("Đã xảy ra lỗi, vui lòng thử lại.");
      }
    }
  };
  
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

      {selectedClass && (
        <div style={{ marginTop: 16 }}>
          <h3>Quản lí điểm</h3>
          <Table
            dataSource={examList}
            rowKey="_id"
            pagination={false}
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
                render: (_, record) => (
                  <Button type="primary" onClick={() => handleExamSelect(record._id)}>
                    Tạo bảng điểm
                  </Button>
                ),
              },
            ]}
            locale={{ emptyText: "Chưa có bài thi" }}
          />
        </div>
      )}

      <Modal
        title="Danh sách học viên"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <div>
          <Search
            placeholder="Tìm kiếm học viên..."
            onSearch={(value) => setSearchText(value)}
            style={{ width: 250, marginBottom: 16 }}
            allowClear
          />

          <Table
            dataSource={filteredData}
            columns={columns}
            rowKey="_id"
            bordered
            pagination={{ pageSize: 8 }}
            locale={{ emptyText: "Chưa có dữ liệu học viên" }}
          />

          <div style={{ textAlign: "center", marginTop: 20 }}>
            <button
              onClick={handleSubmitScores}
              style={{
                backgroundColor: "#1890ff",
                color: "white",
                padding: "8px 16px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Gửi điểm
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ScoreManagementPage;
