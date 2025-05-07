import styled from "styled-components";

export const PageHeader = styled.div`
  margin-bottom: 20px;

  h2 {
    font-size: 24px;
    font-weight: 600;
    color: #000;
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 20px;
    }
  }

  @media (max-width: 480px) {
    h2 {
      font-size: 18px;
    }
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;

  span {
    font-size: 14px;
    color: #000;
  }

  @media (max-width: 768px) {
    gap: 12px;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 8px;
  }
`;

export const StudentListWrapper = styled.div`
  background: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  color: #000;

  // text mặc định trong bảng, emptyText, p, h3
  p, span, h3, td, th {
    color: #000 !important;
  }

  @media (max-width: 768px) {
    padding: 12px;
  }

  @media (max-width: 480px) {
    padding: 8px;
  }
`;

export const SubSectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 16px;
  color: #000 !important;

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const CenteredAction = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

  @media (max-width: 768px) {
    margin-top: 16px;
  }

  @media (max-width: 480px) {
    margin-top: 12px;
  }
`;
