import React from "react";
import { Col } from "antd";
import {
  StyledWrapper,
  StyledTopSection,
  StyledLogo,
  StyledTitle,
  StyledParagraph,
  StyledDivider,
  StyledCarousel,
  CarouselImage,
  ReasonGrid,
  ReasonCard,
  ReasonImage,
  ReasonTitle,
  ReasonText,
} from "./style";
import logo from "../../assets/Logo1.png";
import image1 from "../../assets/About1.jpg";
import image2 from "../../assets/About2.jpg";
import image3 from "../../assets/About3.jpg";

// Icon assets
import targetIcon from "../../assets/target.png";
import programIcon from "../../assets/program.png";
import bookIcon from "../../assets/books.png";
import teacherIcon from "../../assets/teacher.png";
import timeIcon from "../../assets/clock.png";
import trophyIcon from "../../assets/trophy.png";

// Lý do chọn Daisy Chess
const reasons = [
  {
    title: "Tầm nhìn",
    text: "Daisy chú trọng đến đào tạo học viên theo hướng tư duy, giúp các bé chủ động suy nghĩ trên ý tưởng của các thầy cô.",
    image: targetIcon,
  },
  {
    title: "Chương trình học",
    text: "Chương trình học được tách nhỏ, phù hợp với những điểm yếu của các bạn nhỏ.",
    image: programIcon,
  },
  {
    title: "Tài liệu học",
    text: "Nguồn tài liệu học được lấy từ các cuốn sách cờ vua nổi tiếng nhất trên thế giới.",
    image: bookIcon,
  },
  {
    title: "Giáo viên",
    text: "Giáo viên tại CLB Daisy đều là các HLV Quốc Gia được cấp bởi liên đoàn cờ vua Việt Nam.",
    image: teacherIcon,
  },
  {
    title: "Thời gian học",
    text: "Thời gian học năng động, phù hợp với các bé.",
    image: timeIcon,
  },
  {
    title: "Học viên",
    text: "Với sự đào tạo của Daisy, rất nhiều học viên đã đạt nhiều thành tích tốt tại giải cấp tỉnh - quốc gia.",
    image: trophyIcon,
  },
];

const AboutPage = () => {
  return (
    <StyledWrapper>
      <StyledTopSection gutter={[32, 32]} align="middle">
        <Col xs={24} md={6}>
          <StyledLogo src={logo} alt="King Chess" />
        </Col>
        <Col xs={24} md={18}>
          <StyledTitle level={3}>Câu Lạc Bộ Cờ Vua King Chess.</StyledTitle>
          <StyledParagraph>
            CLB King Chess – là nơi đào tạo những "kỳ thủ" tương lai. Trong hiện
            tại, King Chess đã và đang là một trong những đơn vị đi đầu trong
            việc phát triển cờ vua học đường, tạo môi trường học tập và rèn
            luyện bổ ích cho các em học sinh.
          </StyledParagraph>
        </Col>
      </StyledTopSection>

      <StyledDivider orientation="center">
        Hình ảnh học viên King Chess
      </StyledDivider>

      <StyledCarousel autoplay dotPosition="bottom">
        {[image1, image2, image3].map((img, index) => (
          <CarouselImage key={index} src={img} alt={`Hoc vien ${index + 1}`} />
        ))}
      </StyledCarousel>

      <StyledDivider orientation="center">
        Tại sao lại chọn học tại King Chess?
      </StyledDivider>

      <ReasonGrid>
        {reasons.map((item, index) => (
          <ReasonCard key={index}>
            <ReasonImage src={item.image} alt={item.title} />
            <ReasonTitle>{item.title}</ReasonTitle>
            <ReasonText>{item.text}</ReasonText>
          </ReasonCard>
        ))}
      </ReasonGrid>

      <StyledDivider />
    </StyledWrapper>
  );
};

export default AboutPage;
