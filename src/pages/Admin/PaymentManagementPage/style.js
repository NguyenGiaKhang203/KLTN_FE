import styled from 'styled-components';

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

export const HeaderActions = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;

  button {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  @media (max-width: 768px) {
    justify-content: center;
    width: 100%;
  }
`;

export const FilterContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 7fr;
  gap: 16px;
  margin-bottom: 24px;
  align-items: center;
    .ant-input {
    margin-right: 8px;
  }

  .ant-select {
    margin-right: 8px;
  }
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const TableWrapper = styled.div`
  background: #ffffff;
  border-radius: 8px;
  overflow-x: auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-top: 16px;

  .ant-table {
    border-radius: 8px;
    overflow: hidden;
    min-width: 800px;
  }

  .ant-table-thead > tr > th {
    background-color: #f5f5f5;
    text-align: center;
    font-weight: 600;
  }

  .ant-table-tbody > tr > td {
    text-align: center;
    vertical-align: middle;
    background-color: #ffffff;
  }

  @media (max-width: 1024px) {
    overflow-x: auto;
    .ant-table {
      min-width: 700px;
    }
  }

  @media (max-width: 768px) {
    margin-top: 8px;
    .ant-table {
      min-width: 600px;
    }
  }
`;