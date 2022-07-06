import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "../features/todoSlice";
import authSlice from "../features/authSlice";

export const store = configureStore({
  reducer: {
    todo: todoSlice,
    auth: authSlice,
  },
});
