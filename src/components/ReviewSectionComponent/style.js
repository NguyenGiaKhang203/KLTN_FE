import styled from "styled-components";

export const ReviewSummary = styled.div`
  display: flex;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 20px;
  gap: 20px;
  margin-top: 16px;
`;

export const AverageScore = styled.div`
  flex: 1;
  text-align: center;
`;

export const StarRow = styled.div`
  margin: 10px 0;
`;

export const RatingBreakdown = styled.div`
  flex: 2;
`;

export const RatingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 4px 0;
`;

export const Bar = styled.div`
  flex: 1;
  height: 8px;
  background: #eee;
  border-radius: 4px;
  overflow: hidden;
`;

export const Fill = styled.div`
  background: #fbbf24;
  height: 100%;
`;

export const ReviewItem = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px 0;
  border-top: 1px solid #eee;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }

  p {
    margin: 4px 0;
  }
`;
