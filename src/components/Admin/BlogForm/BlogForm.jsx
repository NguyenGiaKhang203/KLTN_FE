import React, { useEffect } from "react";
import { Modal, Form, Input, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { StyledModal, StyledForm, StyledInput, StyledTextArea } from "./style";

const BlogForm = ({ visible, onCancel, onSubmit, initialValues }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      const initImage = initialValues.image
        ? [
            {
              uid: "-1",
              name: "ảnh đã chọn",
              status: "done",
              url: initialValues.image,
            },
          ]
        : [];
      form.setFieldsValue({ ...initialValues, image: initImage });
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const handleFinish = (values) => {
    const imageFile = values.image?.[0]?.originFileObj || null;

    const formData = {
      ...values,
      image: imageFile,
    };

    onSubmit(formData);
  };

  return (
    <StyledModal
      open={visible}
      title={initialValues ? "Cập nhật bài viết" : "Thêm bài viết"}
      onCancel={onCancel}
      onOk={() => form.submit()}
      okText={initialValues ? "Cập nhật" : "Thêm"}
      cancelText="Hủy"
    >
      <StyledForm form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="Tiêu đề"
          name="title"
          rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
        >
          <StyledInput placeholder="Nhập tiêu đề bài viết" />
        </Form.Item>

        <Form.Item
          label="Nội dung"
          name="content"
          rules={[
            { required: true, message: "Vui lòng nhập nội dung bài viết" },
          ]}
        >
          <StyledTextArea rows={4} placeholder="Nhập nội dung bài viết" />
        </Form.Item>

        <Form.Item
          label="Hình ảnh"
          name="image"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
        >
          <Upload
            name="image"
            listType="picture"
            beforeUpload={() => false}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
          </Upload>
        </Form.Item>
      </StyledForm>
    </StyledModal>
  );
};

export default BlogForm;
