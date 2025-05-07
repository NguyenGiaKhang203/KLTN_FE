import styled from 'styled-components';

export const ScheduleContainer = styled.div`
  padding: 32px 48px;
  background: #e3eaf2;
  border-radius: 10px;
  width: 100%;
  max-width: 100%;
  min-height: 95vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  @media (max-width: 768px) {
    padding: 24px 16px;
  }

  @media (max-width: 480px) {
    padding: 16px 8px;
  }
`;

export const ScheduleTableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const ScheduleTable = styled.table`
  width: 100%;
  margin-bottom: 40px;
  border-collapse: collapse;
  text-align: center;
  border-radius: 8px;
  overflow: hidden;
  min-width: 800px;
  
  th, td {
    border: 1px solid #d0d7de;
    padding: 8px 5px;
    vertical-align: top;
    background-color: #fff;
  }

  th {
    background-color: #e3f2fd;
    color: #0d47a1;
    font-weight: 600;
    font-size: 15px;
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    th, td {
      font-size: 14px;
      padding: 12px 8px;
    }
  }

  @media (max-width: 480px) {
    th, td {
      font-size: 12px;
      padding: 8px 4px;
    }
  }
`;

export const TimeCell = styled.td`
  font-weight: 600;
  background-color: #f1f1f1;
  text-align: center;
  font-size: 14px;
  color: #333;

  @media (max-width: 768px) {
    font-size: 13px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export const ClassCell = styled.td`
  height: 120px;
  background-color: #fff;
  overflow-x: auto;
  padding: 0px 4px;
  vertical-align: middle;
  white-space: nowrap;
  overflow-y: hidden;

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #d0d7de;
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    height: 100px;
  }

  @media (max-width: 480px) {
    height: 80px;
  }
`;

export const ClassCard = styled.div`
  min-width: 140px;
  max-width: 160px;
  height: 100%;
  background: #e6f2ff;
  border-left: 3px solid #1e88e5;
  border-radius: 4px;
  padding: 4px 6px;
  font-size: 12px;
  color: #0d47a1;
  line-height: 1.4;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1px;

  .class-name {
    font-weight: 600;
    font-size: 13px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .level,
  .teacher,
  .room {
    font-size: 11px;
    color: #444;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (max-width: 768px) {
    min-width: 120px;
    max-width: 140px;
  }

  @media (max-width: 480px) {
    min-width: 100px;
    max-width: 120px;
    font-size: 10px;
    .class-name {
      font-size: 11px;
    }
    .level,
    .teacher,
    .room {
      font-size: 9px;
    }
  }
`;
export const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }

  .left {
    display: flex;
    align-items: center;
    gap: 8px;

    @media (max-width: 768px) {
      gap: 6px;
      width: 100%;
      justify-content: space-between;
    }

    @media (max-width: 480px) {
      flex-wrap: wrap;
      gap: 4px;
    }

    .arrow-btn,
    .today-btn {
      background-color: #dce3ec;
      color: #000;
      padding: 6px 10px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 13px;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        background-color: #cbd5e1;
      }
    }
  }
`;
