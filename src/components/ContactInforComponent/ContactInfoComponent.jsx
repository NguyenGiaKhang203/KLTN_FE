import React from "react";
import { Col, Row, Typography, Space } from "antd";
import {
  FacebookFilled,
  YoutubeFilled,
  PhoneFilled,
  HomeFilled,
} from "@ant-design/icons";

import { Wrapper, StyledTitle, StyledParagraph, MapIframe } from "./style";

const ContactInfo = () => {
  return (
    <Wrapper>
      <Row gutter={[32, 32]}>
        <Col xs={24} md={12}>
          <StyledTitle level={4}>Cơ sở</StyledTitle>
          <StyledParagraph>
            <HomeFilled style={{ color: "#52c41a" }} /> 49 Tranh Lương 11, Hòa
            Xuân, Đà Nẵng
          </StyledParagraph>
          <StyledParagraph>
            <HomeFilled style={{ color: "#52c41a" }} /> 336 Hoàng Phụ, Đà Nẵng
          </StyledParagraph>

          <StyledTitle level={4}>Số điện thoại</StyledTitle>
          <StyledParagraph>
            <PhoneFilled style={{ color: "#fa541c" }} /> 0795.716.213 (Cô Huệ)
          </StyledParagraph>
          <StyledParagraph>
            <PhoneFilled style={{ color: "#fa541c" }} /> 0708.204.321 (Thầy Hữu)
          </StyledParagraph>

          <StyledTitle level={4}>Mạng xã hội</StyledTitle>
          <Space size="middle">
            <FacebookFilled style={{ fontSize: 24, color: "#1877f2" }} />
            <YoutubeFilled style={{ fontSize: 24, color: "#ff0000" }} />
          </Space>
        </Col>

        <Col xs={24} md={12}>
          <MapIframe
            title="Daisy Chess Map"
            src="https://www.google.com/maps/d/u/0/embed?mid=1G4QQ_r7NoyrT-uDPkCkEkPKFLmYzpmA&ehbc=2E312F"
            allowFullScreen=""
            loading="lazy"
          />
        </Col>
      </Row>
    </Wrapper>
  );
};

export default ContactInfo;
