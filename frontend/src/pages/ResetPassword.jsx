import { Link, useLocation, useNavigate } from "react-router-dom";
import CustomInput from "../components/CustomInput";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { resetUserPassword } from "../features/user/userSlice";


const resetSchema = yup.object({
  password: yup.string().required("Password is Required"),
});


const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const getToken = location.pathname.split("/")[2];

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: resetSchema,
    onSubmit: (values) => {
      dispatch(resetUserPassword({ token: getToken, password: values.password }))
      navigate("/login")
    },
  });

  return (
    <>
      <Meta title={"Reset Password"} />
      <BreadCrumb title="Reset Password" />
      <div class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12 d-flex justify-content-center align-items-center" style={{height: "440px"}}>
            <div className="auth-card">
              <h3 className="text-center mb-3">Reset Password</h3>
              <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15">
              <CustomInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                />
                <div className="error">
                  {formik.touched.password && formik.errors.password}
                </div>
                <div>
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button className="button border-0">Ok</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;