import styled from 'styled-components';

export const TableWrapper = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.04);

  .table-footer {
    margin-top: 16px;
    text-align: right;
    color: #555;
    font-size: 14px;
  }

  .ant-table {
    border-radius: 8px;
  }

  .table-row:hover {
    background-color: #f0faff !important;
  }

  .ant-table-thead > tr > th {
    background-color: #fafafa;
    font-weight: 600;
  }

  .ant-table-cell {
    vertical-align: middle;
  }
`;

export const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;

  .ant-btn {
    font-weight: 500;
  }
`;
