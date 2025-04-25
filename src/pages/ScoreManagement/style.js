import styled from "styled-components";

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  h2 {
    margin: 0;
    font-size: 24px;
    font-weight: 600;
    color: #222;
  }
`;

export const FilterContainer = styled.div`
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 16px;

  .ant-select {
    min-width: 200px;
  }
`;

export const TableWrapper = styled.div`
  .ant-table {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  .ant-table-thead > tr > th {
    background: #f5f5f5;
    font-weight: 600;
  }

  .ant-btn {
    border-radius: 6px;
  }

  .ant-input-number {
    width: 100px;
  }
`;
