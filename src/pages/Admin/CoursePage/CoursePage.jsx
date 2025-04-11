import { useState, useEffect } from 'react';
import { Table, Button, Image, Space, Tooltip, Input, Select, Modal } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { toast, ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';

import { PageHeader, FilterContainer, HeaderActions, FilterLeft } from './style';
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
  const [sortOrder, setSortOrder] = useState('');
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

  const user = useSelector((state) => state.user);
  const token = user?.access_token;

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

  const handleDelete = (record) => {
    setCourseToDelete(record);
    setIsDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    if (!token || !courseToDelete) return;
    try {
      await deleteCourse(courseToDelete._id, token);
      toast.success('Xóa khóa học thành công');
      fetchCourses();
    } catch (error) {
      toast.error('Xóa khóa học thất bại');
    } finally {
      setIsDeleteModalVisible(false);
      setCourseToDelete(null);
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (!token) {
        toast.error('Không tìm thấy token người dùng. Vui lòng đăng nhập lại.');
        return;
      }

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

  const filteredCourses = courses
    .filter((course) => {
      return (
        course.name?.toLowerCase().includes(search.toLowerCase()) &&
        (filterType ? course.type === filterType : true)
      );
    })
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else if (sortOrder === 'desc') {
        return b.name.localeCompare(a.name);
      }
      return 0;
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
      </PageHeader>

      <FilterContainer>
        <FilterLeft>
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
          <Button
            ghost
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          >
            Sắp xếp {sortOrder === 'asc' ? '↓ Z-A' : '↑ A-Z'}
          </Button>
        </FilterLeft>

        <HeaderActions>
          <Button type="primary" onClick={handleAdd}>
            + Thêm khóa học
          </Button>
        </HeaderActions>
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

      <Modal
        title="Xác nhận xoá khóa học"
        open={isDeleteModalVisible}
        onOk={confirmDelete}
        onCancel={() => setIsDeleteModalVisible(false)}
        okText="Xoá"
        cancelText="Huỷ"
        okType="danger"
      >
        <p>Bạn có chắc chắn muốn xoá khóa học "{courseToDelete?.name}" không?</p>
      </Modal>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default CoursePage;
