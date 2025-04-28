import styled from "styled-components";
import { Card } from "antd";

export const WrapperBlogPage = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 24px;
  padding: 35px 40px 200px 130px;
  background-color: #f3f6f9;
  min-height: 100vh;

  @media (max-width: 1024px) {
    padding: 30px;
    grid-template-columns: 2fr 1fr;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 20px;
  }
`;

export const MainContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
`;

export const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 12px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;

  .ant-card-body {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 16px;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  }
`;

export const ArticleImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${StyledCard}:hover & {
    transform: scale(1.05);
  }
`;

export const Title = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #111827;
  margin: 10px 0 6px 0;
  flex-grow: 0;
`;

export const Excerpt = styled.p`
  font-size: 14px;
  color: #6b7280;
  line-height: 1.6;
  margin-top: auto; /* đẩy excerpt xuống dưới cùng */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
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

    &:hover {
      text-decoration: underline;
    }
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
