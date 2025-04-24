import styled from "styled-components";

export const PageHeader = styled.div`
  margin-bottom: 20px;

  h2 {
    font-size: 24px;
    font-weight: 600;
    color: #000;
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;

  span {
    font-size: 14px;
    color: #000;
  }
`;

export const TableWrapper = styled.div`
  background: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  color: #000;

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
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  height: 100%;

  svg {
    font-size: 18px;
    cursor: pointer;
  }
`;

