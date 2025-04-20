import styled from "styled-components";

export const PageContainer = styled.div`
  padding: 24px;
  background: linear-gradient(to right, #f4f6f9, #e6f7ff);
  min-height: 100vh;
`;


export const StyledHeader = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #333;
`;

export const StyledTableWrapper = styled.div`
  background-color: #fff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);

  .ant-table {
    border-radius: 8px;
    overflow: hidden;
  }

  .ant-table-thead > tr > th {
    background-color: #e6f7ff;
    color: #0050b3;
    font-weight: bold;
    font-size: 15px;
    text-transform: uppercase;
  }

  .ant-table-tbody > tr > td {
    font-size: 14px;
    padding: 12px;
    color: #262626;
    border-bottom: 1px solid #f0f0f0;
    background-color: #fafcff;

    &:hover {
      background-color: #e6f7ff;
    }
  }

  .ant-tag {
    font-size: 13px;
    font-weight: 500;
    padding: 4px 8px;
    border-radius: 4px;
  }

  .ant-tag-green {
    background-color: #d9f7be;
    color: #389e0d;
  }

  .ant-tag-red {
    background-color: #ffd8bf;
    color: #cf1322;
  }

  .ant-tag-default {
    background-color: #f5f5f5;
    color: #595959;
  }

  .ant-btn-primary {
    background-color: #722ed1;
    border-color: #722ed1;
    font-weight: 600;
    box-shadow: 0 2px 4px rgba(114, 46, 209, 0.3);

    &:hover {
      background-color: #9254de;
      border-color: #9254de;
    }

    &:disabled {
      background-color: #f5f5f5;
      color: #999;
      border-color: #d9d9d9;
      box-shadow: none;
    }
  }
`;

export const TopBar = styled.div`
  margin-bottom: 16px;
  display: flex;
  justify-content: flex-start;
`;


export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  h2 {
    font-size: 22px;
    font-weight: 700;
    color: #1f1f1f;
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 24px;

  span {
    font-weight: 500;
    color: #333;
  }
`;

export const CenteredAction = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

export const StatusTag = styled.span`
  display: inline-block;
  padding: 4px 12px;
  font-size: 13px;
  font-weight: 500;
  border-radius: 12px;
  background-color: ${(props) =>
    props.status === "Có mặt"
      ? "#e8f5e9"
      : props.status === "Vắng"
      ? "#ffebee"
      : props.status === "Nghỉ phép"
      ? "#fff8e1"
      : "#eeeeee"};
  color: ${(props) =>
    props.status === "Có mặt"
      ? "#2e7d32"
      : props.status === "Vắng"
      ? "#c62828"
      : props.status === "Nghỉ phép"
      ? "#f9a825"
      : "#555"};
  border: 1px solid
    ${(props) =>
      props.status === "Có mặt"
        ? "#81c784"
        : props.status === "Vắng"
        ? "#ef5350"
        : props.status === "Nghỉ phép"
        ? "#ffd54f"
        : "#ccc"};
`;

export const StudentListWrapper = styled.div`
  margin-top: 32px;
  padding: 24px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
`;

export const SubSectionTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #1a1a1a !important; 
  margin-bottom: 12px;
  padding: 8px 12px;
  border-left: 4px solid #1677ff;
  border-radius: 4px;
`;
