import { Modal, Form, Input, InputNumber, Select } from 'antd';
import { useEffect } from 'react';

const { TextArea } = Input;
const { Option } = Select;

export default function CourseFormModal({ visible, onCancel, onSubmit, initialValues, typeOptions = [], teacherOptions = [] }) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const handleOk = () => {
    form.validateFields()
      .then(values => {
        onSubmit(values);
        form.resetFields();
      })
      .catch(info => console.log('Validate Failed:', info));
  };

  return (
    <Modal
      title={initialValues ? 'Chỉnh sửa khóa học' : 'Thêm khóa học'}
      open={visible}
      onCancel={onCancel}
      onOk={handleOk}
      okText="Lưu"
      cancelText="Hủy"
    >
      <Form layout="vertical" form={form}>
        <Form.Item name="name" label="Tên khóa học" rules={[{ required: true, message: 'Vui lòng nhập tên khóa học' }]}> 
          <Input />
        </Form.Item>

        <Form.Item name="type" label="Loại khóa học" rules={[{ required: true }]}> 
          <Select placeholder="Chọn loại">
            {typeOptions.map(type => (
              <Option key={type} value={type}>{type}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="teacher" label="Giảng viên" rules={[{ required: true }]}> 
          <Select placeholder="Chọn giảng viên">
            {teacherOptions.map(teacher => (
              <Option key={teacher} value={teacher}>{teacher}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="price" label="Giá gốc" rules={[{ required: true }]}> 
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item name="discount" label="Giảm giá (%)"> 
          <InputNumber min={0} max={100} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item name="studentCount" label="Số học viên" rules={[{ required: true }]}> 
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item name="rating" label="Đánh giá"> 
          <InputNumber min={0} max={5} step={0.1} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item name="description" label="Mô tả"> 
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item name="image" label="Link ảnh khóa học"> 
          <Input placeholder="Dán link ảnh hoặc upload sau" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
