import { useState, useEffect } from 'react';
import { Table, Input, Select, Button, Tag } from 'antd';
import { SortAscendingOutlined } from '@ant-design/icons';
import { PageHeader, FilterContainer, HeaderActions, CenteredAction } from './style';

const { Option } = Select;

const samplePayments = [
  {
    key: '1',
    orderId: 'ORD123',
    studentName: 'Nguyễn Văn A',
    email: 'a@example.com',
    courseName: 'Cờ vua nâng cao',
    className: 'Lớp T3-5-7',
    amount: 1000000,
    status: 'paid',
    date: '2025-04-05',
  },
  {
    key: '2',
    orderId: 'ORD124',
    studentName: 'Trần Thị B',
    email: 'b@example.com',
    courseName: 'Cờ vua nhập môn',
    className: 'Lớp T2-4-6',
    amount: 800000,
    status: 'pending',
    date: '2025-04-06',
  },
];

export default function PaymentPage() {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [filteredData, setFilteredData] = useState(samplePayments);

  useEffect(() => {
    let results = samplePayments.filter((p) => {
      const matchSearch =
        p.studentName.toLowerCase().includes(search.toLowerCase()) ||
        p.email.toLowerCase().includes(search.toLowerCase()) ||
        p.orderId.toLowerCase().includes(search.toLowerCase());
      const matchStatus = filterStatus ? p.status === filterStatus : true;
      return matchSearch && matchStatus;
    });

    if (sortOrder === 'asc') {
      results.sort((a, b) => a.studentName.localeCompare(b.studentName));
    } else if (sortOrder === 'desc') {
      results.sort((a, b) => b.studentName.localeCompare(a.studentName));
    }

    setFilteredData(results);
  }, [search, filterStatus, sortOrder]);

  const columns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'orderId',
      key: 'orderId',
    },
    {
      title: 'Học viên',
      dataIndex: 'studentName',
      key: 'studentName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Khóa học',
      dataIndex: 'courseName',
      key: 'courseName',
    },
    {
      title: 'Lớp',
      dataIndex: 'className',
      key: 'className',
    },
    {
      title: 'Số tiền',
      dataIndex: 'amount',
      key: 'amount',
      render: (val) => `${val.toLocaleString()}₫`,
    },
    {
      title: 'Ngày thanh toán',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) =>
        status === 'paid' ? (
          <Tag color="green">Đã thanh toán</Tag>
        ) : (
          <Tag color="orange">Chờ xử lý</Tag>
        ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <PageHeader>
        <h2>Quản lý thanh toán</h2>
        <HeaderActions />
      </PageHeader>

      <FilterContainer>
        <Input
          placeholder="Tìm theo tên, email, mã đơn hàng"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 250 }}
        />
        <Select
          placeholder="Lọc theo trạng thái"
          allowClear
          style={{ width: 200 }}
          value={filterStatus}
          onChange={(value) => setFilterStatus(value)}
        >
          <Option value="paid">Đã thanh toán</Option>
          <Option value="pending">Chờ xử lý</Option>
        </Select>
        <Button icon={<SortAscendingOutlined />} ghost onClick={() =>
          setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
        }>
          Sắp xếp tên
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
