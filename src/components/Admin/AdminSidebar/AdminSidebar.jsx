import React, { useState } from "react";
import { Layout, Menu, Modal } from "antd";
import {
  AppstoreOutlined,
  CalendarOutlined,
  DollarOutlined,
  TeamOutlined,
  UserOutlined,
  DropboxOutlined,
  BookOutlined,
  BarChartOutlined,
  CommentOutlined,
  LogoutOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { SidebarWrapper, LogoSection, StyledModal } from "./style";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../../assets/Logo2.png";

const { Sider } = Layout;

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const showLogoutConfirm = () => {
    setIsLogoutModalOpen(true);
  };

  const handleConfirmLogout = () => {
    // Xóa token, dữ liệu nếu có
    localStorage.removeItem("token");
    // Đóng modal
    setIsLogoutModalOpen(false);
    // Điều hướng về trang chủ
    navigate("/");
  };

  const handleCancelLogout = () => {
    setIsLogoutModalOpen(false);
  };

  return (
    <Sider width={240} theme="dark">
      <SidebarWrapper>
        <Link to="/system/admin">
          <LogoSection>
            <img src={Logo} alt="King-chess" />
            <h3>KING-CHESS</h3>
            <span className="status">● Online</span>
          </LogoSection>
        </Link>
        <Menu mode="inline" theme="dark" selectedKeys={[location.pathname]}>

          <Menu.Item key="/system/admin/classes" icon={<AppstoreOutlined />}>
            <Link to="/system/admin/classes">Danh sách lớp</Link>
          </Menu.Item>
          <Menu.Item key="/system/admin/schedule" icon={<CalendarOutlined />}>
            <Link to="/system/admin/schedule">Thời khóa biểu</Link>
          </Menu.Item>
          <Menu.Item key="/system/admin/courses" icon={<BookOutlined />}>
            <Link to="/system/admin/courses">Quản lý khóa học</Link>
          </Menu.Item>
          <Menu.Item key="/system/admin/students" icon={<TeamOutlined />}>
            <Link to="/system/admin/students">Học viên</Link>
          </Menu.Item>
          <Menu.Item key="/system/admin/teachers" icon={<UserOutlined />}>
            <Link to="/system/admin/teachers">Giảng viên</Link>
          </Menu.Item>
          <Menu.Item key="/system/admin/attendance" icon={<FormOutlined />}>
            <Link to="/system/admin/attendance">Điểm danh</Link>
          </Menu.Item>
          <Menu.Item key="/system/admin/exams" icon={<DropboxOutlined />}>
            <Link to="/system/admin/exams">Quản lý bài thi</Link>
          </Menu.Item>
          <Menu.Item key="/system/admin/payment" icon={<DollarOutlined />}>
            <Link to="/system/admin/payment">Quản lý thanh toán</Link>

          </Menu.Item>
          <Menu.Item key="/system/admin/assess" icon={<CommentOutlined />}>
            <Link to="/system/admin/assess">Quản lý đánh giá</Link>
          </Menu.Item>
          <Menu.Item key="/system/admin/report" icon={<BarChartOutlined />}>
            <Link to="/system/admin/report">Báo cáo & Thống kê</Link>
          </Menu.Item>

          {/* Thoát - không dùng Link để custom xác nhận */}
          <Menu.Item
            key="logout"
            icon={<LogoutOutlined />}
            onClick={showLogoutConfirm}
          >
            Thoát
          </Menu.Item>
        </Menu>
      </SidebarWrapper>

      {/* Modal xác nhận thoát */}
      <StyledModal
        title="Xác nhận đăng xuất"
        open={isLogoutModalOpen}
        onOk={handleConfirmLogout}
        onCancel={handleCancelLogout}
        okText="Đăng xuất"
        cancelText="Hủy"
      >
        <p>Bạn có chắc chắn muốn thoát không?</p>
      </StyledModal>
    </Sider>
  );
};

export default Sidebar;
