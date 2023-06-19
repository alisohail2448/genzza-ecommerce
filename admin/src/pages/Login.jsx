import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getMonthlyOrdersIncome, getOrders, getYearlyOrdersIncome, login } from "../features/auth/authSlice";

let schema = yup.object().shape({
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email is Required"),
  password: yup.string().required("Password is Required"),
});
const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
      validationSchema: schema,
       onSubmit: (values) => {
      dispatch(login(values));
    },

  });
  const authState = useSelector((state) => state);

  const { user, isError, isSuccess, isLoading, message } = authState.auth;

  useEffect(() => {
    if (isSuccess) {
      dispatch(getMonthlyOrdersIncome());
      dispatch(getYearlyOrdersIncome());
      dispatch(getOrders())
      navigate("admin");
    } else {
      navigate("");
    }
  }, [user, isError, isSuccess, isLoading]);
  return (
    <div className="py-5" style={{ background: "#111111", minHeight: "100vh" }}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="my-5 w-25 mx-auto p-4" style={{backgroundColor: "#1a1c1e", borderRadius: "10px"}}>
        <h3 className="text-center title" style={{color: "white"}}>Login</h3>
        <p className="text-center" style={{color: "#d0d0d0"}}>Login to your account to continue.</p>
        <div className="error text-center">
          {message.message == "Rejected" ? "You are not an Admin" : ""}
        </div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Email Address"
            id="email"
            name="email"
            onCh={formik.handleChange("email")}
            onBlr={formik.handleBlur("email")}
            val={formik.values.email}
            i_class="search-input"
          />
          <div className="error mt-2">
            {formik.touched.email && formik.errors.email}
          </div>
          <CustomInput
            type="password"
            label="Password"
            id="pass"
            name="password"
            onCh={formik.handleChange("password")}
            onBlr={formik.handleBlur("password")}
            val={formik.values.password}
            i_class="search-input"
          />
          <div className="error mt-2">
            {formik.touched.password && formik.errors.password}
          </div>
          {/* <div className="mb-3 text-end">
            <Link to="forgot-password" className="" style={{color:"#d0d0d0", fontSize: "14px"}}>
              Forgot Password?
            </Link>
          </div> */}
          <button
            className="button"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;