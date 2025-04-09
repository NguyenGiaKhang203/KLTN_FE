import { useState, useEffect } from 'react';
import { Table, Button, Image, Space, Tooltip, Input, Select } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { PageHeader, FilterContainer, HeaderActions } from './style';
import CourseForm from '../../../components/Admin/AdminCourseForm/AdminCourseForm';
import {
  getAllCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} from '../../../services/CourseService';

const { Option } = Select;

const CoursePage = () => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('');
  const [typeOptions, setTypeOptions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await getAllCourse();
      const data = res.data || [];
      setCourses(data);

      const uniqueTypes = [...new Set(data.map((c) => c.type))];
      setTypeOptions(uniqueTypes);
    } catch (err) {
      toast.error('Lỗi khi tải danh sách khóa học');
    }
  };

  const handleAdd = () => {
    setSelectedCourse(null);
    setIsModalOpen(true);
  };

  const handleEdit = (record) => {
    setSelectedCourse(record);
    setIsModalOpen(true);
  };

  const handleDelete = async (record) => {
    try {
      const token = localStorage.getItem('access_token');
      await deleteCourse(record._id, token);
      toast.success('Xóa khóa học thành công');
      fetchCourses();
    } catch (error) {
      toast.error('Xóa khóa học thất bại');
    }
  };

  const handleSubmit = async (values) => {
    try {
      const token = localStorage.getItem('access_token');
      console.log('TOKEN:', token);
      if (selectedCourse) {
        await updateCourse(selectedCourse._id, values, token);
        toast.success('Cập nhật khóa học thành công!');
      } else {
        await createCourse(values, token);
        toast.success('Tạo khóa học thành công!');
      }
      setIsModalOpen(false);
      fetchCourses();
    } catch (error) {
      toast.error('Đã xảy ra lỗi khi lưu khóa học');
    }
  };

  const filteredCourses = courses.filter((course) => {
    return (
      course.name?.toLowerCase().includes(search.toLowerCase()) &&
      (filterType ? course.type === filterType : true)
    );
  });

  const columns = [
    {
      title: 'Ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (src) => (
        <Image
          width={56}
          height={56}
          src={src}
          alt="course"
          style={{ objectFit: 'cover', borderRadius: 8 }}
        />
      ),
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
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      render: (desc) => desc || 'Chưa có mô tả',
    },
    {
      title: 'Lớp',
      dataIndex: 'classes',
      key: 'classes',
      render: (classes) =>
        Array.isArray(classes) && classes.length > 0
          ? classes.map((cls, idx) => (
              <div key={idx}>{cls.name || `Lớp ${idx + 1}`}</div>
            ))
          : 'Chưa có lớp',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `${price?.toLocaleString()}₫`,
    },
    {
      title: 'Giảm giá',
      dataIndex: 'discount',
      key: 'discount',
      render: (discount) => `${discount}%`,
    },
    {
      title: 'Đánh giá',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating) => `⭐ ${rating}`,
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Sửa">
            <Button
              icon={<EditOutlined />}
              type="link"
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Button
              icon={<DeleteOutlined />}
              danger
              type="link"
              onClick={() => handleDelete(record)}
            />
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
          <Button type="primary" onClick={handleAdd}>
            + Thêm khóa học
          </Button>
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
            <Option key={type} value={type}>
              {type}
            </Option>
          ))}
        </Select>
      </FilterContainer>

      <Table
        columns={columns}
        dataSource={filteredCourses}
        rowKey="_id"
        pagination={{ pageSize: 5 }}
        bordered
      />

      <CourseForm
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialValues={selectedCourse}
      />
    </div>
  );
};

export default CoursePage;
