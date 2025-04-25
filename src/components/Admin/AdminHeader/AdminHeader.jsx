import React from "react";
import { useLocation } from "react-router-dom";
import { Select, Avatar, Badge } from "antd";
import { HomeFilled, BellOutlined, SearchOutlined } from "@ant-design/icons";
import { HeaderWrapper } from "./style";

const { Option } = Select;

const ClassPageHeader = () => {
  const location = useLocation();

  const getTitleFromPath = (pathname) => {
    if (pathname.includes("classes")) return "Danh sách lớp";
    if (pathname.includes("schedule")) return "Thời khóa biểu";
    if (pathname.includes("teacher/schedule")) return "Lịch dạy";
    if (pathname.includes("courses")) return "Quản lý khóa học";
    if (pathname.includes("attendance")) return "Điểm danh";
    if (pathname.includes("students")) return "Học sinh";
    if (pathname.includes("payment")) return "Quản lý thanh toán";
    if (pathname.includes("teachers")) return "Giảng viên";
    if (pathname.includes("exams")) return "Quản lý bài thi";
    if (pathname.includes("assess")) return "Quản lý đánh giá";
    if (pathname.includes("blog")) return "Quản lý bài viết";
    if (pathname.includes("report")) return "Báo cáo & thống kê";
    if (pathname.includes("score-management")) return "Quản lý điểm";
    return "Hệ thống";
  };

  const title = getTitleFromPath(location.pathname);

  return (
    <HeaderWrapper>
      <div className="left">
        <HomeFilled className="home-icon" />
        <span className="title">{title}</span>
      </div>

      <div className="right">
        <span className="location-label">
          <HomeFilled className="home-icon-inner" />
          Cơ sở số 1
        </span>

        {/* <Select defaultValue="2024-2025" className="year-select" bordered>
          <Option value="2023-2024">2023-2024</Option>
          <Option value="2024-2025">2024-2025</Option>
          <Option value="2025-2026">2025-2026</Option>
        </Select> */}

        {/* <SearchOutlined className="icon" /> */}
        <Badge count={2} size="small">
          <BellOutlined className="icon" />
        </Badge>
        <Avatar style={{ backgroundColor: "#ccc" }}>A</Avatar>
        <span className="username">admin</span>
      </div>
    </HeaderWrapper>
  );
};

export default ClassPageHeader;
