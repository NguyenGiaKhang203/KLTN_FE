import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  message,
  Tooltip,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import {
  PageContainer,
  FlexHeader,
  TableWrapper,
  TitleText,
} from "./style";
import * as NotificationService from "../../../services/NotificationService";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NotificationManagement = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const user = useSelector((state) => state.user);
  const token = user?.access_token;

  // 🚀 Lấy danh sách thông báo
  const fetchData = async () => {
    try {
      const response = await NotificationService.getAllNotification();
      if (response.status === "OK") {
        setData(response.data);
      } else {
        toast.error("Không thể tải danh sách thông báo");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi tải thông báo");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🚀 Thêm thông báo
  const handleAdd = () => {
    setEditingItem(null);
    form.resetFields();
    setModalOpen(true);
  };

  // 🚀 Sửa thông báo
  const handleEdit = (record) => {
    setEditingItem(record);
    form.setFieldsValue(record);
    setModalOpen(true);
  };

  // 🚀 Mở modal xác nhận xóa
  const handleDelete = (id) => {
    setDeleteId(id);
    setDeleteModalOpen(true);
  };

  // 🚀 Xác nhận xóa
  const confirmDelete = async () => {
    try {
      const response = await NotificationService.deleteNotification(deleteId, token)

      // 🚀 Kiểm tra nếu response trả về chỉ có message
      if (response.message && response.message.includes("thành công")) {
        toast.success(response.message,{
          position: "top-right",
        autoClose: 3000,      // ✅ Tự động đóng sau 3 giây
        closeButton: false,
        }); // 🟢 Thông báo thành công
        fetchData();
        
      } else {
        toast.error(response.message || "Xóa thông báo thất bại!",{
          position: "top-right",
          autoClose: 3000,
          closeButton: false,
        });
      }
    } catch (error) {
      console.error("Lỗi khi gọi API xóa:", error);
      toast.error("Xóa thông báo thất bại!",{
         position: "top-right",
        autoClose: 3000,
        closeButton: false,
      });
    } finally {
      setDeleteModalOpen(false);
    }
  };

  // 🚀 Lưu thông báo (Thêm hoặc Cập nhật)
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const now = new Date().toLocaleDateString();

      if (editingItem) {
        // Cập nhật thông báo
        await NotificationService.updateNotification(editingItem._id, values, token);
        toast.success("Cập nhật thông báo thành công!",{
          position: "top-right",
          autoClose: 3000,
          closeButton: false,
        });
      } else {
        // Tạo mới thông báo
        const newItem = {
          ...values,
          date: now,
        };
        await NotificationService.createNotification(newItem, token);
        toast.success("Thêm thông báo thành công!",{
          position: "top-right",
          autoClose: 3000,
          closeButton: false,
        });
      }

      setModalOpen(false);
      fetchData(); // 🚀 Load lại dữ liệu sau khi thêm/sửa
    } catch (error) {
      toast.error("Có lỗi xảy ra khi lưu thông báo",{
        position: "top-right",
        autoClose: 3000,
        closeButton: false,
      });
    }
  };

  // 🚀 Bộ lọc tìm kiếm
  const filteredData = Array.isArray(data)
    ? data.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.message.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // 🚀 Cấu trúc bảng
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
      title: "Hành động",
      key: "actions",
      width: 120,
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
          rowKey="_id"
          pagination={{ pageSize: 5 }}
        />
      </TableWrapper>

      <Modal
        title="Xác nhận xóa"
        open={deleteModalOpen}
        onOk={confirmDelete}
        onCancel={() => setDeleteModalOpen(false)}
        okText="Xóa"
        cancelText="Hủy"
      >
        <p>Bạn có chắc chắn muốn xóa thông báo này không?</p>
      </Modal>

      <Modal
        title={editingItem ? "Chỉnh sửa thông báo" : "Thêm thông báo"}
        open={modalOpen}
        centered
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

      {/* 🚀 ToastContainer đã cấu hình lại góc trên phải */}
      <ToastContainer
        position="top-right"
        autoClose={3000} // ✅ Tự động đóng sau 3 giây
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false} // ✅ Không tạm dừng khi mất focus
        draggable
        pauseOnHover={false}     // ✅ Không tạm dừng khi hover vào
        theme="colored"
      />

    </PageContainer>
  );
};

export default NotificationManagement;
