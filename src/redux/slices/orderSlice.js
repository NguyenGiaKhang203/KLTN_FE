// // import { createSlice } from '@reduxjs/toolkit';

// // const initialState = {
// //   orderItems: [],
// //   orderItemsSlected: [],
// //   shippingAddress: {},
// //   paymentMethod: '',
// //   itemsPrice: 0,
// //   shippingPrice: 0,
// //   taxPrice: 0,
// //   totalPrice: 0,
// //   user: '',
// //   isPaid: false,
// //   paidAt: '',
// //   isDelivered: false,
// //   deliveredAt: '',
// //   isSucessOrder: false,
// // };

// // export const orderSlide = createSlice({
// //   name: 'order',
// //   initialState,
// //   reducers: {
// //     // ✅ Thêm khóa học vào giỏ hàng (theo courseId + classId)
// //     addOrderProduct: (state, action) => {
// //       const { courseId, classId } = action.payload;
// //       const existingItem = state.orderItems.find(
// //         (item) => item.courseId === courseId && item.classId === classId
// //       );

// //       if (existingItem) {
// //         existingItem.quantity += 1;
// //       } else {
// //         state.orderItems.push({
// //           courseId,
// //           classId,
// //           name: action.payload.name,
// //           image: action.payload.image,
// //           price: action.payload.price,
// //           schedule: action.payload.schedule,
// //           quantity: 1,
// //           timeAdded: Date.now(),
// //         });
// //       }

// //       state.isSucessOrder = true;
// //       state.isErrorOrder = false;
// //     },

// //     resetOrder: (state) => {
// //       state.isSucessOrder = false;
// //     },

// //     // ✅ Tăng số lượng khóa học (dựa trên courseId)
// //     increaseAmount: (state, action) => {
// //       const { idProduct } = action.payload;
// //       const itemOrder = state.orderItems.find(
// //         (item) => item.courseId === idProduct
// //       );
// //       if (itemOrder) itemOrder.quantity++;
// //     },

// //     // ✅ Giảm số lượng khóa học (dựa trên courseId)
// //     decreaseAmount: (state, action) => {
// //       const { idProduct } = action.payload;
// //       const itemOrder = state.orderItems.find(
// //         (item) => item.courseId === idProduct
// //       );
// //       if (itemOrder && itemOrder.quantity > 1) itemOrder.quantity--;
// //     },

// //     // ✅ Xóa 1 sản phẩm
// //     removeOrderProduct: (state, action) => {
// //       const { idProduct } = action.payload;
// //       state.orderItems = state.orderItems.filter(
// //         (item) => item.courseId !== idProduct
// //       );
// //     },

// //     // ✅ Xóa nhiều sản phẩm được chọn
// //     removeAllOrderProduct: (state, action) => {
// //       const { listChecked } = action.payload;
// //       state.orderItems = state.orderItems.filter(
// //         (item) => !listChecked.includes(item.courseId)
// //       );
// //     },

// //     // ✅ Lưu danh sách đã chọn
// //     selectedOrder: (state, action) => {
// //       const { listChecked } = action.payload;
// //       state.orderItemsSlected = state.orderItems.filter((order) =>
// //         listChecked.includes(order.courseId)
// //       );
// //     },

// //     // ✅ Reset toàn bộ giỏ hàng khi logout
// //     resetOrderState: (state) => {
// //       state.orderItems = [];
// //       state.orderItemsSlected = [];
// //       state.shippingAddress = {};
// //       state.paymentMethod = '';
// //       state.itemsPrice = 0;
// //       state.shippingPrice = 0;
// //       state.taxPrice = 0;
// //       state.totalPrice = 0;
// //       state.user = '';
// //       state.isPaid = false;
// //       state.paidAt = '';
// //       state.isDelivered = false;
// //       state.deliveredAt = '';
// //       state.isSucessOrder = false;
// //     },
// //   },
// // });

// // export const {
// //   addOrderProduct,
// //   increaseAmount,
// //   decreaseAmount,
// //   removeOrderProduct,
// //   removeAllOrderProduct,
// //   selectedOrder,
// //   resetOrder,
// //   resetOrderState,
// // } = orderSlide.actions;

// // export default orderSlide.reducer;

// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   orderItems: [],
//   orderItemsSlected: [],
//   shippingAddress: {},
//   paymentMethod: '',
//   itemsPrice: 0,
//   shippingPrice: 0,
//   taxPrice: 0,
//   totalPrice: 0,
//   user: '',
//   isPaid: false,
//   paidAt: '',
//   isDelivered: false,
//   deliveredAt: '',
//   isSucessOrder: false,
// };

// export const orderSlide = createSlice({
//   name: 'order',
//   initialState,
//   reducers: {
//     addOrderProduct: (state, action) => {
//       const { courseId, classId } = action.payload;
//       const existingItem = state.orderItems.find(
//         (item) => item.courseId === courseId && item.classId === classId
//       );

