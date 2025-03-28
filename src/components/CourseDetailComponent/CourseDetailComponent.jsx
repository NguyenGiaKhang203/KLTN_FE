import React, { useState } from "react";
import {
  CourseContainer,
  CourseHeader,
  CourseTitle,
  CourseMeta,
  CourseContent,
  CourseMain,
  CourseSidebar,
  PriceBox,
  BuyButton,
  InfoItem,
  SectionTitle,
  BulletList,
  LessonBox,
  CourseImage,
  TabHeader,
  TabItem
} from "./style";
import image from "../../assets/banner.png";
import mockCourseDetail from "../../lib/mockdataSource";
import ReviewSection from "../ReviewSectionComponent/ReviewSectionComponent";
import ClassSelectModal from "../ClassSelectModal/ClassSelectModal";
const CourseDetailPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleAddToCart = (courseId, classId) => {
    // Gọi API thêm vào giỏ hàng tại đây
    console.log("Đã chọn:", courseId, classId);
    setIsModalOpen(false);
  };

  const course = mockCourseDetail;
  const [activeTab, setActiveTab] = useState("intro");

  return (
    <CourseContainer>
      <CourseHeader>
        <CourseTitle>{course.title}</CourseTitle>
        <CourseMeta>Danh mục: {course.categories.join(", ")}</CourseMeta>
      </CourseHeader>

      <CourseContent>
        <CourseMain>
          <CourseImage src={image} alt="course" />

          {/* Tabs */}
          <TabHeader>
            <TabItem
              active={activeTab === "intro"}
              onClick={() => setActiveTab("intro")}
            >
              Giới thiệu
            </TabItem>
            <TabItem
              active={activeTab === "review"}
              onClick={() => setActiveTab("review")}
            >
              Đánh giá
            </TabItem>
          </TabHeader>

          {/* Tab content */}
          {activeTab === "intro" ? (
            <div>
              <SectionTitle>Giới thiệu về khóa học</SectionTitle>
              <p>{course.description}</p>
              <BulletList>
                {course.highlights.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </BulletList>

              <SectionTitle>Bạn sẽ học được gì?</SectionTitle>
              <BulletList>
                {course.learnings.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </BulletList>

              <SectionTitle>Nội dung khóa học</SectionTitle>
              {course.lessons.map((item, index) => (
                <LessonBox key={index}>
                  <span>{item}</span>
                  <span style={{ color: "#2d66f4" }}>❯</span>
                </LessonBox>
              ))}
            </div>
          ) : (
            <ReviewSection />
          )}
        </CourseMain>

        <CourseSidebar>
          <PriceBox>{course.price.toLocaleString()}₫</PriceBox>
          <BuyButton onClick={() => setIsModalOpen(true)} >Mua khóa học</BuyButton>

          <InfoItem>📊 {course.level}</InfoItem>
          <InfoItem>🎓 {course.studentsCount} Tổng số học viên</InfoItem>
          <InfoItem>⏱ {course.duration} Thời lượng</InfoItem>
          <InfoItem>🔁 {course.lastUpdated} Cập nhật mới nhất</InfoItem>
          {course.hasCertificate && (
            <InfoItem>🎖 Certificate of completion</InfoItem>
          )}

          <SectionTitle>Tài liệu khóa học</SectionTitle>
          <BulletList>
            {course.materials.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </BulletList>

          <SectionTitle>Yêu cầu kiến thức</SectionTitle>
          <BulletList>
            {course.requirements.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </BulletList>

          <SectionTitle>Đối tượng</SectionTitle>
          <BulletList>
            {course.targetAudience.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </BulletList>
        </CourseSidebar>
      </CourseContent>
      <ClassSelectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        course={course}
        onConfirm={handleAddToCart}
      />
    </CourseContainer>
  );
};

export default CourseDetailPage;