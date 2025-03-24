import styled, { css } from "styled-components";

export const SlideshowContainer = styled.div`
  position: relative;
  width: 100%;
  height: 700px;
  overflow: hidden;
  padding: 50px;
  background-color: aquamarine;
`;

export const SlideImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  opacity: 0;
  transition: opacity 1s ease-in-out;
  cursor: pointer;
  padding: 20px 30px;
  border-radius: 20px;

  ${({ active }) =>
    active &&
    css`
      opacity: 1;
    `}
`;

export const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.8);
  padding: 10px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  z-index: 1;

  ${({ position }) =>
    position === "left" &&
    css`
      left: 100px;
    `}

  ${({ position }) =>
    position === "right" &&
    css`
      right: 100px;
    `}
`;

export const IconWrapper = styled.div`
  width: 24px;
  height: 24px;
`;
