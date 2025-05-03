// AttendanceService.js (FE)
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/attendance";

export const bulkAttendance = async (classroomId, attendances, teacherId, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/bulk`,
      { classroomId, attendances, teacherId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("❌ Lỗi khi gửi điểm danh:", error.message);
    throw error;
  }
};

export const getAttendanceByClassAndDate = async (classroomId, date, token) => {
  try {
    const response = await axios.get(`${API_URL}/get-attendance`, {
      params: {
        classroomId,
        date,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};

export const updateAttendance = async (attendanceId, attendances, token) => {
  try {
    const response = await axios.put(
      `${API_URL}/update`,
      {
        attendanceId,
        attendances, // ✅ SỬA TÊN ĐÚNG
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("❌ Lỗi khi cập nhật điểm danh:", error.message);
    throw error;
  }
};
