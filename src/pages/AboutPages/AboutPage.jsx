// src/pages/AboutPage.jsx
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
} from "./style";
// import logo from "../../assets/logo-daisy.png";
import image1 from "../../assets/About1.jpg";
import image2 from "../../assets/About2.jpg";
import image3 from "../../assets/About3.jpg";
import ContactInfo from "../../components/ContactInforComponent/ContactInfoComponent";

const AboutPage = () => {
  return (
    <StyledWrapper>
      <StyledTopSection gutter={[32, 32]} align="middle">
        <Col xs={24} md={6}>
          <StyledLogo src="" alt="Daisy Chess" />
        </Col>
        <Col xs={24} md={18}>
          <StyledTitle level={3}>Câu Lạc Bộ Cờ Vua Daisy Chess.</StyledTitle>
          <StyledParagraph>
            CLB Daisy – trực thuộc thành viên của Liên Đoàn Cờ Vua Đà Nẵng.
            Thành lập từ năm 2020 với hệ thống giảng viên và tổ chức giảng dạy,
            trải nghiệm. Tất cả đều được chứng nhận HLV Quốc Gia do Liên Đoàn Cờ
            Vua Việt Nam cấp.
          </StyledParagraph>
        </Col>
      </StyledTopSection>

      <StyledDivider orientation="center">
        Hình ảnh học viên Daisy
      </StyledDivider>

      <StyledCarousel autoplay dotPosition="bottom">
        {[image1, image2, image3].map((img, index) => (
          <CarouselImage key={index} src={img} alt={`Hoc vien ${index + 1}`} />
        ))}
      </StyledCarousel>

      <StyledDivider />

      <ContactInfo />
    </StyledWrapper>
  );
};

export default AboutPage;
