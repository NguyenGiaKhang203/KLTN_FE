import React, { useEffect, useRef, useState } from "react";
import { Modal, Form, Input, Upload, Button } from "antd";
import { UploadOutlined, DeleteTwoTone } from "@ant-design/icons";
import {
  StyledModal,
  StyledForm,
  StyledInput,
  StyledTextArea,
  ImagePreviewWrapper,
  DeleteImageButton,
} from "./style";
import { toast } from "react-toastify";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

const BlogForm = ({ visible, onCancel, onSubmit, initialValues }) => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState("");
  const uploadKeyRef = useRef(Date.now());

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
      setImageUrl(initialValues.image || "");
    } else {
      form.resetFields();
      setImageUrl("");
    }
    uploadKeyRef.current = Date.now(); // reset upload
  }, [initialValues, visible, form]);

  const handleUpload = async (info) => {
    const file = info.file;

    if (!file.type?.startsWith("image/")) {
      toast.error("Vui lòng chọn file ảnh hợp lệ!");
      return;
    }

    try {
      const base64 = await getBase64(file);
      setImageUrl(base64);
      toast.success(`${file.name} đã được tải lên.`);
    } catch (err) {
      toast.error("Lỗi khi tải ảnh!");
    }
  };

  const handleFinish = (values) => {
    const finalValues = {
      ...values,
      image: imageUrl,
    };

    onSubmit(finalValues);
  };

  const handleRemoveImage = () => {
    setImageUrl("");
    uploadKeyRef.current = Date.now();
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
          rules={[{ required: true, message: "Vui lòng nhập nội dung bài viết" }]}
        >
          <StyledTextArea rows={4} placeholder="Nhập nội dung bài viết" />
        </Form.Item>

        <Form.Item label="Ảnh bài viết">
          <Upload
            key={uploadKeyRef.current}
            beforeUpload={() => false}
            onChange={handleUpload}
            showUploadList={false}
            accept="image/*"
            maxCount={1}
            fileList={[]}
          >
            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
          </Upload>

          {imageUrl && (
            <ImagePreviewWrapper>
              <img src={imageUrl} alt="preview" />
              <DeleteImageButton onClick={handleRemoveImage}>
                <DeleteTwoTone twoToneColor="#ff4d4f" />
              </DeleteImageButton>
            </ImagePreviewWrapper>
          )}
        </Form.Item>
      </StyledForm>
    </StyledModal>
  );
};

export default BlogForm;
