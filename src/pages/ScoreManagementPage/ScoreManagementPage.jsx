import React, { useEffect, useState } from "react";
import {
  Input,
  Select,
  Table,
  Popconfirm,
  InputNumber,
  message,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import * as ScoreService from "../../services/ScoreService";
import * as ClassService from "../../services/ClassService";
import {
  PageHeader,
  FilterContainer,
  TableWrapper,
  ActionButtons,
} from "./style";

const { Search } = Input;
const { Option } = Select;

const ScoreManagementPage = () => {
  const [classList, setClassList] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [editingRow, setEditingRow] = useState(null);
  const [scores, setScores] = useState([]);
  const { user } = useSelector((state) => state.user);
  const token = user?.access_token;

  // Fetch lớp học
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await ClassService.getAllClasses(token);
        const data = Array.isArray(res?.data) ? res.data : res;
        setClassList(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách lớp:", err);
        setClassList([]);
      }
    };
    if (token) fetchClasses();
  }, [token]);

  // Fetch điểm số
  useEffect(() => {
    const fetchScores = async () => {
      try {
        const res = await ScoreService.getAllScores(token);
        const data = Array.isArray(res?.data) ? res.data : res;
        setScores(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Lỗi khi lấy điểm:", err);
        setScores([]);
      }
    };
    if (token) fetchScores();
  }, [token]);

  // Xoá điểm
  const handleDelete = async (id) => {
    try {
      await ScoreService.deleteScore(id, token);
      setScores((prev) => prev.filter((item) => item._id !== id));
      message.success("Đã xoá điểm thành công");
    } catch (err) {
      message.error("Xoá thất bại");
    }
  };

  // Lưu điểm
  const handleSave = async (id, newScore) => {
    try {
      await ScoreService.updateScore(id, { score: newScore }, token);
      setScores((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, score: newScore } : item
        )
      );
      setEditingRow(null);
      message.success("Cập nhật điểm thành công");
    } catch (err) {
      message.error("Cập nhật điểm thất bại");
    }
  };

  const columns = [
    {
      title: "STT",
      render: (_, __, index) => index + 1,
      width: 60,
    },
    {
      title: "Họ tên học viên",
      render: (_, record) => record.student?.name || "Không rõ",
    },
    {
      title: "Email",
      render: (_, record) => record.student?.email || "Không rõ",
    },
    {
      title: "Bài thi",
      render: (_, record) => record.exam?.title || "Không rõ",
    },
    {
      title: "Điểm",
      render: (_, record) =>
        editingRow === record._id ? (
          <InputNumber
            min={0}
            max={10}
            defaultValue={record.score}
            onChange={(val) => handleSave(record._id, val)}
          />
        ) : (
          record.score
        ),
    },
    {
      title: "Hành động",
      align: "center",
      render: (_, record) => (
        <ActionButtons>
          <EditOutlined
            style={{ color: "#1890ff", fontSize: 18, cursor: "pointer" }}
            onClick={() => setEditingRow(record._id)}
          />
          <Popconfirm
            title="Bạn có chắc muốn xoá điểm này không?"
            onConfirm={() => handleDelete(record._id)}
            okText="Xoá"
            cancelText="Huỷ"
          >
            <DeleteOutlined
              style={{ color: "red", fontSize: 18, cursor: "pointer" }}
            />
          </Popconfirm>
        </ActionButtons>
      ),
    },
  ];

  // Lọc danh sách học viên theo lớp và tên
  const filteredData = scores.filter(
    (item) =>
      (!selectedClass || item.class === selectedClass) &&
      item.student?.name?.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div style={{ padding: 24 }}>
      <PageHeader>
        <h2>Quản lý điểm học viên</h2>
      </PageHeader>

      <FilterContainer>
        <Select
          placeholder="Chọn lớp học"
          style={{ width: 220 }}
          onChange={(val) => setSelectedClass(val)}
          allowClear
        >
          {Array.isArray(classList) &&
            classList.map((cls) => (
              <Option key={cls._id} value={cls._id}>
                {cls.name}
              </Option>
            ))}
        </Select>

        <Search
          placeholder="Tìm kiếm học viên..."
          onSearch={(value) => setSearchText(value)}
          style={{ width: 250 }}
          allowClear
        />
      </FilterContainer>

      <TableWrapper>
        <Table
          dataSource={filteredData}
          columns={columns}
          rowKey="_id"
          bordered
          pagination={{ pageSize: 8 }}
          locale={{ emptyText: "Chưa có dữ liệu điểm số" }}
        />
      </TableWrapper>
    </div>
  );
};

export default ScoreManagementPage;
