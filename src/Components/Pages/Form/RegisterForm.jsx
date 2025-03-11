/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "../CSS/RegisterForm.css";
const RegisterForm = ({ onSwitch }) => {
  return (
    <div className="wrapper-signup">
      <form action="">
        <h1>Đăng ký</h1>
        <div className="input-box input-name">
          <input type="text" placeholder="Họ" required />
          <input type="text" placeholder="Tên" required />
        </div>

        <div className="input-box">
          <input type="text" placeholder="Tên đăng nhập" required />
        </div>
        <div className="input-box">
          <input type="email" placeholder="Email (Gmail)" required />
        </div>
        <div className="input-box">
          <input type="text" placeholder="Mật khẩu" required />
        </div>
        <div className="input-box">
          <input type="text" placeholder="Xác nhận mật khẩu" required />
        </div>
        <div className="confirm-signup">
          <label>
            <input type="checkbox" />
            Tôi đồng ý với các điều khoản và sử dụng dịch vụ
          </label>
        </div>

        <button type="submit">Đăng ký</button>
        <div className="login-link">
          <p>
            Có phải bạn đã có tài khoản?{" "}
            <a href="#" onClick={onSwitch}>
              Đăng nhập
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
