// src/pages/BlogPage.jsx

import React from "react";
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
  PromoImage,
  PromoTitle,
} from "./style";
import { articles, categories } from "../../lib/mockdatablog";
import { Typography } from "antd";

const { Title: AntTitle } = Typography;

const BlogPage = () => {
  return (
    <WrapperBlogPage>
      <MainContent>
        {articles.map((item, index) => (
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
            {articles.map((a, i) => (
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
