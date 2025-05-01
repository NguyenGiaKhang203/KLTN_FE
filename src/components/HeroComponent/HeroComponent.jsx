import React from "react";
import { useNavigate } from "react-router-dom";
import Heroimg from "../../assets/Hero-img.jpg";
import {
  WrapperHeroSection,
  WrapperHeroContent,
  HeroTitle,
  HighlightText,
  HeroDescription,
  SubText1,
  SubText,
  WrapperHeroImage,
  StyledPulseButton,
} from "./style";

const Hero = () => {
  const navigate = useNavigate();

  const handleTakeQuiz = () => {
    navigate("/suggest-course");
  };

  return (
    <WrapperHeroSection>
      <WrapperHeroContent>
        <HeroTitle>
          <HighlightText>KING–CHESS</HighlightText>
        </HeroTitle>
        <HeroDescription>
          <SubText1>Nơi đào tạo những kỳ thủ tương lai</SubText1>
          <SubText>
            <em>King–Chess Center – Many interesting experiences ❤️</em>
          </SubText>
        </HeroDescription>
        <StyledPulseButton onClick={handleTakeQuiz}>
          LÀM BÀI KHẢO SÁT
        </StyledPulseButton>
      </WrapperHeroContent>

      <WrapperHeroImage>
        <img src={Heroimg} alt="King Chess Event" />
      </WrapperHeroImage>
    </WrapperHeroSection>
  );
};

export default Hero;
