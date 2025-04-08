import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Tooltip, message, Modal, Input } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  AppstoreAddOutlined,
  UnorderedListOutlined,
  SortAscendingOutlined,
} from '@ant-design/icons';
import { TableWrapper, Toolbar } from './style';
import ClassForm from '../../../components/Admin/AdminClassForm/AdminClassForm';
import * as ClassService from '../../../services/ClassService';

const ClassPage = () => {
  const [classes, setClasses] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [loading, setLoading] = useState(false);

  // Giảng viên modals & state
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editedTeacherData, setEditedTeacherData] = useState({});
  const [newTeacherData, setNewTeacherData] = useState({});
  const [currentTeacher, setCurrentTeacher] = useState(null);

  const token = localStorage.getItem('access-token');

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const data = await ClassService.getAllClasses(token);
      setClasses(data);
    } catch (error) {
      message.error('Lỗi khi tải dữ liệu lớp học');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleCreateOrUpdate = async (formData) => {
    try {
      if (editingClass) {
        await ClassService.updateClass(editingClass.id, formData, token);
        message.success('Cập nhật lớp học thành công');
      } else {
        await ClassService.createClass(formData, token);
        message.success('Tạo lớp học mới thành công');
      }
      setIsFormOpen(false);
      setEditingClass(null);
      fetchClasses();
    } catch (error) {
      message.error('Lỗi khi lưu lớp học');
    }
  };

  const handleEdit = async (record) => {
    try {
      const data = await ClassService.getClassById(record.id, token);
      setEditingClass(data);
      setIsFormOpen(true);
    } catch (error) {
      message.error('Không thể lấy thông tin lớp học');
    }
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Bạn có chắc chắn muốn xoá lớp học này?',
      okText: 'Xoá',
      cancelText: 'Huỷ',
      okType: 'danger',
      onOk: async () => {
        try {
          await ClassService.deleteClass(id, token);
          message.success('Xoá lớp học thành công');
          fetchClasses();
        } catch (error) {
          message.error('Lỗi khi xoá lớp học');
        }
      },
    });
  };

  const columns = [
    {
      title: '',
      dataIndex: 'checkbox',
      render: () => <input type="checkbox" />,
      width: 40,
    },
    {
      title: 'Tên lớp',
      dataIndex: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: 'Giảng viên',
      dataIndex: 'teacher',
    },
    {
      title: 'Giờ học',
      dataIndex: 'time',
    },
    {
      title: 'Thứ học',
      dataIndex: 'days',
      render: (days) => days.join(', '),
    },
    {
      title: 'Số học viên',
      dataIndex: 'students',
      align: 'center',
    },
    {
      title: 'Hệ đào tạo',
      dataIndex: 'program',
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
              onClick={() => handleDelete(record.id)}
            />
          </Tooltip>
        </Space>
      ),
      width: 80,
    },
  ];

  // Xử lý giảng viên (demo - bạn có thể kết nối với API riêng)
  const handleEditSubmit = () => {
    message.success('Đã cập nhật giảng viên!');
    setIsEditModalVisible(false);
  };

  const handleCreateTeacher = () => {
    message.success('Đã thêm giảng viên!');
    setIsModalVisible(false);
    setNewTeacherData({});
  };

  const handleConfirmDelete = () => {
    message.success('Đã xóa giảng viên!');
    setIsDeleteModalVisible(false);
  };

  return (
    <>
      <TableWrapper>
        <Toolbar>
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
            <Button icon={<AppstoreAddOutlined />} onClick={() => setIsModalVisible(true)}>
              Thêm nhanh
            </Button>
            <Button icon={<UnorderedListOutlined />}>Danh mục hệ đào tạo</Button>
            <Button icon={<SortAscendingOutlined />}>Sắp xếp thứ tự</Button>
          </Space>
        </Toolbar>

        <Table
          columns={columns}
          dataSource={classes}
          rowKey="id"
          pagination={false}
          rowClassName="table-row"
          loading={loading}
          size="middle"
        />
        <div className="table-footer">Tổng số: {classes.length} kết quả</div>
      </TableWrapper>

      <ClassForm
        open={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingClass(null);
        }}
        onSubmit={handleCreateOrUpdate}
        initialValues={editingClass}
        courses={[]} // Gợi ý: fetch từ API và truyền vào đây
        teachers={[]} // Gợi ý: fetch từ API và truyền vào đây
      />

      {/* Modal chỉnh sửa giảng viên */}
      <Modal
        title="Chỉnh sửa giảng viên"
        open={isEditModalVisible}
        onOk={handleEditSubmit}
        onCancel={() => setIsEditModalVisible(false)}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Input
          placeholder="Tên giảng viên"
          value={editedTeacherData.name}
          onChange={(e) =>
            setEditedTeacherData({ ...editedTeacherData, name: e.target.value })
          }
        />
        <Input
          placeholder="Email"
          value={editedTeacherData.email}
          onChange={(e) =>
            setEditedTeacherData({ ...editedTeacherData, email: e.target.value })
          }
        />
        <Input
          placeholder="Số điện thoại"
          value={editedTeacherData.phone}
          onChange={(e) =>
            setEditedTeacherData({ ...editedTeacherData, phone: e.target.value })
          }
        />
        <Input
          placeholder="Địa chỉ"
          value={editedTeacherData.address}
          onChange={(e) =>
            setEditedTeacherData({ ...editedTeacherData, address: e.target.value })
          }
        />
        <Input
          placeholder="Thành phố"
          value={editedTeacherData.city}
          onChange={(e) =>
            setEditedTeacherData({ ...editedTeacherData, city: e.target.value })
          }
        />
      </Modal>

      {/* Modal xác nhận xóa */}
      <Modal
        title="Xác nhận xóa"
        open={isDeleteModalVisible}
        onOk={handleConfirmDelete}
        onCancel={() => setIsDeleteModalVisible(false)}
        okText="Xóa"
        cancelText="Hủy"
      >
        <p>Bạn có chắc chắn muốn xóa giảng viên {currentTeacher?.name}?</p>
      </Modal>

      {/* Modal thêm giảng viên */}
      <Modal
        title="Thêm Giảng Viên"
        open={isModalVisible}
        onOk={handleCreateTeacher}
        onCancel={() => setIsModalVisible(false)}
        okText="Tạo mới"
        cancelText="Hủy"
      >
        <Input
          placeholder="Tên giảng viên"
          value={newTeacherData.name}
          onChange={(e) =>
            setNewTeacherData({ ...newTeacherData, name: e.target.value })
          }
        />
        <Input
          placeholder="Email"
          value={newTeacherData.email}
          onChange={(e) =>
            setNewTeacherData({ ...newTeacherData, email: e.target.value })
          }
        />
        <Input.Password
          placeholder="Mật khẩu"
          value={newTeacherData.password}
          onChange={(e) =>
            setNewTeacherData({ ...newTeacherData, password: e.target.value })
          }
        />
        <Input.Password
          placeholder="Xác nhận mật khẩu"
          value={newTeacherData.confirmPassword}
          onChange={(e) =>
            setNewTeacherData({ ...newTeacherData, confirmPassword: e.target.value })
          }
        />
        <Input
          placeholder="Số điện thoại"
          value={newTeacherData.phone}
          onChange={(e) =>
            setNewTeacherData({ ...newTeacherData, phone: e.target.value })
          }
        />
      </Modal>
    </>
  );
};

export default ClassPage;
