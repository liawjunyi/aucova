import { configureStore } from "@reduxjs/toolkit";
import inputReducer from "./input";
import authReducer from "./authSlice";

export default configureStore({
  reducer: {
    addInput: inputReducer,
    auth: authReducer,
  },
});
