// redux/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  isLogin: false,
  isLoginAdmin: false, 
  token: null,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.userId = action.payload.userId;
      state.token = action.payload.token;
      state.isLogin = true;

      if (action.payload.role === "ADMIN") {
        state.isLoginAdmin = true;
      } else {
        state.isLoginAdmin = false; 
      }
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.userId = null;
      state.isLogin = false;
      state.token = null;
      state.isLoginAdmin = false; 
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions;
export default userSlice.reducer;
