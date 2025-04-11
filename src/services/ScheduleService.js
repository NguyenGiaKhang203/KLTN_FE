import axios from "axios";

export const axiosJWT = axios.create();

// Lịch học học viên
export const getStudentSchedule = async (studentId) => {
    const res = await axios.get( `${process.env.REACT_APP_API_URL}/schedule/schedule-student/${studentId}`)
    return res.data;
};

// Lịch dạy giảng viên
export const getTeacherSchedule = async (teacherId,token) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/schedule/schedule-teacher/${teacherId}`, {
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};