import styled from "styled-components";

export const Container = styled.div`
  padding: 24px;
  background: #f5f7fa;
  min-height: 100vh;
`;

export const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin: 32px 0 16px;
  color: #333;
`;

export const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 24px;
`;
