import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Table,
  Button,
  Modal,
  Tag,
  Select,
  Tooltip,
  message,
} from "antd";
import { EyeOutlined } from "@ant-design/icons";
import * as ClassService from "../../../services/ClassService";
import {
  PageHeader,
  FilterContainer,
  CenteredAction,
  StatusTag,
} from "./style";

const { Option } = Select;

export default function AdminAttendancePage() {
  const [data, setData] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState();
  const [loading, setLoading] = useState(true);
  const [studentList, setStudentList] = useState([]);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoading(true);
        const response = await ClassService.getClassbyTeacher(user.user._id);
        const transformed = response.data.map((item, index) => ({
          key: item._id || index.toString(),
          className: item.name,
          teacher: item.teacher?.name || "Không rõ",
          date: item.schedule?.[0]?.day || "Chưa có lịch",
          timeSlot:
            item.schedule?.length > 0
              ? `${item.schedule[0].startTime} - ${item.schedule[0].endTime}`
              : "Chưa có giờ",
          teacherStatus: item.teacherStatus || null,
        }));
        setData(transformed);
      } catch (error) {
        message.error("Lỗi khi lấy dữ liệu lớp học.");
      } finally {
        setLoading(false);
      }
    };

    if (user?.user?._id) {
      fetchClasses();
    }
  }, [user]);

  const handleClassSelect = async (value) => {
    setSelectedClass(value);
    const selected = data.find((item) => item.className === value);
    if (selected) {
      try {
        const res = await ClassService.getStudentsInClass(selected.key);
        console.log('data', res);

        if (res.status === 'OK' && Array.isArray(res.students)) {
          setStudentList(res.students);
        } else {
          setStudentList([]);
          message.warning("Không thể lấy danh sách sinh viên.");
        }
      } catch (err) {
        setStudentList([]);
        message.error("Lỗi khi lấy danh sách sinh viên.");
      }
    }
  };

  const handleOpenModal = async (record) => {
    setSelectedRecord(record);
    setModalOpen(true);
    try {
      const res = await ClassService.getStudentsInClass(record.key);

      if (res.status === 'OK' && Array.isArray(res.students)) {
        setStudentList(res.students);
      } else {
        setStudentList([]);
        message.warning("Không thể lấy danh sách sinh viên.");
      }
    } catch (err) {
      setStudentList([]);
      message.error("Lỗi khi lấy danh sách sinh viên.");
    }
  };

  const handleTeacherStatusChange = (value) => {
    const updatedData = data.map((item) =>
      item.key === selectedRecord.key ? { ...item, teacherStatus: value } : item
    );
    setData(updatedData);
    setSelectedRecord((prev) => ({ ...prev, teacherStatus: value }));
    setModalOpen(false);
    message.success("Đã cập nhật điểm danh giảng viên.");
  };

  const columns = [
    {
      title: "Lớp học",
      dataIndex: "className",
      key: "className",
    },
    {
      title: "Giảng viên",
      dataIndex: "teacher",
      key: "teacher",
    },
    {
      title: "Ngày",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Khung giờ",
      dataIndex: "timeSlot",
      key: "timeSlot",
    },
    {
      title: "Giảng viên đi dạy",
      dataIndex: "teacherStatus",
      key: "teacherStatus",
      render: (status) =>
        status ? (
          <Tag color={status === "Có dạy" ? "green" : "red"}>{status}</Tag>
        ) : (
          <Tag color="orange">Chưa xác nhận</Tag>
        ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <CenteredAction>
          <Tooltip title="Xem điểm danh">
            <Button
              icon={<EyeOutlined />}
              onClick={() => handleOpenModal(record)}
            />
          </Tooltip>
        </CenteredAction>
      ),
    },
  ];

  const filteredData = selectedClass
    ? data.filter((item) => item.className === selectedClass)
    : data;

  return (
    <div style={{ padding: 24 }}>
      <PageHeader>
        <h2>Quản lý điểm danh</h2>
      </PageHeader>

      <FilterContainer>
        <span>
          <strong>Chọn lớp học:</strong>
        </span>
        <Select
          style={{ width: 200 }}
          placeholder="Chọn lớp học"
          value={selectedClass}
          onChange={handleClassSelect}
          allowClear
        >
          {[...new Set(data.map((item) => item.className))].map((className) => (
            <Option key={className} value={className}>
              {className}
            </Option>
          ))}
        </Select>
      </FilterContainer>

      <Table
        columns={columns}
        dataSource={filteredData}
        loading={loading}
        bordered
        pagination={{ pageSize: 5 }}
      />

      {selectedClass && (
        <div style={{ marginTop: 24 }}>
          <h3>Danh sách học viên lớp {selectedClass}:</h3>
          <ul style={{ paddingLeft: 16 }}>
            {studentList.length > 0 ? (
              studentList.map((student, index) => (
                <li key={student._id || index}>
                  {student.name || "Không tên"}{" "}
                  <StatusTag status={student.status || "Chưa rõ"}>
                    {student.status || "Chưa rõ"}
                  </StatusTag>
                </li>
              ))
            ) : (
              <li>Không có học viên</li>
            )}
          </ul>
        </div>
      )}

      <Modal
        title={`Điểm danh lớp: ${selectedRecord?.className || ""}`}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        width={600}
        destroyOnClose
      >
        {selectedRecord && (
          <>
            <p>
              <strong>Ngày:</strong> {selectedRecord.date}
            </p>
            <p>
              <strong>Khung giờ:</strong> {selectedRecord.timeSlot}
            </p>
            <p>
              <strong>Giảng viên:</strong> {selectedRecord.teacher}
            </p>

            <h4 style={{ marginTop: 12 }}>Danh sách học viên:</h4>
            <ul style={{ paddingLeft: 16 }}>
              {studentList.length > 0 ? (
                studentList.map((student, index) => (
                  <li key={student._id || index}>
                    {student.name || "Không tên"}{" "}
                    <StatusTag status={student.status || "Chưa rõ"}>
                      {student.status || "Chưa rõ"}
                    </StatusTag>
                  </li>
                ))
              ) : (
                <li>Chưa có học viên</li>
              )}
            </ul>
          </>
        )}
      </Modal>
    </div>
  );
}
