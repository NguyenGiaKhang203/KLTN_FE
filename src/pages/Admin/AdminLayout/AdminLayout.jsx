import React from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../../../components/Admin/AdminSidebar/AdminSidebar";
import Header from "../../../components/Admin/AdminHeader/AdminHeader";
import { Wrapper, Content, Main } from "./style";

import AdminDashboard from "../../../pages/Admin/AdminDashboard/AdminDashboard";
import ClassPage from "../../Admin/ClassPage/ClassPage";
import SchedulePage from "../SchedulePage/SchedulePage";
import CoursePage from "../CoursePage/CoursePage";
import StudentPage from "../StudentPage/StudentPage";
import TeacherPage from "../TeacherPage/TeacherPage";
import ExamPage from "../ExamPage/ExamPage";
import PaymentManagement from "../PaymentManagementPage/PaymentManagement";
import ReportPage from "../ReportPage/ReportPage";
import AssessPage from "../AssessPage/AssessPage";
import AttendancePage from "../AttendancePage/AttendancePage";


const AdminLayout = ({ children }) => {
  const location = useLocation();

  const renderPage = () => {
    if (location.pathname === "/system/admin/classes") {
      return <ClassPage />;
    }
    if (location.pathname === "/system/admin/schedule") {
      return <SchedulePage />;
    }
    if (location.pathname === "/system/admin/courses") {
      return <CoursePage />;
    }
    if (location.pathname === "/system/admin/students") {
      return <StudentPage />;
    }
    if (location.pathname === "/system/admin/teachers") {
      return <TeacherPage />;
    }
    if (location.pathname === "/system/admin/exams") {
      return <ExamPage />;
    }
    if (location.pathname === "/system/admin/payment") {
      return <PaymentManagement />;
    }
    if (location.pathname === "/system/admin/report") {
      return <ReportPage />;
    }
    if (location.pathname === "/system/admin/assess") {
      return <AssessPage />;
    }
    if (location.pathname === "/system/admin/attendance") {
      return <AttendancePage />;
    }
    if (location.pathname === "/system/admin/payment") {
      return <PaymentManagement/>
    }
    if (location.pathname === "/system/admin/report") {
      return <ReportPage/>
    }
    return <AdminDashboard />;
  };

  return (
    <Wrapper>
      <Sidebar />
      <Content>
        <Header />
        <div>{children}</div>
        <Main>{renderPage()}</Main>
      </Content>
    </Wrapper>
  );
};

export default AdminLayout;
