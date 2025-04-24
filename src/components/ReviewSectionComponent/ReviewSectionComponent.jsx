import React, { useState, useEffect } from "react";
import { Rate, Input, Button } from "antd";
import { ReviewItem, ActionButtons } from "./style";
import * as ReviewService from "../../services/ReviewService";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";  // Import toastify

const ReviewSection = () => {
  const [reviews, setReviews] = useState([]);
  const [newRating, setNewRating] = useState(0);
  const [comment, setComment] = useState("");
  const [editingId, setEditingId] = useState(null);
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
        const response = await ReviewService.getAllReviewsByCourseId(courseId);
        setReviews(response || []); // Đảm bảo dữ liệu reviews được lấy đúng
      } catch (error) {
        toast.error("Không thể tải đánh giá.");  // Using toast for error message
      }
    };
    fetchReviews();
  }, [courseId]);

  const handleSubmit = async () => {
    if (!comment || newRating === 0) {
      return toast.warning("Vui lòng nhập đầy đủ nội dung và chọn sao đánh giá.");
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
        toast.success("Cập nhật đánh giá thành công!");  // Success toast
        setEditingId(null);
      } else {
        // Create new review
        const newReview = {
          courseId,
          userId,
          comment,
          rating: newRating,
        };

        const response = await ReviewService.createReview(courseId, newReview);
        const createdReview = response;
        setReviews((prev) => [createdReview, ...prev]);
        toast.success("Gửi đánh giá thành công!");  // Success toast
      }
      setComment("");
      setNewRating(0);
    } catch (error) {
      const errorMessage = error?.message || "Lỗi khi gửi đánh giá.";  // Lấy thông báo lỗi từ server
      toast.error(errorMessage);
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
      toast.success("Đã xoá đánh giá!");  // Success toast
    } catch (error) {
      toast.error(error?.message || "Lỗi khi xoá đánh giá.");  // Error toast
    }
  };

  return (
    <div>
      <h3>Cảm nhận & Đánh giá từ Học viên</h3>
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
              <Rate disabled value={review.rating ?? 0} style={{ fontSize: 14 }} />
              <p>{review.comment}</p>
              <strong>{review.user?.name || "Người dùng ẩn danh"}</strong>
              <span style={{ fontSize: 12, color: "#999" }}>
                {formatTimeAgo(review.createdAt)}
              </span>
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
