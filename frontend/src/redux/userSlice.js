import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { userLogin, userRegister } from "./authAction";
let initialState = {
  loading: false,
  userInfo: {}, // for user object
  userToken: null, // for storing the JWT
  error: null,
  success: false, // for monitoring the registration process.
};
// if (localStorage.getItem("userToken")) {
//   initialState = localStorage.getItem("userToken");
// }

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    // login user
    [userLogin.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.userInfo = payload.user;
      state.userToken = payload.token;
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
    },
    [userRegister.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [userRegister.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.loading = false;
      state.success = true;
      state.userInfo = payload.user;
      state.userToken = payload.token;
    },
    [userRegister.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
