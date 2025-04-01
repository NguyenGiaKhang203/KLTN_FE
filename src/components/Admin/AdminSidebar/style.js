import styled from 'styled-components';

export const SidebarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 16px;
`;

export const LogoSection = styled.div`
  text-align: center;
  margin-bottom: 24px;

  img {
    width: 60px;
    height: 60px;
    object-fit: contain;
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
