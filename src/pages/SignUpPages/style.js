import styled from "styled-components";
import backgroundImage from "../../assets/back-ground.jpg";

export const SignupContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: url(${backgroundImage}) no-repeat;
  background-size: cover;
  width: 100%;
  height: 100vh;
`;

export const SignupForm = styled.div`
  width: 600px;
  height: 525px;
  border-radius: 10px;
  background: transparent;
  display: flex;
  border: 2px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(100px);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  color: #ffffff;
`;

export const SignupContent = styled.div`
  flex: 1;
  padding: 40px 45px 24px;
  display: flex;
  flex-direction: column;
`;

export const StyledInputWrapper = styled.div`
  margin-bottom: 15px;

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
`;
