import React, { useState, useEffect } from "react";
import { Select, DatePicker, Table, Button, message } from "antd";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  PageHeader,
  FilterContainer,
  StudentListWrapper,
  SubSectionTitle,
  CenteredAction,
} from "./style";

import * as ClassService from "../../services/ClassService";
import * as ScheduleService from "../../services/ScheduleService";
import { getStudentsInClass } from "../../services/ClassService";

const { Option } = Select;

const AttendanceManagementPage = () => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [validDates, setValidDates] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [classList, setClassList] = useState([]);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await ClassService.getClassbyTeacher(user.user._id);
        const transformed = response.data.map((item, index) => ({
          key: item._id || index.toString(),
          className: item.name,
        }));
        setClassList(transformed);
      } catch (error) {
        toast.error("Lỗi khi lấy danh sách lớp.");
      }
    };

    if (user?.user?._id) {
      fetchClasses();
    }
  }, [user]);

  const handleSelectClass = async (classId) => {
    setSelectedClass(classId);
    setStudentList([]);
    setSelectedDate(null);
    setValidDates([]);

    if (!classId) return;

    try {
      const scheduleRes = await ScheduleService.getTeacherSchedule(user.user._id, user.access_token);
      const classSchedules = scheduleRes?.data?.filter((item) => item.classId === classId);
      const valid = classSchedules.map((item) => dayjs(item.date).format("YYYY-MM-DD"));
      setValidDates(valid);
    } catch (error) {
      toast.error("Lỗi khi tải lịch dạy.");
    }
  };

  const handleDateChange = async (date) => {
    const formatted = date.format("YYYY-MM-DD");

    if (!validDates.includes(formatted)) {
      toast.warning("Ngày này không nằm trong lịch dạy của lớp.");
      setSelectedDate(null);
      setStudentList([]);
      return;
    }

    setSelectedDate(date);

    try {
      const res = await getStudentsInClass(selectedClass);
      const formattedStudents = res.data.map((stu) => ({
        _id: stu._id,
        name: stu.name,
        status: "present",
      }));
      setStudentList(formattedStudents);
    } catch (err) {
      toast.error("Lỗi khi tải danh sách học viên.");
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setStudentList((prev) =>
      prev.map((student) =>
        student._id === id ? { ...student, status: newStatus } : student
      )
    );
  };

  const handleSave = () => {
    const payload = {
      classId: selectedClass,
      date: selectedDate.format("YYYY-MM-DD"),
      attendance: studentList,
    };
    console.log("Lưu dữ liệu:", payload);
    message.success("✅ Đã lưu thay đổi điểm danh!");
  };

  const columns = [
    {
      title: "STT",
      render: (_, __, index) => index + 1,
      width: 70,
    },
    {
      title: "Họ tên học viên",
      dataIndex: "name",
    },
    {
      title: "Trạng thái điểm danh",
      dataIndex: "status",
      render: (_, record) => (
        <Select
          value={record.status}
          onChange={(val) => handleStatusChange(record._id, val)}
          style={{ width: 140 }}
        >
          <Option value="present">✅ Có mặt</Option>
          <Option value="absent">❌ Vắng</Option>
        </Select>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <PageHeader>
        <h2>Quản lý điểm danh</h2>
      </PageHeader>

      <FilterContainer>
        <span><strong>Lớp học:</strong></span>
        <Select
          placeholder="Chọn lớp"
          style={{ width: 200 }}
          onChange={handleSelectClass}
          value={selectedClass}
          allowClear
        >
          {classList.map((cls) => (
            <Option key={cls.key} value={cls.key}>
              {cls.className}
            </Option>
          ))}
        </Select>

        <span><strong>Ngày:</strong></span>
        <DatePicker
          format="DD/MM/YYYY"
          value={selectedDate}
          onChange={handleDateChange}
          disabledDate={(current) => {
            const formatted = current.format("YYYY-MM-DD");
            return current > dayjs().endOf("day") || !validDates.includes(formatted);
          }}
        />
      </FilterContainer>

      <StudentListWrapper>
        <SubSectionTitle>
          {selectedClass && selectedDate
            ? "Danh sách điểm danh học viên"
            : "Vui lòng chọn lớp và ngày học hợp lệ"}
        </SubSectionTitle>

        {studentList.length > 0 ? (
          <>
            <Table
              dataSource={studentList}
              rowKey="_id"
              columns={columns}
              pagination={false}
              bordered
              locale={{
                emptyText: "Không có dữ liệu điểm danh",
              }}
            />

            <CenteredAction style={{ marginTop: 20 }}>
              <Button type="primary" onClick={handleSave}>
                Lưu thay đổi
              </Button>
            </CenteredAction>
          </>
        ) : (
          <p style={{ color: "#888", padding: 12 }}>
            {selectedClass && selectedDate
              ? "Không có dữ liệu điểm danh cho ngày này."
              : "Chọn lớp và ngày học để xem điểm danh."}
          </p>
        )}
      </StudentListWrapper>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AttendanceManagementPage;