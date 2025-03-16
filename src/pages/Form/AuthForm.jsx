import React, { useState } from "react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      {isLogin ? (
        <LoginForm onSwitch={() => setIsLogin(false)} />
      ) : (
        <RegisterForm onSwitch={() => setIsLogin(true)} />
      )}
    </div>
  );
};

export default AuthForm;
