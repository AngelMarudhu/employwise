import { createSlice } from "@reduxjs/toolkit";
import {
  deleteUser,
  editUserDetails,
  fetchUserList,
} from "../Feature/userListFeature";

const initialState = {
  isLoading: false,
  error: null,
  users: [],
  page: 1,
  totalPages: 1,

  editUser: {
    openModel: false,
    user: null,
    isUpdated: false,
  },

  deleteUserDetails: {
    isDeleted: false,
    message: "",
  },
};

const userList = createSlice({
  name: "userList",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },

    setEditPanel: (state, action) => {
      state.editUser.openModel = action.payload.openModel;
      state.editUser.user = action.payload.user;
    },

    closeEditPanel: (state) => {
      state.editUser.openModel = false;
      state.editUser.user = null;
      state.editUser.isUpdated = false;
    },

    resetDeleteUserDetails: (state) => {
      state.deleteUserDetails.isDeleted = false;
      state.deleteUserDetails.message = "";
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUserList.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(fetchUserList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.users = action.payload?.data || [];
      state.totalPages = action.payload?.total_pages || 1;
    });

    builder.addCase(fetchUserList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
      state.users = [];
    });

    // edit user
    builder.addCase(editUserDetails.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.editUser.isUpdated = false;
    });

    builder.addCase(editUserDetails.fulfilled, (state, action) => {
      // console.log(action.payload);
      state.isLoading = false;
      state.error = null;
      state.users = state.users.map((user) => {
        if (user.id === action.payload.id) {
          return { ...user, ...action.payload.data };
        }
        return user;
      });
      state.editUser.isUpdated = true;
    });

    builder.addCase(editUserDetails.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
      state.editUser.isUpdated = false;
    });

    // delete user
    builder.addCase(deleteUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.deleteUserDetails.isDeleted = false;
    });

    builder.addCase(deleteUser.fulfilled, (state, action) => {
      // console.log(action.payload);
      state.isLoading = false;
      state.error = null;
      state.users = state.users.filter((user) => user.id !== action.payload.id);
      state.deleteUserDetails.isDeleted = true;
      state.deleteUserDetails.message = action.payload.message;
    });

    builder.addCase(deleteUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
      state.deleteUserDetails.isDeleted = false;
    });
  },
});

export const { setPage, setEditPanel, closeEditPanel, resetDeleteUserDetails } =
  userList.actions;

export default userList.reducer;
