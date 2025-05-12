import { useState, useEffect } from "react";
import {
  Table,
  Input,
  Button,
  Tooltip,
  Modal,
  Form,
  DatePicker,
  Select,
  Upload,
  InputNumber,
  Space
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  UploadOutlined,
  SearchOutlined,
  EyeOutlined
} from "@ant-design/icons";
import dayjs from "dayjs";
import * as ExamService from "../../../services/ExamService";
import * as ClassService from "../../../services/ClassService";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as XLSX from 'xlsx';
import mammoth from 'mammoth';
import {
  PageHeader,
  EditIconButton,
  DeleteIconButton,
  SearchInput,
  StyledAddButton,
  ActionButton,
  UploadGuideContainer,
  GuideTitle,
  GuideList,
  GuideItem,
  GuideCodeBlock
  
} from "./style";

const { Option } = Select;

export default function ExamPage() {
  const [form] = Form.useForm();
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [exams, setExams] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingExam, setEditingExam] = useState(null);
  const [classList, setClassList] = useState([]);
  const [deleteExamId, setDeleteExamId] = useState(null);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState("");
  const [questions, setQuestions] = useState([]);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [examDetails, setExamDetails] = useState([]);
  const user = useSelector((state) => state.user);
  const token = user?.access_token;

  const fetchClasses = async () => {
    try {
      const res = await ClassService.getClassbyTeacher(user?.user._id);
      const mapped = res.data.map((cls) => ({
        _id: cls._id,
        name: cls.name,
      }));
      setClassList(mapped);
    } catch {
      toast.error("Lỗi khi tải danh sách lớp");
    }
  };

  const fetchExams = async () => {
    try {
      const res = await ExamService.getExamsByTeacherId(user?.user._id, token);
      const examList = Array.isArray(res) ? res : res.data;
      const mapped = examList.map((exam) => ({
        _id: exam._id,
        title: exam.examName,
        className: exam.class?.name,
        date: dayjs(exam.examDeadline).format("YYYY-MM-DD HH:mm"),
        questions: exam.questions || [],
        duration: exam.duration || 0,
      }));
      setExams(mapped);
    } catch {
      toast.error("Lỗi khi tải danh sách bài thi");
    }
  };

  const handleFileChange = (info) => {
    const selectedFile = info.fileList[0]?.originFileObj;
    if (!selectedFile) return;

    setFile(selectedFile);

    if (selectedFile.name.endsWith(".xlsx")) {
      setFileType("excel");
      extractExcelData(selectedFile);
    } else if (selectedFile.name.endsWith(".docx")) {
      setFileType("word");
      extractWordData(selectedFile);
    } else {
      toast.error("Chỉ chấp nhận file .xlsx hoặc .docx");
      setFile(null);
      setFileType("");
    }
  };

  const extractExcelData = async (file) => {
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data, { type: "array" });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(worksheet);
    const extractedQuestions = rows.map((row, index) => ({
      questionId: index + 1,
      questionText: row["Câu hỏi"],
      options: [row["A"], row["B"], row["C"], row["D"]],
      correctAnswer: row["Đáp án"],
    }));
    setQuestions(extractedQuestions);
  };

  const extractWordData = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    const text = result.value;
    const extractedQuestions = text.split("Câu hỏi:").slice(1).map((q, index) => {
      const parts = q.trim().split(/A:|B:|C:|D:|Đáp án:/).map(s => s.trim());
      return {
        questionId: index + 1,
        questionText: parts[0],
        options: parts.slice(1, 5),
        correctAnswer: parts[5],
      };
    });
    setQuestions(extractedQuestions);
  };

  useEffect(() => {
    if (user && token) {
      fetchClasses();
      fetchExams();
    }
  }, [user]);

  useEffect(() => {
    let results = exams.filter((exam) => {
      const title = exam.title || "";
      const className = classList.find((c) => c._id === exam.class)?.name || "";
      return (
        title.toLowerCase().includes(search.toLowerCase()) ||
        className.toLowerCase().includes(search.toLowerCase())
      );
    });

    if (sortOrder === "asc") {
      results.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    } else if (sortOrder === "desc") {
      results.sort((a, b) => (b.title || "").localeCompare(a.title || ""));
    }

    setFilteredData(results);
  }, [search, sortOrder, exams, classList]);

  const handleDelete = (record) => {
    setDeleteExamId(record._id);
    setIsConfirmDeleteOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await ExamService.deleteExam(deleteExamId, token);
      toast.success("Đã xóa bài thi");
      fetchExams();
    } catch {
      toast.error("Xóa thất bại!");
    } finally {
      setIsConfirmDeleteOpen(false);
      setDeleteExamId(null);
    }
  };
  const handleViewExam = async (record) => {
  try {
    console.log("ID gửi lên: ", record._id);
    const res = await ExamService.getExamById(record._id, token);
    if (res?.data?.questions) {
      setExamDetails(res.data.questions);
      setIsViewModalOpen(true);
    } else {
      toast.error("Không tìm thấy chi tiết bài thi!");
    }
  } catch (error) {
    console.error("Lỗi khi lấy chi tiết bài thi:", error);
    toast.error("Không thể lấy dữ liệu bài thi.");
  }
};

  const handleEdit = async (record) => {
    setIsEditMode(true);
    setEditingExam(record);
    setIsModalOpen(true);
    const classId = classList.find((cls) => cls.name === record.className)?._id;
    form.setFieldsValue({
      ...record,
      class: classId,
      date: dayjs(record.date, "YYYY-MM-DD HH:mm"),
    });
  };

  const handleAddOrUpdate = async (values) => {
    const payload = {
      examName: values.title,
      examDeadline: values.date.toDate(),
      class: values.class,
      teacher: user?.user?._id,
      status: values.status,
      duration: values.duration,
      ...(file ? { questions } : {}),
    };

    try {
      if (isEditMode) {
        await ExamService.updateExam(editingExam._id, payload, token);
        toast.success("Đã cập nhật bài thi!");
      } else {
        await ExamService.createExam(payload, token);
        toast.success("Đã thêm bài thi mới!");
      }

      form.resetFields();
      setIsModalOpen(false);
      setIsEditMode(false);
      setEditingExam(null);
      fetchExams();
    } catch (error) {
      console.error("Lỗi khi gửi bài thi:", error);
      toast.error("Thao tác thất bại!");
    }
  };

  const columns = [
    {
      title: "Tên bài thi",
      dataIndex: "title",
    },
    {
      title: "Lớp",
      dataIndex: "className",
      render: (text) => text || "Chưa có"
    },
    {
      title: "Ngày thi",
      dataIndex: "date",
    },
    {
      title: "Số câu hỏi",
      dataIndex: "questions",
      render: (questions) => questions?.length || 0,
    },
    {
      title: "Thời gian (phút)",
      dataIndex: "duration",
    },
    {
      title: "Hành động",
      render: (_, record) => (
        <Space>
          <EditIconButton type="primary" onClick={() => handleEdit(record)} icon={<EditOutlined />} />
          <DeleteIconButton danger onClick={() => handleDelete(record)} icon={<DeleteOutlined />} />
          <Button type="primary" onClick={() => handleViewExam(record)} icon={<EyeOutlined />}>
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2 style={{color:"#333",margin:"10px"}}>Quản lý bài thi </h2>
      <PageHeader>
        <SearchInput
          placeholder="Tìm kiếm bài thi..."
          prefix={<SearchOutlined />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <StyledAddButton
          icon={<PlusOutlined />}
          onClick={() => {
            setIsModalOpen(true);
            setIsEditMode(false);
            form.resetFields();
          }}
        >
          Thêm bài thi
        </StyledAddButton>
      </PageHeader>

      <Table columns={columns} dataSource={filteredData} rowKey="_id" />

      <Modal
        title={isEditMode ? "Sửa bài thi" : "Thêm bài thi"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleAddOrUpdate} layout="vertical">
          <Form.Item
            label="Tên bài thi"
            name="title"
            rules={[{ required: true, message: "Vui lòng nhập tên bài thi!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Lớp học"
            name="class"
            rules={[{ required: true, message: "Vui lòng chọn lớp học!" }]}
          >
            <Select>
              {classList.map((cls) => (
                <Option key={cls._id} value={cls._id}>
                  {cls.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Ngày thi"
            name="date"
            rules={[{ required: true, message: "Vui lòng chọn ngày thi!" }]}
          >
            <DatePicker showTime format="YYYY-MM-DD HH:mm" />
          </Form.Item>
          <Form.Item label="Thời gian làm bài" name="duration">
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item label="Tải file câu hỏi" name="file">
            <Upload beforeUpload={() => false} onChange={handleFileChange}>
              <Button icon={<UploadOutlined />}>Tải lên</Button>
            </Upload>

            <UploadGuideContainer>
              <GuideTitle>📌 Hướng dẫn định dạng file:</GuideTitle>
              <GuideList>
                <GuideItem>
                  <b>Word (.docx):</b> Theo format:
                  <GuideCodeBlock>
            Câu hỏi: Nội dung câu hỏi <hr/>
            A: Đáp án A<hr/>
            B: Đáp án B<hr/>
            C: Đáp án C<hr/>
            D: Đáp án D<hr/>
            Đáp án: [Ký tự đáp án đúng]
                  </GuideCodeBlock>
                </GuideItem>
                <GuideItem>
                  <b>Excel (.xlsx):</b> Cấu trúc bảng:
                  <GuideCodeBlock>
            | Câu hỏi  | A | B | C | D |<hr/>
            | Đáp án   |---|---|---|- -|<hr/>
            | Câu hỏi  |ĐA1|ĐA2|ĐA3|ĐA4|
                  </GuideCodeBlock>
                </GuideItem>
              </GuideList>
            </UploadGuideContainer>

          </Form.Item>


        </Form>
      </Modal>

      <Modal
        title="Xác nhận xóa"
        open={isConfirmDeleteOpen}
        onCancel={() => setIsConfirmDeleteOpen(false)}
        onOk={confirmDelete}
        okText="Xóa"
        cancelText="Hủy"
      >
        <p>Bạn có chắc chắn muốn xóa bài thi này không?</p>
      </Modal>
      <ToastContainer />
      <Modal
        title="Chi tiết bài thi"
        open={isViewModalOpen}
        onCancel={() => setIsViewModalOpen(false)}
        footer={<Button onClick={() => setIsViewModalOpen(false)}>Đóng</Button>}
        width={800}
      >
        <Table
          dataSource={examDetails}
          rowKey="questionId"
          columns={[
            {
              title: "Câu hỏi",
              dataIndex: "questionText",
              key: "questionText",
            },
            {
              title: "Đáp án A",
              render: (_, record) => record.options[0] || "",
            },
            {
              title: "Đáp án B",
              render: (_, record) => record.options[1] || "",
            },
            {
              title: "Đáp án C",
              render: (_, record) => record.options[2] || "",
            },
            {
              title: "Đáp án D",
              render: (_, record) => record.options[3] || "",
            },
            {
              title: "Đáp án đúng",
              dataIndex: "correctAnswer",
              key: "correctAnswer",
              render: (text) => <b style={{ color: "green" }}>{text}</b>,
            },
          ]}
          pagination={false}
        />
      </Modal>

    </div>
  );
}
