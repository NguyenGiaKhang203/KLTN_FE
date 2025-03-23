import { Upload } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled.h1`
  color: #000;
  font-size: 28px;
  font-weight: bold;
  margin: 30px auto 20px;
  text-align: center;
`;

export const WrapperContentProfile = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  width: 700px;
  margin: 0 auto;
  padding: 30px 40px;
  border-radius: 12px;
  background-color: #fefefe;
  gap: 20px;
`;

export const WrapperLabel = styled.label`
  color: #333;
  font-size: 14px;
  font-weight: 600;
  width: 140px;
  margin-bottom :4px;
  white-space: nowrap;
`;

export const WrapperUploadFile = styled(Upload)`
  & .ant-upload.ant-upload-select-picture-card {
    width: 60px !important;
    height: 60px !important;
    border-radius: 50%;
  }
  & .ant-upload-list-item-info {
    display: none;
  }
`;

export const WrapperInput = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;

  & input,
  & select {
    flex: 1;
    padding: 6px 10px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 14px;
  }

  & input:focus,
  & select:focus {
    outline: none;
    border-color: #1890ff;
    box-shadow: 0 0 3px #1890ff55;
  }
`;

export const WrapperButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: center; 
  margin-top: 20px; 
`;
