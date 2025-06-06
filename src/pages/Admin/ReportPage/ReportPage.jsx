import { useState, useEffect } from "react";
import { Statistic, Card, Row, Col, Select, DatePicker, Space } from "antd";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell,
  LineChart, Line,
  ResponsiveContainer
} from "recharts";
import dayjs from "dayjs";

import {
  Container,
  SectionTitle,
  ChartGrid,
  FilterRow,
  FilterLabel,
} from "./style";

import * as ClassService from "../../../services/ClassService";
import * as OrderService from "../../../services/OrderService";
import * as StatisticService from "../../../services/StatisficService";

const { Option } = Select;
const COLORS = ["#1890ff", "#13c2c2", "#52c41a", "#faad14", "#f5222d"];
const defaultMonth = dayjs().month() + 1;
const defaultYear = dayjs().year();

export default function ReportPage() {
  const [filterType, setFilterType] = useState("month");
  const [selectedMonth, setSelectedMonth] = useState(defaultMonth);
  const [selectedQuarter, setSelectedQuarter] = useState(1);
  const [selectedYear, setSelectedYear] = useState(defaultYear);
  const [total, setTotal] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [revenueData, setRevenueData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [studentGrowth, setStudentGrowth] = useState([]);

  useEffect(() => {
    fetchClasses();
    fetchTotalOrder();
    fetchTotalRevenue();
    fetchMonthlyRevenue(selectedYear);
    fetchCourseDistribution();
    fetchStudentGrowth(selectedYear);
  }, [selectedYear]);

  const fetchClasses = async () => {
    try {
      const res = await ClassService.getAllClasses();
      const classes = res.data;
      const totalStudents = classes.reduce((acc, item) => acc + item.students.length, 0);
      setTotal(totalStudents);
    } catch (error) {
      console.error("Lỗi lấy danh sách lớp học:", error);
    }
  };

  const fetchTotalOrder = async () => {
    try {
      const res = await OrderService.getTotalOrder();
      setTotalOrders(res.totalOrders);
    } catch (error) {
      console.error("Lỗi khi lấy tổng số đơn hàng:", error);
    }
  };

  const fetchTotalRevenue = async () => {
    try {
      const res = await OrderService.getTotalRevenue();
      setTotalRevenue(res.totalRevenue);
    } catch (error) {
      console.error("Lỗi khi lấy tổng số doanh thu:", error);
    }
  };

  const fetchMonthlyRevenue = async (year) => {
    try {
      const res = await StatisticService.getMonthlyRevenue(year);
      // Giả sử trả về mảng dạng [{ month: 1, revenue: 1000 }, ...]
      const formatted = res.map((item) => ({
        month: `T${item.month}`,
        revenue: item.revenue
      }));
      setRevenueData(formatted);
    } catch (error) {
      console.error("Lỗi lấy dữ liệu doanh thu theo tháng:", error);
    }
  };

  const fetchCourseDistribution = async () => {
    try {
      const res = await StatisticService.getCourseStudentDistribution();
      // Giả sử trả về dạng [{ name: "Cơ bản", value: 40 }, ...]
      setCourseData(res);
    } catch (error) {
      console.error("Lỗi lấy phân bố học viên theo khóa học:", error);
    }
  };

  const fetchStudentGrowth = async (year) => {
    try {
      const res = await StatisticService.getStudentGrowth(year);
      // Giả sử trả về dạng [{ month: 1, students: 20 }, ...]
      const formatted = res.map((item) => ({
        month: `T${item.month}`,
        students: item.students
      }));
      setStudentGrowth(formatted);
    } catch (error) {
      console.error("Lỗi lấy dữ liệu tăng trưởng học viên:", error);
    }
  };

  return (
    <Container>
      <SectionTitle>Thống kê tổng quan</SectionTitle>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card className="card-info total-students">
            <Statistic title="Tổng học viên" value={total} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="card-info orders">
            <Statistic title="Đơn hàng" value={totalOrders} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="card-info revenue">
            <Statistic title="Doanh thu" value={totalRevenue} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="card-info best-course">
            <Statistic title="Khóa học bán chạy" value="Cờ vua cơ bản" />
          </Card>
        </Col>
      </Row>

      <SectionTitle>Biểu đồ thống kê</SectionTitle>
      <ChartGrid>
        <Card title="Doanh thu theo tháng">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={revenueData} barCategoryGap={30}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip contentStyle={{ backgroundColor: "#ffffff", borderRadius: 8 }} labelStyle={{ fontWeight: "bold" }} />
              <Bar dataKey="revenue" fill="url(#colorRevenue)" radius={[6, 6, 0, 0]} label={{ position: "top", fill: "#333", fontSize: 13 }} />
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1890ff" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#1890ff" stopOpacity={0.3} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Học viên theo khóa học">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div style={{ backgroundColor: '#fff', padding: '5px', borderRadius: '5px', boxShadow: '0 0 5px rgba(0,0,0,0.3)' }}>
                        <p style={{ margin: 0 }}>{`Khóa học: ${payload[0].name}`}</p>
                        <p style={{ margin: 0 }}>{`Số lượng: ${payload[0].value}`}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Pie 
                data={courseData} 
                cx="50%" 
                cy="50%" 
                outerRadius={80} 
                label 
                dataKey="value"
                nameKey="name" // Thêm dòng này để hiển thị tên của khóa học
              >
                {courseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

        </Card>

        <Card title="Tăng trưởng học viên">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={studentGrowth}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="students" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </ChartGrid>
    </Container>
  );
}
