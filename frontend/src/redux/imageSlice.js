import { createSlice } from "@reduxjs/toolkit";
import { fetchAllImage } from "./imageAction";

let initialState = {
  loading: false,
  img: [],
  error: null,
  success: false, // for monitoring the registration process.
};

export const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAllImage.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchAllImage.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.img = payload;
    },
    [fetchAllImage.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
    },
  },
});

export const {} = imageSlice.actions;

export default imageSlice.reducer;
