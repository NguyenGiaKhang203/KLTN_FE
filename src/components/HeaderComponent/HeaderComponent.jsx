// ✅ HeaderComponent.jsx
import React, { useState, useEffect } from "react";
import { Col, Badge, Popover, Modal } from "antd";
import {
  UserOutlined,
  ShoppingCartOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "../../redux/slices/userSlice";
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
    localStorage.removeItem("user");
    navigate("/sign-in");
  };

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
      <WrapperContentPopup onClick={() => navigate("/schedule")}>
        Lịch học
      </WrapperContentPopup>
      <WrapperContentPopup onClick={() => navigate("/my-order")}>
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
            <WrapperTextHeader to="/introduce">Giới Thiệu</WrapperTextHeader>
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
