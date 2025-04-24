import { Button, Modal, Form, Input, InputNumber, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';
import { ModalWrapper } from './style';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { TextArea } = Input;
const { Option } = Select;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

export default function CourseFormModal({
  visible,
  onCancel,
  onSubmit,
  initialValues,
}) {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState('');
  const uploadKeyRef = useRef(Date.now());

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
      setImageUrl(initialValues.image || '');
    } else {
      form.resetFields();
      setImageUrl('');
    }
    uploadKeyRef.current = Date.now(); // Reset upload mỗi lần mở modal
  }, [initialValues, visible, form]);

  const handleOk = () => {
    form.validateFields()
      .then((values) => {
        onSubmit({ ...values, image: imageUrl });
        toast.success(initialValues ? 'Cập nhật thành công' : 'Tạo mới khóa học thành công');
        form.resetFields();
        setImageUrl('');
        uploadKeyRef.current = Date.now(); // Reset lại sau submit
      })
      .catch(() => toast.error('Vui lòng kiểm tra lại thông tin!'));
  };

  const handleUpload = async (info) => {
    const file = info.file; // ✅ Dùng trực tiếp (vì là File object rồi)

    console.log("👉 file info:", info);
    console.log("👉 dùng trực tiếp file:", file);

    if (!file) {
      toast.error("Không thể đọc file ảnh. Vui lòng chọn lại.");
      return;
    }

    if (!file.type?.startsWith("image/")) {
      toast.error("Vui lòng chọn một file ảnh hợp lệ!");
      return;
    }

    try {
      const base64 = await getBase64(file);
      setImageUrl(base64);
      toast.success(`${file.name} đã được tải lên.`);
    } catch (err) {
      console.error("🔥 Lỗi khi đọc ảnh:", err);
      toast.error("Tải ảnh thất bại!");
    }
  };

  return (
    <ModalWrapper>
      <Modal
        title={initialValues ? 'Chỉnh sửa khóa học' : 'Thêm khóa học'}
        open={visible}
        onCancel={onCancel}
        onOk={handleOk}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            name="name"
            label="Tên khóa học"
            rules={[{ required: true, message: 'Vui lòng nhập tên khóa học' }]}
          >
            <Input placeholder="Nhập tên khóa học" />
          </Form.Item>

          <Form.Item
            name="type"
            label="Loại khóa học"
            rules={[{ required: true, message: 'Vui lòng chọn loại' }]}
          >
            <Select placeholder="Chọn loại">
              <Option value="Cơ bản">Cơ bản</Option>
              <Option value="Trung cấp 1">Trung cấp 1</Option>
              <Option value="Trung cấp 2">Trung cấp 2</Option>
              <Option value="Nâng cao 1">Nâng cao 1</Option>
              <Option value="Nâng cao 2">Nâng cao 2</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="price"
            label="Giá gốc"
            rules={[{ required: true, message: 'Vui lòng nhập giá gốc' }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} placeholder="Nhập giá gốc" />
          </Form.Item>

          <Form.Item name="discount" label="Giảm giá (%)">
            <InputNumber min={0} max={100} style={{ width: '100%' }} placeholder="Nhập phần trăm giảm" />
          </Form.Item>

          <Form.Item name="rating" label="Đánh giá">
            <InputNumber min={0} max={5} step={0.1} style={{ width: '100%' }} placeholder="VD: 4.5" />
          </Form.Item>

          <Form.Item name="description" label="Mô tả">
            <TextArea rows={4} placeholder="Nhập mô tả khóa học" />
          </Form.Item>

          <Form.Item label="Ảnh khóa học">
            <Upload
              key={uploadKeyRef.current}
              beforeUpload={() => false}
              onChange={handleUpload}
              showUploadList={false}
              accept="image/*"
              maxCount={1}
              fileList={[]} // reset mỗi lần upload
            >
              <Button icon={<UploadOutlined />}>Chọn ảnh từ máy</Button>
            </Upload>

            {imageUrl && (
              <img
                src={imageUrl}
                alt="preview"
                style={{ marginTop: 10, width: '100%', borderRadius: 8 }}
              />
            )}
          </Form.Item>
        </Form>
      </Modal>
    </ModalWrapper>
  );
}
