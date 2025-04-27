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
`;

export const Title = styled.h2`
  text-align: center;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 30px;
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
`;

export const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 0.8fr 1fr 0.8fr auto;
  font-weight: 600;
  padding: 10px 0;
  align-items: center;
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
`;


export const CourseInfo = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;

  > div {
    display: flex;
    flex-direction: column;
  }
`;

export const Checkbox = styled(AntCheckbox)``;

export const CourseImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
`;

export const CourseName = styled.div`
  font-weight: 600;
  font-size: 14px;
  width: 150px;
`;

export const CourseSchedule = styled.div`
  font-size: 13px;
  color: #666;
  line-height: 1.6;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const CoursePrice = styled.div`
  font-weight: 700;
  color: #ff4040;
  font-size: 18px;
`;

export const DeleteIcon = styled(DeleteOutlined)`
  color: #ff4040;
  font-size: 20px;
  cursor: pointer;
`;

export const TotalWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 20px;
`;

export const TotalPrice = styled.div`
  font-size: 24px;
  color: #ff4040;
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
export const ClassNameText = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #333;
  text-align: center;
  display: flex;
  align-items: center;
`;
