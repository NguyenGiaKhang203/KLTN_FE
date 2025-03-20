import React from "react";
import "./style.css";
import {
  createFromIconfontCN,
  YoutubeFilled,
  HomeFilled,
  PhoneFilled,
} from "@ant-design/icons";
import { Space } from "antd";
import { WrapperTextFooter } from "./style";

const Footer = () => {
  const IconFont = createFromIconfontCN({
    scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js",
  });
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <h1>Daisy Chess</h1>
        </div>
        <p>Trực thuộc Liên đoàn cờ vua Đà Nẵng</p>
        <p>Top 100 CLB tốt nhất tại Đà Nẵng</p>
        <div className="social-icons">
          <Space>
            <IconFont className="icons-a" type="icon-facebook" />
            <YoutubeFilled style={{ fontSize: "20px" }} />
          </Space>
        </div>
      </div>
      <div className="footer-center">
        <h4>
          <span>
            <HomeFilled style={{ padding: "5px" }} />
          </span>
          Địa chỉ
        </h4>
        <p>50 Trường Chinh 1, Thanh Khê, Đà Nẵng.</p>
        <hr style={{}}></hr>
        <h4>
          <span>
            <PhoneFilled style={{ padding: "5px" }} />
          </span>
          Số điện thoại
        </h4>
        <p>0905112113 (Cô Huệ)</p>
        <p>0613998996 (Thấy Linh)</p>
      </div>
      <div className="footer-right">
        <h3>Trang liên quan</h3>
        <div className="footer-fight-link">
          <div>
            <WrapperTextFooter>Trang Chủ</WrapperTextFooter>
          </div>
          <div>
            <WrapperTextFooter>Khóa Học</WrapperTextFooter>
          </div>
          <div>
            <WrapperTextFooter>Thông tin CLB Daisy</WrapperTextFooter>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
