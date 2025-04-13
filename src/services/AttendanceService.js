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
