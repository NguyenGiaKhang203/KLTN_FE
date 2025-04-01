import SignUpPage from "../pages/SignUpPages/SignUpPage";
import SignInPage from "../pages/SignInPages/SignInPages";
import HomePage from "../pages/HomePages/HomePage";
import CoursePage from "../pages/CoursePages/CoursePage";
import ForgotPasswordPage from "../pages/ForgotPasswordPages/ForgotPasswordPage";
import OrderPage from "../pages/OrderPages/OrderPages";
import ProfilePage from "../pages/ProfilePages/ProfilePages";
import CourseDetailPage from "../components/CourseDetailComponent/CourseDetailComponent";
import AdminLayout from "../pages/Admin/AdminDashboard/AdminDashboard";
import ClassPage from "../pages/Admin/ClassPage/ClassPage";
import BlogPage from "../pages/BlogPages/BlogPage";
import AboutPage from "../pages/AboutPages/AboutPage";
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
    path: "/courses",
    page: CoursePage,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: "/course-details/1",
    page: CourseDetailPage,
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
    path: "/order",
    page: OrderPage,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: "/profile-user",
    page: ProfilePage,

    isShowHeader: true,
    isShowFooter: false,
  },
  {
    path: "/system/admin",
    page: AdminLayout,
    isShowHeader: false,
    isShowFooter: false,
  },
  {
    path: "system/admin/classes",
    page: ClassPage,
    isShowHeader: false,
    isShowFooter: false,
  },
  {
    path: "/blogs",
    page: BlogPage,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: "/gioithieu",
    page: AboutPage,
    isShowHeader: true,
    isShowFooter: true,
  },
];
