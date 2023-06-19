import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/user/userSlice.js"
import productReducer from "../features/product/productSlice.js"
import blogReducer from "../features/blog/blogSlice.js"
import contactReducer from "../features/contact/contactSlice.js"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    blog: blogReducer,
    contact: contactReducer,
  },
});
