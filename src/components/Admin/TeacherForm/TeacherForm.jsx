import React from "react";
import { Input } from "antd";
import { StyledModal } from "./style";

const TeacherForm = ({
  visible,
  onCancel,
  onSubmit,
  newTeacherData,
  setNewTeacherData,
  isEdit = false,
}) => {
  return (
    <StyledModal
      open={visible}
      title={isEdit ? "Chỉnh sửa giảng viên" : "Thêm Giảng Viên"}
      onOk={onSubmit}
      onCancel={onCancel}
      okText={isEdit ? "Lưu" : "Tạo mới"}
      cancelText="Hủy"
    >
      <Input
        placeholder="Tên giảng viên"
        value={newTeacherData.name}
        onChange={(e) =>
          setNewTeacherData({ ...newTeacherData, name: e.target.value })
        }
      />
      <Input
        placeholder="Email"
        value={newTeacherData.email}
        onChange={(e) =>
          setNewTeacherData({ ...newTeacherData, email: e.target.value })
        }
      />
      {!isEdit && (
        <>
          <Input.Password
            placeholder="Mật khẩu"
            value={newTeacherData.password}
            onChange={(e) =>
              setNewTeacherData({ ...newTeacherData, password: e.target.value })
            }
          />
          <Input.Password
            placeholder="Xác nhận mật khẩu"
            value={newTeacherData.confirmPassword}
            onChange={(e) =>
              setNewTeacherData({
                ...newTeacherData,
                confirmPassword: e.target.value,
              })
            }
          />
        </>
      )}
      <Input
        placeholder="Số điện thoại"
        value={newTeacherData.phone}
        onChange={(e) =>
          setNewTeacherData({ ...newTeacherData, phone: e.target.value })
        }
      />
      {isEdit && (
        <>
          <Input
            placeholder="Địa chỉ"
            value={newTeacherData.address}
            onChange={(e) =>
              setNewTeacherData({ ...newTeacherData, address: e.target.value })
            }
          />
          <Input
            placeholder="Thành phố"
            value={newTeacherData.city}
            onChange={(e) =>
              setNewTeacherData({ ...newTeacherData, city: e.target.value })
            }
          />
        </>
      )}
    </StyledModal>
  );
};

export default TeacherForm;
