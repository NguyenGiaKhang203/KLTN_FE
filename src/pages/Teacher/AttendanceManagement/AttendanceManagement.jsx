import React, { useState, useEffect } from "react";
import { Select, Table, Button, Radio } from "antd";
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

import * as ClassService from "../../../services/ClassService";
import * as AttendanceService from "../../../services/AttendanceService";

const { Option } = Select;

const AttendanceManagementPage = () => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [studentList, setStudentList] = useState([]);
  const [classList, setClassList] = useState([]);
  const [scheduleInfo, setScheduleInfo] = useState(null);
  const [validDates, setValidDates] = useState([]);
  const [isAttendanceExist, setIsAttendanceExist] = useState(false);
  const [attendanceId, setAttendanceId] = useState(null);
  const user = useSelector((state) => state.user);
  const token = user?.access_token;
  const teacherId = user?.user?._id;

  const convertNumberDayToText = (englishDay) => {
    const map = {
      Sunday: "Chủ nhật",
      Monday: "Thứ 2",
      Tuesday: "Thứ 3",
      Wednesday: "Thứ 4",
      Thursday: "Thứ 5",
      Friday: "Thứ 6",
      Saturday: "Thứ 7",
    };
    return map[englishDay] || englishDay;
  };

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await ClassService.getClassbyTeacher(teacherId);
        const transformed = response.data.map((item, index) => ({
          key: item._id || index.toString(),
          className: item.name,
        }));
        setClassList(transformed);
      } catch (error) {
        toast.error("Lỗi khi lấy danh sách lớp.");
      }
    };

    if (teacherId) {
      fetchClasses();
    }
  }, [teacherId]);

  const handleSelectClass = async (classId) => {
    setSelectedClass(classId);
    setStudentList([]);
    setSelectedDate(null);
    setScheduleInfo(null);
    setIsAttendanceExist(false);

    if (!classId) return;

    try {
      const res = await ClassService.getScheduleByClassId(classId);
      const { startDate, endDate, schedule } = res;

      if (schedule && startDate && endDate) {
        const valid = generateValidDates(schedule, startDate, endDate);
        setScheduleInfo({ schedule, startDate, endDate });
        setValidDates(valid);
      } else {
        toast.error("Dữ liệu lịch học không hợp lệ.");
      }
    } catch (error) {
      toast.error("Lỗi khi tải lịch học của lớp.");
    }
  };

  const generateValidDates = (schedule, startDate, endDate) => {
    const valid = [];
    const start = dayjs(startDate);
    const end = dayjs(endDate);

    if (!start.isValid() || !end.isValid()) return valid;

    let current = start;
    while (current.isSame(end, "day") || current.isBefore(end, "day")) {
      const dayOfWeek = current.format("dddd");
      const vietnameseDay = convertNumberDayToText(dayOfWeek);

      if (schedule.some((item) => item.day === vietnameseDay)) {
        valid.push(current.format("YYYY-MM-DD"));
      }

      current = current.add(1, "day");
    }

    return valid;
  };

  const handleDateChange = async (dateString) => {
    if (!scheduleInfo || !validDates.length) return;

    if (!validDates.includes(dateString)) {
      toast.warning("Ngày này không nằm trong lịch học của lớp.");
      setSelectedDate(null);
      setStudentList([]);
      setIsAttendanceExist(false);
      setAttendanceId(null);
      return;
    }

    setSelectedDate(dayjs(dateString));

    try {
      const attendanceRes = await AttendanceService.getAttendanceByClassAndDate(
        selectedClass,
        dateString,
        token
      );

      if (attendanceRes && attendanceRes.attendances?.length > 0) {
        const formattedStudents = attendanceRes.attendances.map((att) => ({
          _id: att.student,
          name: "",
          status: att.status,
        }));

        try {
          const res = await ClassService.getStudentsInClass(selectedClass);
          const studentMap = {};
          res.students.forEach((stu) => {
            studentMap[stu._id] = stu.name;
          });

          const studentsWithName = formattedStudents.map((stu) => ({
            ...stu,
            name: studentMap[stu._id] || "Không rõ",
          }));

          setStudentList(studentsWithName);
        } catch {
          setStudentList(formattedStudents);
        }

        setIsAttendanceExist(true);
        setAttendanceId(attendanceRes._id);
      } else {
        throw new Error("Attendance not found");
      }
    } catch {
      try {
        const res = await ClassService.getStudentsInClass(selectedClass);
        const formattedStudents = res.students.map((stu) => ({
          _id: stu._id,
          name: stu.name,
          status: "present", // ✅ mặc định là 'present'
        }));
        setStudentList(formattedStudents);
        setIsAttendanceExist(false);
        setAttendanceId(null);
      } catch {
        toast.error("Lỗi khi tải danh sách học viên.");
        setStudentList([]);
        setIsAttendanceExist(false);
        setAttendanceId(null);
      }
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setStudentList((prev) =>
      prev.map((student) =>
        student._id === id ? { ...student, status: newStatus } : student
      )
    );
  };

  const handleSave = async () => {
    if (!selectedDate) {
      toast.error("Vui lòng chọn ngày hợp lệ trước khi lưu.");
      return;
    }

    const classroomId = selectedClass;
    const attendances = studentList.map((student) => ({
      student: student._id,
      status: student.status,
      date: selectedDate.format("YYYY-MM-DD"),
    }));

    const isValid = attendances.every(
      (record) => record.student && record.status
    );

    if (!isValid) {
      toast.error("Vui lòng chọn đầy đủ trạng thái cho tất cả học viên.");
      return;
    }

    try {
      if (isAttendanceExist && attendanceId) {
        await AttendanceService.updateAttendance(attendanceId, attendances, token);
        toast.success("Cập nhật điểm danh thành công!");
      } else {
        await AttendanceService.bulkAttendance(classroomId, attendances, teacherId, token);
        toast.success("Điểm danh thành công!");
        setIsAttendanceExist(true);
      }
    } catch {
      toast.error("Lưu điểm danh thất bại. Vui lòng thử lại!");
    }
  };

  const handleDateSelectChange = (value) => {
    handleDateChange(value);
  };

  // const columns = [
  //   {
  //     title: "STT",
  //     render: (_, record, index) =>
  //       record._id === "bulk-actions" ? "" : index,
  //     width: 70,
  //   },
  //   {
  //     title: "Họ tên học viên",
  //     dataIndex: "name",
  //     render: (text, record) =>
  //       record._id === "bulk-actions" ?"" :text,
  //   },
  //   {
  //     title: "Trạng thái điểm danh",
  //     dataIndex: "status",
  //     render: (_, record) => {
  //       if (record._id === "bulk-actions") {
  //         return (
  //           <Radio.Group
  //             onChange={(e) => {
  //               const newStatus = e.target.value;
  //               setStudentList((prev) =>
  //                 prev.map((student) =>
  //                   student._id === "bulk-actions" ? student : { ...student, status: newStatus }
  //                 )
  //               );
  //             }}
  //           >
  //             <Radio value="present">✅ Có mặt</Radio>
  //             <Radio value="absent">❌ Vắng</Radio>
  //           </Radio.Group>
  //         );
  //       }

  //       return (
  //         <Radio.Group
  //           onChange={(e) => handleStatusChange(record._id, e.target.value)}
  //           value={record.status || undefined}
  //         >
  //           <Radio value="present">✅ Có mặt</Radio>
  //           <Radio value="absent">❌ Vắng</Radio>
  //         </Radio.Group>
  //       );
  //     },
  //   }
  // ];

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
      <Radio.Group
        onChange={(e) => handleStatusChange(record._id, e.target.value)}
        value={record.status || undefined}
      >
        <Radio value="present">✅ Có mặt</Radio>
        <Radio value="absent">❌ Vắng</Radio>
      </Radio.Group>
    ),
  }
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
        <Select
          placeholder="Chọn ngày"
          style={{ width: 200 }}
          onChange={handleDateSelectChange}
          value={selectedDate ? selectedDate.format("YYYY-MM-DD") : null}
        >
          {validDates.map((date) => (
            <Option key={date} value={date}>
              {dayjs(date).format("DD/MM/YYYY")}
            </Option>
          ))}
        </Select>
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
            />
            <CenteredAction>
              <Button type="primary" onClick={handleSave}>
                Lưu điểm danh
              </Button>
            </CenteredAction>
          </>
        ) : null}
      </StudentListWrapper>

      <ToastContainer />
    </div>
  );
};

export default AttendanceManagementPage;