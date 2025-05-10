import SignUpPage from "../pages/User/SignUpPages/SignUpPage";
import SignInPage from "../pages/User/SignInPages/SignInPages";
import HomePage from "../pages/User/HomePages/HomePage";
import CoursePage from "../pages/User/CoursePages/CoursePage";
import ForgotPasswordPage from "../pages/User/ForgotPasswordPages/ForgotPasswordPage";
import OrderPage from "../pages/User/OrderPages/OrderPages";
import ProfilePage from "../pages/User/ProfilePages/ProfilePages";
import CourseDetailPage from "../pages/User/CourseDetailPage/CourseDetailPage";
import AdminLayout from "../pages/Admin/AdminLayout/AdminLayout";
import ClassPage from "../pages/Admin/ClassPage/ClassPage";
import BlogPage from "../pages/User/BlogPages/BlogPage";
import AboutPage from "../pages/User/AboutPages/AboutPage";
import AdminDashboard from "../pages/Admin/AdminDashboard/AdminDashboard";
import SchedulePage from "../pages/Teacher/SchedulePage/SchedulePage";
import StudentPage from "../pages/Admin/StudentPage/StudentPage";
import ContactPage from "../pages/User/ContactPages/ContactPage";
import TeacherPage from "../pages/Admin/TeacherPage/TeacherPage";
import ExamPage from "../pages/Teacher/ExamPage/ExamPage";
import PaymentManagement from "../pages/Admin/PaymentManagementPage/PaymentManagement";
import ReportPage from "../pages/Admin/ReportPage/ReportPage";
import AssessPage from "../pages/Admin/AssessPage/AssessPage";
import StudentschedulePage from "../pages/User/StudentschedulePage/StudentschedulePage";
import AccessDeniedPage from "../pages/User/AccessDeniedPage/AccessDeniedPage";
import PaymentPage from "../pages/User/PaymentPage/PaymentPage";
import AttendanceManagement from "../pages/Teacher/AttendanceManagement/AttendanceManagement";
import BlogManagementPage from "../pages/Admin/BlogManagementPage/BlogManagementPage";
import ExamListPage from "../pages/User/ExamListPage/ExamListPage";
import ExamResultPage from "../pages/User/ExamResultPage/ExamResultPage";
import BlogDetailPage from "../pages/User/BlogDetailsPage/BlogDetailPage";
import OrderSuccessPage from "../pages/User/OrderSuccesPage/OrderSuccesPage";
import MyOrderPage from "../pages/User/MyOrderPage/MyOrderPage";
import ScoreManagement from "../pages/Teacher/ScoreManagementPage/ScoreManagementPage";
import CourseSuggestion from "../pages/User/CourseSuggestionPage/CourseSuggestionPage";
import SuggettionManagement from "../pages/Admin/SuggestionManagement/SuggestionManagement";
import NotificationManagementAD from "../pages/Admin/NotificationManagementAD/NotificationManagementAD";

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
  {
    path: "/suggest-course",
    page: CourseSuggestion,
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
      {
        path: "suggest-management",
        page: SuggettionManagement,
      },
      {
        path: "notification-management",
        page: NotificationManagementAD,
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