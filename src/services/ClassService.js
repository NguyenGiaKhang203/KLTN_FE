import axios from "axios";

const API_URL = "/api/class"; // Đổi URL nếu khác

// Tạo lớp học mới
export const createClass = async (data, token) => {
  const res = await axios.post(`${process.env.REACT_APP_API_URL}/class/create`, data, {
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
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/class/get-class-by-id/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// Cập nhật lớp học
export const updateClass = async (id, data, token) => {
  const res = await axios.put(`${process.env.REACT_APP_API_URL}/class/update/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// Xóa lớp học
export const deleteClass = async (id, token) => {
  const res = await axios.delete(`${process.env.REACT_APP_API_URL}/class/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getTotalClasses = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/class/get-total-classes`,
  );
  return res.data;
};

export const getClassbyTeacher = async (id) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/class/get-all-by-teacherid/${id}`,
  );
  return res.data;
};

export const getStudentsInClass  = async (id) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/class/get-student-in-classes/${id}`,
  );
  return res.data;
};