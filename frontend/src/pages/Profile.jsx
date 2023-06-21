import React, { useState } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../features/user/userSlice";
import { FiEdit } from "react-icons/fi";

const profileSchema = yup.object({
  firstname: yup.string().required("First Name is Required"),
  lastname: yup.string().required("Last Name is Required"),
  email: yup.string().nullable().email("Email should be Valid").required("Email is Required"),
  mobile: yup.string().required("Mobile No is Required"),
});

const Profile = () => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(true);
  const userState = useSelector((state) => state?.auth?.user);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      enableReinitialize: true,
      firstname: userState?.firstname,
      lastname: userState?.lastname,
      email: userState?.email,
      mobile: userState?.mobile,
    },
    validationSchema: profileSchema,
    onSubmit: async (values) => {
      setLoading(true);
      await dispatch(updateUserProfile(values));
      setLoading(false);
      setEdit(true);
    },
  });

  return (
    <>
      <Meta title={"My Account"} />
      <BreadCrumb title="My Account" />
      <div className="cart-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="profile-container">
            <div className="row">
              <div className="col-12">
                <form onSubmit={formik.handleSubmit}>
                  <div className="profile-heading d-flex justify-content-between align-items-center mb-4">
                    <h3 className="text-white mb-0 ">Update Profile</h3>
                    <FiEdit onClick={() => setEdit(false)} style={{fontSize: "22px", cursor: "pointer"}} />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label"
                    >
                      First Name
                    </label>
                    <input disabled={edit}
                      type="text"
                      name="firstname"
                      placeholder="Firstname"
                      className="form-control profile-input"
                      id="exampleInputPassword1"
                      value={formik.values.firstname}
                      onChange={formik.handleChange("firstname")}
                      onBlur={formik.handleBlur("firstname")}
                    />
                    <div className="error">
                      {formik.touched.firstname && formik.errors.firstname}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label"
                    >
                      Last Name
                    </label>
                    <input disabled={edit}
                      type="text"
                      placeholder="Lastname"
                      name="lastname"
                      className="form-control profile-input"
                      id="exampleInputPassword1"
                      value={formik.values.lastname}
                      onChange={formik.handleChange("lastname")}
                      onBlur={formik.handleBlur("lastname")}
                    />
                    <div className="error">
                      {formik.touched.lastname && formik.errors.lastname}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Email address
                    </label>
                    <input disabled={edit}
                      placeholder="Email"
                      type="email"
                      name="email"
                      className="form-control profile-input"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      value={formik.values.email}
                      onChange={formik.handleChange("email")}
                      onBlur={formik.handleBlur("email")}
                    />
                    <div className="error">
                      {formik.touched.email && formik.errors.email}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label"
                    >
                      Mobile No
                    </label>
                    <input disabled={edit}
                      placeholder="Mobile No"
                      type="number"
                      name="mobile"
                      className="form-control profile-input"
                      id="exampleInputPassword1"
                      value={formik.values.mobile}
                      onChange={formik.handleChange("mobile")}
                      onBlur={formik.handleBlur("mobile")}
                    />
                    <div className="error">
                      {formik.touched.mobile && formik.errors.mobile}
                    </div>
                  </div>

                 {
                  edit === false &&  <button
                  type="submit"
                  className="button"
                  style={{ marginTop: "50px" }}
                >
                  Save
                </button>
                 }
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
