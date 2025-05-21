import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const USER_TOKEN = `Bearer ${localStorage.getItem("userToken")}`;

// fetch all orders
export const fetchAdminOrders = createAsyncThunk(
  "adminOrders/fetchOrders",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders`,
      {
        headers: {
          Authorization: USER_TOKEN,
        },
      }
    );

    return response.data;
  }
);
