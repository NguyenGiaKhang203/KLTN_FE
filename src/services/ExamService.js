import axios from "axios";

export const axiosJWT = axios.create();

// Tạo bài kiểm tra
export const createExam = async (data, token) => {
    const res = await axios.post( `${process.env.REACT_APP_API_URL}/exam/create`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

// Lấy tất cả bài kiểm tra
export const getAllExams = async (token) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/exam/get-all-exam`, {
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

// Lấy bài kiểm tra theo ID
export const getExamById = async (id, token) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/exam/get-exam-by-teacherid/${id}`, {
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

// Lấy tất cả bài kiểm tra theo ID giảng viên
export const getExamsByTeacherId = async (teacherId, token) => {
    console.log("data",teacherId,token);
    
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/exam/get-exam-by-teacherid/${teacherId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

// Cập nhật bài kiểm tra
export const updateExam = async (id, data, token) => {
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/exam/update-exam/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

// Xóa bài kiểm tra
export const deleteExam = async (id, token) => {
    const res = await axios.delete(`${process.env.REACT_APP_API_URL}/exam/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};
