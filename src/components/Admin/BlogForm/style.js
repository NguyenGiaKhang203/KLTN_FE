import styled from "styled-components";
import { Modal, Form, Input } from "antd";

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
