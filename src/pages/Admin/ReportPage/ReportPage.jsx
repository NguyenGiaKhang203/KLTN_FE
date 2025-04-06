import { useState } from "react";
import { Statistic, Card, Row, Col, Select, DatePicker, Space } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Container,
  SectionTitle,
  ChartGrid,
  FilterRow,
  FilterLabel,
} from "./style";
import dayjs from "dayjs";

const { Option } = Select;

const COLORS = ["#1890ff", "#13c2c2", "#52c41a", "#faad14", "#f5222d"];

const defaultMonth = dayjs().month() + 1;
const defaultYear = dayjs().year();

export default function ReportPage() {
  const [filterType, setFilterType] = useState("month");
  const [selectedMonth, setSelectedMonth] = useState(defaultMonth);
  const [selectedQuarter, setSelectedQuarter] = useState(1);
  const [selectedYear, setSelectedYear] = useState(defaultYear);

  const revenueData = [
    { month: "T1", revenue: 30 },
    { month: "T2", revenue: 45 },
    { month: "T3", revenue: 60 },
    { month: "T4", revenue: 40 },
    { month: "T5", revenue: 75 },
  ];

  const courseData = [
    { name: "Cơ bản", value: 40 },
    { name: "Nâng cao", value: 30 },
    { name: "Chiến thuật", value: 20 },
    { name: "Giải đấu", value: 10 },
  ];

  const paymentStatus = [
    { name: "Đã thanh toán", value: 80 },
    { name: "Chờ xử lý", value: 20 },
  ];

  const studentGrowth = [
    { month: "T1", students: 20 },
    { month: "T2", students: 25 },
    { month: "T3", students: 40 },
    { month: "T4", students: 55 },
    { month: "T5", students: 65 },
  ];

  return (
    <Container>
      <SectionTitle>Thống kê tổng quan</SectionTitle>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card className="card-info total-students">
            <Statistic title="Tổng học viên" value={350} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="card-info orders">
            <Statistic title="Đơn hàng" value={125} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="card-info revenue">
            <Statistic title="Doanh thu (triệu ₫)" value={215} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="card-info best-course">
            <Statistic title="Khóa học bán chạy" value="Cờ vua nâng cao" />
          </Card>
        </Col>
      </Row>

      <SectionTitle>Biểu đồ thống kê</SectionTitle>

      <FilterRow>
        <Space size="large">
          <FilterLabel>Lọc theo:</FilterLabel>
          <Select
            value={filterType}
            onChange={setFilterType}
            style={{ width: 160 }}
          >
            <Option value="month">Tháng</Option>
            <Option value="quarter">Quý</Option>
            <Option value="year">Năm</Option>
          </Select>

          {filterType === "month" && (
            <>
              <Select
                value={selectedMonth}
                onChange={setSelectedMonth}
                style={{ width: 100 }}
              >
                {[...Array(12).keys()].map((i) => (
                  <Option key={i + 1} value={i + 1}>
                    Tháng {i + 1}
                  </Option>
                ))}
              </Select>
              <DatePicker
                picker="year"
                value={dayjs(`${selectedYear}`)}
                onChange={(date) => setSelectedYear(date.year())}
              />
            </>
          )}

          {filterType === "quarter" && (
            <>
              <Select
                value={selectedQuarter}
                onChange={setSelectedQuarter}
                style={{ width: 120 }}
              >
                <Option value={1}>Quý 1</Option>
                <Option value={2}>Quý 2</Option>
                <Option value={3}>Quý 3</Option>
                <Option value={4}>Quý 4</Option>
              </Select>
              <DatePicker
                picker="year"
                value={dayjs(`${selectedYear}`)}
                onChange={(date) => setSelectedYear(date.year())}
              />
            </>
          )}

          {filterType === "year" && (
            <DatePicker
              picker="year"
              value={dayjs(`${selectedYear}`)}
              onChange={(date) => setSelectedYear(date.year())}
            />
          )}
        </Space>
      </FilterRow>

      <ChartGrid>
        <Card title="Doanh thu theo tháng">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={revenueData} barCategoryGap={30}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                contentStyle={{ backgroundColor: "#ffffff", borderRadius: 8 }}
                labelStyle={{ fontWeight: "bold" }}
              />
              <Bar
                dataKey="revenue"
                fill="url(#colorRevenue)"
                radius={[6, 6, 0, 0]}
                label={{ position: "top", fill: "#333", fontSize: 13 }}
              />
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
              <Pie
                data={courseData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
                dataKey="value"
              >
                {courseData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Trạng thái thanh toán">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={paymentStatus}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                label
                dataKey="value"
              >
                {paymentStatus.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
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
              <Legend />
              <Line
                type="monotone"
                dataKey="students"
                stroke="#52c41a"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </ChartGrid>
    </Container>
  );
}
