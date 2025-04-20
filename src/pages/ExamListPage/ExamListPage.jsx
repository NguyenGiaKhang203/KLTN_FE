import React, { useEffect, useState } from "react";
import { Table, Button, Tag, Select, message } from "antd";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getExamsByClassId } from "../../services/ExamService";
import * as ClassService from "../../services/ClassService";
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
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedClassRecord, setSelectedClassRecord] = useState(null);
  const [data, setData] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

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

  const handleStartExam = () => {
    if (selectedExam) {
      if (selectedExam.examUrl?.startsWith("http")) {
        window.location.href = selectedExam.examUrl;
      } else {
        navigate(`/exam/do/${selectedExam._id}`);
      }
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
            disabled={!canDo}
            onClick={() => {
              setSelectedExam(record);
              handleStartExam();
            }}
          >
            Làm bài
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
    </PageContainer>
  );
};

export default ExamListPage;
