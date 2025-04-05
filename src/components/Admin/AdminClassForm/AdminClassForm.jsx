import React, { useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Checkbox,
  Row,
  Col,
  TimePicker,
} from "antd";
import dayjs from "dayjs";
import { FormWrapper, FormTitle } from "./style";

const { Option } = Select;

const DAYS = [
  "Thứ hai",
  "Thứ ba",
  "Thứ tư",
  "Thứ năm",
  "Thứ sáu",
  "Thứ bảy",
  "Chủ nhật",
];

const ClassForm = ({
  open,
  onClose,
  onSubmit,
  initialValues,
  courses = [],
  teachers = [],
  rooms = [],
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        startDate: dayjs(initialValues.startDate),
        endDate: dayjs(initialValues.endDate),
        schedule: initialValues.schedule?.split(", ") || [],
        startTime: initialValues.startTime ? dayjs(initialValues.startTime, "HH:mm") : null,
        endTime: initialValues.endTime ? dayjs(initialValues.endTime, "HH:mm") : null,
      });
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const handleFinish = (values) => {
    const payload = {
      ...values,
      startDate: values.startDate.toISOString(),
      endDate: values.endDate.toISOString(),
      startTime: values.startTime.format("HH:mm"),
      endTime: values.endTime.format("HH:mm"),
      schedule: values.schedule.join(", "),
    };
    onSubmit(payload);
  };

  return (
    <Modal
      centered
      open={open}
      title={<FormTitle>{initialValues ? "Sửa lớp học" : "Tạo lớp học"}</FormTitle>}
      okText={initialValues ? "Cập nhật" : "Tạo mới"}
      cancelText="Hủy"
      onCancel={onClose}
      onOk={() => form.submit()}
      width={600}
    >
      <FormWrapper>
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item name="name" label="Tên lớp" rules={[{ required: true, message: "Vui lòng nhập tên lớp" }]}> 
            <Input placeholder="VD: Lớp 5A" />
          </Form.Item>

          <Form.Item name="course" label="Chương trình học" rules={[{ required: true, message: "Chọn chương trình học" }]}> 
            <Select placeholder="Chọn khóa học">
              {courses.map((course) => (
                <Option key={course._id} value={course._id}>{course.name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="teacher" label="Giáo viên phụ trách" rules={[{ required: true, message: "Chọn giáo viên" }]}> 
            <Select placeholder="Chọn giáo viên">
              {teachers.map((teacher) => (
                <Option key={teacher._id} value={teacher._id}>{teacher.fullName}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="schedule" label="Ngày học" rules={[{ required: true, message: "Chọn ít nhất 1 ngày học" }]}> 
            <Checkbox.Group>
              <Row gutter={[8, 8]}>
                {DAYS.map((day) => (
                  <Col key={day} span={8}>
                    <Checkbox value={day}>{day}</Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="startTime" label="Giờ bắt đầu" rules={[{ required: true, message: "Chọn giờ bắt đầu" }]}> 
                <TimePicker format="HH:mm" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="endTime" label="Giờ kết thúc" rules={[{ required: true, message: "Chọn giờ kết thúc" }]}> 
                <TimePicker format="HH:mm" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="address" label="Phòng học" rules={[{ required: true, message: "Chọn phòng học" }]}> 
            <Select placeholder="Chọn phòng">
              {rooms.map((room) => (
                <Option key={room._id} value={room._id}>{room.name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="students" label="Số lượng học viên" rules={[{ required: true, message: "Nhập số lượng" }]}> 
            <Input type="number" min={1} placeholder="VD: 20" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="startDate" label="Ngày bắt đầu" rules={[{ required: true, message: "Chọn ngày bắt đầu" }]}> 
                <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="endDate" label="Ngày kết thúc" rules={[{ required: true, message: "Chọn ngày kết thúc" }]}> 
                <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </FormWrapper>
    </Modal>
  );
};

export default ClassForm;
