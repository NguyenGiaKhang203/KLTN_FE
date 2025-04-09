import styled from 'styled-components';

export const ModalWrapper = styled.div`
  .ant-form-item-label > label {
    font-weight: 600;
    font-size: 15px;
    color: #333;
  }

  .ant-input,
  .ant-input-number,
  .ant-select-selector {
    border-radius: 10px;
    font-size: 14px;
    padding: 6px 12px;
  }

  .ant-input-number-input {
    padding: 6px;
  }

  .ant-modal-body {
    padding-top: 16px;
  }

  .ant-btn {
    font-weight: 500;
    border-radius: 8px;
  }

  img {
    margin-top: 12px;
    width: 100%;
    border-radius: 10px;
    object-fit: cover;
  }
`;
