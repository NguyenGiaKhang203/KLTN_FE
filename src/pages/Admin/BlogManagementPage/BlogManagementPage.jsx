import React, { useState, useEffect } from "react";
import { Table, Button, Image, Space, Tooltip, Input, Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

import {
  PageHeader,
  FilterContainer,
  HeaderActions,
  FilterLeft,
} from "./style";

import BlogForm from "../../../components/Admin/BlogForm/BlogForm";
import {
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../../../services/BlogService";

const BlogManagementPage = () => {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState(null);

  const { user } = useSelector((state) => state.user);
  const token = user?.access_token;

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const res = await getAllBlogs(token);
      setArticles(res.data || []);
    } catch (err) {
      toast.error("Lỗi khi tải danh sách bài viết");
    }
  };

  const handleAdd = () => {
    setSelectedArticle(null);
    setIsModalOpen(true);
  };

  const handleEdit = (record) => {
    setSelectedArticle(record);
    setIsModalOpen(true);
  };

  const handleDelete = (record) => {
    setArticleToDelete(record);
    setIsDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteBlog(articleToDelete._id, token);
      toast.success("Xóa bài viết thành công");
      fetchArticles();
    } catch (error) {
      toast.error("Xóa bài viết thất bại");
    } finally {
      setIsDeleteModalVisible(false);
      setArticleToDelete(null);
    }
  };

  const handleSubmit = async (values) => {
    
    try {
      if (!values.image || typeof values.image !== "string") {
        toast.error("Hình ảnh không hợp lệ hoặc chưa chọn ảnh");
        return;
      }
  
      if (selectedArticle) {
        await updateBlog(selectedArticle._id, values, token);
        toast.success("Cập nhật bài viết thành công!");
      } else {
        await createBlog(values, token);
        toast.success("Tạo bài viết thành công!");
      }
      console.log('🚀 ~ handleSubmit ~ values:', values)
      setIsModalOpen(false);
      fetchArticles();
      
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi lưu bài viết");
    }
  };
  
  
  

  const filteredArticles = articles.filter((article) =>
    article.title?.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (src) => (
        <Image
          width={64}
          height={64}
          src={src}
          alt="article"
          style={{ objectFit: "cover", borderRadius: 8 }}
        />
      ),
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content",
      render: (content) => (
        <div
          style={{
            maxHeight: 80,
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {content}
        </div>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space>
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
              type="link"
              danger
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
        <h2>Quản lý bài viết</h2>
      </PageHeader>

      <FilterContainer>
        <FilterLeft>
          <Input
            placeholder="Tìm kiếm theo tiêu đề"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: 250 }}
          />
        </FilterLeft>

        <HeaderActions>
          <Button type="primary" onClick={handleAdd}>
            + Thêm bài viết
          </Button>
        </HeaderActions>
      </FilterContainer>

      <Table
        columns={columns}
        dataSource={filteredArticles}
        rowKey="_id"
        pagination={{ pageSize: 5 }}
        bordered
      />

      <BlogForm
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialValues={selectedArticle}
      />

      <Modal
        title="Xác nhận xoá bài viết"
        open={isDeleteModalVisible}
        onOk={confirmDelete}
        onCancel={() => setIsDeleteModalVisible(false)}
        okText="Xoá"
        cancelText="Huỷ"
        okType="danger"
      >
        <p>
          Bạn có chắc chắn muốn xoá bài viết "
          <strong>{articleToDelete?.title}</strong>" không?
        </p>
      </Modal>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default BlogManagementPage;