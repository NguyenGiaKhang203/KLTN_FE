import styled from "styled-components";

export const WrapperHeroSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 100px 190px;
  background: white;
  gap: 50px;

  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 60px 40px;
    gap: 30px;
  }

  @media (max-width: 600px) {
    padding: 40px 20px;
  }
`;

export const WrapperHeroContent = styled.div`
  flex: 1;
  max-width: 500px;

  @media (max-width: 1024px) {
    text-align: center;
    max-width: 100%;
    margin-bottom: 30px;
  }
`;

export const HeroTitle = styled.h1`
  font-size: 50px;
  font-weight: bold;
  color: #588b2e;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    font-size: 40px;
  }

  @media (max-width: 480px) {
    font-size: 32px;
  }
`;

export const HighlightText = styled.span`
  color: #588b2e;
`;

export const HeroDescription = styled.div`
  width: 420px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const SubText1 = styled.p`
  font-size: 35px;
  line-height: 1.5;
  color: #333;
  font-weight: 500;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 28px;
  }

  @media (max-width: 480px) {
    font-size: 22px;
  }
`;

export const SubText = styled.p`
  em {
    color: #3e8b6f;
    font-style: italic;
    font-size: 20px;
    margin-bottom: 25px;
    display: inline-block;

    @media (max-width: 768px) {
      font-size: 18px;
    }

    @media (max-width: 480px) {
      font-size: 16px;
    }
  }
`;

export const WrapperHeroImage = styled.div`
  flex: 1.5;
  display: flex;
  justify-content: center;

  img {
    width: 100%;
    max-width: 1200px;
    height: auto;
    border-radius: 15px;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);

    @media (max-width: 1024px) {
      max-width: 100%;
    }
  }
`;
