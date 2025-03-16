import axios from "axios"

export const axiosJWT = axios.create()

export const loginUser = async (data) => {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-in`, data);
      return res.data;
} 

export const signupUser = async (data) => {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-up`, data); 
        return res.data; 
}

export const sendOtp = async (data) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/send-otp`, data);
        return res.data;
    } catch (error) {
        throw {
            status: 'ERR',
            message: error.response?.data?.message || 'Có lỗi xảy ra khi gửi OTP.'
        }
    }
}

