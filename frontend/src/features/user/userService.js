import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const register = async (userData) => {
  const response = await axios.post(`${base_url}user/register`, userData);
  if (response.data) {
    // if(response.data){
    //   localStorage.setItem("customer", JSON.stringify(response.data));
    // }
    return response.data;
  }
};

const login = async (userData) => {
  const response = await axios.post(`${base_url}user/login`, userData);
  if (response.data) {
    if (response.data) {
      localStorage.setItem("customer", JSON.stringify(response.data));
    }
    return response.data;
  }
};

const getUserWishlist = async () => {
  const response = await axios.get(`${base_url}user/wishlist`, config);
  if (response.data) return response.data;
};

const addToCart = async (cartData) => {
  const response = await axios.post(`${base_url}user/cart`,cartData, config);
  if (response.data) return response.data;
};

const getCart = async () => {
  const response = await axios.get(`${base_url}user/cart`, config);
  if (response.data) return response.data;
};

const removeProductFromCart = async (cartItemId) => {
  const response = await axios.delete(`${base_url}user/delete-product-cart/${cartItemId}`, config);
  if (response.data) return response.data;
};

const updateProductFromCart = async (cartDetail) => {
  const response = await axios.delete(`${base_url}user/delete-product-cart/${cartDetail.cartItemId}/${cartDetail.newQuantity}`, config);
  if (response.data) return response.data;
};

const createOrder = async (orderDetail) => {
  const response = await axios.post(`${base_url}user/cart/create-order`, orderDetail, config);
  if (response.data) return response.data;
};

const getOrders = async () => {
  const response = await axios.get(`${base_url}user/get-my-orders`, config);
  if (response.data) return response.data;
};

const updateUser = async (data) => {
  const response = await axios.put(`${base_url}user/update-user`, data, config);
  if (response.data) return response.data;
};


const forgotPassToken = async (data) => {
  const response = await axios.post(`${base_url}user/forgot-password-token`, data);
  if (response.data) return response.data;
};

const resetPassword = async (data) => {
  const response = await axios.put(`${base_url}user/reset-password/${data.token}`,{ password: data?.password });
  if (response.data) return response.data;
};


const logOutUser = async () => {
  const response = await axios.get(`${base_url}user/forgot-password-token`);
  if (response.data) return response.data;
};

const addCompareProduct = async (productId) => {
  const response = await axios.post(`${base_url}user/compare`, {productId}, config);
  if (response.data) return response.data;
};

const getCompareProduct = async () => {
  const response = await axios.get(`${base_url}user/compare`, config);
  if (response.data) return response.data;
};

const removeCompareProduct = async (productId) => {
  const response = await axios.delete(`${base_url}user/compare`, { data: { productId }, ...config });
  if (response.data) return response.data;
};

const emptyCart = async () => {
  const response = await axios.delete(`${base_url}user/empty-cart`, config);
  if (response.data) return response.data;
};



export const authService = {
  register,
  login,
  getUserWishlist,
  addToCart,
  getCart,
  removeProductFromCart,
  updateProductFromCart,
  createOrder,
  getOrders,
  updateUser,
  forgotPassToken,
  logOutUser,
  resetPassword,
  addCompareProduct,
  getCompareProduct,
  removeCompareProduct,
  emptyCart,
};
