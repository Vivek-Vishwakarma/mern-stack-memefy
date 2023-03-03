import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const backendURL = "http://localhost:5000";
export const userLogin = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${backendURL}/users/login`,
        { email, password },
        config
      );
      console.log(data);
      // store user's token in local storage
      localStorage.setItem("userToken", JSON.stringify(data));
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

export const userRegister = createAsyncThunk(
  "user/register",
  async ({ email, password, name, image }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${backendURL}/users/register`,
        { email, password, name, image },
        config
      );
      console.log(data);
      // store user's token in local storage
      localStorage.setItem("userToken", data.token);
      return data;
    } catch (error) {
      console.log(error);
      // return custom error message from API if any
      if (error.response && error.response.data.msg) {
        // console.log(error.response.data.message);
        return rejectWithValue(error.response.data.msg);
      } else {
        // console.log(error.response.data.message);
        return rejectWithValue(error.message);
      }
    }
  }
);
