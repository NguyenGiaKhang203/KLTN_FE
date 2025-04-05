// StudentPage.jsx
import { useState, useEffect } from 'react';
import { Table, Input, Button, Space, Tooltip, Avatar, Select, message } from 'antd';
import { DeleteOutlined, SortAscendingOutlined } from '@ant-design/icons';
import { PageHeader, FilterContainer, HeaderActions, CenteredAction } from './style';

const { Option } = Select;

const sampleStudents = [
  {
    key: '1',
    name: 'Nguyễn Văn A',
    email: 'a@example.com',
    phone: '0909123456',
    address: '123 Đường ABC',
    city: 'Hà Nội',
    parentname: 'Nguyễn Văn B',
    avatar: 'https://i.pravatar.cc/150?img=3'
  },
  {
    key: '2',
    name: 'Trần Thị B',
    email: 'b@example.com',
    phone: '0909988776',
    address: '456 Đường XYZ',
    city: 'Hồ Chí Minh',
    parentname: 'Trần Văn C',
    avatar: ''
  }
];

export default function StudentPage() {
  const [search, setSearch] = useState('');
  const [filterCity, setFilterCity] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [filteredData, setFilteredData] = useState(sampleStudents);

  useEffect(() => {
    let results = sampleStudents.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(search.toLowerCase()) ||
        student.email.toLowerCase().includes(search.toLowerCase()) ||
        student.phone.includes(search);
      const matchesCity = filterCity ? student.city === filterCity : true;
      return matchesSearch && matchesCity;
    });

    if (sortOrder === 'asc') {
      results = results.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === 'desc') {
      results = results.sort((a, b) => b.name.localeCompare(a.name));
    }

    setFilteredData(results);
  }, [search, filterCity, sortOrder]);

  const handleDelete = (record) => {
    message.success(`Đã xóa học viên: ${record.name}`);
    // TODO: Gọi API xóa thật ở đây
  };

  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (text) => (
        <Avatar src={text} size={48} style={{ backgroundColor: '#87d068' }}>
          {!text && 'HV'}
        </Avatar>
      ),
    },
    {
      title: 'Tên học viên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Điện thoại',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Thành phố',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Phụ huynh',
      dataIndex: 'parentname',
      key: 'parentname',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <CenteredAction>
          <Tooltip title="Xóa">
            <Button danger type="link" icon={<DeleteOutlined />} onClick={() => handleDelete(record)} />
          </Tooltip>
        </CenteredAction>
      ),
    },
  ];

  const cityOptions = [...new Set(sampleStudents.map((s) => s.city))];

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
            <Option key={city} value={city}>{city}</Option>
          ))}
        </Select>
        <Button icon={<SortAscendingOutlined />} ghost>Sắp xếp thứ tự</Button>
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
