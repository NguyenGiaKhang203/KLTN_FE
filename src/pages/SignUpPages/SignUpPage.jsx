import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import "./style.css";
import ButtonComponent from "../../components/ButtonComponents/ButtonComponents";
import InputForm from "../../components/InputForm/InputForm";
import Loading from "../../components/LoadingComponent/LoadingComponent";
import * as Message from "../../components/Message/Message";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [buttonText, setButtonText] = useState("Send OTP");
  const [isResend, setIsRensend] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");

  const handleOnchangeOtp = (value) => setOtp(value);
  const handleOnchangeEmail = (value) => setEmail(value);
  const handleOnchangePassword = (value) => setPassword(value);
  const handleOnchangeConfirmPassword = (value) => setConfirmPassword(value);

  const mutation = useMutationHooks((data) => UserService.signupUser(data));
  const { data, isLoading, isSuccess, isError, error } = mutation;

  useEffect(() => {
    if (isSuccess) {
      Message.success("Bạn đã đăng ký thành công ! Vui lòng đăng nhập.");
      handleNavigateSignIn();
    } else if (isError) {
      const errorMessage =
        error?.response?.data?.Message || "Có lỗi xảy ra. Vui lòng thử lại.";
      Message.error(errorMessage);
    }
  }, [isSuccess, isError, error]);
  console.log(isSuccess);

  const handleSendOtp = async () => {
    try {
      const res = await UserService.sendOtp({ email });
      if (res?.status === "OK") {
        Message.success(res.Message);
      } else {
        Message.error(res.Message);
      }
    } catch (error) {
      message.error("Có lỗi xảy ra khi gửi mã OTP.");
    }
  };

  const handleReSendOtp = async () => {
    try {
      await UserService.sendOtp({ email });
      Message.success("Mã OTP đã được gửi!");
    } catch (error) {
      Message.error("Có lỗi xảy ra khi gửi mã OTP");
    }
  };

  const handleNavigateSignIn = () => navigate("/sign-in");

  const handleSignUp = () => {
    mutation.mutate({ email, password, confirmPassword, otp });
  };

  const handleClick = () => {
    if (!isResend) {
      handleSendOtp();
      setButtonText("Resend OTP");
      setIsRensend(true);
      setTimer(60);
      const interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(interval);
            setButtonText("Resend OTP");
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    } else {
      handleReSendOtp();
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <div className="signup-content">
          <h1 style={{ textAlign: "center" }}>Hello Chess</h1>
          <p style={{ marginBottom: "15px", fontSize: "18px" }}>
            Tạo tài khoản
          </p>
          <InputForm
            className="signup-input"
            placeholder="Abc@gmail.com"
            value={email}
            onChange={handleOnchangeEmail}
          />
          <div style={{ position: "relative" }}>
            <span
              onClick={() => setIsShowPassword(!isShowPassword)}
              style={{
                zIndex: 10,
                position: "absolute",
                top: "4px",
                right: "8px",
              }}
            >
              {isShowPassword ? (
                <EyeFilled className="Pic-Eye" />
              ) : (
                <EyeInvisibleFilled className="Pic-Eye" />
              )}
            </span>
            <InputForm
              placeholder="Password"
              type={isShowPassword ? "text" : "password"}
              className="signup-input"
              value={password}
              onChange={handleOnchangePassword}
            />
          </div>
          <div style={{ position: "relative" }}>
            <span
              onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
              style={{
                zIndex: 10,
                position: "absolute",
                top: "4px",
                right: "8px",
              }}
            >
              {isShowConfirmPassword ? (
                <EyeFilled className="Pic-Eye" />
              ) : (
                <EyeInvisibleFilled className="Pic-Eye" />
              )}
            </span>
            <InputForm
              placeholder="Confirm Password"
              type={isShowConfirmPassword ? "text" : "password"}
              className="signup-input"
              value={confirmPassword}
              onChange={handleOnchangeConfirmPassword}
            />
            <InputForm
              placeholder="Enter OTP"
              value={otp}
              className="signup-input"
              onChange={handleOnchangeOtp}
            />
            <ButtonComponent
              textbutton={buttonText}
              onClick={handleClick}
              styleButton={{ background: "rgb(255,57,69)", border: "none" }}
              styleTextButton={{ color: "#fff", fontSize: "15px" }}
            >
              {buttonText} {isResend && timer > 0 && `(${timer})`}
            </ButtonComponent>
          </div>
          {data?.stats === "ERR" && typeof data?.message === "string" && (
            <span style={{ color: "red" }}>{data.Message}</span>
          )}
          {/* <Loading isLoading={isLoading}> */}
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
              margin: "26px 0 10px",
            }}
            textbutton="Đăng ký"
            styleTextButton={{
              color: "#fff",
              fontSize: "15px",
              fontWeight: "700",
            }}
          />
          {/* </Loading> */}
          <p className="signup-link__text">
            Bạn đã có tài khoản?{" "}
            <span className="link-navigate" onClick={handleNavigateSignIn}>
              Đăng Nhập
            </span>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
