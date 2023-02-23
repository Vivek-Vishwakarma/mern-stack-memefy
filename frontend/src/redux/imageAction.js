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
