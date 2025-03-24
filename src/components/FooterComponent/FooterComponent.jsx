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
} from "./style";
import { WrapperTextFooter } from "./style"; // cái bạn đã có
import {
  createFromIconfontCN,
  YoutubeFilled,
  HomeFilled,
  PhoneFilled,
} from "@ant-design/icons";
import { Space } from "antd";

const Footer = () => {
  const IconFont = createFromIconfontCN({
    scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js",
  });

  return (
    <WrapperFooter>
      <WrapperFooterContainer>
        <WrapperLeft>
          <h1>Daisy Chess</h1>
          <WrapperParagraph>
            Trực thuộc Liên đoàn cờ vua Đà Nẵng
          </WrapperParagraph>
          <WrapperParagraph>Top 100 CLB tốt nhất tại Đà Nẵng</WrapperParagraph>
          <WrapperSocialIcons>
            <Space>
              <IconFont className="icons-a" type="icon-facebook" />
              <YoutubeFilled style={{ fontSize: "20px" }} />
            </Space>
          </WrapperSocialIcons>
        </WrapperLeft>

        <WrapperCenter>
          <WrapperSectionTitle>
            <HomeFilled style={{ padding: "5px", color: "#f39c12" }} />
            Địa chỉ
          </WrapperSectionTitle>
          <WrapperParagraph>
            50 Trường Chinh 1, Thanh Khê, Đà Nẵng.
          </WrapperParagraph>
          <hr />
          <WrapperSectionTitle>
            <PhoneFilled style={{ padding: "5px", color: "#f39c12" }} />
            Số điện thoại
          </WrapperSectionTitle>
          <WrapperParagraph>0905112113 (Cô Huệ)</WrapperParagraph>
          <WrapperParagraph>0613998996 (Thầy Linh)</WrapperParagraph>
        </WrapperCenter>

        <WrapperRight>
          <h3>Trang liên quan</h3>
          <WrapperLinkGroup>
            <WrapperTextFooter to="/">Trang Chủ</WrapperTextFooter>
            <WrapperTextFooter to="/courses">Khóa Học</WrapperTextFooter>
            <WrapperTextFooter to="/about">
              Thông tin CLB Daisy
            </WrapperTextFooter>
          </WrapperLinkGroup>
        </WrapperRight>
      </WrapperFooterContainer>
    </WrapperFooter>
  );
};

export default Footer;
