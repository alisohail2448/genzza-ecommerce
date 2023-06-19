import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";
import customerReducer from "../features/customers/customerSlice.js";
import productReducer from "../features/product/productSlice.js";
import brandReducer from "../features/brand/brandSlice.js";
import pCategoryReducer from "../features/pcategories/pcategorySlice.js";
import bCategoryReducer from "../features/bcategory/bcategorySlice.js";
import blogsReducer from "../features/blogs/blogSlice.js";
import colorReducer from "../features/color/colorSlice.js";
import enquiryReducer from "../features/enquiry/enquirySlice.js";
import uploadReducer from "../features/upload/uploadSlice.js";
import couponReducer from "../features/coupon/couponSlice.js";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    product: productReducer,
    brand: brandReducer,
    pCategory: pCategoryReducer,
    bCategory: bCategoryReducer,
    blogs: blogsReducer,
    color: colorReducer,
    enquiry: enquiryReducer,
    upload: uploadReducer,
    coupon: couponReducer
  },
});
