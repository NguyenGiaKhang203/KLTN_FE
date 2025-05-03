import styled from "styled-components";
import { Button, Typography, List, Card } from "antd";

const { Title } = Typography;

export const Container = styled.div`
  max-width: 960px;
  margin: 40px auto;
  padding: 40px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 24px;
    margin: 24px 12px;
  }

  @media (max-width: 480px) {
    padding: 16px;
    margin: 16px 8px;
  }
`;

export const TestListContainer = styled.div`
  margin-bottom: 32px;

  ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 16px;

    li {
      flex: 1 1 45%;

      @media (max-width: 768px) {
        flex: 1 1 100%;
      }
    }
  }
`;

export const QuestionContainer = styled(Card)`
  margin-bottom: 24px;
  border-radius: 16px !important;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  padding: 20px;
  border: none;
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    padding: 16px;
  }

  @media (max-width: 480px) {
    padding: 12px;
  }
`;

export const OptionLabel = styled.label`
  display: block;
  margin-bottom: 12px;
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #f9f9f9;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s ease;

  &:hover {
    background-color: #e6f4ff;
    border-color: #4096ff;
  }

  input {
    margin-right: 12px;
    transform: scale(1.2);
  }

  @media (max-width: 480px) {
    font-size: 15px;
    padding: 10px 14px;
  }
`;

export const StyledButton = styled(Button)`
  margin-top: 24px;
  min-width: 160px;
  height: 44px;
  font-weight: 600;
  font-size: 16px;
  border-radius: 10px;

  @media (max-width: 480px) {
    width: 100%;
    font-size: 15px;
  }
`;

export const ResultContainer = styled.div`
  margin-top: 48px;
  padding: 32px;
  background-color: #f0f4f8;
  border-radius: 16px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    padding: 24px;
  }

  @media (max-width: 480px) {
    padding: 20px;
  }
`;

export const CustomTitle = styled(Title)`
  && {
    margin-bottom: 24px;
    color: #141414;
    font-weight: 700;
    font-size: 28px;

    @media (max-width: 480px) {
      font-size: 22px;
    }
  }
`;

export const StyledList = styled(List)`
  margin-top: 24px;
`;

export const CourseItemLink = styled(List.Item)`
  font-weight: 500;
  font-size: 16px;
  padding: 16px 20px;
  background-color: #ffffff;
  border-radius: 10px;
  margin-bottom: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease;

  &:hover {
    background-color: #e6f7ff;
  }

  a {
    color: #1677ff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 480px) {
    font-size: 15px;
    padding: 12px 16px;
  }
`;
