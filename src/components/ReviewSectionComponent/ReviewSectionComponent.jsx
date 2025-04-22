import React, { useState } from "react";
import { Rate, Input, Button, message } from "antd";
import { FaStar } from "react-icons/fa";
import {
  ReviewSummary,
  AverageScore,
  StarRow,
  RatingBreakdown,
  RatingRow,
  Bar,
  Fill,
  ReviewItem,
  ActionButtons,
} from "./style";
import mockReviews from "../../lib/mockdataReview";

const ReviewSection = () => {
  const { averageRating, totalReviews, ratingsBreakdown, reviews: initialReviews } = mockReviews;

  const [reviews, setReviews] = useState(initialReviews);
  const [newRating, setNewRating] = useState(0);
  const [comment, setComment] = useState("");
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = () => {
    if (!comment || newRating === 0) {
      return message.warning("Vui lòng nhập đầy đủ nội dung và chọn sao đánh giá.");
    }

    if (editingId !== null) {
      setReviews((prev) =>
        prev.map((r) =>
          r.id === editingId ? { ...r, comment, rating: newRating } : r
        )
      );
      message.success("Cập nhật đánh giá thành công!");
      setEditingId(null);
    } else {
      const newReview = {
        id: Date.now(),
        name: "Bạn",
        rating: newRating,
        comment,
        avatar: "https://i.pravatar.cc/50?u=me",
        timeAgo: "Vừa xong",
        isMine: true,
      };
      setReviews((prev) => [newReview, ...prev]);
      message.success("Gửi đánh giá thành công!");
    }

    setComment("");
    setNewRating(0);
  };

  const handleEdit = (review) => {
    setComment(review.comment);
    setNewRating(review.rating);
    setEditingId(review.id);
  };

  const handleDelete = (id) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
    message.success("Đã xoá đánh giá!");
  };

  return (
    <div>
      <h3>Cảm nhận & Đánh giá từ Học viên</h3>

      {/* ✅ PHẦN TỔNG SỐ ĐÁNH GIÁ */}
      <ReviewSummary>
      <AverageScore>
        <h1>{averageRating.toFixed(1)}</h1>
        <div className="star-row">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} color="#FFA534" />
          ))}
        </div>
        <div className="review-total">Tổng cộng {totalReviews} đánh giá</div>
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

      {/* ✅ PHẦN NHẬP ĐÁNH GIÁ ĐẶT Ở DƯỚI */}
      <div style={{ background: "#fafafa", padding: 16, borderRadius: 8, margin: "24px 0" }}>
        <p style={{ marginBottom: 8 }}>Đánh giá của bạn về khóa học:</p>
        <Rate value={newRating} onChange={setNewRating} />
        <Input.TextArea
          rows={3}
          placeholder="Chia sẻ cảm nhận của bạn..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{ margin: "12px 0" }}
        />
        <Button type="primary" onClick={handleSubmit}>
          {editingId !== null ? "Cập nhật đánh giá" : "Gửi đánh giá"}
        </Button>
      </div>

      {/* ✅ DANH SÁCH ĐÁNH GIÁ */}
      <div style={{ marginTop: 24 }}>
        {reviews.map((review) => (
          <ReviewItem key={review.id}>
            <img src={review.avatar} alt="avatar" />
            <div>
              <Rate disabled value={review.rating} style={{ fontSize: 14 }} />
              <p>{review.comment}</p>
              <strong>{review.name}</strong>{" "}
              <span style={{ fontSize: 12, color: "#999" }}>{review.timeAgo}</span>
              {review.isMine && (
                <ActionButtons>
                  <Button size="small" type="link" onClick={() => handleEdit(review)}>
                    Sửa
                  </Button>
                  <Button size="small" danger type="link" onClick={() => handleDelete(review.id)}>
                    Xoá
                  </Button>
                </ActionButtons>
              )}
            </div>
          </ReviewItem>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;
