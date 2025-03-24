import React, { useState } from "react";
import Heroimg from "../../assets/Hero-img.jpg";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import {
  WrapperHeroSection,
  WrapperHeroContent,
  HeroTitle,
  HighlightText,
  HeroDescription,
  SubText1,
  SubText,
  WrapperHeroImage,
} from "./style";

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <WrapperHeroSection>
      <WrapperHeroContent>
        <HeroTitle>
          <HighlightText>T-CHESS</HighlightText>
        </HeroTitle>
        <HeroDescription>
          <SubText1>Nơi đào tạo những kỳ thủ tương lai</SubText1>
          <SubText>
            <em>Trung tâm cờ vua T – Nhiều hoạt động trải nghiệm thú vị ❤️</em>
          </SubText>
        </HeroDescription>
        <ButtonComponent
          size="large"
          textbutton="HỌC THỬ NGAY"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          styleButton={{
            background:
              "linear-gradient(90deg, rgba(148,255,158,1) 0%, rgba(60,162,231,1) 100%, rgba(0,95,160,1) 100%)",
            borderRadius: "8px",
            border: "none",
            color: "#313e32",
            padding: "20px 20px",
            transition: "all 1s ease-in-out",
            transform: isHovered ? "scale(1.1)" : "",
          }}
          styleTextButton={{
            fontSize: "20px",
            fontWeight: "bold",
          }}
        />
      </WrapperHeroContent>

      <WrapperHeroImage>
        <img src={Heroimg} alt="T-Chess Event" />
      </WrapperHeroImage>
    </WrapperHeroSection>
  );
};

export default Hero;
