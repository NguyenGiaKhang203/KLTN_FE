import { useState, useEffect } from "react";
import { Table, Input, Button, Tooltip, Avatar, Select, message, Modal, Form, Input as AntInput } from "antd";
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

const { Option } = Select;

export default function UserPage() {
  const [search, setSearch] = useState("");
  const [filterCity, setFilterCity] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  });
  const [form] = Form.useForm();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await UserService.getAllUser(user?.access_token);
        const userList = res.data.filter((u) => u.isTeacher)
          .map((user, index) => ({
            key: user._id || index,
            name: user.name,
            email: user.email,
            phone: user.phone || "",
            address: user.address || "",
            city: user.city || "",
            avatar: user.avatar || "",
          }));
        setUsers(userList);
        setFilteredData(userList);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách người dùng:", error);
        message.error("Không thể tải danh sách người dùng");
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    let results = users.filter((user) => {
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
      results = results.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    } else if (sortOrder === "desc") {
      results = results.sort((a, b) => (b.name || "").localeCompare(a.name || ""));
    }

    setFilteredData(results);
  }, [search, filterCity, sortOrder, users]);

  const handleDelete = (record) => {
    setEditingUser(record);
    setIsDeleteModalVisible(true);
  };

  const handleConfirmDelete = () => {
    message.success(`Đã xóa người dùng: ${editingUser.name}`);
    setIsDeleteModalVisible(false);
  };

  const handleEdit = (record) => {
    setEditingUser(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        if (editingUser) {
          message.success(`Chỉnh sửa người dùng: ${values.name}`);
          // TODO: Gọi API sửa người dùng ở đây
        } else {
          message.success(`Thêm người dùng: ${values.name}`);
          // TODO: Gọi API thêm người dùng ở đây
        }
        setIsModalVisible(false);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
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
    {
      title: "Tên người dùng",
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
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
    },
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

  const cityOptions = [...new Set(users.map((s) => s.city).filter(Boolean))];

  return (
    <div style={{ padding: 24 }}>
      <PageHeader>
        <h2>Quản lý người dùng</h2>
        <HeaderActions>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setEditingUser(null);
              form.resetFields();
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

      {/* Modal sửa và thêm giảng viên */}
      <Modal
        title={editingUser ? "Chỉnh sửa người dùng" : "Thêm người dùng"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleSave}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Tên"
            rules={[{ required: true, message: "Vui lòng nhập tên" }]}
          >
            <AntInput />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Vui lòng nhập email" }]}
          >
            <AntInput />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Điện thoại"
          >
            <AntInput />
          </Form.Item>
          <Form.Item
            name="address"
            label="Địa chỉ"
          >
            <AntInput />
          </Form.Item>
          <Form.Item
            name="city"
            label="Thành phố"
          >
            <AntInput />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal xác nhận xóa */}
      <Modal
        title="Xác nhận xóa"
        visible={isDeleteModalVisible}
        onOk={handleConfirmDelete}
        onCancel={() => setIsDeleteModalVisible(false)}
        okText="Xóa"
        cancelText="Hủy"
      >
        <p>Bạn có chắc chắn muốn xóa người dùng {editingUser?.name}?</p>
      </Modal>
    </div>
  );
}
