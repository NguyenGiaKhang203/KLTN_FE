import styled from "styled-components";
import { Card } from "antd";

export const Container = styled.div`
  padding: 40px 20px;
  margin-bottom: 100px;
  background: #fff;
`;

export const GradientCard = styled(Card)`
  background: linear-gradient(
    0deg,
    rgba(148, 255, 158, 1) 0%,
    rgba(60, 162, 231, 1) 100%,
    rgba(0, 95, 160, 1) 100%
  );
  border-radius: 16px !important;
  text-align: center;
  color: #558000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  height: 100%;

  .ant-card-body {
    padding: 30px 20px;
  }
`;

export const IconWrapper = styled.div`
  font-size: 36px;
  margin-bottom: 16px;
`;

export const Title = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 12px;
  color: #336600;
`;

export const Text = styled.p`
  font-size: 16px;
  margin: 4px 0;
`;
