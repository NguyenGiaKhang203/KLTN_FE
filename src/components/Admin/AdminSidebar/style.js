import styled from 'styled-components';

export const SidebarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 16px;

  .ant-menu-dark.ant-menu-inline {
    background-color: transparent;
  }

  .ant-menu-item {
    color: #b0bec5; /* màu xám xanh sáng */
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
    background-color: #1e88e5 !important;
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
