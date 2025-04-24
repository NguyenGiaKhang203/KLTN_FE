import { useState, useEffect } from 'react';
import { Table, Input, Select, Button, Tag, message } from 'antd';
import { SortAscendingOutlined } from '@ant-design/icons';
import { PageHeader, FilterContainer, HeaderActions } from './style';
import * as OrderService from '../../../services/OrderService'; 
import * as ClassService from '../../../services/ClassService';
const { Option } = Select;

export default function PaymentPage() {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [classList, setClassList] = useState([]);
  const [filterClass, setFilterClass] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [rawData, setRawData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // Gọi API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await OrderService.getAllOrder();
        const data = response.data || [];
        console.log('data', data);

        const formattedData = data.map((item, index) => ({
          key: index,
          orderId: item._id,
          studentName: item.studentName || '', // hoặc fetch thêm từ user nếu có
          email: item.email,       // hoặc fetch thêm từ user nếu có
          className: item.orderItems?.map(i => i.name).join(', '),
          amount: item.totalPrice,
          status: 'paid',
          date: new Date(item.createdAt).toLocaleDateString('vi-VN'),
        }));
        console.log('formattedData', formattedData);

        setRawData(formattedData);
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
        message.error('Không thể tải dữ liệu đơn hàng');
      }
    };

    fetchData();
  }, []);

  // Lọc và sắp xếp
  useEffect(() => {
    let results = rawData.filter((p) => {
      const matchSearch =
        p.studentName.toLowerCase().includes(search.toLowerCase()) ||
        p.email.toLowerCase().includes(search.toLowerCase()) ||
        p.orderId.toLowerCase().includes(search.toLowerCase());
  
      const matchClass = filterClass ? p.className.includes(filterClass) : true;
  
      return matchSearch && matchClass;
    });
  
    if (sortOrder === 'asc') {
      results.sort((a, b) => a.studentName.localeCompare(b.studentName));
    } else if (sortOrder === 'desc') {
      results.sort((a, b) => b.studentName.localeCompare(a.studentName));
    }
  
    setFilteredData(results);
  }, [search, filterClass, sortOrder, rawData]);
  
  //Lấy dah sách lớp
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await ClassService.getAllClasses();
        setClassList(res.data || []);
      } catch (err) {
        console.error('Lỗi khi lấy danh sách lớp:', err);
      }
    };
    fetchClasses();
  }, []);

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
      title: 'Khóa học',
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
          value={filterClass || undefined} 
          placeholder="Lọc theo lớp học"
          allowClear
          style={{ width: 200 }}
          onChange={(value) => setFilterClass(value)}
        >
          {classList.map((cls) => (
            <Option key={cls._id} value={cls.name}>
              {cls.name}
            </Option>
          ))}
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
