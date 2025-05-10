import styled from "styled-components";

export const PageContainer = styled.div`
  border-radius: 10px;
  padding: 24px;
  background: #f5f7fa;
  min-height: 100vh;
`;

export const FlexHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 16px;
  margin-bottom: 16px;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const TableWrapper = styled.div`
  background: #ffffff;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow-x: auto;

  .ant-table {
    border-radius: 8px;
  }

  .ant-table-thead > tr > th {
    background-color: #f5f5f5;
    text-align: center;
    font-weight: 600;
  }

  .ant-table-tbody > tr > td {
    text-align: center;
  }

  @media (max-width: 768px) {
    padding: 12px;
  }

  @media (max-width: 480px) {
    padding: 8px;
  }
`;

export const TitleText = styled.h2`
  font-size: clamp(20px, 2.5vw, 28px);
  font-weight: bold;
  margin-bottom: 16px;
  color: #333 !important;
  @media (max-width: 768px) {
    font-size: 22px;
  }
`;
    