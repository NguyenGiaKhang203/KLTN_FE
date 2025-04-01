// src/components/Footer.jsx

import React from "react";
import {
  WrapperFooter,
  WrapperFooterContainer,
  WrapperLeft,
  WrapperCenter,
  WrapperRight,
  WrapperSectionTitle,
  WrapperParagraph,
  WrapperSocialIcons,
  WrapperLinkGroup,
  WrapperTextFooter,
  WrapperCopyright,
  CustomDivider,
  LogoImage,
} from "./style";

import {
  FacebookFilled,
  YoutubeFilled,
  HomeFilled,
  PhoneFilled,
} from "@ant-design/icons";
import { Space, Typography, Divider } from "antd";
import Logo from "../../assets/Logo2.png";
const { Title } = Typography;

const Footer = () => {
  return (
    <WrapperFooter>
      <WrapperFooterContainer>
        {/* Trái */}
        <WrapperLeft>
          <Title level={3} style={{ color: "#fff", marginBottom: 10 }}>
            <LogoImage src={Logo} />
          </Title>

          <WrapperParagraph>
            Trực thuộc Liên đoàn cờ vua Đà Nẵng
          </WrapperParagraph>
          <WrapperParagraph>Top 100 CLB tốt nhất tại Đà Nẵng</WrapperParagraph>
          {/* 👇 Icon căn giữa tại đây */}
          <WrapperSocialIcons>
            <Space size="middle">
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <FacebookFilled className="social-icon facebook" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer">
                <YoutubeFilled className="social-icon youtube" />
              </a>
            </Space>
          </WrapperSocialIcons>
        </WrapperLeft>

        {/* Giữa */}
        <WrapperCenter>
          <WrapperSectionTitle>
            <HomeFilled style={{ marginRight: 8, color: "#f39c12" }} />
            Địa chỉ
          </WrapperSectionTitle>
          <WrapperParagraph>
            50 Trường Chinh 1, Thanh Khê, Đà Nẵng.
          </WrapperParagraph>
          <CustomDivider />
          <WrapperSectionTitle>
            <PhoneFilled style={{ marginRight: 8, color: "#f39c12" }} />
            Số điện thoại
          </WrapperSectionTitle>
          <WrapperParagraph>0905 112 113 (Cô Huệ)</WrapperParagraph>
          <WrapperParagraph>0613 998 996 (Thầy Linh)</WrapperParagraph>
        </WrapperCenter>

        {/* Phải */}
        <WrapperRight>
          <Title level={4} style={{ color: "#fff", marginBottom: 10 }}>
            Trang liên quan
          </Title>
          <WrapperLinkGroup>
            <WrapperTextFooter to="/">Trang Chủ</WrapperTextFooter>
            <WrapperTextFooter to="/courses">Khóa Học</WrapperTextFooter>
            <WrapperTextFooter to="/about">
              Thông tin CLB King-Chess
            </WrapperTextFooter>
          </WrapperLinkGroup>
        </WrapperRight>
      </WrapperFooterContainer>

      <Divider style={{ backgroundColor: "#444" }} />
      <WrapperCopyright>
        © {new Date().getFullYear()} King Chess. All rights reserved.
      </WrapperCopyright>
    </WrapperFooter>
  );
};

export default Footer;
