import { useState, useEffect } from 'react';
import { Table, Button, Image, Space, Tooltip, Input, Select } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { PageHeader, FilterContainer, HeaderActions } from './style';
import CourseForm from '../../../components/Admin/AdminCourseForm/AdminCourseForm';

const { Option } = Select;

const sampleCourses = [
  {
    key: '1',
    name: "Cờ vua nâng cao",
    type: "NÂNG CAO",
    teacher: "LÊ THỰC ANH",
    studentCount: 12,
    price: 1000000,
    discount: 10,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1601233747798-4c4b7e1e4c3f?auto=format&fit=crop&w=80&q=80"
  },
  {
    key: '2',
    name: "Cờ vua nhập môn",
    type: "NHẬP MÔN",
    teacher: "LÊ VĂN MINH",
    studentCount: 9,
    price: 800000,
    discount: 0,
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=80&q=80"
  }
];

const CoursePage = () => {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterTeacher, setFilterTeacher] = useState('');
  const [typeOptions, setTypeOptions] = useState([]);
  const [teacherOptions, setTeacherOptions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setTypeOptions(['NHẬP MÔN', 'NÂNG CAO', 'TRUNG CẤP']);
      setTeacherOptions(['LÊ THỰC ANH', 'LÊ VĂN MINH']);
    }, 300);
  }, []);

  const handleAdd = () => {
    setSelectedCourse(null);
    setIsModalOpen(true);
  };

  const handleSubmit = (values) => {
    console.log('SUBMIT:', values);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const filteredCourses = sampleCourses.filter(course => {
    return (
      course.name.toLowerCase().includes(search.toLowerCase()) &&
      (filterType ? course.type === filterType : true) &&
      (filterTeacher ? course.teacher === filterTeacher : true)
    );
  });

  const columns = [
    {
      title: 'Ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (text) => <Image width={56} height={56} src={text} alt="course" style={{ objectFit: 'cover', borderRadius: 8 }} />,
    },
    {
      title: 'Tên khóa học',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Loại',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Giảng viên',
      dataIndex: 'teacher',
      key: 'teacher',
    },
    {
      title: 'Số học viên',
      dataIndex: 'studentCount',
      key: 'studentCount',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (text) => `${text.toLocaleString()}₫`
    },
    {
      title: 'Giảm giá',
      dataIndex: 'discount',
      key: 'discount',
      render: (text) => `${text}%`
    },
    {
      title: 'Đánh giá',
      dataIndex: 'rating',
      key: 'rating',
      render: (text) => `⭐ ${text}`
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Sửa">
            <Button icon={<EditOutlined />} type="link" onClick={() => console.log('Edit', record)} />
          </Tooltip>
          <Tooltip title="Xóa">
            <Button icon={<DeleteOutlined />} danger type="link" onClick={() => console.log('Delete', record)} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <PageHeader>
        <h2>Danh sách khóa học</h2>
        <HeaderActions>
          <Button type="primary" onClick={handleAdd}>+ Thêm khóa học</Button>
          <Button>Danh mục loại khóa</Button>
          <Button>Sắp xếp</Button>
        </HeaderActions>
      </PageHeader>

      <FilterContainer>
        <Input
          placeholder="Tìm kiếm theo tên khóa học"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 250 }}
        />
        <Select
          placeholder="Lọc theo loại"
          allowClear
          style={{ width: 200 }}
          value={filterType}
          onChange={(value) => setFilterType(value)}
        >
          {typeOptions.map((type) => (
            <Option key={type} value={type}>{type}</Option>
          ))}
        </Select>
        <Select
          placeholder="Lọc theo giảng viên"
          allowClear
          style={{ width: 200 }}
          value={filterTeacher}
          onChange={(value) => setFilterTeacher(value)}
        >
          {teacherOptions.map((t) => (
            <Option key={t} value={t}>{t}</Option>
          ))}
        </Select>
      </FilterContainer>

      <Table
        columns={columns}
        dataSource={filteredCourses}
        pagination={{ pageSize: 5 }}
        bordered
      />

      <CourseForm
        visible={isModalOpen}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        initialValues={selectedCourse}
        typeOptions={typeOptions}
        teacherOptions={teacherOptions}
      />
    </div>
  );
};

export default CoursePage;
