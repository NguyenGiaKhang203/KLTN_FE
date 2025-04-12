import axios from "axios";

export const bulkAttendance = async (classroomId, attendances, teacherId) => {
  try {
    const response = await axios.post("/api/attendance/bulk", {
      classroomId,
      attendances,
      teacherId,
    });
    return response.data;
  } catch (error) {
    console.error("❌ Lỗi khi gửi điểm danh:", error.message);
    throw error;
  }
};