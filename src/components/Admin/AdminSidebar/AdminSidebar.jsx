import React, { useState } from "react";
import { Layout, Menu } from "antd";
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
  CarryOutOutlined,
  TrophyOutlined,
  FileTextOutlined,

} from "@ant-design/icons";
import { SidebarWrapper, LogoSection, StyledModal } from "./style";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../../assets/Logo2.png";
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "../../../redux/slices/userSlice";

const { Sider } = Layout;

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const user = useSelector((state) => state.user.user);
  const role = user?.role;

  const showLogoutConfirm = () => {
    setIsLogoutModalOpen(true);
  };

  const handleConfirmLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    dispatch(resetUser());
    setIsLogoutModalOpen(false);
    navigate("/sign-in");
  };

  const handleCancelLogout = () => {
    setIsLogoutModalOpen(false);
  };

  return (
    <Sider width={240} theme="dark">
      <SidebarWrapper>
        <Link to="/">
          <LogoSection>
            <img src={Logo} alt="King-chess" />
            <h3>KING-CHESS</h3>
            <span className="status">● Online</span>
          </LogoSection>
        </Link>

        <Menu mode="inline" theme="dark" selectedKeys={[location.pathname]}>
          {/* 👑 ADMIN MENU */}
          {user?.isAdmin === true && (
            <>
              <Menu.Item key="/system/admin/courses" icon={<BookOutlined />}>
                <Link to="/system/admin/courses">Quản lý khóa học</Link>
              </Menu.Item>
              <Menu.Item
                key="/system/admin/classes"
                icon={<AppstoreOutlined />}
              >
                <Link to="/system/admin/classes">Danh sách lớp</Link>
              </Menu.Item>

              <Menu.Item key="/system/admin/students" icon={<TeamOutlined />}>
                <Link to="/system/admin/students">Học viên</Link>
              </Menu.Item>
              <Menu.Item key="/system/admin/teachers" icon={<UserOutlined />}>
                <Link to="/system/admin/teachers">Giảng viên</Link>
              </Menu.Item>
              <Menu.Item key="/system/admin/payment" icon={<DollarOutlined />}>
                <Link to="/system/admin/payment">Quản lý thanh toán</Link>
              </Menu.Item>
              <Menu.Item key="/system/admin/blog" icon={<FileTextOutlined />}>
                <Link to="/system/admin/blog">Quản lý bài viết</Link>
              </Menu.Item>
              <Menu.Item key="/system/admin/assess" icon={<CommentOutlined />}>
                <Link to="/system/admin/assess">Quản lý đánh giá</Link>
              </Menu.Item>
              <Menu.Item key="/system/admin/report" icon={<BarChartOutlined />}>
                <Link to="/system/admin/report">Báo cáo & Thống kê</Link>
              </Menu.Item>
            </>
          )}

          {/* 👨‍🏫 TEACHER MENU */}
          {user?.isTeacher === true && (
            <>
              <Menu.Item
                key="/system/teacher/schedule"
                icon={<CalendarOutlined />}
              >
                <Link to="/system/teacher/schedule">Lịch giảng dạy</Link>
              </Menu.Item>
              <Menu.Item key="/system/teacher/attendance" icon={<FormOutlined />}>
                <Link to="/system/teacher/attendance">Điểm danh</Link>
              </Menu.Item>
              <Menu.Item key="/system/teacher/attendance-management" icon={<CarryOutOutlined />}>
                <Link to="/system/teacher/attendance-management">Quản lý điểm danh</Link>

              </Menu.Item>
              <Menu.Item key="/system/teacher/exams" icon={<DropboxOutlined />}>
                <Link to="/system/teacher/exams">Quản lý bài thi</Link>
              </Menu.Item>
              <Menu.Item key="/system/teacher/score-management" icon={<TrophyOutlined />}>
                <Link to="/system/teacher/score-management">Quản lý điểm</Link>
              </Menu.Item>
            </>
          )}

          {/* 🚪 Đăng xuất */}
          <Menu.Item
            key="logout"
            icon={<LogoutOutlined />}
            onClick={showLogoutConfirm}
          >
            Thoát
          </Menu.Item>
        </Menu>
      </SidebarWrapper>

      {/* Modal xác nhận đăng xuất */}
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
