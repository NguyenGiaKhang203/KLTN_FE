import styled, { keyframes } from 'styled-components';

// 👇 Tạo hiệu ứng pulse (to nhỏ)
const pulse = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(24, 144, 255, 0.7);
  }
  70% {
    transform: scale(1.1);
    box-shadow: 0 0 0 10px rgba(24, 144, 255, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(24, 144, 255, 0);
  }
`;

export const MessBoxWrapper = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
`;

export const CircleButton = styled.button`
  background-color: #1890ff;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  animation: ${pulse} 2s infinite;

  &:hover {
    background-color: #40a9ff;
  }

  svg {
    font-size: 24px;
    color: white;
  }
`;
