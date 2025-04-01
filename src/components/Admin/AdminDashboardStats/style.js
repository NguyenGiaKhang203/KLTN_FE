// DashboardStats.styles.js
import styled from 'styled-components';
import { Card } from 'antd';

export const StyledCard = styled(Card)`
  background-color: ${({ $bg }) => $bg};
  color: #fff;
  border: none;

  .ant-card-body {
    padding: 20px;
  }

  h2 {
    margin: 10px 0 0;
    font-size: 28px;
    color: #fff;
  }

  p {
    margin: 0;
    color: #fff;
    opacity: 0.95;
  }

  svg {
    font-size: 26px;
    opacity: 0.6;
  }
`;
