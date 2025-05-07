import React, { useState } from "react";
import { List, Badge, Modal } from "antd";
import {
  NotificationItem,
  NotificationContent,
  NotificationTime,
  NotificationModalContent
} from "./style";

const NotificationList = ({ notifications = [] }) => {
  const [selectedNotification, setSelectedNotification] = useState(null);

  const handleItemClick = (item) => {
    setSelectedNotification(item);
  };

  const handleCloseModal = () => {
    setSelectedNotification(null);
  };

  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={notifications}
        renderItem={(item) => (
          <NotificationItem
            key={item.id}
            unread={item.unread}
            onClick={() => handleItemClick(item)}
          >
            <NotificationContent>
              {item.content}
              {item.unread && (
                <Badge dot color="blue" style={{ marginLeft: 8 }} />
              )}
              <NotificationTime>{item.time}</NotificationTime>
            </NotificationContent>
          </NotificationItem>
        )}
      />

      <Modal
        title={selectedNotification?.title || "Chi tiết thông báo"}
        open={!!selectedNotification}
        onCancel={handleCloseModal}
        footer={null}
        centered
        width={600} // Tăng kích thước modal
      >
        <NotificationModalContent>
          <div className="content">{selectedNotification?.detail || "Không có thêm thông tin chi tiết."}</div>
          <div className="time">{selectedNotification?.time}</div>
        </NotificationModalContent>
      </Modal>

    </>
  );
};

export default NotificationList;
