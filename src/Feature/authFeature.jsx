import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post("https://reqres.in/api/login", data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        error: error.response?.data || "Something went wrong",
      });
    }
  }
);
