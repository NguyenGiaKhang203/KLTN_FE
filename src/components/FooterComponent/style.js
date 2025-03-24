import styled from "styled-components";
import { Link } from "react-router-dom";

// Link styled-component bạn đã có sẵn
export const WrapperTextFooter = styled(Link)`
  font-size: 12px;
  color: #fff;
  font-weight: bold;
  text-align: left;

  &:hover {
    font-size: 18px;
    color: #fff;
  }
`;

// Footer chính
export const WrapperFooter = styled.footer`
  background-color: #111;
  color: white;
  padding: 50px 200px;
  font-family: "Arial", sans-serif;
`;

// Container bên trong
export const WrapperFooterContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 20px;
  }
`;

// Cột bên trái: Logo & mô tả
export const WrapperLeft = styled.div`
  flex: 1;
  text-align: center;
  margin-bottom: 15px;

  h1 {
    margin-bottom: 10px;
  }
`;

// Dòng mô tả
export const WrapperParagraph = styled.p`
  font-size: 14px;
  color: #ccc;
  margin: 5px 0;
`;

// Icon mạng xã hội
export const WrapperSocialIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;

  .icons-a:hover {
    background-color: #f39c12;
    color: white;
  }
`;

// Cột giữa: địa chỉ & điện thoại
export const WrapperCenter = styled.div`
  flex: 1.5;
  text-align: center;

  hr {
    width: 250px;
    margin: 10px auto;
    border: 1px solid #444;
  }
`;

// Tiêu đề như "Địa chỉ" & "Số điện thoại"
export const WrapperSectionTitle = styled.h4`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

// Cột bên phải: liên kết trang
export const WrapperRight = styled.div`
  flex: 0.5;
  text-align: left;
  margin-top: 25px;

  h3 {
    font-size: 20px;
    margin-bottom: 10px;
  }
`;

// Nhóm các đường link bên phải
export const WrapperLinkGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
