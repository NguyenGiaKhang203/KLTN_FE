import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Space,
  message,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  PageContainer,
  FlexHeader,
  TableWrapper,
  TitleText,
} from "./style";
import * as NotificationService from "../../../services/NotificationService";
import { useSelector } from "react-redux";

const { Option } = Select;

const NotificationManagement = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const user = useSelector((state) => state.user);
  const token = user?.access_token;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await NotificationService.getAllNotification();
        if (response.status === 'OK') {
          setData(response.data); 
        } else {
          message.error("Không thể tải danh sách thông báo");
        }
      } catch (error) {
        message.error("Có lỗi xảy ra khi tải thông báo");
      }
    };
  });

  const handleAdd = () => {
    setEditingItem(null);
    form.resetFields();
    setModalOpen(true);
  };

  const handleEdit = (record) => {
    setEditingItem(record);
    form.setFieldsValue(record);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await NotificationService.deleteNotification(id, token); // Sửa lại từ `editingItem._id` thành `id`
      setData((prev) => prev.filter((item) => item._id !== id));
      message.success("Xóa thông báo thành công");
    } catch (error) {
      message.error("Xóa thất bại");
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const now = new Date().toLocaleDateString();

      if (editingItem) {
        // Cập nhật thông báo
        const updated = await NotificationService.updateNotification(
          editingItem._id,
          values,
          token
        );

        setData((prev) =>
          prev.map((item) =>
            item._id === editingItem._id ? { ...item, ...updated } : item
          )
        );
        message.success("Cập nhật thông báo thành công");
      } else {
        // Tạo mới thông báo
        const newItem = {
          ...values,
          date: now,
        };

        const created = await NotificationService.createNotification(newItem, token);

        setData((prev) => [...prev, created]);
        message.success("Thêm thông báo thành công");
      }

      setModalOpen(false);
    } catch (error) {
      message.error(error.message || "Có lỗi xảy ra");
    }
  };

  const filteredData = Array.isArray(data)
    ? data.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.message.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : [];

  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (_, __, idx) => idx + 1,
      width: 70,
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
    },
    {
      title: "Nội dung",
      dataIndex: "message",
    },
    {
      title: "Ngày",
      dataIndex: "date",
      width: 120,
    },
    {
      title: "Hành động",
      key: "actions",
      width: 120,
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record._id)} // Sửa từ `record.id` thành `record._id`
          />
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <TitleText>Quản lý thông báo</TitleText>

      <FlexHeader>
        <Input.Search
          placeholder="Tìm kiếm thông báo..."
          allowClear
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: 300 }}
        />

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAdd}
          style={{ borderRadius: 8, fontWeight: 500 }}
        >
          Thêm thông báo
        </Button>
      </FlexHeader>

      <TableWrapper>
        <Table
          dataSource={filteredData}
          columns={columns}
          rowKey="_id" // Chắc chắn rằng bạn sử dụng đúng key (thường là _id hoặc id từ backend)
          pagination={{ pageSize: 5 }}
        />
      </TableWrapper>

      <Modal
        open={modalOpen}
        title={editingItem ? "Chỉnh sửa thông báo" : "Thêm thông báo"}
        onCancel={() => setModalOpen(false)}
        onOk={handleSubmit}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            label="Tiêu đề"
            name="title"
            rules={[{ required: true, message: "Nhập tiêu đề!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Nội dung"
            name="message"
            rules={[{ required: true, message: "Nhập nội dung!" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default NotificationManagement;
