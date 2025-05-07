import styled from 'styled-components';
import { Input, Select } from 'antd';

export const Container = styled.div`
  padding: 32px;
  background-color: #b8c7d0;
  min-height: 100vh;
  border-radius: 12px;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const Header = styled.h2`
  font-size: clamp(22px, 5vw, 28px);
  font-weight: 600;
  color: #000 !important;
  margin-bottom: 24px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;

  .ant-btn {
    font-weight: 500;
    background-color: #1890ff;
    border: none;
    padding: 6px 14px;
    border-radius: 8px;

    &:hover {
      background-color: #40a9ff;
    }
  }

  @media (max-width: 768px) {
    justify-content: center;
    width: 100%;
  }
`;

export const FileName = styled.p`
  margin-top: 12px;
  font-size: 14px;
  color: #6c757d;
  font-style: italic;
`;

export const StyledModal = styled.div`
  .ant-modal-header {
    background-color: #fafafa;
    border-bottom: 1px solid #eaeaea;
  }

  .ant-modal-title {
    font-weight: 600;
    font-size: 18px;
  }

  .ant-modal-footer {
    background-color: #fafafa;
    border-top: 1px solid #eaeaea;
  }
`;

export const StyledTable = styled.div`
  margin-top: 20px;

  .ant-table {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  }

  .ant-table-thead > tr > th {
    background-color: #f0f2f5;
    font-weight: 600;
    color: #2c3e50;
  }

  .ant-table-tbody > tr > td {
    font-size: 14px;
  }

  .ant-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px 8px;
    font-size: 14px;
    border-radius: 8px;
  }

  .ant-btn > .anticon {
    font-size: 16px;
  }

  @media (max-width: 768px) {
    overflow-x: auto;
    .ant-table {
      min-width: 600px;
    }
  }
`;

export const ControlBar = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const SearchInput = styled(Input)`
  width: 100%;
  border-radius: 10px;
`;

export const FilterSelect = styled(Select)`
  width: 100%;
  border-radius: 10px;
`;
