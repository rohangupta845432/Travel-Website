import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUserLogin: localStorage.getItem("isUserLogin")
    ? localStorage.getItem("isUserLogin") === "true"
    : false,
  userEmail: localStorage.getItem("userEmail") || null,
  userToken: localStorage.getItem("userToken") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isUserLogin = true;
      state.userEmail = action.payload.userEmail;
      state.userToken = action.payload.userToken;

      localStorage.setItem("isUserLogin", true);
      localStorage.setItem("userEmail", action.payload.userEmail);
      localStorage.setItem("userToken", action.payload.userToken);
    },
    logout: (state) => {
      state.isUserLogin = false;
      state.userEmail = null;
      state.userToken = null;

      localStorage.removeItem("isUserLogin");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userToken");
    },
  },
});

export const authAction = authSlice.actions;
export default authSlice.reducer;
