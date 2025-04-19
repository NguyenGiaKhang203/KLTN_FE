import axios from 'axios';

export const axiosJWT = axios.create();

export const OrderService = {
  createOrder: async (id, data) => { // Accept the `id` parameter
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/order/create/${id}`, data); // Send the `id` in the URL
      return response.data;
    } catch (err) {
      throw new Error("Lỗi khi tạo đơn hàng");
    }
  },
};
