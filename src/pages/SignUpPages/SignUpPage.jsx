import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import * as Message from "../../components/Message/Message";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHooks";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import {
  SignupContainer,
  SignupForm,
  SignupContent,
  StyledInputWrapper,
  EyeIcon,
  StyledLinkText,
  LinkNavigate,
} from "./style";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [buttonText, setButtonText] = useState("Send OTP");
  const [isResend, setIsResend] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");

  const mutation = useMutationHooks((data) => UserService.signupUser(data));
  const { data, isLoading, isSuccess, isError, error } = mutation;

  useEffect(() => {
    if (isSuccess) {
      Message.success("Bạn đã đăng ký thành công! Vui lòng đăng nhập.");
      navigate("/sign-in");
    } else if (isError) {
      const errorMessage =
        error?.response?.data?.message || "Đã có lỗi xảy ra. Vui lòng thử lại.";
      Message.error(errorMessage);
    }
  }, [isSuccess, isError, error]);

  const handleClickSendOtp = () => {
    if (!isResend) {
      handleSendOtp();
      setButtonText("Resend OTP");
      setIsResend(true);
      setTimer(60);

      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setButtonText("Resend OTP");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      handleReSendOtp();
    }
  };

  const handleSendOtp = async () => {
    try {
      const res = await UserService.sendOtp({ email });
      res?.status === "OK"
        ? Message.success(res.message)
        : Message.error(res.message);
    } catch {
      Message.error("Lỗi khi gửi OTP.");
    }
  };

  const handleReSendOtp = async () => {
    try {
      await UserService.sendOtp({ email });
      Message.success("Mã OTP đã được gửi lại!");
    } catch {
      Message.error("Không thể gửi lại mã OTP.");
    }
  };

  const handleSignUp = () => {
    mutation.mutate({ email, password, confirmPassword, otp });
  };

  return (
    <SignupContainer>
      <SignupForm>
        <SignupContent>
          <h1 style={{ textAlign: "center" }}>Hello Chess</h1>
          <p style={{ marginBottom: "15px", fontSize: "18px" }}>
            Tạo tài khoản
          </p>

          <StyledInputWrapper>
            <InputForm
              placeholder="Abc@gmail.com"
              value={email}
              onChange={setEmail}
            />
          </StyledInputWrapper>

          <StyledInputWrapper style={{ position: "relative" }}>
            <EyeIcon onClick={() => setIsShowPassword(!isShowPassword)}>
              {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </EyeIcon>
            <InputForm
              placeholder="Password"
              type={isShowPassword ? "text" : "password"}
              value={password}
              onChange={setPassword}
            />
          </StyledInputWrapper>

          <StyledInputWrapper style={{ position: "relative" }}>
            <EyeIcon
              onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
            >
              {isShowConfirmPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </EyeIcon>
            <InputForm
              placeholder="Confirm Password"
              type={isShowConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={setConfirmPassword}
            />
          </StyledInputWrapper>

          <StyledInputWrapper>
            <InputForm placeholder="Enter OTP" value={otp} onChange={setOtp} />
          </StyledInputWrapper>

          <ButtonComponent
            textbutton={`${buttonText} ${
              isResend && timer > 0 ? `(${timer})` : ""
            }`}
            onClick={handleClickSendOtp}
            styleButton={{
              background: "rgb(255,57,69)",
              border: "none",
              marginBottom: "10px",
            }}
            styleTextButton={{ color: "#fff", fontSize: "15px" }}
          />

          <ButtonComponent
            disabled={!email || !password || !confirmPassword || !otp}
            onClick={handleSignUp}
            size={40}
            styleButton={{
              background: "rgb(255,57,69)",
              height: "48px",
              width: "100%",
              border: "none",
              borderRadius: "4px",
              margin: "16px 0 10px",
            }}
            textbutton="Đăng ký"
            styleTextButton={{
              color: "#fff",
              fontSize: "15px",
              fontWeight: "700",
            }}
          />

          <StyledLinkText>
            Bạn đã có tài khoản?{" "}
            <LinkNavigate onClick={() => navigate("/sign-in")}>
              Đăng nhập
            </LinkNavigate>
          </StyledLinkText>
        </SignupContent>
      </SignupForm>
    </SignupContainer>
  );
};

export default SignUpPage;
