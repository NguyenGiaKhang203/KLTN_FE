import styled from 'styled-components';

export const ScheduleContainer = styled.div`
  padding: 32px 48px;
  background: #e3eaf2;
  border-radius: 10px;
  width: 100%;
  max-width: 100%;
  min-height: 95vh; /* ✅ Trang dài hơn */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;


export const ScheduleTable = styled.table`
  width: 100%;
  margin-bottom: 40px; 
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
  height: 100px; 
  background-color: #fff;
  overflow: hidden;
  padding: 0px 4px;
  vertical-align: middle;
`;


export const ClassCard = styled.div`
  width: 70px;
  height: 100%; // full chiều cao của cell
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
`;



export const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;

  .left {
    display: flex;
    align-items: center;
    gap: 8px;

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

    .ant-picker {
      border-radius: 6px;
      height: 32px;
    }

    .date-range {
      font-size: 13px;
      font-weight: 500;
      color: #0d47a1;
      margin-left: 12px;
    }
  }

  .right {
    display: flex;
    gap: 6px;

    .tab {
      background: transparent;
      border: none;
      padding: 6px 10px;
      border-radius: 6px;
      font-size: 13px;
      cursor: pointer;
      color: #666;
    }

    .tab.active {
      background-color: #d1dbe7;
      color: #111;
      font-weight: 600;
    }
  }
`;
