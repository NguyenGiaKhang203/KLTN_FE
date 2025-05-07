import React, { useState } from "react";
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

const { Option } = Select;

const NotificationManagement = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form] = Form.useForm();
  const [data, setData] = useState([]);

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

  const handleDelete = (id) => {
    setData((prev) => prev.filter((item) => item.id !== id));
    message.success("Xóa thông báo thành công");
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const now = new Date().toLocaleDateString();
      if (editingItem) {
        setData((prev) =>
          prev.map((item) =>
            item.id === editingItem.id ? { ...item, ...values } : item
          )
        );
        message.success("Cập nhật thông báo thành công");
      } else {
        const newItem = {
          ...values,
          id: Date.now(),
          date: now,
        };
        setData((prev) => [...prev, newItem]);
        message.success("Thêm thông báo thành công");
      }
      setModalOpen(false);
    });
  };

  const filteredData = selectedClass
    ? data.filter((item) => item.class === selectedClass)
    : data;

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
      dataIndex: "content",
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
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <TitleText>Quản lý thông báo</TitleText>
      <FlexHeader>
        <Select
          placeholder="Chọn lớp học"
          value={selectedClass}
          onChange={setSelectedClass}
          style={{ width: 200 }}
        >
          <Option value="">Tất cả lớp</Option>
          <Option value="lop1">Lớp 1</Option>
          <Option value="lop2">Lớp 2</Option>
        </Select>

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
          rowKey="id"
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
            name="content"
            rules={[{ required: true, message: "Nhập nội dung!" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            label="Lớp áp dụng"
            name="class"
            rules={[{ required: true, message: "Chọn lớp!" }]}
          >
            <Select placeholder="Chọn lớp">
              <Option value="lop1">Lớp 1</Option>
              <Option value="lop2">Lớp 2</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default NotificationManagement;
