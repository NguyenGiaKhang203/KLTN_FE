import styled from "styled-components";
import backgroundImage from "../../../assets/back-ground.jpg";

export const SignupContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: url(${backgroundImage}) no-repeat;
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100vh;
  padding: 16px;
`;

export const SignupForm = styled.div`
  width: 600px;
  height: 525px;
  border-radius: 10px;
  background: transparent;
  display: flex;
  flex-direction: column;
  border: 2px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(100px);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  color: #ffffff;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    padding: 24px;
    border-radius: 8px;
  }

  @media (max-width: 480px) {
    padding: 16px;
  }
`;

export const SignupContent = styled.div`
  flex: 1;
  padding: 40px 45px 24px;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 24px;
  }

  @media (max-width: 480px) {
    padding: 16px;
  }
`;

export const StyledInputWrapper = styled.div`
  margin-bottom: 15px;
  position: relative;

  input {
    padding: 10px;
    background: transparent;
    border: 1px solid #ffffff;
    color: #fff;
    width: 100%;
    border-radius: 4px;

    &:hover,
    &:focus {
      background: transparent;
      border-color: #ffffff;
      outline: none;
    }

    &::placeholder {
      color: #fff;
    }
  }
`;

export const EyeIcon = styled.span`
  position: absolute;
  top: 4px;
  right: 8px;
  z-index: 10;
  padding: 10px;
  color: #fff;
  cursor: pointer;
`;

export const StyledLinkText = styled.p`
  font-size: 16px;
  color: #fff;
  text-align: center;
  margin-top: 12px;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const LinkNavigate = styled.span`
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    color: #1d1616;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;
