// TeacherPage.jsx
import { useState, useEffect } from "react";
import { Table, Input, Button, Tooltip, Avatar, Select, message } from "antd";
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

const { Option } = Select;
const sampleTeacher = [
  {
    key: "1",
    name: "Nguyễn Hoàng Minh",
    email: "teacher1@example.com",
    phone: "09091236829",
    address: "123 Đường ABC",
    city: "Đà Nẵng",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    key: "2",
    name: "Trần Thùy Linh",
    email: "teacher2@example.com",
    phone: "0903488776",
    address: "456 Đường XYZ",
    city: "Hồ Chí Minh",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
];

export default function TeacherPage() {
  const [search, setSearch] = useState("");
  const [filterCity, setFilterCity] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [filteredData, setFilteredData] = useState(sampleTeacher);

  useEffect(() => {
    let results = sampleTeacher.filter((teacher) => {
      const matchesSearch =
        teacher.name.toLowerCase().includes(search.toLowerCase()) ||
        teacher.email.toLowerCase().includes(search.toLowerCase()) ||
        teacher.phone.includes(search);
      const matchesCity = filterCity ? teacher.city === filterCity : true;
      return matchesSearch && matchesCity;
    });

    if (sortOrder === "asc") {
      results = results.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === "desc") {
      results = results.sort((a, b) => b.name.localeCompare(a.name));
    }

    setFilteredData(results);
  }, [search, filterCity, sortOrder]);

  const handleDelete = (record) => {
    message.success(`Đã xóa giảng viên: ${record.name}`);
    // TODO: Gọi API xóa thật ở đây
  };

  const handleEdit = (record) => {
    message.info(`Chỉnh sửa giảng viên: ${record.name}`);
    // TODO: Mở form hoặc modal chỉnh sửa thông tin
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
      title: "Tên giảng viên",
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

  const cityOptions = [...new Set(sampleTeacher.map((s) => s.city))];

  return (
    <div style={{ padding: 24 }}>
      <PageHeader>
        <h2>Quản lý giảng viên</h2>
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
    </div>
  );
}
