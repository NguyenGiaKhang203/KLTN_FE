import SignUpPage from "../pages/SignUpPages/SignUpPage";
import SignInPage from "../pages/SignInPages/SignInPages";
import HomePage from "../pages/HomePage/HomePage";
import CoursePage from "../pages/CoursePage/CoursePage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage/ForgotPasswordPage";
export const routes = [
  {
    path: "/",
    page: HomePage,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: "/sign-up",
    page: SignUpPage,
    isShowHeader: false,
  },
  {
    path: "/sign-in",
    page: SignInPage,
    isShowHeader: false,
  },
  {
    path: "/course",
    page: CoursePage,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: "/forgot-password",
    page: ForgotPasswordPage,
    isShowHeader: false,
    isShowFooter: false,
  },
];
