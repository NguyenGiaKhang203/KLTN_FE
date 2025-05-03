import styled, { keyframes } from "styled-components";

// Pulse animation
const pulse = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 rgba(60, 162, 231, 0.3);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 25px rgba(60, 162, 231, 0.5);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 rgba(60, 162, 231, 0.3);
  }
`;

// Shine animation
const shine = keyframes`
  0% {
    background-position: -100px;
  }
  100% {
    background-position: 300px;
  }
`;

// Fade-in up animation
const fadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

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
  animation: ${fadeInUp} 1s ease-in-out;

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

export const StyledPulseButton = styled.button`
  position: relative;
  background: linear-gradient(90deg, #94ff9e, #3ca2e7);
  background-size: 200%;
  background-position: left;
  border: none;
  border-radius: 12px;
  color: #1c1c1c;
  padding: 18px 28px;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  overflow: hidden;

  transition:
    background-position 0.6s ease-in-out,
    color 0.4s ease-in-out,
    transform 0.4s ease,
    box-shadow 0.4s ease;

  animation: ${pulse} 4s ease-in-out infinite;
  box-shadow: 0 4px 12px rgba(60, 162, 231, 0.25);

  &:hover {
    background-position: right; /* trượt màu */
    transform: scale(1.03);
    color: white;
    box-shadow: 0 6px 18px rgba(60, 162, 231, 0.35);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -75px;
    width: 50px;
    height: 100%;
    background: rgba(255, 255, 255, 0.3);
    transform: skewX(-20deg);
    animation: ${shine} 2.5s ease-in-out infinite;
    pointer-events: none;
  }
`;
