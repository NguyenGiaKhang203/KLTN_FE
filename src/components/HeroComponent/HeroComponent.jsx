import React, { useState } from "react";
import "./style.css"; 
import Heroimg from "../../assets/Hero-img.jpg";
import ButtonComponent from "../ButtonComponent/ButtonComponent"; 

const Hero = () => {
  const [isHovered, setIsHovered]=useState(false);
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>
          <span className="highlight">T-CHESS</span>
        </h1>
        <div className="hero-description">
          <p className="subtext1">Nơi đào tạo những kỳ thủ tương lai</p>
          <p className="subtext">
            <em> Trung tâm cờ vua T– Nhiều hoạt động trải nghiệm thú vị ❤️</em>
          </p>
        </div>
        <ButtonComponent 
          size="large" 
          textbutton="HỌC THỬ NGAY" 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          styleButton={{
            background:"linear-gradient(90deg, rgba(148,255,158,1) 0%, rgba(60,162,231,1) 100%, rgba(0,95,160,1) 100%)",
            borderRadius: "8px",
            border: "none",
            color: "#313e32",
            padding: "10px 20px",
            transition: "all 1s ease-in-out",
            transform: isHovered ? "scale(1.1)":""
          }}
          styleTextButton={{
            fontSize: "20px",
            fontWeight: "bold"
          }}
        />
      </div>
      <div className="hero-image">
        <img src={Heroimg} alt="T-Chess Event" />
      </div>
    </section>
  );
};

export default Hero;
