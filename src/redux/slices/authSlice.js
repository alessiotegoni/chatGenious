import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: { token: null },
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken } = action.payload;
      state.token = accessToken;
    },
    logout: (state) => {
      state.token = null
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export const getCurrentToken = (state) => state.auth.token;

export default authSlice.reducer;
