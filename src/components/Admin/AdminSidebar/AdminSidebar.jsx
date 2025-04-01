import React from 'react';
import { Layout, Menu } from 'antd';
import {
  AppstoreOutlined,
  CalendarOutlined,
  DollarOutlined,
  TeamOutlined,
  UserOutlined,
  DropboxOutlined,
  GiftOutlined,
  BarChartOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { SidebarWrapper, LogoSection } from './style';
import { Link, useLocation } from 'react-router-dom';

const { Sider } = Layout;

const Sidebar = () => {
  const location = useLocation();

  return (
    <Sider width={240} theme="dark">
      <SidebarWrapper>
        <LogoSection>
          <img src="/logo.png" alt="King-chess" />
          <h3>KING-CHESS </h3>
          <span className="status">● Online</span>
        </LogoSection>
        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[location.pathname]}
        >
          <Menu.Item key="/classes" icon={<AppstoreOutlined />}><Link to="/classes">Danh sách lớp</Link></Menu.Item>
          <Menu.Item key="/schedule" icon={<CalendarOutlined />}><Link to="/schedule">Thời khóa biểu</Link></Menu.Item>
          <Menu.Item key="/finance" icon={<DollarOutlined />}><Link to="/finance">Quản lý thu chi</Link></Menu.Item>
          <Menu.Item key="/students" icon={<TeamOutlined />}><Link to="/students">Học viên</Link></Menu.Item>
          <Menu.Item key="/teachers" icon={<UserOutlined />}><Link to="/teachers">Giáo viên</Link></Menu.Item>
          <Menu.Item key="/warehouse" icon={<DropboxOutlined />}><Link to="/warehouse">Quản lý kho</Link></Menu.Item>
          <Menu.Item key="/rewards" icon={<GiftOutlined />}><Link to="/rewards">Đổi sao lấy quà</Link></Menu.Item>
          <Menu.Item key="/reports" icon={<BarChartOutlined />}><Link to="/reports">Báo cáo</Link></Menu.Item>
          <Menu.Item key="/help" icon={<QuestionCircleOutlined />}><Link to="/help">Trợ giúp</Link></Menu.Item>
          <Menu.Item key="/logout" icon={<LogoutOutlined />}><Link to="/logout">Thoát</Link></Menu.Item>
        </Menu>
      </SidebarWrapper>
    </Sider>
  );
};

export default Sidebar;
