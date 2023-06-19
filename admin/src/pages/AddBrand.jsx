import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as yup from "yup";
import { createBrand, getABrand, resetState, updateABrand } from "../features/brand/brandSlice";



let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
});




const AddBrand = () => {
const dispatch = useDispatch();
const navigate = useNavigate();
const location = useLocation();
const getBrandId = location.pathname.split("/")[3];


const newBrand = useSelector((state) => state.brand);
const {
  isSuccess,
  isError,
  isLoading,
  createdBrand,
  brandName,
  updatedBrand,
} = newBrand;

useEffect(() => {
  if (getBrandId !== undefined) {
    dispatch(getABrand(getBrandId));
  } else {
    dispatch(resetState());
  }
}, [getBrandId]);


useEffect(() => { 
  if (isSuccess && createdBrand) {
    toast.success("Brand Added Successfully!");
  }
  if (isSuccess && updatedBrand) {
    toast.success("Brand Updated Successfully!");
    navigate("/admin/list-brand");
  }

  if (isError) {
    toast.error("Something Went Wrong!");
  }
}, [isSuccess, isError, isLoading, createdBrand]);


const formik = useFormik({
  enableReinitialize: true,
  initialValues: {
    title: brandName || "",
  },
  validationSchema: schema,
  onSubmit: (values) => {
    if (getBrandId !== undefined) {
      const data = { id: getBrandId, brandData: values };
      dispatch(updateABrand(data));
      dispatch(resetState());
    } else {
      dispatch(createBrand(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
      }, 300);
    }
  },
});


  return (
    <div>
    <h3 className="mb-4 title">
      {getBrandId !== undefined ? "Edit" : "Add"} Brand
    </h3>
    <div>
      <form action="" onSubmit={formik.handleSubmit}>
        <CustomInput
          type="text"
          name="title"
          onCh={formik.handleChange("title")}
          onBlr={formik.handleBlur("title")}
          val={formik.values.title}
          label="Enter Brand"
          id="brand"
        />
        <div className="error">
          {formik.touched.title && formik.errors.title}
        </div>
        <button
          className="button"
          type="submit"
        >
          {getBrandId !== undefined ? "Update" : "Add"} Brand
        </button>
      </form>
    </div>
  </div>
  );
};

export default AddBrand;
