// src/pages/style.js
import styled from "styled-components";
import { Row, Typography, Divider, Carousel } from "antd";

const { Title, Paragraph } = Typography;

export const StyledWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const StyledTopSection = styled(Row)`
  margin-bottom: 40px;
`;

export const StyledLogo = styled.img`
  width: 100%;
  max-width: 200px;
  height: auto;
  display: block;
  margin: 0 auto;
`;

export const StyledTitle = styled(Title)`
  && {
    color: #104e8b;
  }
`;

export const StyledParagraph = styled(Paragraph)`
  && {
    color: #333;
    font-size: 15px;
  }
`;

export const StyledDivider = styled(Divider)`
  && {
    border-color: #ccc;
    margin: 40px 0;
  }
`;

export const StyledCarousel = styled(Carousel)`
  margin: 0 auto 40px;
  max-width: 800px;
`;

export const CarouselImage = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 8px;
`;
