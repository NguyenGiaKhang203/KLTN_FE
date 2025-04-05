import styled from 'styled-components';

export const ClassCardWrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;
  border-radius: 16px;
  border: 1px solid #fff;
  overflow: hidden; /* Quan trọng để bo góc cả vạch */

  .ant-card {
    border-radius: 0; /* Bo góc đã xử lý ở ngoài wrapper */
    background-color: #f0f7ff;
    box-shadow: 0 4px 16px rgba(24, 144, 255, 0.1);
    padding: 12px;
    width: 100%;
  }

  .card-wrapper {
    position: relative;
    width: 100%;
  }

  .top-line {
    height: 3px;
    width: 100%;
    background-color: #1890ff;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;

    h3 {
      font-size: 16px;
      font-weight: 600;
      color: #1d39c4;
      margin: 0;
    }

    .start-date {
      font-size: 13px;
      color: #888;
    }
  }

  .info-grid {
    font-size: 14px;
    color: #333;
  }

  .ant-tag {
    margin-right: 6px;
    margin-top: 4px;
  }

  .card-footer {
    text-align: right;
    margin-top: 16px;

    .ant-btn-primary {
      background-color: #1890ff;
      border-color: #1890ff;
      font-weight: 500;
      border-radius: 6px;
      padding: 0 20px;
    }
  }
`;
