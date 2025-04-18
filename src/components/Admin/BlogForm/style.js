import styled from "styled-components";
import { Modal, Form, Input } from "antd";

// Modal và form
export const StyledModal = styled(Modal)`
  .ant-modal-title {
    font-weight: bold;
  }
`;

export const StyledForm = styled(Form)`
  .ant-form-item-label > label {
    font-weight: 500;
  }
`;

export const StyledInput = styled(Input)`
  border-radius: 8px;
  padding: 6px 12px;
`;

export const StyledTextArea = styled(Input.TextArea)`
  border-radius: 8px;
  padding: 8px 12px;
`;

// Ảnh và nút xoá ảnh
export const ImagePreviewWrapper = styled.div`
  margin-top: 10px;
  position: relative;

  img {
    width: 100%;
    border-radius: 8px;
  }
`;

export const DeleteImageButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: white;
  border: none;
  border-radius: 50%;
  padding: 4px;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

  svg {
    font-size: 18px;
    color: #ff4d4f;
  }

  &:hover {
    background: #ffeaea;
  }
`;
