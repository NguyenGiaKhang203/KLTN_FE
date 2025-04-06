import styled from "styled-components";

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;

  h2 {
    font-size: 20px;
    font-weight: bold;
    color: #1f1f1f;
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
`;

export const CenteredAction = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

// Custom styled tag cho trạng thái học viên
export const StatusTag = styled.span`
  display: inline-block;
  padding: 2px 10px;
  margin-left: 8px;
  font-size: 12px;
  font-weight: 500;
  border-radius: 10px;
  background-color: ${(props) =>
    props.status === "Có mặt"
      ? "#e8f5e9"
      : props.status === "Vắng"
      ? "#ffebee"
      : "#eeeeee"};
  color: ${(props) =>
    props.status === "Có mặt"
      ? "#2e7d32"
      : props.status === "Vắng"
      ? "#c62828"
      : "#555"};
  border: 1px solid
    ${(props) =>
      props.status === "Có mặt"
        ? "#81c784"
        : props.status === "Vắng"
        ? "#ef5350"
        : "#ccc"};
`;
