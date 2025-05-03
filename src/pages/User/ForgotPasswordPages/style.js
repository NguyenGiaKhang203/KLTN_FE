import styled from "styled-components";
import backgroundImage from "../../../assets/back-ground.jpg";

export const PageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: url(${backgroundImage}) no-repeat center center;
  background-size: cover;
  width: 100%;
  height: 100vh;
  padding: 20px;
`;

export const FormContainer = styled.div`
  width: 550px;
  height: 380px;
  border-radius: 10px;
  background: transparent;
  display: flex;
  border: 2px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(100px);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  color: #ffffff;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    flex-direction: column;
  }

  @media (max-width: 480px) {
    padding: 10px;
    border: 1px solid rgba(255, 255, 255, 0.15);
    box-shadow: none;
  }
`;

export const WrapperLeft = styled.div`
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

export const WrapperContainerRight = styled.div`
  width: 300px;
  background: linear-gradient(
    136deg,
    rgb(240, 248, 255) -1%,
    rgb(219, 238, 255) 85%
  );
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  @media (max-width: 768px) {
    width: 100%;
    padding: 20px;
  }

  @media (max-width: 480px) {
    padding: 16px;
  }
`;

export const WrapperContainerLeft = styled(WrapperLeft)``;

export const WrapperTextLight = styled.span`
  color: rgb(13, 92, 182);
  font-size: 13px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const StyledInput = styled.div`
  margin-bottom: 15px;

  input {
    padding: 10px;
    background: transparent;
    border: 1px solid #ffffff;
    color: #ffffff;
    width: 100%;
    font-size: 14px;

    &::placeholder {
      color: #ffffff;
    }

    &:hover,
    &:focus {
      background: transparent;
      border-color: #ffffff;
      outline: none;
    }
  }

  @media (max-width: 480px) {
    input {
      font-size: 13px;
    }
  }
`;

export const ForgotText = styled.p`
  margin-top: 12px;
  font-size: 14px;
  color: #fff;

  @media (max-width: 480px) {
    font-size: 13px;
    text-align: center;
  }
`;

export const ForgotNavigate = styled.span`
  padding: 5px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
    color: #1d1616;
  }
`;

export const ForgotSignup = styled.p`
  font-size: 14px;
  color: #fff;

  span:hover {
    text-decoration: underline;
    color: #1d1616;
  }

  @media (max-width: 480px) {
    font-size: 13px;
    text-align: center;
  }
`;
