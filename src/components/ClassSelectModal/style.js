import styled from "styled-components";

export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${({ open }) => (open ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 32px;
  border-radius: 20px;
  max-width: 600px;
  width: 100%;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
`;

export const Title = styled.h2`
  margin-bottom: 24px;
  font-size: 22px;
  font-weight: 700;
  color: #333;
`;

export const ClassList = styled.div`
  max-height: 360px;
  overflow-y: auto;
  margin-bottom: 24px;
  padding-right: 4px;
`;

export const ClassOption = styled.label`
  display: flex;
  align-items: flex-start;
  margin-bottom: 16px;
  padding: 16px;
  border: 2px solid
    ${({ disabled, selected }) =>
      disabled ? "#ddd" : selected ? "#1890ff" : "#e0e0e0"};
  border-radius: 12px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  background-color: ${({ disabled }) => (disabled ? "#f8f8f8" : "#ffffff")};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  gap: 16px;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: ${({ disabled }) =>
      disabled ? "none" : "0 0 10px rgba(24, 144, 255, 0.15)"};
    transform: ${({ disabled }) => (disabled ? "none" : "scale(1.01)")};
  }

  input[type="radio"] {
    transform: scale(1.3);
    margin-top: 4px;
    accent-color: #1890ff;
  }
`;

export const ClassInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 15px;
  line-height: 1.5;
`;

export const ClassDetail = styled.div`
  font-size: 15px;
  color: #444;
  line-height: 1.5;

  span {
    font-weight: 600;
    color: #000;
  }
`;

export const ConfirmButton = styled.button`
  width: 100%;
  padding: 14px;
  background-color: ${({ disabled }) => (disabled ? "#ccc" : "#1890ff")};
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#ccc" : "#1677cc")};
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  position: absolute;
  top: 16px;
  right: 20px;
  cursor: pointer;
  color: #888;

  &:hover {
    color: #000;
  }
`;
