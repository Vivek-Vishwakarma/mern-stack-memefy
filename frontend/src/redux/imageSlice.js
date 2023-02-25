import { createSlice } from "@reduxjs/toolkit";
import { fetchAllImage, imageSearch, searchTag } from "./imageAction";

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
    [imageSearch.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [imageSearch.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.img = payload;
    },
    [imageSearch.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
    },
    [searchTag.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [searchTag.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.img = payload;
    },
    [searchTag.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
    },
  },
});

export const {} = imageSlice.actions;

export default imageSlice.reducer;
