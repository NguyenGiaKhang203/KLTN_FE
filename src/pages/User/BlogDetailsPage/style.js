import styled from "styled-components";
import { Button } from "antd";

export const BlogWrapper = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 32px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  color: #000;
  animation: fadeIn 0.5s ease;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 768px) {
    padding: 24px;
    margin: 20px 16px;
  }

  @media (max-width: 480px) {
    padding: 20px 16px;
    margin: 20px 12px;
  }
`;

export const BlogTitle = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 12px;
  line-height: 1.3;
  color: #111827;

  @media (max-width: 768px) {
    font-size: 26px;
  }

  @media (max-width: 480px) {
    font-size: 22px;
  }
`;

export const BlogMeta = styled.div`
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 20px;
`;

export const BlogImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    max-height: 300px;
  }
`;

export const BlogContent = styled.div`
  font-size: 17px;
  line-height: 1.8;
  color: #374151;

  .event-item {
    padding: 18px;
    border-left: 4px solid #1677ff;
    background: #f9f9f9;
    border-radius: 10px;
    margin-bottom: 24px;
  }

  .event-item p {
    margin: 6px 0;
  }

  .event-item strong {
    font-size: 18px;
    display: block;
    margin-bottom: 8px;
    color: #1d4ed8;
  }

  img {
    max-width: 100%;
    border-radius: 8px;
    margin: 20px 0;
  }
`;

export const BackButton = styled(Button)`
  margin-bottom: 24px;
  padding-left: 0;
  font-size: 16px;
  color: #1677ff;

  &:hover {
    color: #0958d9;
  }
`;

export const LoadingContainer = styled.div`
  margin-top: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
