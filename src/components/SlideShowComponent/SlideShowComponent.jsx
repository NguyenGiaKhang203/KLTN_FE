import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import {
  SlideshowContainer,
  SlideImageWrapper,
  SlideImage,
  NavButton,
  IconWrapper,
} from "./style";

const Slideshow = ({ featureImageList }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featureImageList.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + featureImageList.length) % featureImageList.length
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []); // chỉ chạy 1 lần khi mount

  return (
    <SlideshowContainer>
      {featureImageList.map((slide, index) => (
        <SlideImageWrapper
          key={index}
          active={index === currentSlide}
          onClick={() => navigate("/courses")}
        >
          <SlideImage src={slide.image} alt={`Slide ${index + 1}`} />
        </SlideImageWrapper>
      ))}

      <NavButton onClick={prevSlide} position="left">
        <IconWrapper>
          <ChevronLeftIcon />
        </IconWrapper>
      </NavButton>

      <NavButton onClick={nextSlide} position="right">
        <IconWrapper>
          <ChevronRightIcon />
        </IconWrapper>
      </NavButton>
    </SlideshowContainer>
  );
};

export default Slideshow;
