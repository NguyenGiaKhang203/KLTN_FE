import styled from "styled-components";
import { Link } from "react-router-dom";
import { Divider } from "antd";

// Footer chính
export const WrapperFooter = styled.footer`
  background-color: #111;
  color: white;
  padding: 50px 24px 35px;
  font-family: "Arial", sans-serif;
`;

export const WrapperFooterContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 40px;

  @media (max-width: 1024px) {
    gap: 30px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

export const WrapperLeft = styled.div`
  flex: 1;
  text-align: center;

  @media (max-width: 768px) {
    text-align: center;
    flex: 1 1 100%; /* Chiếm toàn bộ chiều rộng trên màn hình nhỏ */
  }
`;

export const WrapperCenter = styled.div`
  flex: 1.5;
  text-align: center;

  .ant-divider {
    width: 200px;
    margin: 12px auto;
  }

  @media (max-width: 768px) {
    text-align: center;
    flex: 1 1 100%; /* Chiếm toàn bộ chiều rộng trên màn hình nhỏ */
  }
`;

export const WrapperRight = styled.div`
  flex: 0.8;
  margin-left: 25px;

  @media (max-width: 768px) {
    text-align: center;
    margin-left: 0;
    flex: 1 1 100%; /* Chiếm toàn bộ chiều rộng trên màn hình nhỏ */
  }
`;

export const WrapperSectionTitle = styled.h4`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #f8f8f8;
`;

export const WrapperParagraph = styled.p`
  font-size: 14px;
  color: #ccc;
  margin: 4px 0;
`;

export const WrapperSocialIcons = styled.div`
  display: flex;
  justify-content: center;
  margin: 12px 0;

  a {
    color: #fff;
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.2);
    }
  }

  .social-icon {
    font-size: 20px;
  }

  .facebook {
    color: #1877f2;
  }

  .youtube {
    color: #ff0000;
  }

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const WrapperTextFooter = styled(Link)`
  font-size: 13px;
  color: #ccc;
  font-weight: 500;
  text-decoration: none;
  transition: 0.2s;

  &:hover {
    color: white;
    text-decoration: underline;
  }
`;

export const WrapperLinkGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  @media (max-width: 768px) {
    align-items: center;
  }
`;

export const WrapperCopyright = styled.p`
  text-align: center;
  color: #777;
  font-size: 13px;
  margin-top: 20px;
`;

export const CustomDivider = styled.div`
  width: 300px;
  height: 3px;
  background-color: #444;
  margin: 12px auto;
  border-radius: 2px;

  @media (max-width: 768px) {
    width: 200px;
  }
`;

export const LogoImage = styled.img`
  height: 40px;
  object-fit: contain;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    height: 35px;
  }

  @media (max-width: 480px) {
    height: 30px;
  }
`;
