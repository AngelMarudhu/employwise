import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Redux/authSlice";
import userList from "../Redux/userListSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    userList: userList,
  },
});
