// SchedulePage.styles.js
import styled from 'styled-components';

export const ScheduleContainer = styled.div`
  padding: 24px 32px;
  background: #e3eaf2;
  border-radius: 10px;
  height: 85vh;
  width: 100%;
  max-width: 100%;
`;

export const FilterSection = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;

  .ant-select {
    min-width: 180px;
  }

  .ant-select-selector {
    border-radius: 8px !important;
    border: 1px solid #ccc !important;
    box-shadow: none !important;
    background-color: #fff;
  }

  .ant-select:hover .ant-select-selector {
    border-color: #1890ff !important;
  }
`;

export const ScheduleTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  border-radius: 8px;
  overflow: hidden;
  height: 70vh;

  th, td {
    border: 1px solid #d0d7de;
    padding: 14px 10px;
    vertical-align: top;
    background-color: #fff;
  }

  th {
    background-color: #e3f2fd;
    color: #0d47a1;
    font-weight: 600;
    font-size: 15px;
  }
`;

export const TimeCell = styled.td`
  font-weight: 600;
  background-color: #f1f1f1;
  text-align: center;
  font-size: 14px;
  color: #333;
`;

export const ClassCell = styled.td`
  min-height: 100px;
  background-color: #fff;
`;

export const ClassCard = styled.div`
  background: #e6f2ff;
  border-left: 4px solid #1e88e5;
  border-radius: 6px;
  padding: 6px 8px;
  text-align: left;
  font-size: 12px;
  color: #0d47a1;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  margin-bottom: 4px;
  line-height: 1.4;

  .class-name {
    font-weight: 600;
    font-size: 13px;
    margin-bottom: 2px;
  }

  .level {
    font-style: italic;
    margin-bottom: 2px;
    color: #555;
    font-size: 11.5px;
  }

  .teacher,
  .room {
    font-size: 11.5px;
    color: #444;
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;
