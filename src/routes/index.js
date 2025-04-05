import SignUpPage from "../pages/SignUpPages/SignUpPage";
import SignInPage from "../pages/SignInPages/SignInPages";
import HomePage from "../pages/HomePages/HomePage";
import CoursePage from "../pages/CoursePages/CoursePage";
import ForgotPasswordPage from "../pages/ForgotPasswordPages/ForgotPasswordPage";
import OrderPage from "../pages/OrderPages/OrderPages";
import ProfilePage from "../pages/ProfilePages/ProfilePages";
import CourseDetailPage from "../components/CourseDetailComponent/CourseDetailComponent";
import AdminLayout from "../pages/Admin/AdminLayout/AdminLayout";
import ClassPage from "../pages/Admin/ClassPage/ClassPage";
import BlogPage from "../pages/BlogPages/BlogPage";
import AboutPage from "../pages/AboutPages/AboutPage";
import AdminDashboard from "../pages/Admin/AdminDashboard/AdminDashboard";
import SchedulePage from "../pages/Admin/SchedulePage/SchedulePage";
import StudentPage from "../pages/Admin/StudentPage/StudentPage";
import ContactPage from "../pages/ContactPages/ContactPage";

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
    path: "/blogs",
    page: BlogPage,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: "/introduce",
    page: AboutPage,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: "/contact",
    page: ContactPage,
    isShowHeader: true,
    isShowFooter: true,
  },
  // Admin Routes
  {
    path: "/system/admin",
    layout: AdminLayout,
    children: [
      {
        path: "", // /system/admin
        page: AdminDashboard,
      },
      {
        path: "classes", // /system/admin/classes
        page: ClassPage,
      },
      {
        path: "schedule",
        page: SchedulePage,
      },
      {
        path: "courses",
        page: CoursePage,
      },
      {
        path: "students",
        page: StudentPage,
      },
    ],
  },
];
