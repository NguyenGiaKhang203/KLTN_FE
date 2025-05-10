import React, { useState } from "react";
import { List, Badge, Modal, message } from "antd";
import {
  NotificationItem,
  NotificationContent,
  NotificationTime,
  NotificationModalContent
} from "./style";

const NotificationList = ({ notifications = [], onNotificationClick }) => {
  const [selectedNotification, setSelectedNotification] = useState(null);

  const handleItemClick = (item) => {
    setSelectedNotification(item);

    // Cập nhật trạng thái đã đọc cho UI
    if (!item.read) {
      onNotificationClick(item.id); // Gọi callback để cập nhật danh sách
    }
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
            unread={!item.read}
            onClick={() => handleItemClick(item)}
          >
            <NotificationContent>
              {item.message}
              {!item.read && (
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
        width={600}
      >
        <NotificationModalContent>
          <div className="content">
            {selectedNotification?.message || "Không có thêm thông tin chi tiết."}
          </div>
          <div className="time">{selectedNotification?.time}</div>
        </NotificationModalContent>
      </Modal>
    </>
  );
};

export default NotificationList;
