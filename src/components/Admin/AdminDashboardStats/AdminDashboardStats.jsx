import React from 'react';
import { Col, Row } from 'antd';
import { BankOutlined, TeamOutlined, UserOutlined, AppstoreAddOutlined } from '@ant-design/icons';
import { StyledCard } from './style';

const stats = [
  { label: 'Cơ sở', value: 5, icon: <BankOutlined />, color: '#00bcd4' },
  { label: 'Đang học', value: 73, icon: <TeamOutlined />, color: '#4caf50' },
  { label: 'Nhân viên', value: 14, icon: <UserOutlined />, color: '#ff9800' },
  { label: 'Lớp đang học', value: 8, icon: <AppstoreAddOutlined />, color: '#f44336' },
];

const DashboardStats = () => {
  return (
    <Row gutter={[16, 16]} style={{ marginBottom: 30 }}>
      {stats.map((stat, idx) => (
        <Col xs={24} sm={12} md={12} lg={6} key={idx}>
          <StyledCard $bg={stat.color}>
            {stat.icon}
            <h2>{stat.value}</h2>
            <p>{stat.label}</p>
          </StyledCard>
        </Col>
      ))}
    </Row>
  );
};

export default DashboardStats;
