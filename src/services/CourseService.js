import axios from "axios";

export const axiosJWT = axios.create();

export const getDetailsCourse = async (id, access_token) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/course/get-details/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getAllCourse = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/course/get-all`,
  );
  return res.data;
};
