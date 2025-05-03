import styled from "styled-components";
import { Checkbox as AntCheckbox } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

export const PageContainer = styled.div`
  background: #f8f9fa;
  padding: 20px;
  min-height: 100vh;
`;

export const CardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const Title = styled.h2`
  text-align: center;
  font-weight: bold;
  margin-bottom: 20px;
  font-size: 24px;

  @media (max-width: 576px) {
    font-size: 20px;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const LeftSection = styled.div`
  flex: 3;
`;

export const RightSection = styled.div`
  flex: 1;
  background: #f6f6f6;
  padding: 20px;
  border-radius: 8px;
  height: fit-content;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 0.8fr 1fr 0.8fr auto;
  font-weight: 600;
  padding: 10px 0;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const ListOrder = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const ItemOrder = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 0.8fr 1fr 0.8fr auto;
  align-items: center;
  padding: 12px;
  background: #fdfdfd;
  border: 1px solid #ddd;
  border-radius: 8px;
  gap: 10px;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;
  }
`;

export const CourseInfo = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  width: 100%;

  > div {
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

export const Checkbox = styled(AntCheckbox)``;

export const CourseImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 180px;
    height: auto;
  }
`;

export const CourseName = styled.div`
  font-weight: 600;
  font-size: 14px;
  margin-top: 6px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const ClassNameText = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #333;
  text-align: center;

  @media (max-width: 768px) {
    margin-top: 8px;
  }
`;

export const CourseSchedule = styled.div`
  font-size: 13px;
  color: #666;
  line-height: 1.6;
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: center;

  @media (max-width: 768px) {
    margin-top: 6px;
  }
`;

export const CoursePrice = styled.div`
  font-weight: 700;
  color: #ff4040;
  font-size: 18px;

  @media (max-width: 768px) {
    font-size: 20px;
    margin-top: 6px;
  }
`;

export const DeleteIcon = styled(DeleteOutlined)`
  color: #ff4040;
  font-size: 20px;
  cursor: pointer;
  justify-self: center;

  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

export const TotalWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 20px;

  @media (max-width: 576px) {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
`;

export const TotalPrice = styled.div`
  font-size: 24px;
  color: #ff4040;

  @media (max-width: 576px) {
    font-size: 20px;
  }
`;

export const CheckoutButton = styled.button`
  background: #ff4040;
  color: white;
  width: 100%;
  padding: 12px;
  font-weight: bold;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 3px 6px rgba(255, 64, 64, 0.3);

  &:hover {
    opacity: 0.95;
  }
`;
