import styled from "styled-components";

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
