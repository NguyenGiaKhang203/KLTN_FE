import React from "react";
import { useNavigate } from "react-router-dom";
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

function CourseCardComponent({ course, handleAddToCart }) {
  const navigate = useNavigate();

  const handleGoToDetails = () => {
    navigate(`/course-details/${course.id}`);
  };

  return (
    <WrapperCourseCard>
      <WrapperThumbnail onClick={handleGoToDetails} style={{ cursor: "pointer" }}>
        <img src={course.imageUrl} alt={course.name} />
        {course.badge && <WrapperBadge>{course.badge}</WrapperBadge>}
      </WrapperThumbnail>

      <WrapperContent>
        <WrapperRating>
          <WrapperRate disabled allowHalf defaultValue={course.rating} />
          <WrapperScore>{course.rating.toFixed(1)}</WrapperScore>
        </WrapperRating>

        <WrapperTitle
          title={course.name}
          onClick={handleGoToDetails}
          style={{ cursor: "pointer" }}
        >
          {course.name}
        </WrapperTitle>

        <WrapperMeta>
          <span>👤 {course.studentsCount}</span>
          <span>⏱ {course.duration}</span>
        </WrapperMeta>

        <WrapperInstructor>
          Bởi <strong>{course.instructor}</strong> trong{" "}
          {course.categories.join(", ")}
        </WrapperInstructor>

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
            onClick={() => handleAddToCart(course.id, course.totalStock)}
          >
            Mua khóa học
          </WrapperBuyButton>
        </WrapperFooter>
      </WrapperContent>
    </WrapperCourseCard>
  );
}

export default CourseCardComponent;
