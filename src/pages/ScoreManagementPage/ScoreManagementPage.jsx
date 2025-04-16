import React, { useState } from "react";
import {
  Input,
  Select,
  Table,
  Button,
  Popconfirm,
  InputNumber,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  PageHeader,
  FilterContainer,
  TableWrapper,
  ActionButtons,
} from "./style";

const { Search } = Input;
const { Option } = Select;

const ScoreManagementPage = () => {
  const [selectedExam, setSelectedExam] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [editingRow, setEditingRow] = useState(null);
  const [dataSource, setDataSource] = useState([
    {
      key: "1",
      name: "Nguyễn Văn A",
      email: "a@gmail.com",
      exam: "Giữa kỳ",
      score: 8.5,
    },
    {
      key: "2",
      name: "Trần Thị B",
      email: "b@gmail.com",
      exam: "Giữa kỳ",
      score: 7,
    },
  ]);

  const handleDelete = (key) => {
    setDataSource((prev) => prev.filter((item) => item.key !== key));
  };

  const handleSave = (key, newScore) => {
    setDataSource((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, score: newScore } : item
      )
    );
    setEditingRow(null);
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (_, __, index) => index + 1,
      width: 70,
    },
    {
      title: "Họ tên học viên",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Bài thi",
      dataIndex: "exam",
    },
    {
      title: "Điểm",
      dataIndex: "score",
      render: (text, record) =>
        editingRow === record.key ? (
          <InputNumber
            min={0}
            max={10}
            defaultValue={record.score}
            onChange={(val) => handleSave(record.key, val)}
          />
        ) : (
          text
        ),
    },
    {
      title: "Hành động",
      dataIndex: "action",
      align: "center",
      render: (_, record) => (
        <ActionButtons>
          <EditOutlined
            style={{ color: "#1890ff", fontSize: 18, cursor: "pointer" }}
            onClick={() => setEditingRow(record.key)}
          />
          <Popconfirm
            title="Bạn có chắc muốn xoá điểm này không?"
            onConfirm={() => handleDelete(record.key)}
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

  const filteredData = dataSource.filter(
    (item) =>
      (!selectedExam || item.exam === selectedExam) &&
      item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div style={{ padding: 24 }}>
      <PageHeader>
        <h2>Quản lý điểm học viên</h2>
      </PageHeader>

      <FilterContainer>
        <Search
          placeholder="Tìm kiếm học viên..."
          onSearch={(value) => setSearchText(value)}
          style={{ width: 250 }}
          allowClear
        />

        <Select
          placeholder="Chọn bài thi"
          style={{ width: 200 }}
          onChange={(val) => setSelectedExam(val)}
          allowClear
        >
          <Option value="Giữa kỳ">Giữa kỳ</Option>
          <Option value="Cuối kỳ">Cuối kỳ</Option>
        </Select>
      </FilterContainer>

      <TableWrapper>
        <Table
          dataSource={filteredData}
          columns={columns}
          rowKey="key"
          bordered
          pagination={false}
        />
      </TableWrapper>
    </div>
  );
};

export default ScoreManagementPage;