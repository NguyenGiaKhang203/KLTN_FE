import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  background-color: #b0bec5;
`;

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #b0bec5;
  overflow: hidden;
`;

export const Main = styled.main`
  flex: 1;
  padding: 24px;
  background-color: #b0bec5;
  overflow-y: auto;
  color: #ffffff;
  min-height: 0;

  h1, h2, h3 {
    color: #ffffff;
  }
`;
