import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as UserService from "../../services/UserService";
import { jwtDecode } from "jwt-decode";
import * as message from "../../components/Message/Message";
import { updateUser } from "../../redux/slides/userSlide";
import InputForm from "../../components/InputForm/InputForm";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import Loading from "../../components/LoadingComponent/LoadingComponent";
import ButtonComponent from "../../components/ButtonComponents/ButtonComponents";
import "./style.css";
const SignInPages = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const mutation = useMutationHooks((data) => UserService.loginUser(data));
  const { data, isLoading, isSuccess, isError, error } = mutation; // Get `error` from mutation
  console.log("data", data);

  useEffect(() => {
    if (isSuccess) {
      const redirectPath = location?.state || "/";
      navigate(redirectPath);
      localStorage.setItem("access_token", JSON.stringify(data?.access_token));
      localStorage.setItem(
        "refresh_token",
        JSON.stringify(data?.refresh_token)
      );
      if (data?.access_token) {
        const decoded = jwtDecode(data?.access_token);
        if (decoded?.id) {
          handleGetDetailsUser(decoded?.id, data?.access_token);
        }
      }
    }

    if (isError) {
      const errorMessage =
        error?.response?.data?.message ||
        "An error occurred. Please try again.";
      message.error(errorMessage);
    }
  }, [isSuccess, isError, error]);

  const handleGetDetailsUser = async (id, token) => {
    const refreshToken = JSON.parse(localStorage.getItem("refresh_token"));
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token, refreshToken }));
  };

  const handleNavigateSignUp = () => {
    navigate("/sign-up");
  };

  const handleNavigateForgotPass = () => {
    navigate("/forgot-password");
  };

  const handleOnChangeEmail = (value) => {
    setEmail(value);
  };

  const handleOnChangePassword = (value) => {
    setPassword(value);
  };

  const handleSignIn = () => {
    setErrorMessage("");
    mutation.mutate({ email, password });
  };
  return (
    <div className="signin-container">
      <div className="signin-form">
        <div className="signin-content">
          <h1 style={{ textAlign: "center" }}>Hello Chess</h1>
          <p style={{ marginBottom: "15px", fontSize: "18px" }}>Đăng nhập</p>
          <InputForm
            className="signin-input"
            placeholder="Abc@gmail.com"
            value={email}
            onChange={handleOnChangeEmail}
          />
          <div style={{ position: "relative" }}>
            <span
              onClick={() => setIsShowPassword((prev) => !prev)}
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
              className="signin-input"
              value={password}
              onChange={handleOnChangePassword}
            />
          </div>
          {errorMessage && (
            <span style={{ color: "red" }}>
              {error?.response?.data?.message}
            </span>
          )}
          {/* <Loading isLoading={isLoading}> */}
          <ButtonComponent
            disabled={!email || !password}
            onClick={handleSignIn}
            size={40}
            styleButton={{
              background: "rgb(255, 57, 69)",
              height: "45px",
              width: "100%",
              border: "none",
              borderRadius: "4px",
              margin: "18px 0 10px",
            }}
            textbutton="Đăng nhập"
            styleTextButton={{
              color: "#fff",
              fontSize: "15px",
              fontWeight: "700",
            }}
          />
          {/* </Loading> */}
          <p>
            <div
              className="signin-link__forgot"
              onClick={handleNavigateForgotPass}
            >
              Quên mật khẩu?
            </div>
          </p>
          <p className="signin-link__signup">
            Chưa có tài khoản?{" "}
            <span className="link__signup" onClick={handleNavigateSignUp}>
              Tạo tài khoản
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPages;
