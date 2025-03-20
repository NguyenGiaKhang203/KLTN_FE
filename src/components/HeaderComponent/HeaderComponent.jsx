import { Badge, Col, Popover, Menu, Dropdown } from 'antd';
import React, { useState, useEffect } from 'react';
import {
  WrapperContentPopup,
  WrapperHeader,
  WrapperHeaderAccount,
  WrapperTextHeader,
  WrapperTextHeaderSmall
} from './style';
import { UserOutlined, CaretDownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from '../../services/UserService';
import { resetUser } from '../../redux/slides/userSlide';
import Loading from '../LoadingComponent/LoadingComponent';
import './style.css';

const HeaderComponent = ({ isHiddenCart = false }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const order = useSelector((state) => state.order);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setUserName(user.name || user.email);
      setUserAvatar(user.avatar);
    }
  }, [user]);

  const handleNavigateLogin = () => {
    navigate('/sign-in');
  };

  const handleLogout = async () => {
    setLoading(true);
    await UserService.logoutUser();
    dispatch(resetUser());
    setLoading(false);
  };

  const handleClickNavigate = (route) => {
    if (route === 'logout') {
      handleLogout();
    } else {
      navigate(route);
    }
    setIsOpenPopup(false);
  };

  const content = (
    <div>
      <WrapperContentPopup onClick={() => handleClickNavigate('/profile-user')}>Thông tin người dùng</WrapperContentPopup>
      {user?.isAdmin && (
        <WrapperContentPopup onClick={() => handleClickNavigate('/system/admin')}>Quản lí hệ thống</WrapperContentPopup>
      )}
      <WrapperContentPopup onClick={() => handleClickNavigate('/my-order')}>Đơn hàng của tôi</WrapperContentPopup>
      <WrapperContentPopup onClick={() => handleClickNavigate('logout')}>Đăng xuất</WrapperContentPopup>
    </div>
  );

  const menuHoc = (
    <Menu>
      <Menu.Item onClick={() => navigate('/hoc/coban')}>Cơ bản</Menu.Item>
      <Menu.Item onClick={() => navigate('/hoc/nangcao')}>Nâng cao</Menu.Item>
    </Menu>
  );

  const menuDaisyChess = (
    <Menu>
      <Menu.Item onClick={() => navigate('/ve-daisy/gioithieu')}>Giới thiệu</Menu.Item>
      <Menu.Item onClick={() => navigate('/ve-daisy/lienhe')}>Liên hệ</Menu.Item>
    </Menu>
  );

  return (
    <div className="header-container">
      <WrapperHeader>
        <Col span={7} className="logo-container">
          <WrapperTextHeader to="/">Daisy Chess</WrapperTextHeader>
        </Col>
        <Col span={12} className="nav-links">
          <WrapperTextHeader to="/">Trang Chủ</WrapperTextHeader>
          <WrapperTextHeader to="/course">Khóa Học</WrapperTextHeader>
          <Dropdown overlay={menuHoc} trigger={['hover']} placement="bottom">
            <WrapperTextHeader to="#">Học <CaretDownOutlined /></WrapperTextHeader>
          </Dropdown>
          <WrapperTextHeader to="/bai-viet">Bài Viết</WrapperTextHeader>
          <Dropdown overlay={menuDaisyChess} trigger={['hover']} placement="bottom">
            <WrapperTextHeader to="#">Về Daisy Chess <CaretDownOutlined /></WrapperTextHeader>
          </Dropdown>
        </Col>
        {!isHiddenCart && (
          <div className="cart-icon" onClick={() => navigate('/order')}>
            <Badge count={order?.orderItems?.length} size="small">
              <ShoppingCartOutlined className="icon" />
            </Badge>
            <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
          </div>
        )}
        <Col span={5} className="account-section">
          <Loading isLoading={loading}>
            <WrapperHeaderAccount>
              {userAvatar ? (
                <img src={userAvatar} alt="avatar" className="avatar" />
              ) : (
                <UserOutlined className="icon" />
              )}
              {user?.access_token ? (
                <Popover content={content} trigger="click" open={isOpenPopup}>
                  <div className="username" onClick={() => setIsOpenPopup((prev) => !prev)}>
                    {userName}
                  </div>
                </Popover>
              ) : (
                <div className="login-section" onClick={handleNavigateLogin}>
                  <WrapperTextHeaderSmall>Đăng nhập/Đăng ký</WrapperTextHeaderSmall>
                </div>
              )}
            </WrapperHeaderAccount>
          </Loading>
        </Col>
      </WrapperHeader>
    </div>
  );
};

export default HeaderComponent;
