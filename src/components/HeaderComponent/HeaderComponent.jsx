import React, { useState, useEffect } from "react";
import { Col, Badge, Popover, Modal, Dropdown, Menu } from "antd";
import {
  UserOutlined,
  ShoppingCartOutlined,
  ExclamationCircleOutlined,
  DownOutlined,
  FileTextOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "../../redux/slices/userSlice";
import { resetOrderState } from "../../redux/slices/orderSlice";
import Logo from "../../assets/Logo1.png";
import Loading from "../LoadingComponent/LoadingComponent";
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
} from "./style";

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

    navigate("/");
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

          {/* ✅ Dropdown "Bài thi" đẹp */}
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

  return (
    <>
      <WrapperHeaderContainer>
        <WrapperHeader>
          <WrapperLogo span={7}>
            <WrapperLogoLink to="/">
              <LogoImage src={Logo} alt="logo" />
            </WrapperLogoLink>
          </WrapperLogo>

          <WrapperNavLinks span={12}>
            <WrapperTextHeader to="/">Trang Chủ</WrapperTextHeader>
            <WrapperTextHeader to="/courses">Khóa Học</WrapperTextHeader>
            <WrapperTextHeader to="/blogs">Bài Viết</WrapperTextHeader>
            <WrapperTextHeader to="/about">Giới Thiệu</WrapperTextHeader>
            <WrapperTextHeader to="/contact">Liên Hệ</WrapperTextHeader>
          </WrapperNavLinks>

          {!isHiddenCart && (
            <WrapperCartIcon onClick={() => navigate("/order")}>
              <Badge count={order?.orderItems?.length} size="small">
                <ShoppingCartOutlined className="icon" />
              </Badge>
              <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
            </WrapperCartIcon>
          )}

          <Col span={5}>
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
                    <WrapperTextHeaderSmall>
                      Đăng nhập/Đăng ký
                    </WrapperTextHeaderSmall>
                  </WrapperLoginSection>
                )}
              </WrapperHeaderAccount>
            </Loading>
          </Col>
        </WrapperHeader>
      </WrapperHeaderContainer>

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
