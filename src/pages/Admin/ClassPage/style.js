import styled from "styled-components";

export const TableWrapper = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  overflow-x: auto;

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

  @media (max-width: 768px) {
    padding: 12px;
  }

  @media (max-width: 480px) {
    padding: 8px;
  }
`;

export const Toolbar = styled.div`
  margin-bottom: 16px;

  h2 {
    font-size: clamp(18px, 2.5vw, 24px);
    font-weight: 600;
    margin-bottom: 12px;
    color: #2a2a2a;
  }

  > div {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 12px;
    align-items: center;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .toolbar-actions {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;

    button {
      display: flex;
      align-items: center;
      gap: 6px;
    }
  }
`;