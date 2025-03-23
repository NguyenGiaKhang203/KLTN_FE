import SignUpPage from "../pages/SignUpPages/SignUpPage";
import SignInPage from "../pages/SignInPages/SignInPages";
import HomePage from "../pages/HomePages/HomePage";
import CoursePage from "../pages/CoursePages/CoursePage";
import ForgotPasswordPage from "../pages/ForgotPasswordPages/ForgotPasswordPage";
import OrderPage from "../pages/OrderPages/OrderPages";
import ProfilePage from "../pages/ProfilePages/ProfilePages";
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
    isShowFooter: false,
  },
  {
    path: "/sign-in",
    page: SignInPage,
    isShowHeader: false,
    isShowFooter: false,
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
  {
    path:"/order",
    page: OrderPage,
    isShowHeader:true,
    isShowFooter:true,
  },
  {
    path:"/profile-user",
    page: ProfilePage,
    isShowHeader:true,
    isShowFooter:false
  }
];
