import styled from "styled-components";

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  h2 {
    font-size: 22px;
    font-weight: 600;
    margin: 0;
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 20px;
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

  button {
    padding: 0 6px;
  }
`;