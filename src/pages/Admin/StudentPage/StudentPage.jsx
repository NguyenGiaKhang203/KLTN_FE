import { useState, useEffect } from "react";
import {
  Table,
  Input,
  Select,
  message,
  Spin,
  Avatar,
  Tooltip,
  Button,
  Modal,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import {
  PageHeader,
  FilterContainer,
  HeaderActions,
  CenteredAction,
} from "./style";
import * as ClassService from "../../../services/ClassService";
import * as UserService from "../../../services/UserService";

const { Option } = Select;

export default function StudentPage() {
  const [classList, setClassList] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [selectedClassName, setSelectedClassName] = useState("");
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await ClassService.getAllClasses();
        const classData = res?.data || [];
        setClassList(classData);
      } catch (err) {
        message.error("Không thể tải danh sách lớp học");
      }
    };

    fetchClasses();
  }, []);

  const fetchStudentsByClass = async (classId) => {
    setLoading(true);
    try {
      const res = await ClassService.getStudentsInClass(classId);
      const formatted =
        res?.students?.map((student, index) => ({
          key: student._id || index.toString(),
          name: student.name,
          email: student.email,
          phone: student.phone || "",
          address: student.address || "",
          city: student.city || "",
          parentname: student.parentname || "",
          avatar: student.avatar || "",
        })) || [];

      setStudents(formatted);
      setFilteredStudents(formatted);
    } catch (err) {
      message.error("Không thể tải danh sách học viên");
    }
    setLoading(false);
  };

  const handleDelete = (record) => {
    setCurrentStudent(record);
    setIsDeleteModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await UserService.deleteUser(currentStudent.key, user?.access_token);
      message.success(`Đã xóa học viên: ${currentStudent.name}`);
      setFilteredStudents((prev) =>
        prev.filter((item) => item.key !== currentStudent.key)
      );
      setIsDeleteModalVisible(false);
    } catch {
      message.error("Xóa học viên thất bại!");
    }
  };

  useEffect(() => {
    const keyword = searchName.toLowerCase();
    const results = students.filter((s) =>
      s.name?.toLowerCase().includes(keyword)
    );
    setFilteredStudents(results);
  }, [searchName, students]);

  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (text) => (
        <Avatar src={text} size={48} style={{ backgroundColor: "#87d068" }}>
          {!text && "HV"}
        </Avatar>
      ),
    },
    { title: "Tên học viên", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Điện thoại", dataIndex: "phone", key: "phone" },
    { title: "Địa chỉ", dataIndex: "address", key: "address" },
    { title: "Tên phụ huynh", dataIndex: "parentname", key: "parentname" },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <CenteredAction>
          <Tooltip title="Xóa học viên">
            <Button
              danger
              type="link"
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record)}
            />
          </Tooltip>
        </CenteredAction>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <PageHeader>
        <h2>Quản lý học viên</h2>
        <HeaderActions />
      </PageHeader>

      <FilterContainer>
        <Select
          placeholder="Chọn lớp học"
          allowClear
          style={{ width: 300 }}
          value={selectedClassId}
          onChange={(value, option) => {
            if (!value) {
              setSelectedClassId(null);
              setSelectedClassName("");
              setFilteredStudents([]);
              setStudents([]);
              return;
            }
            setSelectedClassId(value);
            setSelectedClassName(option?.label || "");
            fetchStudentsByClass(value);
          }}
        >
          {classList.map((cls) => {
            const scheduleStr = Array.isArray(cls.schedule)
              ? cls.schedule
                  .map((slot) =>
                    slot?.startTime && slot?.endTime
                      ? `${slot.day} (${slot.startTime} - ${slot.endTime})`
                      : `${slot.day} (Chưa có giờ)`
                  )
                  .join(", ")
              : "Không rõ";

            return (
              <Option
                key={cls._id}
                value={cls._id}
                label={`${cls.name} - ${scheduleStr}`}
              >
                {`${cls.name} - ${scheduleStr}`}
              </Option>
            );
          })}
        </Select>

        <Input
          placeholder="Tìm học viên"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          style={{ width: 250 }}
        />
      </FilterContainer>

      {selectedClassName && (
        <div style={{ marginBottom: 12, fontWeight: 500 }}>
          <p>
            <strong>Lớp:</strong> {selectedClassName}
          </p>
        </div>
      )}

      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={filteredStudents}
          pagination={{ pageSize: 5 }}
          bordered
        />
      </Spin>

      <Modal
        title="Xác nhận xóa"
        open={isDeleteModalVisible}
        onOk={handleConfirmDelete}
        onCancel={() => setIsDeleteModalVisible(false)}
        okText="Xóa"
        cancelText="Hủy"
      >
        <p>Bạn có chắc chắn muốn xóa học viên {currentStudent?.name}?</p>
      </Modal>
    </div>
  );
}
