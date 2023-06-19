import React from "react";
import CustomInput from "../components/CustomInput";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";

const forgotSchema = yup.object({
  email: yup
    .string()
    .nullable()
    .email("Email should be Valid")
    .required("Email is Required"),
});

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values));
    },
  });

  return (
    <div className="py-5" style={{ background: "#111111", minHeight: "100vh" }}>
      <br />
      <br />
      <br />
      <br />
      <div className="my-5 forgot-card   mx-auto p-4" style={{backgroundColor: "#1a1c1e", borderRadius: "10px"}}>
        <h3 className="text-center title" style={{color: "white"}}>Forgot Password</h3>
        <p className="text-center" style={{color: "#d0d0d0", fontSize: "14px"}}>
          Please Enter your register email to get reset password mail.
        </p>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
          i_class="search-input mb-2"
            type="email"
            label="Email Address"
            id="email"
            name="email"
            val={formik.values.email}
            onCh={formik.handleChange("email")}
            onBlr={formik.handleBlur("email")}
          />
          <div className="error">
            {formik.touched.email && formik.errors.email}
          </div>

          <button
            className="button mt-4"
            type="submit"
          >
            Send Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
