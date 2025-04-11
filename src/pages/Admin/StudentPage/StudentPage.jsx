import { useState, useEffect } from "react";
import {
  Table,
  Input,
  Button,
  Tooltip,
  Avatar,
  Select,
  message,
  Spin,
  Modal,
} from "antd";
import {
  DeleteOutlined,
  SortAscendingOutlined,
  EditOutlined,
} from "@ant-design/icons";
import {
  PageHeader,
  FilterContainer,
  HeaderActions,
  CenteredAction,
} from "./style";
import * as UserService from "../../../services/UserService";

const { Option } = Select;

export default function StudentPage() {
  const [students, setStudents] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [filterCity, setFilterCity] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false); // Added delete modal visibility state
  const [currentStudent, setCurrentStudent] = useState(null);
  const [editedStudentData, setEditedStudentData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    parentname: "",
  });

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await UserService.getAllUser(user?.access_token);
      const users = res?.data.filter((u) => !u.isTeacher && !u.isAdmin)
        .map((u, index) => ({
          key: u._id || index.toString(),
          name: u.name,
          email: u.email,
          phone: u.phone || "",
          address: u.address || "",
          city: u.city || "",
          parentname: u.parentname || "",
          avatar: u.avatar || "",
        }));
      setStudents(users);
      setFilteredData(users);
    } catch (err) {
      message.error("Lỗi khi tải danh sách học viên");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    let results = students.filter((student) => {
      const matchesSearch =
        student.name?.toLowerCase().includes(search.toLowerCase()) ||
        student.email?.toLowerCase().includes(search.toLowerCase()) ||
        student.phone?.includes(search);
      const matchesCity = filterCity ? student.city === filterCity : true;
      return matchesSearch && matchesCity;
    });

    if (sortOrder === "asc") {
      results.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === "desc") {
      results.sort((a, b) => b.name.localeCompare(a.name));
    }

    setFilteredData(results);
  }, [search, filterCity, sortOrder, students]);

  const handleDelete = (record) => {
    setCurrentStudent(record);
    setIsDeleteModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await UserService.deleteUser(currentStudent.key, user?.access_token);
      message.success(`Đã xóa học viên: ${currentStudent.name}`);
      setFilteredData((prev) =>
        prev.filter((item) => item.key !== currentStudent.key)
      );
      setIsDeleteModalVisible(false);
    } catch (error) {
      message.error("Xóa học viên thất bại!");
    }
  };

  const handleEdit = (record) => {
    setCurrentStudent(record);
    setEditedStudentData({
      name: record.name,
      email: record.email,
      phone: record.phone,
      address: record.address,
      city: record.city,
      parentname: record.parentname,
    });
    setIsEditModalVisible(true);
  };

  const handleEditSubmit = async () => {
    try {
      const updatedStudent = await UserService.updateUser(
        currentStudent.key,
        editedStudentData,
        user?.access_token
      );
      message.success(`Đã cập nhật học viên: ${updatedStudent.name}`);
      setFilteredData((prev) =>
        prev.map((item) =>
          item.key === currentStudent.key
            ? { ...item, ...editedStudentData }
            : item
        )
      );
      setIsEditModalVisible(false);
    } catch (error) {
      message.error("Cập nhật học viên thất bại!");
    }
  };

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
    {
      title: "Tên học viên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Thành phố",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Phụ huynh",
      dataIndex: "parentname",
      key: "parentname",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <CenteredAction>
          <Tooltip title="Chỉnh sửa">
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
          <Tooltip title="Xóa">
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

  const cityOptions = [...new Set(students.map((s) => s.city).filter(Boolean))];

  return (
    <div style={{ padding: 24 }}>
      <PageHeader>
        <h2>Quản lý học viên</h2>
        <HeaderActions />
      </PageHeader>

      <FilterContainer>
        <Input
          placeholder="Tìm theo tên, email, số điện thoại"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 250 }}
        />
        <Select
          placeholder="Lọc theo thành phố"
          allowClear
          style={{ width: 200 }}
          value={filterCity}
          onChange={(value) => setFilterCity(value)}
        >
          {cityOptions.map((city) => (
            <Option key={city} value={city}>
              {city}
            </Option>
          ))}
        </Select>
        <Button
          icon={<SortAscendingOutlined />}
          ghost
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        >
          Sắp xếp {sortOrder === "asc" ? "↓ Z-A" : "↑ A-Z"}
        </Button>
      </FilterContainer>

      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{ pageSize: 5 }}
          bordered
        />
      </Spin>

      <Modal
        title="Chỉnh sửa học viên"
        visible={isEditModalVisible}
        onOk={handleEditSubmit}
        onCancel={() => setIsEditModalVisible(false)}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Input
          placeholder="Tên học viên"
          value={editedStudentData.name}
          onChange={(e) =>
            setEditedStudentData({ ...editedStudentData, name: e.target.value })
          }
        />
        <Input
          placeholder="Email"
          value={editedStudentData.email}
          onChange={(e) =>
            setEditedStudentData({ ...editedStudentData, email: e.target.value })
          }
        />
        <Input
          placeholder="Số điện thoại"
          value={editedStudentData.phone}
          onChange={(e) =>
            setEditedStudentData({ ...editedStudentData, phone: e.target.value })
          }
        />
        <Input
          placeholder="Địa chỉ"
          value={editedStudentData.address}
          onChange={(e) =>
            setEditedStudentData({ ...editedStudentData, address: e.target.value })
          }
        />
      </Modal>

      <Modal
        title="Xác nhận xóa"
        visible={isDeleteModalVisible}
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
