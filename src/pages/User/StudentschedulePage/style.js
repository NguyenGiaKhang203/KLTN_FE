import styled from "styled-components";

export const ScheduleContainer = styled.div`
  padding: 24px 32px;
  background: #f9fbfc;
  border-radius: 10px;
  height: 85vh;
  width: 100%;
  margin-bottom: 50px;

  @media (max-width: 768px) {
    padding: 16px;
    height: auto;
  }
`;

export const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
  flex-wrap: wrap;
  gap: 10px;

  .left {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;

    .nav-btn,
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

export const ScheduleTableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  border-radius: 8px;
  border: 1px solid #ccc;

  @media (max-width: 768px) {
    padding-bottom: 10px;
  }
`;

export const ScheduleTable = styled.table`
  width: 100%;
  min-width: 768px;
  border-collapse: collapse;
  text-align: center;
  border-radius: 8px;
  overflow: hidden;
  height: 70vh;

  th,
  td {
    border: 1px solid #d0d7de;
    padding: 12px 8px;
    vertical-align: top;
    background-color: #fff;
  }

  th {
    background-color: #e3f2fd;
    color: #0d47a1;
    font-weight: 600;
    font-size: 14px;
  }

  @media (max-width: 768px) {
    th,
    td {
      font-size: 12px;
      padding: 8px 6px;
    }
  }

  @media (max-width: 480px) {
    th,
    td {
      font-size: 11px;
      padding: 6px 4px;
    }
  }
`;

export const TimeCell = styled.td`
  font-weight: 600;
  background-color: #f1f1f1;
  text-align: center;
  font-size: 14px;
  color: #333;

  .session {
    font-style: italic;
    color: #777;
    font-size: 12px;
    margin-top: 4px;
  }

  @media (max-width: 768px) {
    font-size: 12px;
    .session {
      font-size: 11px;
    }
  }

  @media (max-width: 480px) {
    font-size: 11px;
    .session {
      font-size: 10px;
    }
  }
`;

export const ClassCell = styled.td`
  min-height: 100px;
  background-color: #fff;
`;

export const ClassCard = styled.div`
  position: relative;
  background: #e3f2fd;
  border-left: 3px solid #1976d2;
  border-radius: 5px;
  padding: 4px 6px;
  font-size: 11px;
  color: #0d47a1;
  font-weight: 500;
  line-height: 1.3;
  cursor: default;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  transition: background-color 0.2s;

  &:hover {
    background-color: #bbdefb;
  }

  .class-name {
    font-weight: 600;
    font-size: 11.5px;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .tooltip {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 100;
    background: #ffffff;
    border: 1px solid #90caf9;
    border-radius: 5px;
    padding: 6px;
    color: #0d47a1;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
    width: max-content;
    min-width: 160px;
    max-width: 220px;
    white-space: normal;
    font-size: 11px;

    .line {
      margin-bottom: 3px;
      color: #333;
    }

    .label {
      font-weight: 600;
      color: #0d47a1;
      margin-right: 4px;
    }
  }

  &:hover .tooltip {
    display: block;
  }

  @media (max-width: 768px) {
    font-size: 10px;

    .tooltip {
      font-size: 10px;
      min-width: 140px;
    }

    .class-name {
      font-size: 10.5px;
    }
  }

  @media (max-width: 480px) {
    font-size: 9.5px;

    .tooltip {
      font-size: 9px;
      min-width: 120px;
    }

    .class-name {
      font-size: 10px;
    }
  }
`;
