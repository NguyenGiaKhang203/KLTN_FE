import React, { useState } from "react";
import ButtonComponent from "../../../components/ButtonComponent/ButtonComponent";
import InputForm from "../../../components/InputForm/InputForm";
import * as UserService from "../../../services/UserService";
import Loading from "../../../components/LoadingComponent/LoadingComponent";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import {
  PageContainer,
  FormContainer,
  WrapperLeft,
  StyledInput,
  ForgotText,
  ForgotNavigate,
  ForgotSignup,
} from "./style";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleNavigateSignUp = () => {
    navigate("/sign-up");
  };

  const handleNavigateSignIn = () => {
    navigate("/sign-in");
  };

  const handleSendOtp = async () => {
    if (!email) {
      toast.error("Vui lòng nhập email");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Email không hợp lệ");
      return;
    }

    try {
      const res = await UserService.sendOtp({ email });

      if (res?.status === "OK") {
        toast.success(res.message || "OTP đã được gửi thành công");
        setOtpSent(true);
      } else {
        toast.error(res.message || "Không thể gửi OTP");
      }
    } catch (error) {
      // ✅ Hiển thị lỗi từ response API khi email không tồn tại
      toast.error(error?.message || "Có lỗi xảy ra khi gửi mã OTP.");
    }
  };

  const handleResetPasswordWithOtp = async () => {
    if (!otp || !newPassword) {
      toast.error("Vui lòng nhập đầy đủ OTP và mật khẩu mới");
      return
    }
  
    // ✅ Kiểm tra mật khẩu phải có ít nhất 6 ký tự + đủ thành phần
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(newPassword)) {
      toast.error(
        "Mật khẩu phải có ít nhất 6 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt."
      );
      return;
    }
  
    setIsSubmitting(true);
    try {
      const res = await UserService.resetPassword({ email, otp, newPassword });
      if (res?.status === "SUCCESS") {
        toast.success("Mật khẩu đã được thay đổi thành công.");
        navigate("/sign-in");
      } else {
        toast.error(res.message || "Không thể đặt lại mật khẩu.");
      }
    } catch (error) {
      toast.error(error?.message || "Có lỗi xảy ra khi đặt lại mật khẩu.");
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <PageContainer>
      <FormContainer>
        <WrapperLeft>
          <h1 style={{ textAlign: "center", marginBottom: "15px" }}>
            Quên mật khẩu
          </h1>

          {!otpSent ? (
            <>
              <p style={{ marginBottom: "10px", fontSize: "16px" }}>
                Nhập email để nhận OTP
              </p>
              <StyledInput>
                <InputForm
                  placeholder="Abc@gmail.com"
                  value={email}
                  onChange={setEmail}
                />
              </StyledInput>
              <ButtonComponent
                disabled={!email.length}
                onClick={handleSendOtp}
                size={40}
                styleButton={{
                  background: "rgb(255, 57, 69)",
                  height: "45px",
                  width: "100%",
                  border: "none",
                  borderRadius: "4px",
                  margin: "15px 0 10px",
                }}
                textbutton={"Send OTP"}
                styleTextButton={{
                  color: "#fff",
                  fontSize: "15px",
                  fontWeight: "700",
                }}
              />
            </>
          ) : (
            <>
              <p>Nhập mã OTP và mật khẩu mới</p>
              <StyledInput>
                <InputForm placeholder="OTP" value={otp} onChange={setOtp} />
              </StyledInput>
              <StyledInput>
                <InputForm
                  placeholder="New Password"
                  type="password"
                  value={newPassword}
                  onChange={setNewPassword}
                />
              </StyledInput>
              <Loading isLoading={isSubmitting}>
                <ButtonComponent
                  disabled={!otp.length || !newPassword.length}
                  onClick={handleResetPasswordWithOtp}
                  size={40}
                  styleButton={{
                    background: "rgb(255, 57, 69)",
                    height: "48px",
                    width: "100%",
                    border: "none",
                    borderRadius: "4px",
                    margin: "26px 0 10px",
                  }}
                  textbutton={"Reset Password"}
                  styleTextButton={{
                    color: "#fff",
                    fontSize: "15px",
                    fontWeight: "700",
                  }}
                />
              </Loading>
            </>
          )}

          <ForgotText>
            Bạn đã có tài khoản?{" "}
            <ForgotNavigate onClick={handleNavigateSignIn}>
              Đăng Nhập
            </ForgotNavigate>
          </ForgotText>
          <ForgotSignup>
            Chưa có tài khoản?{" "}
            <span onClick={handleNavigateSignUp}>Tạo tài khoản</span>
          </ForgotSignup>
        </WrapperLeft>
      </FormContainer>
    </PageContainer>
  );
};

export default ForgotPasswordPage;
