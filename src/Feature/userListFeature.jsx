import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserList = createAsyncThunk(
  "fetch-users",
  async (page, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://reqres.in/api/users?page=${page}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        error: error.response?.data || "Something went wrong",
      });
    }
  }
);

export const editUserDetails = createAsyncThunk(
  "edit-user",
  async ({ userId, userData }, thunkAPI) => {
    try {
      const response = await axios.put(
        `https://reqres.in/api/users/${userId}`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return {
        data: response.data,
        id: userId,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue({
        error: error.response?.data || "Something went wrong",
      });
    }
  }
);

export const deleteUser = createAsyncThunk(
  "delete-user",
  async (userId, thunkAPI) => {
    try {
      const response = await axios.delete(
        `https://reqres.in/api/users/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 204) {
        return { id: userId, message: "User deleted successfully!" };
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({
        error: error.response?.data || "Something went wrong",
      });
    }
  }
);
