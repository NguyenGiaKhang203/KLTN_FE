import styled from "styled-components";

export const WrapperCoursePage = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 24px;
  padding: 24px;
  background-color: #f3f6f9;
  min-height: 100vh;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const WrapperCourseContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const WrapperCourseHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    font-size: 20px;
    font-weight: bold;
  }

  span {
    color: #888;
    font-size: 14px;
    margin-right: 12px;
  }
`;

export const WrapperCourseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  padding: 16px;
`;

export const SortSelect = styled.select`
  padding: 6px 10px;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;
export const CenteredPagination = styled.div`
  display: flex;
  justify-content: center;
  margin: 7px 0px 0px 850px;
`;
