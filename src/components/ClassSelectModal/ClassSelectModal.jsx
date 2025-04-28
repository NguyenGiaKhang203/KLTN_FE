import React, { useState, useEffect } from "react";
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

import * as ClassService from "../../services/ClassService";


const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString("vi-VN");
};
const ClassSelectModal = ({ isOpen, onClose, course, onConfirm, token }) => {

  const [selectedClassId, setSelectedClassId] = useState(null);
  const [allClasses, setAllClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClasses = async () => {
      setLoading(true);
      try {
        const res = await ClassService.getAllClasses();
        setAllClasses(res?.data || []);
      } catch (err) {
        setError("Không thể tải danh sách lớp học.");
      } finally {
        setLoading(false);
      }
    };

    if (isOpen && course?._id) {
      fetchClasses();
      setSelectedClassId(null);
    }
  }, [isOpen, course?._id, token]);

  const handleConfirm = () => {
    const selected = filteredClasses.find((cls) => cls._id === selectedClassId);
    if (!selected) return;
  
    const scheduleText = selected.schedule
      .map((s) => `${s.day}, ${s.startTime} - ${s.endTime}`)
      .join(" | ");
  
    onConfirm({
      courseId: course._id,
      classId: selected._id,
      name: course.name,
      className: selected.name,
      image: course.image,
      price: course.price,
      schedule: scheduleText,
    });
  
    onClose();
  };
  

  // Filter lớp học thuộc khóa học hiện tại
  const filteredClasses = allClasses.filter(
    (cls) => cls.course?._id === course?._id
  );

  return (
    <ModalBackdrop open={isOpen}>
      <ModalContent>
        <CloseButton onClick={onClose}>×</CloseButton>
        <Title>Chọn lớp cho khóa học: {course?.name}</Title>
        {loading ? (
          <p>Đang tải lớp học...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : filteredClasses.length === 0 ? (
          <p>Hiện tại chưa có lớp học nào cho khóa này.</p>
        ) : (
          <ClassList>
            {filteredClasses.map((cls) => (
              <ClassOption
                key={cls._id}
                disabled={cls.students?.length >= cls.studentCount && cls.studentCount > 0}
                selected={selectedClassId === cls._id}
              >
                <input
                  type="radio"
                  name="selectedClass"
                  value={cls._id}
                  disabled={cls.students?.length >= cls.studentCount && cls.studentCount > 0}
                  onChange={() => setSelectedClassId(cls._id)}
                  checked={selectedClassId === cls._id}
                />
                <ClassInfoContainer>
                  <strong>{cls.name}</strong>
                  <ClassDetail>
                    Đã đăng ký:{" "}
                    <span>{cls.students?.length || 0}/20 học viên</span>
                  </ClassDetail>
                  <ClassDetail>
                    Giảng viên: <span>{cls.teacher?.name}</span>
                  </ClassDetail>
                  <ClassDetail>
                    Phòng học: <span>{cls.address}</span>
                  </ClassDetail>
                  <ClassDetail>
                    Thời gian:
                    <span>
                      {cls.schedule.map((item, index) => (
                        <div key={index}>
                          {item.day}, {item.startTime} - {item.endTime}
                        </div>
                      ))}
                    </span>
                  </ClassDetail>
                  <ClassDetail>
                    Từ {formatDate(cls.startDate)} đến {formatDate(cls.endDate)}
                  </ClassDetail>
                </ClassInfoContainer>
              </ClassOption>
            ))}
          </ClassList>
        )}
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
