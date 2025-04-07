import React from "react";
import {
  WrapperCourseCard,
  WrapperThumbnail,
  WrapperBadge,
  WrapperContent,
  WrapperRating,
  WrapperScore,
  WrapperTitle,
  WrapperMeta,
  WrapperInstructor,
  WrapperFooter,
  WrapperPrice,
  WrapperOldPrice,
  WrapperNewPrice,
  WrapperBuyButton,
  WrapperRate,
} from "./style";

function CourseCardComponent({ course, handleAddToCart, onClick }) {
  return (
    <WrapperCourseCard>
      {/* Hình thumbnail và badge */}
      <WrapperThumbnail onClick={onClick} style={{ cursor: "pointer" }}>
        <img src={course.imageUrl || course.image} alt={course.name} />
        {course.badge && <WrapperBadge>{course.badge}</WrapperBadge>}
      </WrapperThumbnail>

      {/* Nội dung chính */}
      <WrapperContent>
        {/* Đánh giá */}
        <WrapperRating>
          <WrapperRate disabled allowHalf defaultValue={course.rating || 0} />
          <WrapperScore>{(course.rating || 0).toFixed(1)}</WrapperScore>
        </WrapperRating>

        {/* Tên khóa học */}
        <WrapperTitle
          title={course.name}
          onClick={onClick}
          style={{ cursor: "pointer" }}
        >
          {course.name}
        </WrapperTitle>

        {/* Meta */}
        <WrapperMeta>
          <span>👤 {course.studentsCount || 0}</span>
          <span>⏱ {course.duration || "Không rõ"}</span>
        </WrapperMeta>

        {/* Giảng viên + danh mục */}
        <WrapperInstructor>
          Bởi <strong>{course.instructor || "Chưa cập nhật"}</strong> trong{" "}
          {course.categories || "Chưa có danh mục"}
        </WrapperInstructor>

        {/* Footer: Giá và nút mua */}
        <WrapperFooter>
          <WrapperPrice>
            {course.originalPrice && (
              <WrapperOldPrice>
                {course.originalPrice.toLocaleString()}₫
              </WrapperOldPrice>
            )}
            <WrapperNewPrice>{course.price.toLocaleString()}₫</WrapperNewPrice>
          </WrapperPrice>
          <WrapperBuyButton
            onClick={() => handleAddToCart(course.id, course.totalStock || 1)}
          >
            Mua khóa học
          </WrapperBuyButton>
        </WrapperFooter>
      </WrapperContent>
    </WrapperCourseCard>
  );
}

export default CourseCardComponent;