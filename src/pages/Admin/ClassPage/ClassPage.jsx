import React, { useState } from 'react';
import { Table, Button, Space, Tooltip } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  AppstoreAddOutlined,
  UnorderedListOutlined,
  SortAscendingOutlined,
} from '@ant-design/icons';
import { TableWrapper, Toolbar } from './style';
import mockClassData from '../../../lib/mockdataClass';
import ClassForm from '../../../components/Admin/AdminClassForm/AdminClassForm';

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
    render: () => (
      <Space>
        <Tooltip title="Sửa">
          <EditOutlined style={{ color: '#1677ff', cursor: 'pointer' }} />
        </Tooltip>
        <Tooltip title="Xoá">
          <DeleteOutlined style={{ color: '#ff4d4f', cursor: 'pointer' }} />
        </Tooltip>
      </Space>
    ),
    width: 80,
  },
];

const ClassPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleCreateOrUpdate = (data) => {
    console.log('Submit form data:', data);
    setIsFormOpen(false);
  };

  return (
    <>
      <TableWrapper>
        <Toolbar>
          <Space>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsFormOpen(true)}
            >
              Thêm lớp
            </Button>
            <Button icon={<AppstoreAddOutlined />}>Thêm nhanh</Button>
            <Button icon={<UnorderedListOutlined />}>Danh mục hệ đào tạo</Button>
            <Button icon={<SortAscendingOutlined />}>Sắp xếp thứ tự</Button>
          </Space>
        </Toolbar>

        <Table
          columns={columns}
          dataSource={mockClassData}
          rowKey="id"
          pagination={false}
          rowClassName="table-row"
          size="middle"
        />
        <div className="table-footer">Tổng số: {mockClassData.length} kết quả</div>
      </TableWrapper>

      <ClassForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleCreateOrUpdate}
        initialValues={null}
        courses={[]}
        teachers={[]}
      />
    </>
  );
};

export default ClassPage;
