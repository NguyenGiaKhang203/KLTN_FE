import React from 'react';
import { Row, Col, Card, Button, Tag } from 'antd';
import { ClassCardWrapper } from './style';

const ClassCard = ({
  title,
  program,
  students,
  startDate,
  room,
  lessonsDone,
  time,
  teacher,
  days,
}) => {
  return (
    <ClassCardWrapper>
      <div className="top-line" />
      <Card bordered={false}>
        <div className="card-header">
          <h3>{title}</h3>
          <span className="start-date">Bắt đầu: {startDate}</span>
        </div>

        <Row gutter={[12, 12]} className="info-grid">
          <Col span={12}><strong>Chương trình:</strong> {program}</Col>
          <Col span={12}><strong>Học viên:</strong> {students}</Col>

          <Col span={12}><strong>Phòng học:</strong> {room}</Col>
          <Col span={12}><strong>Giờ học:</strong> {time}</Col>

          <Col span={12}><strong>Số ca đã học:</strong> {lessonsDone}</Col>
          <Col span={12}><strong>Chủ nhiệm:</strong> {teacher}</Col>

          <Col span={24}>
            <strong>Ngày học:</strong>{' '}
            {days.map((day, index) => (
              <Tag color="blue" key={index}>{day}</Tag>
            ))}
          </Col>
        </Row>

        <div className="card-footer">
          <Button type="primary">Xem kết quả học tập</Button>
        </div>
      </Card>
    </ClassCardWrapper>
  );
};

export default ClassCard;
