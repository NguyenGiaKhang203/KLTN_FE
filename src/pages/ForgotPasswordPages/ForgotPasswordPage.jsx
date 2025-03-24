import React, { useState } from "react";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import InputForm from "../../components/InputForm/InputForm";
import * as UserService from "../../services/UserService";
import Loading from "../../components/LoadingComponent/LoadingComponent";
import { message } from "antd";
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
    try {
      const res = await UserService.sendOtp({ email });
      if (res?.status === "OK") {
        message.success(res.message);
        setOtpSent(true);
      } else {
        message.error(res.message);
      }
    } catch (error) {
      message.error("Có lỗi xảy ra khi gửi mã OTP.");
    }
  };

  const handleResetPasswordWithOtp = async () => {
    setIsSubmitting(true);
    try {
      const res = await UserService.resetPassword({ email, otp, newPassword });
      if (res?.status === "SUCCESS") {
        message.success("Mật khẩu đã được thay đổi thành công.");
        navigate("/sign-in");
      } else {
        message.error(res.message);
      }
    } catch (error) {
      message.error("Có lỗi xảy ra khi đặt lại mật khẩu.");
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
              <p>Enter the OTP and your new password</p>
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
