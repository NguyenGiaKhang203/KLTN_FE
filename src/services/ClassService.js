import axios from "axios";

const API_URL = "/api/class"; // Đổi URL nếu khác

// Tạo lớp học mới
export const createClass = async (data, token) => {
  const res = await axios.post(`${API_URL}/create`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// Lấy tất cả lớp học
export const getAllClasses = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/class/get-all`,
  );
  return res.data;
};


// Lấy lớp học theo ID
export const getClassById = async (id, token) => {
  const res = await axios.get(`${API_URL}/get-class-by-id/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// Cập nhật lớp học
export const updateClass = async (id, data, token) => {
  const res = await axios.put(`${API_URL}/update/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// Xóa lớp học
export const deleteClass = async (id, token) => {
  const res = await axios.delete(`${API_URL}/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
