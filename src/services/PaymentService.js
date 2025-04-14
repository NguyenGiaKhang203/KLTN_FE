import axios from 'axios';

export const createPaymentVNPay = async (payload) => {
  const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/payment/create-vnpay-url`, payload);
  return response.data;
};
