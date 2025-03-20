import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import "./style.css";

const Slideshow = ({ featureImageList }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featureImageList.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featureImageList.length) % featureImageList.length);
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    },5000);

    return () => clearInterval(interval);
  },[currentSlide])
  return (
    <div className="slideshow-container">
      {featureImageList.map((slide, index) => (
        <img
          key={index}
          src={slide.image}
          alt="Slide"
          className={`slide ${index === currentSlide ? "active" : ""}`}
          onClick={() => navigate("/courses")}
        />
      ))}

      <button onClick={prevSlide} className="prev-button">
        <ChevronLeftIcon className="icon" />
      </button>

      <button onClick={nextSlide} className="next-button">
        <ChevronRightIcon className="icon" />
      </button>
    </div>
  );
};

export default Slideshow;