import styled from "styled-components";

export const WrapperProgramSection = styled.div`
  background-size: cover;
  background-position: center;
  padding: 50px;
  text-align: left;
  color: white;
  position: relative;
  height: 800px;
  margin-top: 100px;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);
  }

  @media (max-width: 1024px) {
    height: 700px;
    padding: 40px;
  }

  @media (max-width: 768px) {
    height: auto;
    padding: 30px 20px;
  }

  @media (max-width: 480px) {
    padding: 20px 10px;
    margin-top: 50px;
  }
`;

export const WrapperTitle = styled.h2`
  font-size: 40px;
  color: #aeea94;
  font-weight: bold;
  text-align: center;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    font-size: 30px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

export const WrapperProgramList = styled.div`
  display: flex;
  margin: 30px 0 0 400px;
  flex-direction: column;
  gap: 20px;
  position: relative;
  z-index: 2;

  @media (max-width: 1024px) {
    margin-left: 200px;
  }

  @media (max-width: 768px) {
    margin-left: 0;
    align-items: center;
  }

  @media (max-width: 480px) {
    margin-left: 0;
    align-items: center;
  }
`;

export const WrapperProgramItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  background: rgba(255, 255, 255, 0.1);
  padding: 5px;
  border-radius: 10px;
  width: 70%;
  transition: transform 0.3s;

  h3 {
    margin-bottom: 5px;
    font-size: 20px;
  }

  p {
    font-size: 16px;
  }

  @media (max-width: 1024px) {
    width: 80%;
  }

  @media (max-width: 768px) {
    width: 90%;
  }

  @media (max-width: 480px) {
    width: 100%;

    h3 {
      font-size: 18px;
    }

    p {
      font-size: 14px;
    }
  }
`;

export const WrapperIcon = styled.img`
  width: 75px;
  height: 75px;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.2);
  }

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }

  @media (max-width: 480px) {
    width: 50px;
    height: 50px;
  }
`;
