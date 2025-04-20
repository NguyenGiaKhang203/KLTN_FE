import styled from "styled-components";
import { Modal } from "antd";

export const StyledModal = styled(Modal)`
  .ant-modal-content {
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(16px);
    border-radius: 20px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    padding: 24px;
  }

  .ant-modal-header {
    border-bottom: none;
    background-color: transparent;
    text-align: center;
  }

  .ant-modal-title {
    font-size: 20px;
    font-weight: 600;
    color: #333;
  }

  .ant-modal-body {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  input {
    height: 44px;
    padding: 0 12px;
    border-radius: 12px;
    border: 1px solid #ccc;
    transition: border-color 0.3s ease;

    &:focus {
      border-color: #1890ff;
      outline: none;
    }
  }

  .ant-input-password {
    border-radius: 12px;
  }

  .ant-btn-primary {
    background: linear-gradient(to right, #00c6ff, #0072ff);
    border: none;
    border-radius: 10px;
    font-weight: 500;
  }

  .ant-btn-default {
    border-radius: 10px;
  }
`;
