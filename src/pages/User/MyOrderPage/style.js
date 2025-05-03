import styled from "styled-components";

export const WrapperMyOrderPage = styled.div`
  padding: 40px;
  background-color: #f9f9f9;
  min-height: 80vh;

  @media (max-width: 768px) {
    padding: 24px;
  }

  @media (max-width: 480px) {
    padding: 16px;
  }
`;

export const PageTitle = styled.h2`
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 32px;

  @media (max-width: 480px) {
    font-size: 22px;
    margin-bottom: 24px;
  }
`;

export const OrderCard = styled.div`
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.1);
  margin-bottom: 32px;
  padding: 20px;
  border-left: 6px solid #1677ff;

  @media (max-width: 480px) {
    padding: 16px;
  }
`;

export const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 16px;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 6px;
    font-size: 13px;
  }
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

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const CourseImage = styled.img`
  width: 120px;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;

  @media (max-width: 480px) {
    width: 100%;
    height: auto;
  }
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

  @media (max-width: 480px) {
    font-size: 15px;
  }
`;

export const ScheduleText = styled.div`
  font-size: 13px;
  color: #555;
  margin-bottom: 4px;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export const CoursePrice = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #1677ff;
  margin-top: 6px;

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;
