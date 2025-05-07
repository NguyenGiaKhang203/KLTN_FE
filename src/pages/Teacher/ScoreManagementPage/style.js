import styled from "styled-components";

export const PageHeader = styled.div`
  margin-bottom: 20px;

  h2 {
    font-size: clamp(20px, 2.5vw, 28px);
    font-weight: 600;
    color: #000;
  }
`;

export const FilterContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
  align-items: center;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`;

export const TableWrapper = styled.div`
  background: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  color: #000;
  overflow-x: auto;

  .ant-table {
    min-width: 600px;
    border-radius: 8px;
  }

  .ant-table-thead > tr > th {
    background-color: #f5f5f5;
    font-weight: 600;
    color: #000;
    text-align: center;
  }

  .ant-table-tbody > tr > td {
    color: #000;
    text-align: center;
    vertical-align: middle;
  }

  @media (max-width: 768px) {
    padding: 12px;
  }

  @media (max-width: 480px) {
    padding: 8px;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  height: 100%;

  svg {
    font-size: clamp(14px, 2vw, 18px);
    cursor: pointer;
  }
`;
    
