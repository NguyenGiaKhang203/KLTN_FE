import styled from "styled-components";
import { Card } from "antd";

export const Container = styled.div`
  padding: 60px 32px;
  margin-bottom: 100px;
  background: #fff;

  @media (max-width: 768px) {
    padding: 40px 24px;
    margin-bottom: 60px;
  }

  @media (max-width: 480px) {
    padding: 32px 16px;
    margin-bottom: 40px;
  }
`;

export const GradientCard = styled(Card)`
  background: linear-gradient(
    0deg,
    rgba(148, 255, 158, 1) 0%,
    rgba(60, 162, 231, 1) 100%,
    rgba(0, 95, 160, 1) 100%
  );
  border-radius: 20px !important;
  text-align: center;
  color: #558000;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  height: 100%;

  .ant-card-body {
    padding: 32px 24px;

    @media (max-width: 480px) {
      padding: 24px 16px;
    }
  }
`;

export const IconWrapper = styled.div`
  font-size: 44px;
  margin-bottom: 20px;
  color: #336600;

  @media (max-width: 768px) {
    font-size: 38px;
    margin-bottom: 16px;
  }

  @media (max-width: 480px) {
    font-size: 32px;
    margin-bottom: 12px;
  }
`;

export const Title = styled.h3`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 14px;
  color: #336600;

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

export const Text = styled.p`
  font-size: 16px;
  margin: 6px 0;
  color: #004d00;

  @media (max-width: 768px) {
    font-size: 15px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;
