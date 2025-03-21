import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAdminLogin: localStorage.getItem("isAdminLogin")
    ? localStorage.getItem("isAdminLogin") === "true"
    : false,
  adminEmail: localStorage.getItem("adminEmail") || null,
  adminToken: localStorage.getItem("adminToken") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAdminLogin = true;
      state.adminEmail = action.payload.adminEmail;
      state.adminToken = action.payload.adminToken;

      localStorage.setItem("isAdminLogin", true);
      localStorage.setItem("adminEmail", action.payload.adminEmail);
      localStorage.setItem("adminToken", action.payload.adminToken);
    },
    logout: (state, action) => {
      state.isAdminLogin = false;
      state.adminEmail = null;
      state.adminToken = null;

      localStorage.removeItem("isAdminLogin");
      localStorage.removeItem("adminEmail");
      localStorage.removeItem("adminToken");
    },
  },
});

export const authAction = authSlice.actions;
export default authSlice.reducer;
