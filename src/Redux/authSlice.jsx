import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../Feature/authFeature";

const initialState = {
  isLoading: false,
  error: null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: false,
  isNotForcedLogout: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      state.isLoading = false;
      state.error = null;
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
      state.isNotForcedLogout = false;
      localStorage.removeItem("token");
    },
    setLoginError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      //// we need to store the token to local storate for future purpose
      localStorage.setItem("token", action.payload.token);
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
    });
  },
});

export const { logOut, setLoginError } = authSlice.actions;

export default authSlice.reducer;
