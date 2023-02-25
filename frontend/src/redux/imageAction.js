import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const backendURL = "http://localhost:5000";
// First, create the thunk
export const fetchAllImage = createAsyncThunk(
  "image/fetchAllImage",
  async () => {
    try {
      const response = await axios.get(`${backendURL}/image/`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const imageSearch = createAsyncThunk(
  "image/imageSearch",
  async (input, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.get(
        `${backendURL}/image/search?q=${input}`,
        config
      );
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      // return custom error message from API if any
      if (error.response && error.response.data.msg) {
        return rejectWithValue(error.response.data.msg);
      } else {
        return rejectWithValue(error.msg);
      }
    }
  }
);
