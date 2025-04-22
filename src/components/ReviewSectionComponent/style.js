import styled from "styled-components";

// Tổng quan đánh giá
export const ReviewSummary = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 32px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

export const AverageScore = styled.div`
  flex: 1;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 48px;
    color: #ffa534;
    margin: 0;
    line-height: 1;
  }

  .star-row {
    display: flex;
    gap: 4px;
    margin: 8px 0;
  }

  .review-total {
    font-size: 14px;
    color: #555;
    white-space: nowrap;
    margin-top: 4px;
  }
`;


export const StarRow = styled.div`
  display: flex;
  justify-content: center;
  margin: 8px 0;
  gap: 4px;
`;

// Phân tích theo sao
export const RatingBreakdown = styled.div`
  flex: 2;
  min-width: 250px;
`;

export const RatingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;

  span {
    width: 80px;
    font-size: 14px;
  }
`;

export const Bar = styled.div`
  background: #eee;
  border-radius: 4px;
  height: 10px;
  flex: 1;
  overflow: hidden;
`;

export const Fill = styled.div`
  background: #ffa534;
  height: 100%;
`;

// Item đánh giá
export const ReviewItem = styled.div`
  display: flex;
  gap: 16px;
  background: #fff;
  padding: 16px;
  margin-bottom: 12px;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);

  img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
  }

  div {
    flex: 1;

    p {
      margin: 8px 0 4px;
    }

    strong {
      display: block;
    }
  }
`;

// Hành động: sửa / xoá
export const ActionButtons = styled.div`
  margin-top: 6px;
  display: flex;
  gap: 12px;
`;
