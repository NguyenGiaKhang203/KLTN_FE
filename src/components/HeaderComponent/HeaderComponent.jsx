// src/components/HeaderComponent.jsx

import React, { useState, useEffect } from "react";
import { Col, Badge, Popover } from "antd";
import { UserOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../services/UserService";
import { resetUser } from "../../redux/slices/userSlice";
import Loading from "../LoadingComponent/LoadingComponent";
import Logo from "../../assets/Logo1.png";
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
} from "./style";

const HeaderComponent = ({ isHiddenCart = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);

  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [isOpenPopup, setIsOpenPopup] = useState(false);
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

  const handleLogout = async () => {
    setLoading(true);
    await UserService.logoutUser();
    dispatch(resetUser());
    setLoading(false);
  };

  const handleClickNavigate = (route) => {
    if (route === "logout") {
      handleLogout();
    } else {
      navigate(route);
    }
    setIsOpenPopup(false);
  };

  const content = (
    <div>
      <WrapperContentPopup onClick={() => handleClickNavigate("/profile-user")}>
        Thông tin người dùng
      </WrapperContentPopup>
      {user?.isAdmin && (
        <WrapperContentPopup
          onClick={() => handleClickNavigate("/system/admin")}
        >
          Quản lí hệ thống
        </WrapperContentPopup>
      )}
      <WrapperContentPopup onClick={() => handleClickNavigate("/my-order")}>
        Đơn hàng của tôi
      </WrapperContentPopup>
      <WrapperContentPopup onClick={() => handleClickNavigate("logout")}>
        Đăng xuất
      </WrapperContentPopup>
    </div>
  );
  return (
    <WrapperHeaderContainer>
      <WrapperHeader>
        <WrapperLogo span={7}>
          <WrapperLogo span={7}>
            <WrapperLogoLink to="/">
              <LogoImage src={Logo} alt="logo" />
            </WrapperLogoLink>
          </WrapperLogo>
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
  );
};

export default HeaderComponent;
