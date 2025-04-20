import styled from "styled-components";

export const WrapperMyOrderPage = styled.div`
  padding: 40px;
  background-color: #f9f9f9;
  min-height: 80vh;
`;

export const PageTitle = styled.h2`
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 32px;
`;

export const OrderCard = styled.div`
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.1);
  margin-bottom: 32px;
  padding: 20px;
  border-left: 6px solid #1677ff; /* nổi bật với viền xanh bên trái */
`;

export const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 16px;
`;

export const OrderContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const CourseItem = styled.div`
  display: flex;
  gap: 16px;
  background-color: #f0f7ff;
  border-radius: 8px;
  padding: 12px;
  align-items: flex-start;
  border: 1px solid #d6e4ff;
`;

export const CourseImage = styled.img`
  width: 120px;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
`;

export const CourseDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const CourseName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
`;

export const ScheduleText = styled.div`
  font-size: 13px;
  color: #555;
  margin-bottom: 4px;
`;

export const CoursePrice = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #1677ff;
  margin-top: 6px;
`;
