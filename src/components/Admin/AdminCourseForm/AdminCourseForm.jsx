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
  const [uploading, setUploading] = useState(false);
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

  const handleUpload = async ({ fileList }) => {
    const file = fileList[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file.originFileObj);
      formData.append("upload_preset", "upload-uke86ro8");
  
      try {
        setUploading(true);
        const res = await fetch(`https://api.cloudinary.com/v1_1/dhyuxajq1/image/upload`, {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        setImageUrl(data.secure_url);
        toast.success("Tải ảnh lên thành công!");
      } catch (error) {
        console.error("Upload error:", error);
        toast.error("Tải ảnh lên thất bại!");
      } finally {
        setUploading(false);
      }
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
