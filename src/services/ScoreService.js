import axios from "axios";

export const axiosJWT = axios.create();

// Tạo điểm số
export const createScore = async (data, token) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/score/create`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

// Lấy toàn bộ điểm số
export const getAllScores = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/score/get-all-score`);
  return res.data;
};

// Lấy điểm số theo ID
export const getScoreById = async (id) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/score/get-score-by-id/${id}`)
  return res.data;
};

// Cập nhật điểm số
export const updateScore = async (id, data, token) => {
  const res = await axios.put(
    `${process.env.REACT_APP_API_URL}/score/update-score/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

// Xóa điểm số
export const deleteScore = async (id, token) => {
  const res = await axios.delete(
    `${process.env.REACT_APP_API_URL}/score/delete/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

export const getScoreByExamIdandStudenId = async (examId,studentId) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/score/get-student-score/${examId}/${studentId}`)
  return res.data;
};
