import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // Khởi tạo giá trị user là null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Cập nhật thông tin người dùng
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    // Đặt lại thông tin người dùng (reset)
    resetUser: (state) => {
      state.user = null;
    },
  },
});

// Xuất action và reducer
export const { updateUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
