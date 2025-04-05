import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  background-color: #e0e0e0;
`;

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #e0e0e0;
`;

export const Main = styled.main`
  flex: 1;
  padding: 24px;
  overflow-y: auto;
  background-color: #e0e0e0;
  color: #000;

  h2 {
    margin-top: 0;
    color: #000;
    font-size: 20px;
    font-weight: 600;
    margin-bottom:10px;
  }

  .ant-row {
    margin-top: 16px;
  }

  /* Nếu bạn có class-card component và muốn hiệu ứng đẹp */
  .class-card {
    background-color: #37474f;
    border-radius: 12px;
    padding: 16px;
    color: #ffffff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
`;
