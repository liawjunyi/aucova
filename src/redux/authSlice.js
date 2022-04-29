import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null },
  reducers: {
    login(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    },
    updateUser(state, action) {
      state.user.email = action.payload.email;
      state.user.username = action.payload.username;
      state.user.fullname = action.payload.fullname;
    },
  },
});

export const { login, logout, updateUser } = authSlice.actions;

export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;
