import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import toast from "react-hot-toast";


const getUserFromLocalStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem("user")) : null;

const initialState = {
  user: getUserFromLocalStorage,
  orders: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};



export const login = createAsyncThunk(
  "auth/admin-login",
  async (user, thunkApi) => {
    try {
      return await authService.login(user);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);


export const getOrders = createAsyncThunk(
  "order/get-orders",
  async (thunkAPI) => {
    try {
      return await authService.getOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const getOrderByUser = createAsyncThunk(
  "order/get-order-by-user",
  async (id, thunkAPI) => {
    try {
      return await authService.getOrder(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const updateOrderStatus = createAsyncThunk(
  "order/update",
  async (data, thunkAPI) => {
    try {
      return await authService.updateOrder(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getMonthlyOrdersIncome = createAsyncThunk(
  "orders/monthly-data",
  async (thunkAPI) => {
    try {
      return await authService.getMonthlyOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getYearlyOrdersIncome = createAsyncThunk(
  "orders/yearly-data",
  async (thunkAPI) => {
    try {
      return await authService.getYearlyOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);





export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // ...
    logout: (state) => {
      localStorage.clear();
      state.user = null;
      state.orders = [];
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
      if(state.isSuccess === false){
        toast.success("Logout Successfully!")
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        if(state.isSuccess === true){
          toast.success("Logged In Successfully!")
        }
      })
    .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.user = null;
        if(state.isSuccess === false){
          toast.error("Something went wrong!")
        }
      })
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = action.payload;
        state.message = "success";
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(getOrderByUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderByUser.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.singleOrder = action.payload;
        state.message = "success";
      })
      .addCase(getOrderByUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(getMonthlyOrdersIncome.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMonthlyOrdersIncome.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.monthlyData = action.payload;
        state.message = "success";
      })
      .addCase(getMonthlyOrdersIncome.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(getYearlyOrdersIncome.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getYearlyOrdersIncome.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.yearlyData = action.payload;
        state.message = "success";
      })
      .addCase(getYearlyOrdersIncome.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.updatedOrder = action.payload;
        state.message = "success";
        if(state.isSuccess === true){
          toast.success("Status Updated Successfully!")
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
        if(state.isSuccess === false){
          toast.error("Something went wrong!")
        }
      })
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;