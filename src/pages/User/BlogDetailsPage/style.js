import styled from "styled-components";
import { Button } from "antd";

export const BlogWrapper = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 24px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  color: #000;
`;

export const BlogTitle = styled.h1`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 8px;
  line-height: 1.3;
`;

export const BlogMeta = styled.div`
  font-size: 14px;
  color: #777;
  margin-bottom: 16px;
`;

export const BlogImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
  margin-bottom: 24px;
  object-fit: cover;
`;

export const BlogContent = styled.div`
  font-size: 16px;
  line-height: 1.8;
  color: #333;
  white-space: normal;

  .event-item {
    padding: 16px;
    border-left: 4px solid #1677ff;
    margin-bottom: 20px;
    background: #f9f9f9;
    border-radius: 8px;
  }

  .event-item p {
    margin: 4px 0;
  }

  .event-item strong {
    font-size: 17px;
    display: block;
    margin-bottom: 6px;
  }
`;


export const BackButton = styled(Button)`
  margin-bottom: 24px;
  padding-left: 0;
  font-size: 16px;
  color: #1677ff;
`;

export const LoadingContainer = styled.div`
  margin-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
