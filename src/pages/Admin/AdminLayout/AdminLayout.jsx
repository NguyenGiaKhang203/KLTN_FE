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
      return <CoursePage />
    }
    if (location.pathname === "/system/admin/students") {
      return <StudentPage/>
    }
    return <AdminDashboard />;
  };

  return (
    <Wrapper>
      <Sidebar />
      <Content>
        <Header />
        <div>{children}</div>
        <Main>
          {renderPage()}
        </Main>
      </Content>
    </Wrapper>
  );
};

export default AdminLayout;
