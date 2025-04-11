import React, { useEffect, useState } from "react";
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
  TabItem,
} from "./style";
import image from "../../assets/banner.png";
import ReviewSection from "../../components/ReviewSectionComponent/ReviewSectionComponent";
import ClassSelectModal from "../../components/ClassSelectModal/ClassSelectModal";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as CourseService from "../../services/CourseService";
import { addOrderProduct } from "../../redux/slices/orderSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CourseDetailPage = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [course, setCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("intro");

  const handleAddToCart = (selectedClass) => {
    if (!selectedClass || !course) {
      toast.error("Vui lòng chọn lớp học trước khi thêm vào giỏ hàng.");
      return;
    }

    try {
      const { courseId, classId, name, image, price, schedule } = selectedClass;

      dispatch(
        addOrderProduct({
          courseId,
          classId,
          name,
          image,
          price,
          schedule,
        })
      );

      toast.success("Đã thêm vào giỏ hàng!");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ:", error);
      toast.error("Thêm vào giỏ hàng thất bại. Vui lòng thử lại.");
    }
  };

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const res = await CourseService.getDetailsCourse(id);
        if (res?.data) {
          setCourse(res.data);
        }
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết khóa học:", error);
      }
    };

    if (id) {
      fetchCourseDetails();
    }
  }, [id]);

  if (!course) return <p>Đang tải chi tiết khóa học...</p>;

  return (
    <CourseContainer>
      <CourseHeader>
        <CourseTitle>{course.name}</CourseTitle>
        <CourseMeta>Danh mục: {course.type}</CourseMeta>
      </CourseHeader>

      <CourseContent>
        <CourseMain>
          <CourseImage src={course.image || image} alt="course" />

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

          {activeTab === "intro" ? (
            <div>
              <SectionTitle>Giới thiệu về khóa học</SectionTitle>
              <p>{course.description}</p>

              {course.highlights?.length > 0 && (
                <>
                  <SectionTitle>Điểm nổi bật</SectionTitle>
                  <BulletList>
                    {course.highlights.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </BulletList>
                </>
              )}

              {course.learnings?.length > 0 && (
                <>
                  <SectionTitle>Bạn sẽ học được gì?</SectionTitle>
                  <BulletList>
                    {course.learnings.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </BulletList>
                </>
              )}

              {course.lessons?.length > 0 && (
                <>
                  <SectionTitle>Nội dung khóa học</SectionTitle>
                  {course.lessons.map((item, index) => (
                    <LessonBox key={index}>
                      <span>{item}</span>
                      <span style={{ color: "#2d66f4" }}>❯</span>
                    </LessonBox>
                  ))}
                </>
              )}
            </div>
          ) : (
            <ReviewSection />
          )}
        </CourseMain>

        <CourseSidebar>
          <PriceBox>{course.price?.toLocaleString()}₫</PriceBox>
          <BuyButton onClick={() => setIsModalOpen(true)}>Mua khóa học</BuyButton>

          <InfoItem>📊 Trình độ: {course.level || "Không rõ"}</InfoItem>
          <InfoItem>🎓 {course.studentsCount || 0} Tổng số học viên</InfoItem>
          <InfoItem>⏱ {course.duration || "Không rõ"} Thời lượng</InfoItem>
          <InfoItem>🔁 {course.updatedAt?.slice(0, 10)} Cập nhật mới nhất</InfoItem>
          {course.hasCertificate && <InfoItem>🎖 Có chứng chỉ hoàn thành</InfoItem>}

          {course.materials && (
            <>
              <SectionTitle>Tài liệu khóa học</SectionTitle>
              <BulletList>
                {course.materials.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </BulletList>
            </>
          )}

          {course.requirements && (
            <>
              <SectionTitle>Yêu cầu kiến thức</SectionTitle>
              <BulletList>
                {course.requirements.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </BulletList>
            </>
          )}

          {course.targetAudience && (
            <>
              <SectionTitle>Đối tượng</SectionTitle>
              <BulletList>
                {course.targetAudience.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </BulletList>
            </>
          )}
        </CourseSidebar>
      </CourseContent>

      <ClassSelectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        course={course}
        onConfirm={handleAddToCart}
      />

      <ToastContainer position="top-right" autoClose={3000} />
    </CourseContainer>
  );
};

export default CourseDetailPage;
