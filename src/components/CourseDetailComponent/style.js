import styled from "styled-components";
export const CourseContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

export const CourseHeader = styled.div`
  margin-bottom: 20px;
`;

export const CourseTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

export const CourseMeta = styled.div`
  color: #666;
  font-size: 14px;
`;

export const CourseContent = styled.div`
  display: flex;
  gap: 40px;
`;

export const CourseMain = styled.div`
  flex: 3;
`;

export const CourseSidebar = styled.div`
  flex: 1;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 20px;
  height: fit-content;
`;

export const CourseImage = styled.img`
  width: 100%;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

export const PriceBox = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const BuyButton = styled.button`
  background: #2d66f4;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 6px;
  width: 100%;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 20px;
`;

export const InfoItem = styled.div`
  margin: 6px 0;
`;

export const SectionTitle = styled.h3`
  margin-top: 24px;
  margin-bottom: 10px;
`;

export const BulletList = styled.ul`
  padding-left: 20px;
  margin-bottom: 16px;

  li {
    margin-bottom: 6px;
  }
`;

export const LessonBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 6px;
  margin-bottom: 8px;
`;

export const TabHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #ddd;
  margin-bottom: 24px;
  gap: 20px;
`;

export const TabItem = styled.div`
  padding-bottom: 8px;
  cursor: pointer;
  border-bottom: ${({ active }) => (active ? "2px solid #2d66f4" : "none")};
  color: ${({ active }) => (active ? "#2d66f4" : "#555")};
  font-weight: ${({ active }) => (active ? "600" : "500")};
`;
