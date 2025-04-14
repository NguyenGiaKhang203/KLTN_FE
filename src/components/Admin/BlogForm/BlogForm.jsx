import React, { useEffect } from "react";
import { Modal, Form, Input } from "antd";
import { StyledModal, StyledForm, StyledInput, StyledTextArea } from "./style";

const ArticleForm = ({ visible, onCancel, onSubmit, initialValues }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const handleFinish = (values) => {
    onSubmit(values);
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

        <Form.Item label="Hình ảnh" name="image">
          <StyledInput placeholder="Nhập URL hình ảnh" />
        </Form.Item>
      </StyledForm>
    </StyledModal>
  );
};

export default ArticleForm;
