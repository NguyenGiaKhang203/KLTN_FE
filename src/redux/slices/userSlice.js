import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null, 
    access_token: '',
    
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Cập nhật thông tin người dùng
        updateUser: (state, action) => {
            state.user = action.payload;
            state.access_token = action.payload.access_token;
        },
        resetUser: (state) => {
            state.user = null;
        },
    },
});


export const { updateUser, resetUser } = userSlice.actions;
export default userSlice.reducer;

// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//     user: {
//         id: '',
//         name: '',
//         email: '',
//         phone: '',
//         address: '',
//         avatar: '',
//         isAdmin: false,
//         isTeacher: false,
//         city: ''
//     },
//     access_token: '',
//     refreshToken: ''
// };

// const userSlice = createSlice({
//     name: 'user',
//     initialState,
//     reducers: {
//         updateUser: (state, action) => {
//             const {
//                 _id = '',
//                 name = '',
//                 email = '',
//                 phone = '',
//                 address = '',
//                 avatar = '',
//                 isAdmin = false,
//                 isTeacher = false,
//                 city = '',
//                 access_token = '',
//                 refreshToken = ''
//             } = action.payload;

//             state.user = {
//                 id: _id,
//                 name,
//                 email,
//                 phone,
//                 address,
//                 avatar,
//                 isAdmin,
//                 isTeacher,
//                 city
//             };

//             state.access_token = access_token;
//             state.refreshToken = refreshToken;
//         },
//         resetUser: (state) => {
//             state.user = initialState.user;
//             state.access_token = '';
//             state.refreshToken = '';
//         }
//     }
// });

// export const { updateUser, resetUser } = userSlice.actions;
// export default userSlice.reducer;
