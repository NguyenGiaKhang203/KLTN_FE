import React, { useEffect, useState } from "react";
import {
  WrapperBlogPage,
  MainContent,
  Sidebar,
  StyledCard,
  ArticleImage,
  Category,
  Title,
  Author,
  Excerpt,
  Section,
  PromoTitle,
} from "./style";
import { Typography } from "antd";
import * as BlogService from "../../services/BlogService";

const { Title: AntTitle } = Typography;

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchBlogs = async () => {
    try {
      const res = await BlogService.getAllBlogs();
      const data = res?.data; // Truy cập đúng mảng blog từ response
  
      if (Array.isArray(data)) {
        setBlogs(data);
        const allCategories = [...new Set(data.map((b) => b.category))];
        setCategories(allCategories);
      } else {
        console.warn("Dữ liệu blog không phải mảng:", data);
        setBlogs([]);
      }
    } catch (err) {
      console.error("Lỗi khi lấy blog:", err);
    }
  };
  

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <WrapperBlogPage>
      <MainContent>
        {Array.isArray(blogs) &&
          blogs.map((item, index) => (
            <StyledCard
              key={index}
              hoverable
              cover={<ArticleImage src={item.img} alt={item.title} />}
            >
              <Category>{item.category}</Category>
              <Title>{item.title}</Title>
              <Author>
                {item.author} / {item.date}
              </Author>
              <Excerpt>{item.excerpt}</Excerpt>
            </StyledCard>
          ))}
      </MainContent>

      <Sidebar>
        <Section>
          <AntTitle level={4}>Bài viết gần đây</AntTitle>
          <ul>
            {blogs.map((a, i) => (
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
