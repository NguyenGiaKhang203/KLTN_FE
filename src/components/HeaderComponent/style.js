// style.js
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Avatar } from "antd";

export const WrapperHeaderContainer = styled.div`
  width: 100%;
  background: #d1f8ef;
  display: flex;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const WrapperHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  max-width: 1200px;
  padding: 10px 0;
`;

export const WrapperLogo = styled.div`
  font-size: 20px;
  font-weight: bold;
  flex: 1;
`;

export const WrapperNavLinks = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  flex-grow: 1;
  justify-content: center;
`;

export const LogoImage = styled.img`
  height: 25px;
  object-fit: contain;
  transform: scale(2.7);
  transform-origin: left center;
`;

export const WrapperTextHeader = styled(NavLink)`
  color: #1a1a1a;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease-in-out;
  position: relative;

  &:hover {
    color: rgb(230, 51, 51);
    transform: scaleX(1.1);
  }

  &.active {
    color: rgb(230, 51, 51);
    font-weight: 600;
    border-bottom: 2px solid rgb(230, 51, 51);
  }
`;

export const WrapperLogoLink = styled(NavLink)`
  transition: all 0.3s ease-in-out;
  position: relative;
  top: 10px;

  &:hover {
    transform: scaleX(1.5);
  }

  &.active {
    font-weight: 600;
  }
`;

export const WrapperTextHeaderSmall = styled.div`
  color: #1a1a1a;
  font-size: 16px;
  transition: transform 0.3s ease-in-out;

  &:hover {
    color: rgb(230, 51, 51);
    transform: scaleX(1.1);
  }
`;

export const WrapperHeaderAccount = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: flex-end;
`;

export const WrapperAvatar = styled(Avatar)`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  object-fit: cover;
`;

export const WrapperIcon = styled.div`
  font-size: 24px;
  color: #1a1a1a;
`;

export const WrapperUsername = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #1a1a1a;
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
`;

export const WrapperLoginSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  flex-direction: row;
  color: #000;
`;

export const WrapperCartIcon = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  flex-direction: row;
  gap: 10px;
  transition: transform 0.3s ease-in-out;

  .icon {
    font-size: 24px;
    color: #ff4081;
  }

  &:hover ${WrapperTextHeaderSmall} {
    transform: scaleX(1.1);
  }
`;

export const WrapperContentPopup = styled.div`
  padding: 10px 16px;
  font-size: 15px;
  color: #333;
  cursor: pointer;
  transition: background 0.2s ease;
  border-radius: 6px;
  user-select: none;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    background-color: #f0f0f0;
    color: #1677ff;
  }

  svg {
    font-size: 14px;
  }
`;


// ✅ Modal style tách riêng
export const customModalStyles = {
  body: {
    fontSize: 16,
  },
  header: {
    fontSize: 18,
  },
  footer: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 10,
  },
  okButton: {
    backgroundColor: "#ff4d4f",
    borderColor: "#ff4d4f",
    color: "white",
  },
  cancelButton: {
    color: "#444",
  },
};
