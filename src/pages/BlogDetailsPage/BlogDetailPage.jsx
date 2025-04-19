import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBlogById } from "../../services/BlogService";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import { Button, Spin, Typography } from "antd";
import {
  BlogWrapper,
  BlogImage,
  BlogHeader,
  BlogTitle,
  BlogMeta,
  BlogContent,
  BackButton,
  LoadingContainer,
} from "./style";

const { Title, Paragraph } = Typography;

const BlogDetailPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const token = user?.access_token;

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await getBlogById(id, token);
        const blogData = res?.data;
        setBlog(blogData || null);
      } catch (err) {
        console.error("Lỗi khi tải bài viết:", err);
      }
    };

    if (id) fetchBlog();
  }, [id, token]);

  if (!blog) {
    return (
      <LoadingContainer>
        <Spin size="large" tip="Đang tải bài viết..." />
      </LoadingContainer>
    );
  }
  const formatBlogContent = (raw) => {
    const blocks = raw.split(/\n\s*\n/); // Tách theo khoảng trống dòng
    return blocks
      .map((block) => {
        const lines = block.split("\n");
        const title = `<strong>${lines[0]}</strong>`;
        const rest = lines
          .slice(1)
          .map((line) => `<p><b>${line.split(":")[0]}:</b> ${line.split(":")[1]}</p>`)
          .join("");
        return `<div class="event-item">${title}${rest}</div>`;
      })
      .join("");
  };
  return (
    <BlogWrapper>
      <BackButton type="link" onClick={() => navigate(-1)}>
        ← Quay lại
      </BackButton>

      <BlogTitle>{blog.title}</BlogTitle>

      <BlogMeta>
        {blog.author || "Admin"} –{" "}
        {blog.createdAt
          ? new Date(blog.createdAt).toLocaleDateString("vi-VN")
          : "Không rõ ngày"}
      </BlogMeta>

      {blog.image && <BlogImage src={blog.image} alt={blog.title} />}

      <BlogContent>
        <BlogContent>{parse(formatBlogContent(blog.content))}</BlogContent>
      </BlogContent>
    </BlogWrapper>

  );
};

export default BlogDetailPage;