//       if (existingItem) {
//         existingItem.quantity += 1;
//       } else {
//         state.orderItems.push({
//           courseId,
//           classId,
//           name: action.payload.name,
//           image: action.payload.image,
//           price: action.payload.price,
//           schedule: action.payload.schedule,
//           quantity: 1,
//           timeAdded: Date.now(),
//         });
//       }

//       state.isSucessOrder = true;
//       state.isErrorOrder = false;
//     },

//     resetOrder: (state) => {
//       state.isSucessOrder = false;
//     },

//     increaseAmount: (state, action) => {
//       const { idProduct } = action.payload;
//       const itemOrder = state.orderItems.find(
//         (item) => item.courseId === idProduct
//       );
//       if (itemOrder) itemOrder.quantity++;
//     },

//     decreaseAmount: (state, action) => {
//       const { idProduct } = action.payload;
//       const itemOrder = state.orderItems.find(
//         (item) => item.courseId === idProduct
//       );
//       if (itemOrder && itemOrder.quantity > 1) itemOrder.quantity--;
//     },

//     removeOrderProduct: (state, action) => {
//       const { idProduct } = action.payload;
//       state.orderItems = state.orderItems.filter(
//         (item) => item.courseId !== idProduct
//       );
//     },

//     removeAllOrderProduct: (state, action) => {
//       const { listChecked } = action.payload;
//       state.orderItems = state.orderItems.filter(
//         (item) => !listChecked.includes(item.courseId)
//       );
//     },

//     selectedOrder: (state, action) => {
//       const { listChecked } = action.payload;
//       state.orderItemsSlected = state.orderItems.filter((order) =>
//         listChecked.includes(order.courseId)
//       );
//     },

//     resetOrderState: (state) => {
//       state.orderItems = [];
//       state.orderItemsSlected = [];
//       state.shippingAddress = {};
//       state.paymentMethod = '';
//       state.itemsPrice = 0;
//       state.shippingPrice = 0;
//       state.taxPrice = 0;
//       state.totalPrice = 0;
//       state.user = '';
//       state.isPaid = false;
//       state.paidAt = '';
//       state.isDelivered = false;
//       state.deliveredAt = '';
//       state.isSucessOrder = false;
//     },
//   },
// });

// export const {
//   addOrderProduct,
//   increaseAmount,
//   decreaseAmount,
//   removeOrderProduct,
//   removeAllOrderProduct,
//   selectedOrder,
//   resetOrder,
//   resetOrderState,
// } = orderSlide.actions;

// export default orderSlide.reducer;

import { createSlice } from '@reduxjs/toolkit';

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
};

export const orderSlide = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrderProduct: (state, action) => {
      const {
        courseId,
        classId,
        name,
        image,
        price,
        schedule,
        className,
        email,
      } = action.payload;

      const existingItem = state.orderItems.find(
        (item) => item.courseId === courseId && item.classId === classId
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.orderItems.push({
          courseId,
          classId,
          name,
          image,
          price,
          schedule,
          className,
          email,
          quantity: 1,
          timeAdded: Date.now(),
        });
      }

      state.isSucessOrder = true;
      state.isErrorOrder = false;
    },

    resetOrder: (state) => {
      state.isSucessOrder = false;
    },

    increaseAmount: (state, action) => {
      const { idProduct } = action.payload;
      const itemOrder = state.orderItems.find(
        (item) => item.courseId === idProduct
      );
      if (itemOrder) itemOrder.quantity++;
    },

    decreaseAmount: (state, action) => {
      const { idProduct } = action.payload;
      const itemOrder = state.orderItems.find(
        (item) => item.courseId === idProduct
      );
      if (itemOrder && itemOrder.quantity > 1) itemOrder.quantity--;
    },

    removeOrderProduct: (state, action) => {
      const { idProduct } = action.payload;
      state.orderItems = state.orderItems.filter(
        (item) => item.courseId !== idProduct
      );
    },

    removeAllOrderProduct: (state, action) => {
      const { listChecked } = action.payload;
      state.orderItems = state.orderItems.filter(
        (item) => !listChecked.includes(item.courseId)
      );
    },

    selectedOrder: (state, action) => {
      const { listChecked } = action.payload;
      state.orderItemsSlected = state.orderItems.filter((order) =>
        listChecked.includes(order.courseId)
      );
    },

    resetOrderState: (state) => {
      state.orderItems = [];
      state.orderItemsSlected = [];
      state.shippingAddress = {};
      state.paymentMethod = '';
      state.itemsPrice = 0;
      state.shippingPrice = 0;
      state.taxPrice = 0;
      state.totalPrice = 0;
      state.user = '';
      state.isPaid = false;
      state.paidAt = '';
      state.isDelivered = false;
      state.deliveredAt = '';
      state.isSucessOrder = false;
    },
  },
});

export const {
  addOrderProduct,
  increaseAmount,
  decreaseAmount,
  removeOrderProduct,
  removeAllOrderProduct,
  selectedOrder,
  resetOrder,
  resetOrderState,
} = orderSlide.actions;

export default orderSlide.reducer;
