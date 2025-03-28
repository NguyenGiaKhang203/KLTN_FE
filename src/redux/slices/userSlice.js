import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",           // Tên học viên
  dob: "",            // Ngày sinh
  parentName: "",     // Tên phụ huynh
  parentPhone: "",    // SĐT phụ huynh
  email: "",
  phone: "",          // nếu cần, hoặc có thể bỏ
  address: "",
  avatar: "",
  access_token: "",
  id: "",
  isAdmin: false,
  city: "",
  refreshToken: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const {
        name = "",
        dob = "",
        parentName = "",
        parentPhone = "",
        email = "",
        phone = "",
        address = "",
        avatar = "",
        access_token = "",
        isAdmin = false,
        city = "",
        refreshToken = "",
        id = "",
        _id = "",
      } = action.payload;

      state.name = name || state.name;
      state.dob = dob || state.dob;
      state.parentName = parentName || state.parentName;
      state.parentPhone = parentPhone || state.parentPhone;
      state.email = email || state.email;
      state.phone = phone || state.phone;
      state.address = address || state.address;
      state.avatar = avatar || state.avatar;
      state.id = id || _id || state.id;
      state.access_token = access_token || state.access_token;
      state.isAdmin = typeof isAdmin === "boolean" ? isAdmin : state.isAdmin;
      state.city = city || state.city;
      state.refreshToken = refreshToken || state.refreshToken;
    },

    resetUser: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { updateUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
