import { useState, useEffect } from 'react';
import { Table, Input, Select, Button, Tag, message } from 'antd';
import { SortAscendingOutlined } from '@ant-design/icons';
import { PageHeader, FilterContainer, HeaderActions } from './style';
import * as OrderService from '../../../services/OrderService';
import * as CourseService from '../../../services/CourseService'; // 👈 đổi từ ClassService thành CourseService

const { Option } = Select;

export default function PaymentPage() {
  const [search, setSearch] = useState('');
  const [filterCourse, setFilterCourse] = useState('');
  const [courseList, setCourseList] = useState([]);
  const [sortOrder, setSortOrder] = useState('');
  const [rawData, setRawData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // Fetch đơn hàng
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await OrderService.getAllOrder();
        const data = response.data || [];

        const formattedData = data.map((item, index) => ({
          key: index,
          orderId: item._id,
          studentName: item.studentName || '',
          email: item.email,
          courseName: item.orderItems?.map(i => i.name).join(', '), // 👈 đổi tên thành courseName
          amount: item.totalPrice,
          status: 'paid',
          date: new Date(item.createdAt).toLocaleDateString('vi-VN'),
        }));

        setRawData(formattedData);
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
        message.error('Không thể tải dữ liệu đơn hàng');
      }
    };

    fetchData();
  }, []);

  // Fetch danh sách khoá học
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await CourseService.getAllCourse();
        setCourseList(res.data || []);
      } catch (err) {
        console.error('Lỗi khi lấy danh sách khoá học:', err);
      }
    };
    fetchCourses();
  }, []);

  // Lọc và sắp xếp
  useEffect(() => {
    let results = rawData.filter((p) => {
      const matchSearch =
        p.studentName.toLowerCase().includes(search.toLowerCase()) ||
        p.email.toLowerCase().includes(search.toLowerCase()) ||
        p.orderId.toLowerCase().includes(search.toLowerCase());

      const matchCourse = filterCourse ? p.courseName.includes(filterCourse) : true;

      return matchSearch && matchCourse;
    });

    if (sortOrder === 'asc') {
      results.sort((a, b) => a.studentName.localeCompare(b.studentName));
    } else if (sortOrder === 'desc') {
      results.sort((a, b) => b.studentName.localeCompare(a.studentName));
    }

    setFilteredData(results);
  }, [search, filterCourse, sortOrder, rawData]);

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
      title: 'Khoá học',
      dataIndex: 'courseName',
      key: 'courseName',
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
          value={filterCourse || undefined}
          placeholder="Lọc theo khoá học"
          allowClear
          style={{ width: 200 }}
          onChange={(value) => setFilterCourse(value)}
        >
          {courseList.map((course) => (
            <Option key={course._id} value={course.name}>
              {course.name}
            </Option>
          ))}
        </Select>
        <Button
          icon={<SortAscendingOutlined />}
          ghost
          onClick={() =>
            setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
          }
        >
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
