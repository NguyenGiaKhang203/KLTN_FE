import React, { useState } from "react";
import {
  ModalBackdrop,
  ModalContent,
  Title,
  ClassList,
  ClassOption,
  ConfirmButton,
  CloseButton
} from "./style"
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
            <ClassOption key={cls.id} disabled={cls.enrolled >= cls.capacity}>
              <input
                type="radio"
                name="selectedClass"
                value={cls.id}
                disabled={cls.enrolled >= cls.capacity}
                onChange={() => setSelectedClassId(cls.id)}
                checked={selectedClassId === cls.id}
              />
              <div>
                <div><strong>{cls.schedule}</strong></div>
                <div>{cls.enrolled}/{cls.capacity} học viên</div>
              </div>
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