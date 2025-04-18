import React, { useEffect, useState } from "react";
import {
  WrapperBlogPage,
  MainContent,
  Sidebar,
  StyledCard,
  ArticleImage,
  Title,
  Excerpt,
  Section,
  PromoTitle,
} from "./style";
import { Typography } from "antd";
import * as BlogService from "../../services/BlogService";
import { useNavigate } from "react-router-dom";

const { Title: AntTitle } = Typography;

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    try {
      const res = await BlogService.getAllBlogs();
      const data = res?.data;

      if (Array.isArray(data)) {
        setBlogs(data);
        const allCategories = [...new Set(data.map((b) => b.category))];
        setCategories(allCategories);
      } else {
        setBlogs([]);
      }
    } catch (err) {
      console.error("Lỗi khi lấy blog:", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const getExcerpt = (text, length = 120) => {
    if (!text) return "";
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  return (
    <WrapperBlogPage>
      <MainContent>
        {blogs.map((item, index) => (
          <StyledCard
            key={index}
            hoverable
            onClick={() => navigate(`/blogs-detail/${item._id}`)}
          >
            <ArticleImage src={item.image} alt={item.title} />
            <Title>{item.title}</Title>
            <Excerpt>{getExcerpt(item.content)}</Excerpt>
          </StyledCard>
        ))}
      </MainContent>

      <Sidebar>
        <Section>
          <AntTitle level={4}>Bài viết gần đây</AntTitle>
          <ul>
            {blogs.slice(0, 5).map((a, i) => (
              <li key={i}>{a.title}</li>
            ))}
          </ul>
        </Section>

        <Section>
          <AntTitle level={4}>Chủ đề</AntTitle>
          <ul>
            {categories.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </Section>

        <div>
          <PromoTitle>Khoá học cờ vua trung cấp</PromoTitle>
        </div>
      </Sidebar>
    </WrapperBlogPage>
  );
};

export default BlogPage;
