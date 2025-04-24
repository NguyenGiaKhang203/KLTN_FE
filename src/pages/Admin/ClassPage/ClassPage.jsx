import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Space,
  Tooltip,
  Modal,
  Input,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  UnorderedListOutlined,
  SortAscendingOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses } from '../../../redux/slices/courseSlice';
import { TableWrapper, Toolbar } from './style';
import ClassForm from '../../../components/Admin/AdminClassForm/AdminClassForm';
import * as ClassService from '../../../services/ClassService';
import * as UserService from '../../../services/UserService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ClassPage = () => {
  const dispatch = useDispatch();
  const courseList = useSelector((state) => state.course.courseList);
  const user = useSelector((state) => state.user);
  const token = user?.access_token;
  const [classes, setClasses] = useState([]);
  const [teacherList, setTeacherList] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sortAsc, setSortAsc] = useState(true);
  const [search, setSearch] = useState('');
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const fetchTeachers = async () => {
    if (!token) return;
    try {
      const res = await UserService.getAllUser(token);
      const teachers = res.data
        .filter((u) => u.isTeacher)
        .map((t) => ({
          _id: t._id,
          name: t.name,
        }));
      setTeacherList(teachers);
    } catch (error) {
      toast.error('Lỗi khi tải danh sách giảng viên');
    }
  };

  const fetchClasses = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const res = await ClassService.getAllClasses(token);
      const rawClasses = res.data;
  
      const mappedClasses = rawClasses.map((cls) => {
        let teacherName = 'Chưa có';
  
        // Nếu teacher là object và có name
        if (cls.teacher && typeof cls.teacher === 'object' && cls.teacher.name) {
          teacherName = cls.teacher.name;
        }
  
        // Nếu teacher là ID, tìm từ danh sách
        if (typeof cls.teacher === 'string') {
          const found = teacherList.find((t) => t._id === cls.teacher);
          if (found) teacherName = found.name;
        }
  
        return {
          ...cls,
          teacherName, // 👈 gán tên riêng để hiển thị
        };
      });
  
      setClasses(mappedClasses);
    } catch (error) {
      toast.error('Lỗi khi tải dữ liệu lớp học');
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    if (token) {
      dispatch(fetchCourses());
      fetchTeachers();
    }
  }, [token]);

  useEffect(() => {
    if (teacherList.length > 0) {
      fetchClasses();
    }
  }, [teacherList]);

  const handleCreateOrUpdate = async (formData) => {
    if (!token) return;
    try {
      if (editingClass) {
        await ClassService.updateClass(editingClass._id, formData, token);
        toast.success('Cập nhật lớp học thành công');
      } else {
        await ClassService.createClass(formData, token);
        toast.success('Tạo lớp học mới thành công');
      }
      setIsFormOpen(false);
      setEditingClass(null);
      fetchClasses();
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || 'Lỗi khi lưu lớp học';
      toast.error(errorMessage);
    }
  };
  

  const handleEdit = async (record) => {
    if (!token) return;
    try {
      const res = await ClassService.getClassById(record._id, token);
      const data = res.data;

      const firstSlot = data.schedule?.[0] || {};

      setEditingClass({
        ...data,
        teacher: data.teacher?._id,
        course: data.course?._id,
        schedule: data.schedule,
        startTime: firstSlot.startTime,
        endTime: firstSlot.endTime,
        students: data.studentCount || 0,
      });

      setIsFormOpen(true);
    } catch (error) {
      toast.error('Không thể lấy thông tin lớp học');
    }
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setIsDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await ClassService.deleteClass(deleteId, token);
      toast.success('Xoá lớp học thành công');
      fetchClasses();
    } catch (error) {
      toast.error('Lỗi khi xoá lớp học');
    } finally {
      setIsDeleteModalVisible(false);
      setDeleteId(null);
    }
  };

  const filteredClasses = classes
    .filter((cls) => cls.name?.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) =>
      sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );

  const columns = [
    {
      title: 'Tên lớp',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Giảng viên',
      dataIndex: 'teacherName',
      render: (name) => name || 'Chưa có',
    },
    {
      title: 'Lịch học',
      dataIndex: 'schedule',
      width: 150,
      render: (schedule) =>
        Array.isArray(schedule) ? (
          <div style={{ lineHeight: '1.8' }}>
            {schedule.map((s, i) => (
              <div key={i}>
                {s.day} ({s.startTime} - {s.endTime})
              </div>
            ))}
          </div>
        ) : '',
    },
    {
      title: 'Số học viên',
      dataIndex: 'students',
      align: 'center',
      render: (students) => students?.length || 0,
    },
    {
      title: 'Chương trình học',
      dataIndex: 'course',
      render: (course) => course?.name || 'Chưa xác định',
    },
    {
      title: 'Địa điểm học',
      dataIndex: 'address',
    },
    {
      title: 'Ngày bắt đầu',
      dataIndex: 'startDate',
      render: (date) => new Date(date).toLocaleDateString('vi-VN'),
    },
    {
      title: 'Ngày kết thúc',
      dataIndex: 'endDate',
      render: (date) => new Date(date).toLocaleDateString('vi-VN'),
    },
    {
      title: '',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Tooltip title="Sửa">
            <EditOutlined
              style={{ color: '#1677ff', cursor: 'pointer' }}
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
          <Tooltip title="Xoá">
            <DeleteOutlined
              style={{ color: '#ff4d4f', cursor: 'pointer' }}
              onClick={() => handleDelete(record._id)}
            />
          </Tooltip>
        </Space>
      ),
      width: 80,
    },
  ];

  return (
    <>
      <TableWrapper>
        <Toolbar>
          <h2>Danh sách lớp học</h2>
          <div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Input
                placeholder="Tìm kiếm theo tên lớp học"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: 250 }}
              />
              <Button
                icon={<SortAscendingOutlined />}
                onClick={() => setSortAsc(!sortAsc)}
              >
                Sắp xếp {sortAsc ? '↑ A–Z' : '↓ Z–A'}
              </Button>
            </div>
            <Space>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => {
                  setEditingClass(null);
                  setIsFormOpen(true);
                }}
              >
                Thêm lớp
              </Button>
              <Button icon={<UnorderedListOutlined />}>
                Danh mục hệ đào tạo
              </Button>
            </Space>
          </div>
        </Toolbar>

        <Table
          columns={columns}
          dataSource={filteredClasses}
          rowKey="_id"
          pagination={false}
          rowClassName="table-row"
          loading={loading}
          size="middle"
        />

        <div className="table-footer">
          Tổng số: {filteredClasses.length} kết quả
        </div>
      </TableWrapper>

      <ClassForm
        open={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingClass(null);
        }}
        onSubmit={handleCreateOrUpdate}
        initialValues={editingClass}
        courses={courseList}
        teachers={teacherList}
        rooms={[]}
      />

      <Modal
        title="Xác nhận xoá lớp học"
        open={isDeleteModalVisible}
        onOk={confirmDelete}
        onCancel={() => setIsDeleteModalVisible(false)}
        okText="Xoá"
        cancelText="Huỷ"
        okType="danger"
      >
        <p>Bạn có chắc chắn muốn xoá lớp học này không?</p>
      </Modal>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default ClassPage;
