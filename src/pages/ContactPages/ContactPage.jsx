import React from "react";
import { Row, Col } from "antd";
import {
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { Container, GradientCard, IconWrapper, Title, Text } from "./style";

const ContactInfoComponent = () => {
  return (
    <Container>
      <Row gutter={[24, 24]} justify="center">
        <Col xs={24} md={8}>
          <GradientCard bordered={false}>
            <IconWrapper>
              <EnvironmentOutlined />
            </IconWrapper>
            <Title>Trụ sở chính</Title>
            <Text>50 Trường chinh 1, Thanh Khê, Đà Nẵng</Text>
          </GradientCard>
        </Col>

        <Col xs={24} md={8}>
          <GradientCard bordered={false}>
            <IconWrapper>
              <MailOutlined />
            </IconWrapper>
            <Title>Email</Title>
            <Text>hoanganhtt11@gmail.com</Text>
          </GradientCard>
        </Col>

        <Col xs={24} md={8}>
          <GradientCard bordered={false}>
            <IconWrapper>
              <ClockCircleOutlined />
            </IconWrapper>
            <Title>Hotline</Title>
            <Text>
              <PhoneOutlined /> 0823 031 503
            </Text>
            <Text>
              <PhoneOutlined /> 0971 400 236
            </Text>
          </GradientCard>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactInfoComponent;
