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
  const [sortAsc, setSortAsc] = useState(true);

  const token = localStorage.getItem('access-token');

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const data = await ClassService.getAllClasses(token);
      setClasses(data.data);
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
        await ClassService.updateClass(editingClass._id, formData, token);
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
      const data = await ClassService.getClassById(record._id, token);
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
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Giảng viên',
      dataIndex: 'teacher',
      render: (teacher) => teacher?.name || 'Chưa có',
    },
    {
      title: 'Lịch học',
      dataIndex: 'schedule',
      width: 150,
      render: (schedule) =>
        Array.isArray(schedule)
          ? (
              <div style={{ lineHeight: '1.8' }}>
                {schedule.map((s, index) => (
                  <div key={index}>
                    {s.day} ({s.startTime} - {s.endTime})
                  </div>
                ))}
              </div>
            )
          : '',
    },
    {
      title: 'Số học viên',
      dataIndex: 'studentCount',
      align: 'center',
    },
    {
      title: 'Hệ đào tạo',
      dataIndex: 'program',
      render: (program) => program || 'Chưa xác định',
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
            <Button icon={<UnorderedListOutlined />}>Danh mục hệ đào tạo</Button>
            <Button
              icon={<SortAscendingOutlined />}
              onClick={() => setSortAsc(!sortAsc)}
            >
              Sắp xếp {sortAsc ? 'A → Z' : 'Z → A'}
            </Button>
          </Space>
        </Toolbar>

        <Table
          columns={columns}
          dataSource={[...classes].sort((a, b) =>
            sortAsc
              ? a.name.localeCompare(b.name)
              : b.name.localeCompare(a.name)
          )}
          rowKey="_id"
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
        courses={[]} // Có thể truyền API course ở đây
        teachers={[]} // Có thể truyền API teacher ở đây
      />
    </>
  );
};

export default ClassPage;
