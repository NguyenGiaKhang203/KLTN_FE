import styled from "styled-components";

export const PageContainer = styled.div`
  padding: 24px;
  background-color: #f9f9f9;
  min-height: 100vh;
`;

export const PageTitle = styled.h2`
  font-size: 22px;
  font-weight: 600;
  color: #222;
  margin-bottom: 20px;
`;

export const StyledTableWrapper = styled.div`
  background: #fff;
  padding: 16px;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);

  .ant-table {
    background-color: #fff;
  }

  .ant-table-thead > tr > th {
    background-color: #f0f2f5;
    font-weight: 600;
    color: #000;
  }

  .ant-table-tbody > tr > td {
    color: #000;
  }
`;

export const StyledHeader = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #333;
`;
