import styled from "styled-components";

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;

  h2 {
    font-size: clamp(18px, 2.5vw, 24px);
    font-weight: bold;
    color: #1f1f1f;
  }
`;

export const FilterContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 16px;
  margin-bottom: 24px;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FilterLeft = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 12px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;

  button {
    display: flex;
    align-items: center;
    gap: 6px;
  }
`;

export const TableWrapper = styled.div`
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-top: 16px;

  .ant-table {
    border-radius: 8px;
    overflow: hidden;
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
    overflow-x: auto;
  }
`;
    