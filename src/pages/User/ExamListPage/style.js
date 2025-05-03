import styled from "styled-components";

export const PageContainer = styled.div`
  padding: 24px;
  background: linear-gradient(to right, #f4f6f9, #e6f7ff);
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 16px;
  }

  @media (max-width: 480px) {
    padding: 12px;
  }
`;

export const StyledHeader = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #333;

  @media (max-width: 480px) {
    font-size: 20px;
    text-align: center;
  }
`;

export const StyledTableWrapper = styled.div`
  background-color: #fff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);

  @media (max-width: 768px) {
    padding: 20px;
  }

  @media (max-width: 480px) {
    padding: 16px;
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;

  span {
    font-weight: 500;
    color: #333;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

export const ExamContainer = styled.div`
  margin-top: 32px;
  padding: 24px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  animation: fadeIn 0.3s ease-in;

  h2 {
    font-size: 22px;
    font-weight: bold;
    color: #1f1f1f;
    margin-bottom: 24px;

    @media (max-width: 480px) {
      font-size: 18px;
      text-align: center;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(16px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    padding: 20px;
  }

  @media (max-width: 480px) {
    padding: 16px;
  }
`;

export const QuestionCard = styled.div`
  background-color: #f9f9ff;
  border: 1px solid #e0e0f0;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  transition: 0.3s ease;

  &:hover {
    border-color: #9254de;
    box-shadow: 0 4px 12px rgba(114, 46, 209, 0.12);
  }

  .question {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 12px;
    color: #333;

    @media (max-width: 480px) {
      font-size: 15px;
    }
  }

  .ant-radio-wrapper {
    font-size: 14px;
    color: #444;

    @media (max-width: 480px) {
      font-size: 13px;
    }
  }

  @media (max-width: 480px) {
    padding: 16px;
  }
`;
