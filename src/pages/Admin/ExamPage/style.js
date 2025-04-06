// examStyle.js
import styled from "styled-components";

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;

  h2 {
    font-size: 20px;
    font-weight: bold;
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

export const CenteredAction = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;
