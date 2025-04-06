import React, { useState } from "react";
import {
  ModalBackdrop,
  ModalContent,
  Title,
  ClassList,
  ClassOption,
  ConfirmButton,
  CloseButton,
  ClassInfoContainer,
  ClassDetail
} from "./style";

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString("vi-VN");
};

const ClassSelectModal = ({ isOpen, onClose, course, onConfirm }) => {
  const [selectedClassId, setSelectedClassId] = useState(null);

  const handleConfirm = () => {
    if (selectedClassId) {
      onConfirm(course.id, selectedClassId);
      onClose();
    }
  };

  return (
    <ModalBackdrop open={isOpen}>
      <ModalContent>
        <CloseButton onClick={onClose}>×</CloseButton>
        <Title>Chọn lớp cho khóa học: {course?.name}</Title>

        <ClassList>
          {course?.classes?.map((cls) => (
            <ClassOption
              key={cls.id}
              disabled={cls.enrolled >= cls.capacity}
              selected={selectedClassId === cls.id}
            >
              <input
                type="radio"
                name="selectedClass"
                value={cls.id}
                disabled={cls.enrolled >= cls.capacity}
                onChange={() => setSelectedClassId(cls.id)}
                checked={selectedClassId === cls.id}
              />
              <ClassInfoContainer>
                <strong>{cls.schedule}</strong>
                <ClassDetail>Đã đăng ký: <span>{cls.enrolled}/{cls.capacity} học viên</span></ClassDetail>
                <ClassDetail>Giảng viên: <span>{cls.teacher}</span></ClassDetail>
                <ClassDetail>Phòng học: <span>{cls.address}</span></ClassDetail>
                <ClassDetail>Thời gian: <span>Từ {formatDate(cls.startDate)} đến {formatDate(cls.endDate)}</span></ClassDetail>
              </ClassInfoContainer>
            </ClassOption>
          ))}
        </ClassList>

        <ConfirmButton
          onClick={handleConfirm}
          disabled={!selectedClassId}
        >
          Thêm vào giỏ hàng
        </ConfirmButton>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default ClassSelectModal;
