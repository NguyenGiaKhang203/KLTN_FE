import React from "react";
import "./style.css"; 
import Heroimg from "../../assets/Hero-img.jpg";
import ButtonComponent from "../ButtonComponent/ButtonComponent"; 

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>
          <span className="highlight">T-CHESS</span>
        </h1>
        <p>Nơi đào tạo những kỳ thủ tương lai</p>
        <p className="subtext">
          <em>25 năm hình thành và phát triển – Nhiều hoạt động trải nghiệm thú vị ❤️</em>
        </p>
        <ButtonComponent 
          size="large" 
          textbutton="HỌC THỬ NGAY" 
          styleButton={{
            background: "linear-gradient(to right, #3e8b6f, #d4e157)",
            borderRadius: "8px",
            border: "none",
            color: "white",
            padding: "10px 20px"
          }}
          styleTextButton={{
            fontSize: "18px",
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
