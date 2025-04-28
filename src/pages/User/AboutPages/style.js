import styled from "styled-components";
import { Row, Typography, Divider, Carousel } from "antd";

const { Title, Paragraph } = Typography;

export const StyledWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 32px;

  @media (max-width: 768px) {
    padding: 40px 24px;
  }

  @media (max-width: 480px) {
    padding: 32px 16px;
  }
`;

export const StyledTopSection = styled(Row)`
  margin-bottom: 48px;
`;

export const StyledLogo = styled.img`
  width: 100%;
  max-width: 220px;
  height: auto;
  display: block;
  margin: 0 auto;

  @media (max-width: 768px) {
    max-width: 180px;
  }
`;

export const StyledTitle = styled(Title)`
  && {
    color: #104e8b;
    font-size: 28px;

    @media (max-width: 768px) {
      font-size: 24px;
    }

    @media (max-width: 480px) {
      font-size: 20px;
    }
  }
`;

export const StyledParagraph = styled(Paragraph)`
  && {
    color: #333;
    font-size: 16px;
    line-height: 1.8;

    @media (max-width: 768px) {
      font-size: 15px;
    }

    @media (max-width: 480px) {
      font-size: 14px;
    }
  }
`;

export const StyledDivider = styled(Divider)`
  && {
    border-color: #ccc;
    margin: 48px 0;
    font-weight: 600;
    font-size: 20px;
    color: #333;

    @media (max-width: 768px) {
      font-size: 18px;
    }
  }
`;

export const StyledCarousel = styled(Carousel)`
  margin: 0 auto 48px;
  max-width: 900px;

  .slick-slide img {
    width: 100%;
    height: auto;
    border-radius: 12px;
    object-fit: cover;
  }
`;

export const CarouselImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 12px;

  @media (max-width: 768px) {
    height: 280px;
  }

  @media (max-width: 480px) {
    height: 220px;
  }
`;

export const ReasonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  padding: 32px 0 48px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 24px 0 40px;
  }
`;

export const ReasonCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12);
  }
`;

export const ReasonImage = styled.img`
  height: 72px;
  margin-bottom: 16px;

  @media (max-width: 480px) {
    height: 60px;
  }
`;

export const ReasonTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #104e8b;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

export const ReasonText = styled.p`
  font-size: 15px;
  color: #555;
  line-height: 1.6;
  margin-top: 8px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;
