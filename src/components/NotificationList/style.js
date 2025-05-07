import styled from "styled-components";

export const NotificationItem = styled.li`
  background-color: ${(props) => (props.unread ? "#f0f2f5" : "#fff")};
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 10px;
  list-style: none;
  cursor: pointer;
  transition: box-shadow 0.2s, background-color 0.2s;

  &:hover {
    background-color: #e6f7ff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
`;

export const NotificationContent = styled.div`
  font-size: 14px;
`;

export const NotificationTime = styled.div`
  font-size: 12px;
  color: #999;
  margin-top: 4px;
`;
export const NotificationModalContent = styled.div`
  .content {
    font-size: 15px;
    color: #333;
    line-height: 1.6;
    margin-bottom: 12px;
    white-space: pre-line; /* Giữ định dạng xuống dòng nếu có */
  }

  .time {
    font-size: 13px;
    color: #999;
    text-align: right;
  }
`;

