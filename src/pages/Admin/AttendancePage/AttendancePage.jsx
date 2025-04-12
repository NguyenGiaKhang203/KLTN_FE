import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Table, Button, Select, message, DatePicker } from "antd";
import dayjs from "dayjs";
import * as ClassService from "../../../services/ClassService";
import * as AttendanceService from "../../../services/AttendanceService";
import {
  PageHeader,
  FilterContainer,
  CenteredAction,
  StatusTag,
  StudentListWrapper,
  SubSectionTitle,
} from "./style";

const { Option } = Select;

export default function AdminAttendancePage() {
  const [data, setData] = useState([]);
  const [selectedClass, setSelectedClass] = useState();
  const [selectedClassRecord, setSelectedClassRecord] = useState(null);
  const [studentList, setStudentList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const user = useSelector((state) => state.user);

  const isToday = selectedDate.isSame(dayjs(), "day");

  useEffect(() => {
    setStudentList([
      { _id: "stu001", name: "Nguyễn Văn A", status: "Có mặt" },
      { _id: "stu002", name: "Trần Thị B", status: "Vắng" },
      { _id: "stu003", name: "Lê Văn C", status: "Nghỉ phép" },
      { _id: "stu004", name: "Phạm Thị D", status: "Chưa điểm danh" },
    ]);
    const fetchClasses = async () => {
      try {
        const response = await ClassService.getClassbyTeacher(user.user._id);
        const transformed = response.data.map((item, index) => ({
          key: item._id || index.toString(),
          className: item.name,
        }));
        setData(transformed);
      } catch (error) {
        message.error("Lỗi khi lấy dữ liệu lớp học.");
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
      setStudentList([]);
      return;
    }

    setSelectedClass(selected.className);
    setSelectedClassRecord(selected);

    try {
      const res = await ClassService.getStudentsInClass(selected.key);
      if (res.status === "OK" && Array.isArray(res.students)) {
        const enriched = res.students.map((s) => ({
          ...s,
          status: s.status || "Chưa điểm danh",
        }));
        setStudentList(enriched);
      } else {
        setStudentList([]);
        message.warning("Không thể lấy danh sách học viên.");
      }
    } catch (err) {
      setStudentList([]);
      message.error("Lỗi khi lấy danh sách học viên.");
    }
  };

  const handleSaveAttendance = async () => {
    if (!selectedClassRecord) return;
    try {
      await AttendanceService.bulkAttendance(
        selectedClassRecord.key,
        studentList.map((s) => ({
          id: s._id,
          status: s.status,
        })),
        user.user._id,
        selectedDate.format("YYYY-MM-DD")
      );
      message.success("Đã lưu điểm danh thành công!");
    } catch (err) {
      message.error("Lưu điểm danh thất bại!");
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <PageHeader>
        <h2>Quản lý điểm danh</h2>
      </PageHeader>

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

        <span><strong>Chọn ngày:</strong></span>
        <DatePicker
          value={selectedDate}
          onChange={(date) => {
            if (date && date.isAfter(dayjs(), "day")) {
              message.warning("Không thể chọn ngày trong tương lai.");
              return;
            }
            setSelectedDate(date);
          }}
          disabledDate={(current) => current && current > dayjs().endOf("day")}
          format="DD/MM/YYYY"
        />
      </FilterContainer>

      <StudentListWrapper>
        <SubSectionTitle>
          {selectedClass
            ? `Danh sách học viên lớp ${selectedClass}`
            : "Danh sách học viên sẽ hiển thị sau khi chọn lớp"}
        </SubSectionTitle>

        <p style={{ color: "#666", marginBottom: 16 }}>
          {selectedClass
            ? isToday
              ? "Vui lòng chọn trạng thái điểm danh cho từng học viên bên dưới."
              : "Bạn đang xem lịch sử điểm danh (readonly)."
            : "Chưa chọn lớp học. Hãy chọn lớp từ dropdown phía trên."}
        </p>

        <Table
          dataSource={studentList}
          rowKey={(record) => record._id}
          pagination={false}
          bordered
          locale={{
            emptyText: (
              <span style={{ color: "#999" }}>
                {selectedClass
                  ? "Không có học viên nào trong lớp này."
                  : "Chưa có lớp nào được chọn."}
              </span>
            ),
          }}
          columns={[
            {
              title: "Họ tên học viên",
              dataIndex: "name",
              key: "name",
            },
            {
              title: "Trạng thái điểm danh",
              dataIndex: "status",
              key: "status",
              render: (_, record) => (
                <Select
                  style={{ width: 160 }}
                  value={record.status}
                  disabled={!isToday}
                  onChange={(value) =>
                    setStudentList((prev) =>
                      prev.map((s) =>
                        s._id === record._id ? { ...s, status: value } : s
                      )
                    )
                  }
                >
                  <Option value="Có mặt">✅ Có mặt</Option>
                  <Option value="Vắng">❌ Vắng</Option>
                  <Option value="Nghỉ phép">📄 Nghỉ phép</Option>
                </Select>
              ),
            },
          ]}
        />

        {selectedClass && studentList.length > 0 && isToday && (
          <CenteredAction style={{ marginTop: 20 }}>
            <Button type="primary" onClick={handleSaveAttendance}>
              Lưu điểm danh
            </Button>
          </CenteredAction>
        )}
      </StudentListWrapper>
    </div>
  );
}
