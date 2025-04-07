import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHooks";
import * as message from "../../components/Message/Message";
import { updateUser } from "../../redux/slices/userSlice";
import InputForm from "../../components/InputForm/InputForm";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import {
  SigninContainer,
  SigninForm,
  SigninContent,
  StyledInputWrapper,
  EyeIcon,
  ForgotLink,
  SignupLink,
  BoldText,
} from "./style";

const SignInPages = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const mutation = useMutationHooks((data) => UserService.loginUser(data));
  const { data, isLoading, isSuccess, isError, error } = mutation;

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem('access_token', JSON.stringify(data?.access_token));
      localStorage.setItem('refresh_token', JSON.stringify(data?.refresh_token));
      const decoded = jwtDecode(data?.access_token);

      if (decoded?.id) {
        handleGetDetailsUser(decoded?.id, data?.access_token);
      }

      if (decoded?.isAdmin) {
        navigate("/system/admin");
      } else {
        const redirectPath = location?.state || "/";
        navigate(redirectPath);
      }
    }

    if (isError) {
      const errorMessage = error?.response?.data?.message || "Đã có lỗi xảy ra. Vui lòng thử lại.";
      message.error(errorMessage);
    }
  }, [isSuccess, isError, error]);

  const handleGetDetailsUser = async (id, token) => {
    const refreshToken = JSON.parse(localStorage.getItem("refresh_token"));
    try {
      const res = await UserService.getDetailsUser(id, token);
      console.log("Dữ liệu người dùng trả về:", res?.data);  // Kiểm tra dữ liệu trả về
      dispatch(updateUser({ ...res?.data, access_token: token, refreshToken }));
    } catch (error) {
      console.error("Lỗi khi lấy thông tin người dùng:", error);
    }
  };

  const handleSignIn = () => {
    setErrorMessage("");  // Xóa thông báo lỗi trước khi đăng nhập
    if (!email || !password) {
      setErrorMessage("Vui lòng điền đầy đủ thông tin.");
      return;
    }
    mutation.mutate({ email, password });
  };

  return (
    <SigninContainer>
      <SigninForm>
        <SigninContent>
          <h1 style={{ textAlign: "center" }}>Hello Chess</h1>
          <p style={{ marginBottom: "15px", fontSize: "18px" }}>Đăng nhập</p>

          <StyledInputWrapper>
            <InputForm
              placeholder="Abc@gmail.com"
              value={email}
              onChange={(val) => setEmail(val)}
            />
          </StyledInputWrapper>

          <StyledInputWrapper style={{ position: "relative" }}>
            <EyeIcon onClick={() => setIsShowPassword((prev) => !prev)}>
              {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </EyeIcon>
            <InputForm
              placeholder="Mật khẩu"
              type={isShowPassword ? "text" : "password"}
              value={password}
              onChange={(val) => setPassword(val)}
            />
          </StyledInputWrapper>

          {errorMessage && <span style={{ color: "red" }}>{errorMessage}</span>}

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

          <ForgotLink onClick={() => navigate("/forgot-password")}>
            Quên mật khẩu?
          </ForgotLink>

          <SignupLink>
            Chưa có tài khoản?{" "}
            <BoldText onClick={() => navigate("/sign-up")}>
              Tạo tài khoản
            </BoldText>
          </SignupLink>
        </SigninContent>
      </SigninForm>
    </SigninContainer>
  );
};

export default SignInPages;
