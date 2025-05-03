import styled from "styled-components";

export const WrapperOrderSuccess = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  background-color: #fff;
  min-height: 70vh;

  .ant-result {
    max-width: 600px;
    text-align: center;
    padding: 24px;
  }

  .ant-btn-primary {
    background-color: #1890ff;
    border-color: #1890ff;
  }

  @media (max-width: 768px) {
    padding: 24px;

    .ant-result {
      max-width: 90%;
    }
  }

  @media (max-width: 480px) {
    padding: 16px;

    .ant-result {
      padding: 16px;
      font-size: 14px;

      .ant-result-title {
        font-size: 20px;
      }

      .ant-result-subtitle {
        font-size: 14px;
      }

      .ant-btn {
        width: 100%;
        font-size: 14px;
      }
    }
  }
`;
