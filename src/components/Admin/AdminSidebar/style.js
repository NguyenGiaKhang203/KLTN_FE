import styled from "styled-components";
import { Modal } from "antd";

export const SidebarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 16px;

  .ant-menu-dark.ant-menu-inline {
    background-color: transparent;
  }

  .ant-menu-item {
    color: #b0bec5;
    font-weight: 500;
    border-radius: 8px;
    margin: 4px 0;
    transition: background 0.3s ease, color 0.3s ease;
  }

  .ant-menu-item:hover {
    background-color: #2f3e4d;
    color: #ffffff;
  }

  .ant-menu-item-selected {
    background-color: #1e88e5;
    color: #ffffff !important;
    font-weight: 600;
  }

  .ant-menu-item a {
    color: inherit;
  }

  .ant-menu-item a:hover {
    color: #ffffff;
  }

  .ant-menu-item .anticon {
    font-size: 18px;
  }

  .logo-link {
    text-decoration: none;
    display: block;
    color: inherit;
  }
`;

export const LogoSection = styled.div`
  text-align: center;
  margin-bottom: 24px;

  img {
    width: 100px;
    height: 100px;
    object-fit: contain;
    transform: scale(1.5);
    transformorigin: left center;
  }

  h3 {
    margin: 10px 0 4px;
    font-size: 16px;
    color: #ffffff;
  }

  .status {
    font-size: 12px;
    color: #4cd137;
  }
`;

export const StyledModal = styled(Modal)`
  top: 50% !important;
  transform: translateY(-50%) !important;

  .ant-modal-content {
    text-align: center;
  }

  .ant-modal-footer {
    display: flex;
    justify-content: center;
    gap: 16px;
  }

  .ant-btn-primary {
    background-color: #e53935 !important;
    border-color: #e53935 !important;
    color: #ffffff !important;
    transition: all 0.3s ease;

    &:hover,
    &:focus,
    &:active {
      background-color: #e53935 !important;
      border-color: #e53935 !important;
      color: #ffffff !important;
      transform: scale(1.05);
      box-shadow: 0 4px 12px rgba(229, 57, 53, 0.4);
    }
  }
`;
