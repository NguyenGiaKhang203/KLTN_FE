// src/pages/PaymentPage/style.js
import styled from 'styled-components';

export const PageWrapper = styled.div`
  background: #f5f5fa;
  min-height: 100vh;
  padding: 40px 20px;
`;

export const LayoutContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const WrapperLeft = styled.div`
  width: 60%;
  padding: 24px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
`;

export const WrapperRight = styled.div`
  width: 35%;
  padding: 24px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
`;

export const WrapperInfo = styled.div`
  margin-bottom: 20px;
`;

export const Lable = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
`;

export const WrapperRadio = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const WrapperTotal = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
`;
