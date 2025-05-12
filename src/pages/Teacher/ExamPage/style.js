import styled from "styled-components";
import { Input, Button } from "antd";

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }

  @media (max-width: 480px) {
    gap: 8px;
  }
`;

export const SearchInput = styled(Input)`
  width: 280px;
  height: 38px;

  @media (max-width: 768px) {
    width: 100%;
  }

  @media (max-width: 480px) {
    width: 100%;
    height: 36px;
  }
`;

export const StyledAddButton = styled(Button)`
  background-color: #1890ff;
  color: white;
  border: none;

  &:hover {
    background-color: #40a9ff !important;
    color: white !important;
  }

  @media (max-width: 768px) {
    width: 100%;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

export const EditIconButton = styled(Button)`
  padding: 0;
  border: none;
  background: none;
  color: #1890ff;

  &:hover {
    color: #40a9ff;
    background: none;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const DeleteIconButton = styled(Button)`
  padding: 0;
  border: none;
  background: none;
  color: #ff4d4f;

  &:hover {
    color: #ff7875;
    background: none;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;
export const UploadGuideContainer = styled.div`
  margin-top: 12px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  background-color: #fafafa;
  padding: 12px;
`;

export const GuideTitle = styled.p`
  margin-bottom: 8px;
  font-weight: bold;
  color: #1890ff;
`;

export const GuideList = styled.ul`
  margin-left: 16px;
`;

export const GuideItem = styled.li`
  margin-bottom: 8px;
`;

export const GuideCodeBlock = styled.pre`
  background-color: #f0f2f5;
  font-size:15px;
  padding: 8px;
  border-radius: 4px;
  white-space: pre;
  font-family: monospace;
  white-space: pre-wrap;
`;