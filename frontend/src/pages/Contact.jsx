import React from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import { BiPhoneCall, BiInfoCircle } from "react-icons/bi";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createQuery } from "../features/contact/contactSlice";



let schema = yup.object().shape({
  name: yup.string().required("Title is Required"),
  email: yup.string().nullable().email("Email should be valid").required("Email is Required"),
  mobile: yup.number().default('').nullable().required("Mobile is Required"),
  comment: yup.string().required("Comment is Required"),
});

const Contact = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      comment: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createQuery({name: values.name, email: values.email, mobile: values.mobile, comment: values.comment}));
    },
  });

  return (
    <>
      <Meta title={"Contact Us"} />
      <BreadCrumb title="Contact Us" />
      <div className="contact-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105759.33094406185!2d77.67934317395876!3d20.904227820841072!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd6a4a67774bc15%3A0x3c7b3f78ca4f9635!2sAmravati%2C%20Maharashtra!5e1!3m2!1sen!2sin!4v1686990517866!5m2!1sen!2sin" 
                height="450"
                className="border-0 w-100" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <div className="col-12 mt-5">
              <div className="contact-inner-wrapper d-flex justify-content-between ">
                <div>
                  <h3 className="contact-title mb-4">Contact</h3>
                  <form action="" className="d-flex flex-column gap-15" onSubmit={formik.handleSubmit}>
                    <div>
                      <input
                        type="text"
                        className="form-control contact-input"
                        placeholder="Name"
                        name="name"
                        onChange={formik.handleChange("name")}
                        onBlur={formik.handleBlur("name")}
                        value={formik.values.name}
                      />
                      <div className="error">
                        {formik.touched.name && formik.errors.name}
                      </div>
                    </div>
                    <div>
                      <input
                        type="email"
                        className="form-control contact-input"
                        placeholder="Email"
                        name="email"
                        onChange={formik.handleChange("email")}
                        onBlur={formik.handleBlur("email")}
                        value={formik.values.email}
                      />
                      <div className="error">
                        {formik.touched.email && formik.errors.email}
                      </div>
                    </div>
                    <div>
                      <input
                        type="tel"
                        className="form-control contact-input"
                        placeholder="Mobile Number"
                        name="mobile"
                        onChange={formik.handleChange("mobile")}
                        onBlur={formik.handleBlur("mobile")}
                        value={formik.values.mobile}
                      />
                      <div className="error">
                        {formik.touched.mobile && formik.errors.mobile}
                      </div>
                    </div>
                    <div>
                      <textarea
                        id=""
                        className="w-100 form-control contact-input"
                        cols="30"
                        rows="4"
                        placeholder="Comment"
                        name="comment"
                        onChange={formik.handleChange("comment")}
                        onBlur={formik.handleBlur("comment")}
                        value={formik.values.comment}
                      ></textarea>
                      <div className="error">
                        {formik.touched.comment && formik.errors.comment}
                      </div>
                    </div>
                    <div>
                      <button className="button border-0">Submit</button>
                    </div>
                  </form>
                </div>
                <div>
                  <h3 className="contact-title mb-4">Get in touch with us</h3>
                  <div>
                    <ul className="ps-0">
                      <li className="mb-3 d-flex gap-15 align-items-center">
                        <AiOutlineHome className="fs-5" />
                        <address className="mb-0">
                          HNo:277 , Near Gandhi Chowk , Amravati, Maharashtra
                        </address>
                      </li>
                      <li className="mb-3 d-flex gap-15 align-items-center">
                        <BiPhoneCall className="fs-5" />
                        <a href="tel:+91 7249047105">+91 7249047105</a>
                      </li>
                      <li className="mb-3 d-flex gap-15 align-items-center">
                        <AiOutlineMail className="fs-5" />
                        <a href="mailto:alisohail2448@gmail.com">
                          alisohail2448@gmail.com
                        </a>
                      </li>
                      <li className="mb-3 d-flex gap-15 align-items-center">
                        <BiInfoCircle className="fs-5" />
                        <p className="mb-0">Monday – Friday 10 AM – 8 PM</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
