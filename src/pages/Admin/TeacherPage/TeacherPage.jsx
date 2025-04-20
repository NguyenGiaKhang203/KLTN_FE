import { useState, useEffect } from "react";
import { Table, Input, Button, Tooltip, Avatar, Select, Modal } from "antd";
import {
  DeleteOutlined,
  SortAscendingOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import * as UserService from "../../../services/UserService";
import {
  PageHeader,
  FilterContainer,
  HeaderActions,
  CenteredAction,
} from "./style";
import TeacherForm from "../../../components/Admin/TeacherForm/TeacherForm";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { Option } = Select;

export default function TeacherPage() {
  const [search, setSearch] = useState("");
  const [filterCity, setFilterCity] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState(null);
  const [editedTeacherData, setEditedTeacherData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  });
  const [newTeacherData, setNewTeacherData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await UserService.getAllUser(user?.access_token);
        const teacherList = res.data
          .filter((u) => u.isTeacher)
          .map((user, index) => ({
            key: user._id || index,
            name: user.name,
            email: user.email,
            phone: user.phone || "",
            address: user.address || "",
            city: user.city || "",
            avatar: user.avatar || "",
          }));
        setTeachers(teacherList);
        setFilteredData(teacherList);
      } catch {
        toast.error("Không thể tải danh sách giảng viên");
      }
    };

    fetchTeachers();
  }, []);

  useEffect(() => {
    let results = teachers.filter((user) => {
      const name = user.name?.toLowerCase() || "";
      const email = user.email?.toLowerCase() || "";
      const phone = user.phone || "";

      const matchesSearch =
        name.includes(search.toLowerCase()) ||
        email.includes(search.toLowerCase()) ||
        phone.includes(search);

      const matchesCity = filterCity ? user.city === filterCity : true;
      return matchesSearch && matchesCity;
    });

    if (sortOrder === "asc") {
      results = results.sort((a, b) =>
        (a.name || "").localeCompare(b.name || "")
      );
    } else if (sortOrder === "desc") {
      results = results.sort((a, b) =>
        (b.name || "").localeCompare(a.name || "")
      );
    }

    setFilteredData(results);
  }, [search, filterCity, sortOrder, teachers]);

  const handleDelete = (record) => {
    setCurrentTeacher(record);
    setIsDeleteModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await UserService.deleteUser(currentTeacher.key, user?.access_token);
      toast.success(`Đã xóa giảng viên: ${currentTeacher.name}`);
      setFilteredData((prev) =>
        prev.filter((item) => item.key !== currentTeacher.key)
      );
      setIsDeleteModalVisible(false);
    } catch {
      toast.error("Xóa giảng viên thất bại!");
    }
  };

  const handleEdit = (record) => {
    setCurrentTeacher(record);
    setEditedTeacherData({
      name: record.name,
      email: record.email,
      phone: record.phone,
      address: record.address,
      city: record.city,
    });
    setIsEditModalVisible(true);
  };

  const handleEditSubmit = async () => {
    try {
      await UserService.updateUser(
        currentTeacher.key,
        editedTeacherData,
        user?.access_token
      );
      toast.success("Đã cập nhật giảng viên");
      setFilteredData((prev) =>
        prev.map((item) =>
          item.key === currentTeacher.key
            ? { ...item, ...editedTeacherData }
            : item
        )
      );
      setIsEditModalVisible(false);
    } catch {
      toast.error("Cập nhật giảng viên thất bại!");
    }
  };

  const handleCreateTeacher = async () => {
    try {
      const payload = {
        ...newTeacherData,
        isTeacher: true,
      };
      const res = await UserService.createTeacher(payload);
      toast.success("Thêm giảng viên thành công!");
      setIsModalVisible(false);

      const addedTeacher = {
        key: res._id,
        name: res.name,
        email: res.email,
        phone: res.phone || "",
        address: res.address || "",
        city: res.city || "",
        avatar: res.avatar || "",
      };

      setTeachers((prev) => [...prev, addedTeacher]);
      setFilteredData((prev) => [...prev, addedTeacher]);
      setNewTeacherData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
      });
    } catch (error) {
      toast.error(error.message || "Thêm giảng viên thất bại!");
    }
  };

  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (text) => (
        <Avatar src={text} size={48} style={{ backgroundColor: "#87d068" }}>
          {!text && "GV"}
        </Avatar>
      ),
    },
    { title: "Tên giảng viên", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Điện thoại", dataIndex: "phone", key: "phone" },
    { title: "Thành phố", dataIndex: "city", key: "city" },
    { title: "Địa chỉ", dataIndex: "address", key: "address" },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <CenteredAction>
          <Tooltip title="Sửa">
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

  const cityOptions = [...new Set(teachers.map((s) => s.city).filter(Boolean))];

  return (
    <div style={{ padding: 24 }}>
      <PageHeader>
        <h2>Quản lý giảng viên</h2>
        <HeaderActions>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setCurrentTeacher(null);
              setIsModalVisible(true);
            }}
          >
            Thêm Giảng Viên
          </Button>
        </HeaderActions>
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
          onClick={() => {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
          }}
        >
          Sắp xếp {sortOrder === "asc" ? "↓ Z-A" : "↑ A-Z"}
        </Button>
      </FilterContainer>

      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 5 }}
        bordered
      />

      {/* Modal Thêm */}
      <TeacherForm
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onSubmit={handleCreateTeacher}
        newTeacherData={newTeacherData}
        setNewTeacherData={setNewTeacherData}
        isEdit={false}
      />

      {/* Modal Sửa */}
      <TeacherForm
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        onSubmit={handleEditSubmit}
        newTeacherData={editedTeacherData}
        setNewTeacherData={setEditedTeacherData}
        isEdit
      />

      {/* Modal Xác nhận xóa */}
      <Modal
        title="Xác nhận xóa"
        open={isDeleteModalVisible}
        onOk={handleConfirmDelete}
        onCancel={() => setIsDeleteModalVisible(false)}
        okText="Xóa"
        cancelText="Hủy"
      >
        <p>Bạn có chắc chắn muốn xóa giảng viên {currentTeacher?.name}?</p>
      </Modal>

      {/* Toastify Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
