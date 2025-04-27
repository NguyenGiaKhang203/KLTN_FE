import axios from "axios";

export const bulkAttendance = async (classroomId, attendances, teacherId, token) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/attendance/bulk`,
      {
        classroomId,
        attendances,
        teacherId,
      },
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

export const getAttendanceByClassAndDate = async (classroomId, date,token) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/attendance/get-attendance`,
      {
        params: {
          classroomId,
          date,
        }
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
}
