import SignUpPage from "../pages/SignUpPages/SignUpPage";
import SignInPage from "../pages/SignInPages/SignInPages";
import HomePage from "../pages/HomePages/HomePage";
import CoursePage from "../pages/CoursePages/CoursePage";
import ForgotPasswordPage from "../pages/ForgotPasswordPages/ForgotPasswordPage";
import OrderPage from "../pages/OrderPages/OrderPages";
import ProfilePage from "../pages/ProfilePages/ProfilePages";
import CourseDetailPage from "../pages/CourseDetailPage/CourseDetailPage";
import AdminLayout from "../pages/Admin/AdminLayout/AdminLayout";
import ClassPage from "../pages/Admin/ClassPage/ClassPage";
import BlogPage from "../pages/BlogPages/BlogPage";
import AboutPage from "../pages/AboutPages/AboutPage";
import AdminDashboard from "../pages/Admin/AdminDashboard/AdminDashboard";
import SchedulePage from "../pages/Admin/SchedulePage/SchedulePage";
import StudentPage from "../pages/Admin/StudentPage/StudentPage";
import ContactPage from "../pages/ContactPages/ContactPage";
import TeacherPage from "../pages/Admin/TeacherPage/TeacherPage";
import ExamPage from "../pages/Admin/ExamPage/ExamPage";
import PaymentManagement from "../pages/Admin/PaymentManagementPage/PaymentManagement";
import ReportPage from "../pages/Admin/ReportPage/ReportPage";
import AssessPage from "../pages/Admin/AssessPage/AssessPage";
import AttendancePage from "../pages/Admin/AttendancePage/AttendancePage";
import StudentschedulePage from "../pages/StudentschedulePage/StudentschedulePage";
import AccessDeniedPage from "../pages/AccessDeniedPage/AccessDeniedPage";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import AttendanceManagement from "../pages/AttendanceManagement/AttendanceManagement";
import BlogManagementPage from "../pages/Admin/BlogManagementPage/BlogManagementPage";
import ExamListPage from "../pages/ExamListPage/ExamListPage";
import ExamResultPage from "../pages/ExamResultPage/ExamResultPage";
import BlogDetailPage from "../pages/BlogDetailsPage/BlogDetailPage";
import OrderSuccessPage from "../pages/OrderSuccesPage/OrderSuccesPage";
import MyOrderPage from "../pages/MyOrderPage/MyOrderPage";
import ScoreManagement from "../pages/ScoreManagementPage/ScoreManagementPage";

export const routes = [
  // Public Pages
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
    path: "/course-details/:id",
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
    path: "/order-success",
    page: OrderSuccessPage,
    isShowHeader: true,
    isShowFooter: false,

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
    path: "/blogs-detail/:id",
    page: BlogDetailPage,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: "/about",
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
  {
    path: "/schedule",
    page: StudentschedulePage,
    isShowHeader: true,
    isShowFooter: false,
  },
  {
    path: "/*",
    page: AccessDeniedPage,
  },
  {
    path: "/payment",
    page: PaymentPage,
    isShowHeader: true,
    isShowFooter: false,
  },
  {
    path: "/exam",
    page: ExamListPage,
    isShowHeader: true,
    isShowFooter: false,
  },
  {
    path: "/exam-result",
    page: ExamResultPage,
    isShowHeader: true,
    isShowFooter: false,
  },
  {
    path: "/my-orders",
    page: MyOrderPage,
    isShowHeader: true,
    isShowFooter: false,
  },

  //  Admin Routes
  {
    path: "/system/admin",
    isPrivated: true,
    layout: AdminLayout,
    allowedRoles: ["admin"], // ✅ Phân quyền ở đây
    children: [
      {
        path: "",
        page: AdminDashboard,
      },
      {
        path: "classes",
        page: ClassPage,
      },
      {
        path: "courses",
        page: CoursePage,
      },
      {
        path: "students",
        page: StudentPage,
      },
      {
        path: "teachers",
        page: TeacherPage,
      },
      {
        path: "assess",
        page: AssessPage,
      },

      {
        path: "payment",
        page: PaymentManagement,
      },
      {
        path: "assess",
        page: AssessPage,
      },
      {
        path: "report",
        page: ReportPage,
      },
      {
        path: "blog",
        page: BlogManagementPage,
      },
    ],
  },
  // Teacher Routes
  {
    path: "/system/teacher",
    layout: AdminLayout,
    isPrivated: true,
    allowedRoles: ["teacher"],
    children: [
      { path: "", page: AdminDashboard },
      {
        path: "exams",
        page: ExamPage,
      },
      {
        path: "attendance",
        page: AttendancePage,
      },
      {
        path: "schedule",
        page: SchedulePage,
      },
      {
        path: "attendance-management",
        page: AttendanceManagement,
      },
      {
        path: "score-management",
        page: ScoreManagement,
      },

    ],
  },
];