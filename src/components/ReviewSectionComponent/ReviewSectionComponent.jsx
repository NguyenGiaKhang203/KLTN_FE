import React, { useState, useEffect } from "react";
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
import axios from "axios";
import * as ReviewService from "../../services/ReviewService";
import * as UserService from "../../services/UserService";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ReviewSection = () => {
  const [reviews, setReviews] = useState([]);
  const [newRating, setNewRating] = useState(0);
  const [comment, setComment] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [ratingsBreakdown, setRatingsBreakdown] = useState({});
  const { id: courseId } = useParams();
  const user = useSelector((state) => state.user);
  const userId = user?.user?._id;

  // Function to format the createdAt time to something more readable
  const formatTimeAgo = (createdAt) => {
    const now = new Date();
    const diffInMs = now - new Date(createdAt);
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays < 1) return "Vừa xong";
    return `${diffInDays} ngày trước`;
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await ReviewService.getAllReviews(courseId);
        const data = response;
        setReviews(data || []); // Đảm bảo dữ liệu reviews được lấy đúng
        setAverageRating(data.averageRating || 0);
        setTotalReviews(data.totalReviews || 0);
        setRatingsBreakdown(data.ratingsBreakdown || {});
      } catch (error) {
        message.error("Không thể tải đánh giá.");
      }
    };
    fetchReviews();
  }, [courseId]);

  const handleSubmit = async () => {
    if (!comment || newRating === 0) {
      return message.warning("Vui lòng nhập đầy đủ nội dung và chọn sao đánh giá.");
    }

    try {
      if (editingId !== null) {
        // Update review: Sử dụng `editingId` thay vì `courseId`
        const updatedReview = {
          id: editingId, // Đây là ID của review, không phải courseId
          comment,
          rating: newRating,
        };

        const response = await ReviewService.updateReview(editingId, updatedReview); // Gọi API cập nhật bằng reviewId
        setReviews((prev) =>
          prev.map((r) => (r._id === editingId ? { ...r, comment, rating: newRating } : r))
        );
        message.success("Cập nhật đánh giá thành công!");
        setEditingId(null);
      } else {
        // Create new review
        const newReview = {
          userId,
          comment,
          rating: newRating,
        };

        const response = await ReviewService.createReview(courseId, newReview);
        const createdReview = response.data;

        setReviews((prev) => [createdReview, ...prev]);
        message.success("Gửi đánh giá thành công!");
      }

      setComment("");
      setNewRating(0);
    } catch (error) {
      message.error("Lỗi khi gửi đánh giá.");
    }
  };


  const handleEdit = (review) => {
    setComment(review.comment);
    setNewRating(review.rating);
    setEditingId(review._id);
  };

  const handleDelete = async (id) => {
    try {
      await ReviewService.deleteReview(id);  // Gọi API xóa đánh giá theo ID
      setReviews((prev) => prev.filter((r) => r._id !== id));  // Cập nhật lại danh sách đánh giá sau khi xóa
      message.success("Đã xoá đánh giá!");
    } catch (error) {
      message.error(error.response?.data?.message || "Lỗi khi xoá đánh giá.");
    }
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
        <p style={{ marginBottom: 8 }}>Đánh giá của bạn về khóa học:</p>
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

      <div style={{ marginTop: 24 }}>
        {reviews.map((review) => (
          <ReviewItem key={review._id}>
            <img src={review?.user?.avatar || "/default-avatar.png"} alt="avatar" />
            <div>
              <Rate disabled value={review.rating || 0} style={{ fontSize: 14 }} /> {/* Kiểm tra rating ở đây */}
              <p>{review.comment}</p>
              <strong>{review.user?.name || "Người dùng ẩn danh"}</strong>{" "}
              <span style={{ fontSize: 12, color: "#999" }}>
                {formatTimeAgo(review.createdAt)}
              </span>
              {/* Chỉ hiển thị nút sửa và xóa nếu người dùng hiện tại là người đã đánh giá */}
              {review.user?._id === userId && (
                <ActionButtons>
                  <Button size="small" type="link" onClick={() => handleEdit(review)}>
                    Sửa
                  </Button>
                  <Button size="small" danger type="link" onClick={() => handleDelete(review._id)}>
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
