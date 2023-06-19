import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const login = async (userData) => {
  const response = await axios.post(`${base_url}user/admin-login`, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const getOrders = async () => {
  const response = await axios.get(`${base_url}user/getallorders/`, config);
  return response.data;
};

const updateOrder = async (data) => {
  const response = await axios.put(`${base_url}user/update-order/${data.id}`, {status: data.status}, config);
  return response.data;
};

const getOrder = async (id) => {
  const response = await axios.get(`${base_url}user/get-a-order/${id}`,
    config
  );
  return response.data;
};

const getMonthlyOrders = async () => {
  const response = await axios.get(`${base_url}user/get-month-wise-order-income`,
    config
  );
  return response.data;
};

const getYearlyOrders = async () => {
  const response = await axios.get(`${base_url}user/get-year-wise-order-income`,
    config
  );
  return response.data;
};

// const logOut = async () => {
//   const response = await axios.get(`${base_url}user/logout`);
//   return response.data;
// };


const authService = {
  login,
  getOrders,
  getOrder,
  getMonthlyOrders,
  getYearlyOrders,
  updateOrder,
  // logOut,
};

export default authService;
