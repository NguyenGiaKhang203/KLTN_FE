import styled, { css } from "styled-components";

export const SlideshowContainer = styled.div`
  position: relative;
  width: 100%;
  height: 700px;
  overflow: hidden;
  background: linear-gradient(to right, #e0f7fa, #b2ebf2);
  border-radius: 20px;
  margin: auto;
  max-width: 1400px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);

  @media (max-width: 1024px) {
    height: 500px;
  }

  @media (max-width: 768px) {
    height: 400px;
  }

  @media (max-width: 480px) {
    height: 250px;
  }
`;

export const SlideImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 100%;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: all 1s ease-in-out;
  cursor: pointer;

  ${({ active }) =>
    active &&
    css`
      left: 0;
      opacity: 1;
    `}
`;

export const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
`;

export const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.7);
  padding: 8px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  z-index: 2;
  transition: background-color 0.3s;

  ${({ position }) =>
    position === "left" &&
    css`
      left: 20px;
    `}

  ${({ position }) =>
    position === "right" &&
    css`
      right: 20px;
    `}

  &:hover {
    background-color: rgba(255, 255, 255, 1);
  }

  @media (max-width: 480px) {
    padding: 5px;
  }
`;

export const IconWrapper = styled.div`
  width: 28px;
  height: 28px;

  svg {
    width: 100%;
    height: 100%;
    color: #00796b;
  }

  @media (max-width: 480px) {
    width: 20px;
    height: 20px;
  }
`;
