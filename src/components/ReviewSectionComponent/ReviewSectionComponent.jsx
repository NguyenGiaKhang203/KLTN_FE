import React from "react";
import { ReviewSummary, AverageScore, StarRow, RatingBreakdown, RatingRow, Bar, Fill, ReviewItem  } from "./style"
import { FaStar } from "react-icons/fa";
import mockReviews from "../../lib/mockdataReview";

const ReviewSection = () => {
  const { averageRating, totalReviews, ratingsBreakdown, reviews } = mockReviews;

  return (
    <div>
      <h3>Cảm nhận & Đánh giá từ Học viên</h3>
      <ReviewSummary>
        <AverageScore>
          <h1>{averageRating.toFixed(1)}</h1>
          <StarRow>
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} color="#FFA534" />
            ))}
          </StarRow>
          <div>Tổng cộng {totalReviews} Đánh giá</div>
        </AverageScore>

        <RatingBreakdown>
          {[5, 4, 3, 2, 1].map((star) => (
            <RatingRow key={star}>
              <span>⭐ {star}</span>
              <Bar>
                <Fill style={{ width: `${ratingsBreakdown[star] * 100}%` }} />
              </Bar>
              <span>{ratingsBreakdown[star]} đánh giá</span>
            </RatingRow>
          ))}
        </RatingBreakdown>
      </ReviewSummary>

      <div style={{ marginTop: 24 }}>
        {reviews.map((review) => (
          <ReviewItem key={review.id}>
            <img src={review.avatar} alt="avatar" />
            <div>
              <div style={{ display: "flex", gap: 4 }}>
                {[...Array(review.rating)].map((_, i) => (
                  <FaStar key={i} color="#FFA534" size={14} />
                ))}
              </div>
              <p>{review.comment}</p>
              <strong>{review.name}</strong>
              <span style={{ fontSize: 12, color: "#999" }}>
                {review.timeAgo}
              </span>
            </div>
          </ReviewItem>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;