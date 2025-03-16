/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "../CSS/LoginForm.css";
import { FaUser, FaLock } from "react-icons/fa";

const LoginForm = ({ onSwitch }) => {
  return (
    <div className="wrapper">
      <form action="">
        <h1>Đăng nhập</h1>
        <div className="input-box">
          <input type="text" placeholder="Tên đăng nhập" required />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input type="password" placeholder="Mật khẩu" required />
          <FaLock className="icon" />
        </div>
        <div className="remember-forgot">
          <label>
            <input type="checkbox" />
            Ghi nhớ
          </label>
          <a href="#">Quên mật khẩu?</a>
        </div>

        <button type="submit">Đăng nhập</button>

        <div className="register-link">
          <p>
            Bạn chưa có tài khoản? <a href="#">Đăng ký111</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
