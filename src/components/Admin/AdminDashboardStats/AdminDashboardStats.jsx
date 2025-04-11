import React from 'react';
import { useState, useEffect } from "react";
import { Col, Row } from 'antd';
import { BankOutlined, TeamOutlined, UserOutlined, AppstoreAddOutlined } from '@ant-design/icons';
import { StyledCard } from './style';
import * as ClassService from "../../../services/ClassService";
import * as UserService from "../../../services/UserService";

const DashboardStats = () => {
  const [total, setTotal] = useState(0);
  const [totalTeachers, setTotalTeachers] = useState(0);
  const [totalClasses, setTotalClasses] = useState(0);
  const token = localStorage.getItem("access-token");

  const fetchClasses = async () => {
    try {
      const res = await ClassService.getAllClasses(token);
      const classes = res.data;
      const totalStudents = classes.reduce((acc, item) => acc + item.students.length, 0);
      setTotal(totalStudents);
    } catch (error) {
      console.error("Lỗi lấy danh sách lớp học:", error);
    }
  };

  const fetchTotalTeacher = async () => {
    try {
      const res = await UserService.getTotalTeachers();
      setTotalTeachers(res.totalTeachers);
    } catch (error) {
      console.error("Lỗi khi lấy tổng số giảng viên:", error);
    }
  };

  const fetchTotalClass = async () => {
    try {
      const res = await ClassService.getTotalClasses();
      setTotalClasses(res.totalClasses);
    } catch (error) {
      console.error("Lỗi khi lấy tổng số lớp:", error);
    }
  };

  useEffect(() => {
    fetchClasses();
    fetchTotalTeacher();
    fetchTotalClass();
  }, [token]);


  const stats = [
    { label: 'Cơ sở', value: 5, icon: <BankOutlined />, color: '#00bcd4' },
    { label: 'Đang học', value: total, icon: <TeamOutlined />, color: '#4caf50' },
    { label: 'Nhân viên', value: totalTeachers, icon: <UserOutlined />, color: '#ff9800' },
    { label: 'Lớp đang học', value: totalClasses, icon: <AppstoreAddOutlined />, color: '#f44336' },
  ];

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
