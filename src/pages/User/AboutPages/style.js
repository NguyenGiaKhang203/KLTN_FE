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
    font-weight: 600;
    font-size: 18px;
  }
`;

export const StyledCarousel = styled(Carousel)`
  margin: 0 auto 40px;
  max-width: 800px;

  .slick-slide img {
    width: 100%;
    border-radius: 8px;
  }
`;

export const CarouselImage = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 8px;
`;

export const ReasonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  padding: 32px 0 48px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr); // mobile: mỗi hàng 1 card
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr); // tablet: 2 card mỗi hàng
  }
`;

export const ReasonCard = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
`;

export const ReasonImage = styled.img`
  height: 72px;
  margin-bottom: 16px;
`;

export const ReasonTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
`;

export const ReasonText = styled.p`
  font-size: 14px;
  color: #555;
  line-height: 1.5;
`;
