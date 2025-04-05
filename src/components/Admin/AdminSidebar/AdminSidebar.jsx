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
import Logo from "../../../assets/Logo2.png";

const { Sider } = Layout;

const Sidebar = () => {
  const location = useLocation();

  return (
    <Sider width={240} theme="dark">
      <SidebarWrapper>
        {/* Bọc LogoSection bằng Link */}
        <Link to="/system/admin">
          <LogoSection>
            <img src={Logo} alt="King-chess" />
            <h3>KING-CHESS</h3>
            <span className="status">● Online</span>
          </LogoSection>
        </Link>

        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[location.pathname]}
        >
          <Menu.Item key="/system/admin/classes" icon={<AppstoreOutlined />}>
            <Link to="/system/admin/classes">Danh sách lớp</Link>
          </Menu.Item>
          <Menu.Item key="/system/admin/schedule" icon={<CalendarOutlined />}>
            <Link to="/system/admin/schedule">Thời khóa biểu</Link>
          </Menu.Item>
          <Menu.Item key="/system/admin/courses" icon={<DollarOutlined />}>
            <Link to="/system/admin/courses">Quản lý khóa học</Link>
          </Menu.Item>
          <Menu.Item key="/system/admin/students" icon={<TeamOutlined />}>
            <Link to="/system/admin/students">Học viên</Link>
          </Menu.Item>
          <Menu.Item key="/system/admin/teachers" icon={<UserOutlined />}>
            <Link to="/system/admin/teachers">Giáo viên</Link>
          </Menu.Item>
          <Menu.Item key="/system/admin/warehouse" icon={<DropboxOutlined />}>
            <Link to="/system/admin/warehouse">Quản lý kho</Link>
          </Menu.Item>
          <Menu.Item key="/system/admin/rewards" icon={<GiftOutlined />}>
            <Link to="/system/admin/rewards">Đổi sao lấy quà</Link>
          </Menu.Item>
          <Menu.Item key="/system/admin/reports" icon={<BarChartOutlined />}>
            <Link to="/system/admin/reports">Báo cáo</Link>
          </Menu.Item>
          <Menu.Item key="/help" icon={<QuestionCircleOutlined />}>
            <Link to="/help">Trợ giúp</Link>
          </Menu.Item>
          <Menu.Item key="/logout" icon={<LogoutOutlined />}>
            <Link to="/logout">Thoát</Link>
          </Menu.Item>
        </Menu>
      </SidebarWrapper>
    </Sider>
  );
};

export default Sidebar;
