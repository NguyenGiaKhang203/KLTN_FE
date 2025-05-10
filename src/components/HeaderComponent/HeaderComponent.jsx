import React, { useState, useEffect } from "react";
import { Col, Badge, Popover, Modal, Dropdown, Menu, Drawer, message } from "antd";
import {
  UserOutlined,
  ShoppingCartOutlined,
  BellOutlined,
  ExclamationCircleOutlined,
  MenuOutlined,
  FileTextOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "../../redux/slices/userSlice";
import { resetOrderState } from "../../redux/slices/orderSlice";
import Logo from "../../assets/Logo1.png";
import Loading from "../LoadingComponent/LoadingComponent";
import NotificationList from "../NotificationList/NotificationList";
import {
  WrapperHeaderContainer,
  WrapperHeader,
  WrapperLogo,
  WrapperNavLinks,
  WrapperTextHeader,
  WrapperTextHeaderSmall,
  WrapperHeaderAccount,
  WrapperAvatar,
  WrapperIcon,
  WrapperUsername,
  WrapperLoginSection,
  WrapperCartIcon,
  WrapperContentPopup,
  WrapperLogoLink,
  LogoImage,
  customModalStyles,
  WrapperMobileMenuButton,
} from "./style";
import * as NotificationService from "../../services/NotificationService";

const HeaderComponent = ({ isHiddenCart = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const order = useSelector((state) => state.order);

  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [notifications, setNotifications] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await NotificationService.getAllNotification();
        if (response.status === 'OK') {
          setNotifications(response.data);
        } else {
          message.error("Không thể tải danh sách thông báo");
        }
      } catch (error) {
        message.error("Có lỗi xảy ra khi tải thông báo");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (user) {
      setUserName(user.name || user.email);
      setUserAvatar(user.avatar);
    }
  }, [user]);

  const handleNavigateLogin = () => {
    navigate("/sign-in");
  };

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    dispatch(resetUser());
    dispatch(resetOrderState());
    localStorage.removeItem("persist:root");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    setUserName("");
    setUserAvatar("");
    navigate("/");
  };
  const handleNotificationRead = (notificationId) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === notificationId ? { ...item, read: true } : item
      )
    );
  };
  
  const examMenu = (
    <Menu
      items={[
        {
          key: "do-exam",
          icon: <FileTextOutlined />,
          label: <span onClick={() => navigate("/exam")}>Làm bài thi</span>,
        },
        {
          key: "view-result",
          icon: <SolutionOutlined />,
          label: <span onClick={() => navigate("/exam-result")}>Xem kết quả</span>,
        },
      ]}
    />
  );

  const renderNavLinks = (isMobile = false) => (
    <>
      <WrapperTextHeader to="/" style={isMobile ? { fontSize: "20px", display: "block", marginBottom: "16px" } : {}}>
        Trang Chủ
      </WrapperTextHeader>
      <WrapperTextHeader to="/courses" style={isMobile ? { fontSize: "20px", display: "block", marginBottom: "16px" } : {}}>
        Khóa Học
      </WrapperTextHeader>
      <WrapperTextHeader to="/blogs" style={isMobile ? { fontSize: "20px", display: "block", marginBottom: "16px" } : {}}>
        Bài Viết
      </WrapperTextHeader>
      <WrapperTextHeader to="/about" style={isMobile ? { fontSize: "20px", display: "block", marginBottom: "16px" } : {}}>
        Giới Thiệu
      </WrapperTextHeader>
      <WrapperTextHeader to="/contact" style={isMobile ? { fontSize: "20px", display: "block", marginBottom: "16px" } : {}}>
        Liên Hệ
      </WrapperTextHeader>
    </>
  );

  const content = (
    <div>
      <WrapperContentPopup onClick={() => navigate("/profile-user")}>
        Thông tin người dùng
      </WrapperContentPopup>
      {user?.isAdmin && (
        <WrapperContentPopup onClick={() => navigate("/system/admin")}>
          Quản lý hệ thống
        </WrapperContentPopup>
      )}
      {user?.isTeacher && (
        <WrapperContentPopup onClick={() => navigate("/system/teacher")}>
          Quản lý của giảng viên
        </WrapperContentPopup>
      )}
      {!user?.isTeacher && !user?.isAdmin && (
        <>
          <WrapperContentPopup onClick={() => navigate("/schedule")}>
            Lịch học
          </WrapperContentPopup>
          <Dropdown overlay={examMenu} trigger={["click"]} placement="leftTop">
            <WrapperContentPopup style={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
              Bài thi
            </WrapperContentPopup>
          </Dropdown>
        </>
      )}
      <WrapperContentPopup onClick={() => navigate("/my-orders")}>
        Đơn hàng của tôi
      </WrapperContentPopup>
      <WrapperContentPopup
        onClick={() => {
          setIsOpenPopup(false);
          setShowLogoutModal(true);
        }}
      >
        Đăng xuất
      </WrapperContentPopup>
    </div>
  );

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <WrapperHeaderContainer style={{
        position: "sticky",
        top: 0,
        zIndex: 999,
        transition: "transform 0.3s ease",
        transform: showHeader ? "translateY(0)" : "translateY(-100%)",
      }}>
        <WrapperHeader>
          <WrapperLogo>
            <WrapperLogoLink to="/">
              <LogoImage src={Logo} alt="logo" />
            </WrapperLogoLink>
          </WrapperLogo>

          <WrapperMobileMenuButton onClick={() => setIsDrawerVisible(true)}>
            <MenuOutlined style={{ fontSize: "24px", color: "#000" }} />
          </WrapperMobileMenuButton>

          <WrapperNavLinks>
            {renderNavLinks()}
          </WrapperNavLinks>

          {!isHiddenCart && (
            <WrapperCartIcon onClick={() => navigate("/order")}>
              <Badge count={order?.orderItems?.length} size="small">
                <ShoppingCartOutlined className="icon" />
              </Badge>
              <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
            </WrapperCartIcon>
          )}

          <Popover
            content={
              <NotificationList
                notifications={notifications}
                onNotificationClick={handleNotificationRead}
              />
            }
            trigger="click"
            placement="bottomRight"
          >
            <WrapperCartIcon>
              <Badge
                count={Array.isArray(notifications) ? notifications.filter(n => !n.read).length : 0}
                size="small"
              >
                <BellOutlined className="icon" />
              </Badge>
            </WrapperCartIcon>
          </Popover>



          <Col>
            <Loading isLoading={loading}>
              <WrapperHeaderAccount>
                {userAvatar ? (
                  <WrapperAvatar src={userAvatar} alt="avatar" />
                ) : (
                  <WrapperIcon as={UserOutlined} />
                )}
                {user?.access_token ? (
                  <Popover
                    content={content}
                    trigger="click"
                    open={isOpenPopup}
                    onOpenChange={() => setIsOpenPopup((prev) => !prev)}
                  >
                    <WrapperUsername>{userName}</WrapperUsername>
                  </Popover>
                ) : (
                  <WrapperLoginSection onClick={handleNavigateLogin}>
                    <WrapperTextHeaderSmall>Đăng nhập/Đăng ký</WrapperTextHeaderSmall>
                  </WrapperLoginSection>
                )}
              </WrapperHeaderAccount>
            </Loading>
          </Col>
        </WrapperHeader>
      </WrapperHeaderContainer>

      <Drawer
        placement="left"
        onClose={() => setIsDrawerVisible(false)}
        open={isDrawerVisible}
      >
        {renderNavLinks(true)}
      </Drawer>

      <Modal
        title="Xác nhận đăng xuất"
        open={showLogoutModal}
        onOk={handleConfirmLogout}
        onCancel={() => setShowLogoutModal(false)}
        okText="Đăng xuất"
        cancelText="Hủy"
        okType="danger"
        centered
        width={460}
        styles={customModalStyles}
        icon={<ExclamationCircleOutlined />}
      >
        <p style={{ fontSize: "16px", marginBottom: 0 }}>
          Bạn có chắc chắn muốn đăng xuất khỏi hệ thống không?
        </p>
      </Modal>
    </>
  );
};

export default HeaderComponent;
