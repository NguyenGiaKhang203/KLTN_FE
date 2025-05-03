import styled from "styled-components";

export const PageContainer = styled.div`
  padding: 24px;
  background-color: #f9f9f9;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 16px;
  }

  @media (max-width: 480px) {
    padding: 12px;
  }
`;

export const PageTitle = styled.h2`
  font-size: 22px;
  font-weight: 600;
  color: #222;
  margin-bottom: 20px;

  @media (max-width: 480px) {
    font-size: 18px;
    text-align: center;
  }
`;

export const StyledTableWrapper = styled.div`
  background: #fff;
  padding: 16px;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  overflow-x: auto;

  .ant-table {
    background-color: #fff;
  }

  .ant-table-thead > tr > th {
    background-color: #f0f2f5;
    font-weight: 600;
    color: #000;
    white-space: nowrap;
  }

  .ant-table-tbody > tr > td {
    color: #000;
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    padding: 12px;
  }

  @media (max-width: 480px) {
    padding: 8px;
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

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  @media (max-width: 480px) {
    gap: 8px;
  }
`;
