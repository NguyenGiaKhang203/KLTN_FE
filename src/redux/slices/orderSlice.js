import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  orderItems: [],
  orderItemsSlected: [],
  shippingAddress: {},
  paymentMethod: '',
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
  user: '',
  isPaid: false,
  paidAt: '',
  isDelivered: false,
  deliveredAt: '',
  isSucessOrder: false,
}

export const orderSlide = createSlice({
  name: 'order',
  initialState,
  reducers: {
    // Thêm sản phẩm vào giỏ hàng
    addOrderProduct: (state, action) => {
      const { courseId, classId } = action.payload;
      const existingItem = state.orderItems.find(
        (item) => item.courseId === courseId && item.classId === classId
      );
      
      if (existingItem) {
        // Nếu sản phẩm đã có trong giỏ hàng, bạn có thể tăng số lượng hoặc xử lý theo cách khác
        existingItem.quantity += 1;
      } else {
        // Thêm sản phẩm mới vào giỏ hàng
        state.orderItems.push({
          courseId,
          classId,
          quantity: 1,
          timeAdded: Date.now(),
        });
      }
      state.isSucessOrder = true;
      state.isErrorOrder = false;
    },

    // Các reducer khác
    resetOrder: (state) => {
      state.isSucessOrder = false;
    },
    increaseAmount: (state, action) => {
      const { idProduct } = action.payload;
      const itemOrder = state.orderItems.find((item) => item.product === idProduct);
      if (itemOrder) itemOrder.amount++;
    },
    decreaseAmount: (state, action) => {
      const { idProduct } = action.payload;
      const itemOrder = state.orderItems.find((item) => item.product === idProduct);
      if (itemOrder) itemOrder.amount--;
    },
    removeOrderProduct: (state, action) => {
      const { idProduct } = action.payload;
      state.orderItems = state.orderItems.filter((item) => item.product !== idProduct);
    },
    removeAllOrderProduct: (state, action) => {
      const { listChecked } = action.payload;
      state.orderItems = state.orderItems.filter((item) => !listChecked.includes(item.product));
    },
    selectedOrder: (state, action) => {
      const { listChecked } = action.payload;
      state.orderItemsSlected = state.orderItems.filter((order) => listChecked.includes(order.product));
    }
  },
})

export const { addOrderProduct, increaseAmount, decreaseAmount, removeOrderProduct, removeAllOrderProduct, selectedOrder, resetOrder } = orderSlide.actions;

export default orderSlide.reducer;
