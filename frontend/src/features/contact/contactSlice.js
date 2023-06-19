import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { contactService } from "./contactService";

export const createQuery = createAsyncThunk(
  "contact/post",
  async (contactData, thunkAPI) => {
    try {
      return await contactService.postQuery(contactData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);



const contactState = {
  contact: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const contactSlice = createSlice({
  name: "contact",
  initialState: contactState,
  reducers: [],
  extraReducers: (builder) => {
    builder.addCase(createQuery.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(createQuery.fulfilled, (state, action) =>{
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = true;
      state.contact = action.payload;
      if(state.isSuccess === true)
      toast.success("Query Created Successfully!")
    })
    .addCase(createQuery.rejected, (state, action) =>{
      state.isError = true;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = action.error;
      toast.error(action.error)
    })
  },
});

export default contactSlice.reducer;
