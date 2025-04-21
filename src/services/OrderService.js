import axios from "axios";

export const axiosJWT = axios.create();

export const OrderService = {
  createOrder: async (id, data) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/order/create/${id}`,
        data
      );
      return response.data;
    } catch (err) {
      throw new Error("Lỗi khi tạo đơn hàng");
    }
  },

  getMyOrders: async (userId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/order/get-all-order/${userId}`
      );
      return response.data;
    } catch (err) {
      throw new Error("Lỗi khi lấy đơn hàng");
    }
  },
};

export const getAllOrder = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/order/get-all-order`);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi gọi API lấy danh sách order:", error);
      throw error;
    }
  };

  export const getTotalOrder = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/order/get-total-orders`);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi gọi API lấy danh sách order:", error);
      throw error;
    }
  };

  export const getTotalRevenue = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/order/get-total-revenue`);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi gọi API lấy danh sách order:", error);
      throw error;
    }
  };