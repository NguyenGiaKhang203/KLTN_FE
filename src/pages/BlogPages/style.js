// src/pages/style.js
import styled from "styled-components";
import { Card } from "antd";

export const WrapperBlogPage = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 24px;
  padding: 35px 40px 200px 130px;
  background-color: #f3f6f9;
  min-height: 100vh;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const MainContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

export const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

// Dùng antd Card
export const StyledCard = styled(Card)`
  border-radius: 10px;
  overflow: hidden;
  transition: box-shadow 0.2s ease;

  .ant-card-body {
    padding: 16px;
  }

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

export const ArticleImage = styled.img`
  width: 100%;
  height: 140px;
  object-fit: cover;
`;

export const Category = styled.p`
  color: #1d4ed8;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 4px;
`;

export const Title = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin-top: 5px;
`;

export const Author = styled.p`
  font-size: 12px;
  color: #6b7280;
  margin: 4px 0;
`;

export const Excerpt = styled.p`
  font-size: 14px;
  color: #374151;
  line-height: 1.4;
  margin-top: 6px;
`;

export const Section = styled.div`
  h4 {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  ul {
    padding-left: 20px;
  }

  li {
    font-size: 14px;
    margin-bottom: 6px;
    color: #1d4ed8;
    cursor: pointer;
  }
`;

export const PromoImage = styled.img`
  width: 100%;
  border-radius: 8px;
`;

export const PromoTitle = styled.p`
  margin-top: 8px;
  color: #1e40af;
  font-weight: bold;
`;
