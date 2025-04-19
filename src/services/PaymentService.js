import axios from 'axios';

export const createPaymentVNPay = async (payload) => {
  const response = await axios.post(`${process.env.REACT_APP_API_URL}/payment/create-payment-url`, payload);
  return response.data;
};
