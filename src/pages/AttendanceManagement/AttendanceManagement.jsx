import React, { useState, useEffect } from "react";
import { Select, DatePicker, Table, Button, message, Popconfirm } from "antd";
import dayjs from "dayjs";
import {
  PageHeader,
  FilterContainer,
  StudentListWrapper,
  SubSectionTitle,
  CenteredAction,
} from "./style";

const { Option } = Select;

const AttendanceManagementPage = () => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [studentList, setStudentList] = useState([]);

  const mockClasses = [
    { id: "class1", name: "Lớp A" },
    { id: "class2", name: "Lớp B" },
  ];

  const handleSelectClass = (val) => {
    setSelectedClass(val);
    if (val) {
      // giả lập fetch API điểm danh
      setStudentList([
        { _id: "1", name: "Nguyễn Văn A", status: "present" },
        { _id: "2", name: "Trần Thị B", status: "absent" },
        { _id: "3", name: "Lê Văn C", status: "present" },
      ]);
    } else {
      setStudentList([]);
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setStudentList((prev) =>
      prev.map((student) =>
        student._id === id ? { ...student, status: newStatus } : student
      )
    );
  };

  const handleDeleteRecord = (id) => {
    setStudentList((prev) => prev.filter((student) => student._id !== id));
  };

  const handleSave = () => {
    // TODO: Gọi API cập nhật điểm danh
    console.log("Đã lưu:", {
      classId: selectedClass,
      date: selectedDate.format("YYYY-MM-DD"),
      attendance: studentList,
    });
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
    {
      title: "Hành động",
      render: (_, record) => (
        <Popconfirm
          title="Xoá bản ghi điểm danh?"
          onConfirm={() => handleDeleteRecord(record._id)}
          okText="Xoá"
          cancelText="Huỷ"
        >
          <Button danger>Xoá</Button>
        </Popconfirm>
      ),
      width: 100,
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <PageHeader>
        <h2>Quản lý điểm danh</h2>
      </PageHeader>

      <FilterContainer>
        <span>
          <strong>Lớp học:</strong>
        </span>
        <Select
          placeholder="Chọn lớp"
          style={{ width: 200 }}
          onChange={handleSelectClass}
          value={selectedClass}
          allowClear
        >
          {mockClasses.map((cls) => (
            <Option key={cls.id} value={cls.id}>
              {cls.name}
            </Option>
          ))}
        </Select>

        <span>
          <strong>Ngày:</strong>
        </span>
        <DatePicker
          format="DD/MM/YYYY"
          value={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          disabledDate={(current) => current && current > dayjs().endOf("day")}
        />
      </FilterContainer>

      <StudentListWrapper>
        <SubSectionTitle>
          {selectedClass
            ? "Danh sách điểm danh học viên"
            : "Hãy chọn lớp để xem điểm danh"}
        </SubSectionTitle>

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

        {studentList.length > 0 && (
          <CenteredAction style={{ marginTop: 20 }}>
            <Button type="primary" onClick={handleSave}>
              Lưu thay đổi
            </Button>
          </CenteredAction>
        )}
      </StudentListWrapper>
    </div>
  );
};

export default AttendanceManagementPage;
