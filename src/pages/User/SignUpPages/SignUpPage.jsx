import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import * as UserService from "../../../services/UserService";
import { useMutationHooks } from "../../../hooks/useMutationHooks";
import InputForm from "../../../components/InputForm/InputForm";
import ButtonComponent from "../../../components/ButtonComponent/ButtonComponent";
import {
  SignupContainer,
  SignupForm,
  SignupContent,
  StyledInputWrapper,
  EyeIcon,
  StyledLinkText,
  LinkNavigate,
} from "./style";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [buttonText, setButtonText] = useState("Send OTP");
  const [isResend, setIsResend] = useState(false);
  const [timer, setTimer] = useState(0);
  const [showOtpButton, setShowOtpButton] = useState(true); // kiểm soát hiển thị nút
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
      toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
      navigate("/sign-in");
    } else if (isError) {
      const errorMessage = error?.message || "Đã có lỗi xảy ra. Vui lòng thử lại.";
      toast.error(errorMessage);
    }
  }, [isSuccess, isError, error]);

  const handleClickSendOtp = () => {
    if (!email) {
      toast.warning("Vui lòng nhập email trước khi gửi OTP.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.warning("Email không đúng định dạng.");
      return;
    }

    if (!isResend) {
      handleSendOtp();
      setIsResend(true);
    } else {
      handleReSendOtp();
    }

    // Ẩn nút và bắt đầu đếm ngược
    setShowOtpButton(false);
    setTimer(60);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setShowOtpButton(true);
          setButtonText("Resend OTP");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSendOtp = async () => {
    try {
      const res = await UserService.sendOtp({ email });
      res?.status === "OK"
        ? toast.success(res.message)
        : toast.error(res.message);
    } catch (err) {
      toast.error("Lỗi khi gửi OTP.");
    }
  };

  const handleReSendOtp = async () => {
    try {
      const res = await UserService.resendOtp({ email });
      res?.status === "OK"
        ? toast.success(res.message)
        : toast.error(res.message);
    } catch {
      toast.error("Không thể gửi lại mã OTP.");
    }
  };

  const handleSignUp = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !password || !confirmPassword || !otp) {
      toast.warning("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    if (!emailRegex.test(email)) {
      toast.warning("Email không đúng định dạng.");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      toast.warning("Mật khẩu phải có ít nhất 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt.");
      return;
    }

    if (password !== confirmPassword) {
      toast.warning("Mật khẩu xác nhận không khớp.");
      return;
    }

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
            <EyeIcon onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}>
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
            <InputForm
              placeholder="Enter OTP"
              value={otp}
              onChange={setOtp}
            />
          </StyledInputWrapper>

          {showOtpButton && (
            <ButtonComponent
              textbutton={`${buttonText}`}
              onClick={handleClickSendOtp}
              styleButton={{
                background: "rgb(255,57,69)",
                border: "none",
                marginBottom: "10px",
              }}
              styleTextButton={{ color: "#fff", fontSize: "15px" }}
            />
          )}

          {!showOtpButton && timer > 0 && (
            <p style={{ marginBottom: "10px", color: "white", fontSize: "14px" }}>
              Vui lòng chờ {timer}s để gửi lại mã OTP.
            </p>
          )}

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

      <ToastContainer position="top-right" autoClose={3000} />
    </SignupContainer>
  );
};

export default SignUpPage;
