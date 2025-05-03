import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import mammoth from 'mammoth';
import axios from 'axios';
import {
  Modal,
  Button,
  Table,
  Popconfirm,
  Form,
  Input,
  InputNumber,
  Upload,
  Space,
  Tooltip,
  Select,
} from 'antd';
import {
  PlusOutlined,
  UploadOutlined,
  EditFilled,
  DeleteFilled,
  SearchOutlined,
} from '@ant-design/icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Container,
  Header,
  ButtonWrapper,
  FileName,
  StyledModal,
  StyledTable,
  ControlBar,
  SearchInput,
  FilterSelect,
} from './style';

const SuggestionManagement = () => {
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTest, setEditingTest] = useState(null);
  const [form] = Form.useForm();
  const [tests, setTests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [courseFilter, setCourseFilter] = useState(null);

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/suggest-course/get-all-test');
      setTests(res.data);
    } catch (err) {
      toast.error('Lỗi khi tải bài thi!');
    }
  };

  const handleFileChange = (info) => {
    const selectedFile = info.fileList[0]?.originFileObj;
    if (!selectedFile) return;

    setFile(selectedFile);

    if (selectedFile.name.endsWith('.xlsx')) {
      setFileType('excel');
    } else if (selectedFile.name.endsWith('.docx')) {
      setFileType('word');
    } else {
      toast.error('Chỉ chấp nhận file .xlsx hoặc .docx');
      setFile(null);
      setFileType('');
    }
  };

  const handleModalSubmit = async () => {
    try {
      const values = await form.validateFields();
      let questions = [];

      if (file) {
        if (fileType === 'excel') {
          const data = await file.arrayBuffer();
          const workbook = XLSX.read(data, { type: 'array' });
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const rows = XLSX.utils.sheet_to_json(worksheet);

          questions = rows.map((row, index) => ({
            questionId: index + 1,
            questionText: row['Câu hỏi'],
            options: [row['A'], row['B'], row['C'], row['D']],
            correctAnswer: row['Đáp án']
          }));
        }

        if (fileType === 'word') {
          const arrayBuffer = await file.arrayBuffer();
          const result = await mammoth.extractRawText({ arrayBuffer });
          const text = result.value;

          questions = text.split('Câu hỏi:').slice(1).map((q, index) => {
            const parts = q.trim().split(/A:|B:|C:|D:|Đáp án:/).map(s => s.trim());
            return {
              questionId: index + 1,
              questionText: parts[0],
              options: parts.slice(1, 5),
              correctAnswer: parts[5],
            };
          });
        }
      }

      const testPayload = {
        testName: values.testName,
        duration: values.duration,
        ...(file ? { questions } : {}),
      };

      if (editingTest) {
        await axios.put(`http://localhost:3001/api/suggest-course/update/${editingTest._id}`, testPayload);
        toast.success('Cập nhật bài thi thành công!');
      } else {
        if (!file) return toast.error('Vui lòng chọn file Excel hoặc Word');
        await axios.post('http://localhost:3001/api/suggest-course/create', testPayload);
        toast.success('Tải lên bài thi thành công!');
      }

      fetchTests();
      form.resetFields();
      setFile(null);
      setEditingTest(null);
      setModalVisible(false);
    } catch (error) {
      toast.error('Lỗi khi lưu bài thi!');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/suggest-course/delete/${id}`);
      toast.success('Xóa bài thi thành công!');
      fetchTests();
    } catch (err) {
      toast.error('Xóa thất bại!');
    }
  };

  const handleEdit = (test) => {
    setEditingTest(test);
    form.setFieldsValue({
      testName: test.testName,
      duration: test.duration,
    });
    setFile(null);
    setModalVisible(true);
  };

  const filteredTests = tests.filter(test =>
    test.testName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      title: 'Tên bài thi',
      dataIndex: 'testName',
      key: 'testName',
    },
    {
      title: 'Thời gian (phút)',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'Số câu hỏi',
      render: (_, record) => record.questions.length,
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Sửa">
            <Button
              type="text"
              icon={<EditFilled style={{ color: '#1890ff' }} />}
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Popconfirm title="Xác nhận xóa bài thi này?" onConfirm={() => handleDelete(record._id)}>
              <Button
                type="text"
                danger
                icon={<DeleteFilled style={{ color: '#ff4d4f' }} />}
              />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Container>
      <Header>Quản lý bài thi gợi ý</Header>

      <ControlBar>
        <SearchInput
          placeholder="Tìm kiếm bài thi"
          prefix={<SearchOutlined />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <ButtonWrapper>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setModalVisible(true);
              setEditingTest(null);
              form.resetFields();
            }}
          >
            Thêm bài thi
          </Button>
        </ButtonWrapper>
      </ControlBar>

      <StyledTable>
        <Table
          columns={columns}
          dataSource={filteredTests}
          rowKey="_id"
          pagination={{ pageSize: 5 }}
        />
      </StyledTable>

      <StyledModal>
        <Modal
          title={editingTest ? "Cập nhật bài thi" : "Thêm bài thi"}
          open={modalVisible}
          onOk={handleModalSubmit}
          onCancel={() => {
            setModalVisible(false);
            setEditingTest(null);
            form.resetFields();
            setFile(null);
          }}
          okText="Lưu"
          cancelText="Hủy"
        >
          <Form form={form} layout="vertical">
            <Form.Item
              label="Tên bài thi"
              name="testName"
              rules={[{ required: true, message: 'Vui lòng nhập tên bài thi' }]}
            >
              <Input placeholder="VD: Bài kiểm tra Toán" />
            </Form.Item>

            <Form.Item
              label="Thời gian (phút)"
              name="duration"
              rules={[{ required: true, message: 'Vui lòng nhập thời gian làm bài' }]}
            >
              <InputNumber min={1} max={180} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item label="Tải file Excel/Word">
              <Upload
                beforeUpload={() => false}
                maxCount={1}
                accept=".xlsx,.docx"
                onChange={handleFileChange}
              >
                <Button icon={<UploadOutlined />}>Chọn file</Button>
              </Upload>
              {file && <FileName>Đã chọn: {file.name}</FileName>}
            </Form.Item>
          </Form>
        </Modal>
      </StyledModal>

      <ToastContainer position="top-right" autoClose={3000} />
    </Container>
  );
};

export default SuggestionManagement;
