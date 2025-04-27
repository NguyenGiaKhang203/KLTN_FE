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
import image from "../../../assets/banner.png";
import ReviewSection from "../../../components/ReviewSectionComponent/ReviewSectionComponent";
import ClassSelectModal from "../../../components/ClassSelectModal/ClassSelectModal";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as CourseService from "../../../services/CourseService";
import { addOrderProduct } from "../../../redux/slices/orderSlice";
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
      const {
        courseId,
        classId,
        name,
        className, // ✅ Lấy thêm className
        image,
        price,
        schedule
      } = selectedClass;

      console.log("selectedClass", selectedClass);

      dispatch(
        addOrderProduct({
          courseId,
          classId,
          name,
          className, // ✅ Gửi className vào Redux
          image,
          price,
          schedule
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
            </div>
          ) : (
            <ReviewSection />
          )}
        </CourseMain>

        <CourseSidebar>
          <PriceBox>{course.price?.toLocaleString()}₫</PriceBox>
          <BuyButton onClick={() => setIsModalOpen(true)}>Mua khóa học</BuyButton>

          <InfoItem>📚 Loại: {course.type || "Không rõ"}</InfoItem>
          <InfoItem>⏱ 2.5 tháng • 2 buổi/tuần</InfoItem>
          <InfoItem>🔁 {course.updatedAt?.slice(0, 10)} Cập nhật mới nhất</InfoItem>

          {course.hasCertificate && <InfoItem>🎖 Có chứng chỉ hoàn thành</InfoItem>}
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
