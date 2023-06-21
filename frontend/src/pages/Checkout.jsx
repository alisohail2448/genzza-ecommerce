import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import watch from "../images/watch.jpg";
import logo from "../images/logot3.png";
import { useDispatch, useSelector } from "react-redux";
import { createUserOrder, getUserCart } from "../features/user/userSlice";
import { useFormik } from "formik";
import * as yup from "yup";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { config } from "../utils/axiosConfig";

const shippingSchema = yup.object({
  firstname: yup.string().required("First Name is Required"),
  lastname: yup.string().required("Last Name is Required"),
  address: yup.string().required("Address is Required"),
  state: yup.string().required("State is Required"),
  city: yup.string().required("City is Required"),
  country: yup.string().required("Country is Required"),
  pincode: yup.number().required("Pincode is Required"),
});

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [shippingInfo, setShippingInfo] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState({
    razorpayOrderId: "",
    razorpayPaymentId: "",
  });
  const [cartProductState, setCartProductState] = useState([]);

  const userCartState = useSelector((state) => state?.auth?.cartProducts);

  useEffect(() => {
    dispatch(getUserCart());
  }, []);

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      address: "",
      state: "",
      city: "",
      country: "",
      pincode: "",
      other: "",
    },
    validationSchema: shippingSchema,
    onSubmit: (values) => {
      setShippingInfo(values);
      checkOutHandler();
    },
  });
  // console.log(shippingInfo, paymentInfo);

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < userCartState?.length; index++) {
      sum =
        sum +
        Number(userCartState[index].quantity) * userCartState[index].price;
      setTotalAmount(sum);
    }
  }, [userCartState]);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
  useEffect(() => {
    let items = [];
    for (let index = 0; index < userCartState?.length; index++) {
      items.push({
        product: userCartState[index]?.productId?._id,
        quantity: userCartState[index]?.quantity,
        color: userCartState[index]?.color?._id,
        price: userCartState[index]?.price,
      });
    }
    setCartProductState(items);
  }, []);

  const checkOutHandler = async (orderItems, shippingInfo) => {
    // console.log(orderItems)
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }

    const result = await axios.post(
      "http://localhost:5000/api/user/order/checkout",
      { amount: totalAmount },
      config
    );
    if (!result) {
      alert("Something went wrong");
      return;
    }

    const { amount, id: order_id, currency } = result.data.order;

    const options = {
      key: "rzp_test_yW66DrhuyOBSUe", // Enter the Key ID generated from the Dashboard
      amount: amount,
      currency: currency,
      name: "Genzza.",
      description: "Test Transaction",
      image: { logo },
      order_id: order_id,

      handler: async function (response) {
        const paymentInfo = {
          razorpayOrderId: response.razorpay_order_id,
          razorpayPaymentId: response.razorpay_payment_id,
        };

        setPaymentInfo(paymentInfo);
        setShippingInfo(shippingInfo);

        await processUserOrder();

        dispatch(
          createUserOrder({
            totalPrice: totalAmount,
            totalPriceAfterDiscount: totalAmount,
            orderItems,
            paymentInfo,
            shippingInfo,
          })
        );
      },
      prefill: {
        name: "Genzza",
        email: "genzza@gmail.com",
        contact: "7249047105",
      },
      notes: {
        address: "Genzza Corporate Office",
      },
      theme: {
        color: "#111111",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const processUserOrder = async () => {
    const data = {
      razorpayPaymentId: paymentInfo.razorpayPaymentId,
      razorpayOrderId: paymentInfo.razorpayOrderId,
    };

    const result = await axios.post(
      "http://localhost:5000/api/user/order/payment-verification",
      data,
      config
    );

    if (result) {
      navigate("/my-orders");
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const shippingInfo = {
      firstname: e.target.firstname.value,
      lastname: e.target.lastname.value,
      address: e.target.address.value,
      city: e.target.city.value,
      state: e.target.state.value,
      country: e.target.country.value,
      pincode: e.target.pincode.value,
      other: e.target.other.value,
    };

    setShippingInfo(shippingInfo);
    // console.log(cartProductState)
    checkOutHandler(cartProductState, shippingInfo);
  };

  return (
    <>
      <div className="checkout-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="checkout-container">
              <div className="col-7">
                <div className="checkout-left-data">
                  <h2>
                    <Link to="/" className="checkout-heading">
                      <img src={logo} alt="" />
                    </Link>
                  </h2>
                  <nav
                    style={{ "--bs-breadcrumb-divider": ">" }}
                    aria-label="breadcrumb"
                  >
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link className=" total-price total-bread" to="/cart">
                          Cart
                        </Link>
                      </li>
                      &nbsp; /&nbsp;
                      <li
                        className="breadcrumb-item total-price active"
                        aria-current="page"
                      >
                        Information
                      </li>
                      &nbsp; /
                      <li className="breadcrumb-item total-price active">
                        Shipping
                      </li>
                      &nbsp; /
                      <li
                        className="breadcrumb-item total-price active"
                        aria-current="page"
                      >
                        Payment
                      </li>
                    </ol>
                  </nav>
                  <h4 className="title-contact">Contact Information</h4>
                  <p className="user-details total">
                    Sohail Akhtar Ali <br /> (alisohail2448@gmail.com)
                  </p>
                  <h4 className="mb-3 title-checkout">Shipping Address</h4>
                  <form
                    onSubmit={onSubmit}
                    action=""
                    className="d-flex gap-15 flex-wrap justify-content-between"
                  >
                    <div className="input-div">
                      <select
                        name="country"
                        onChange={formik.handleChange("country")}
                        value={formik.values.country}
                        onBlur={formik.handleBlur("country")}
                        className="form-control checkout-input form-select"
                        id=""
                      >
                        <option selected disabled value="">
                          Select Country
                        </option>
                        <option value="India">India</option>
                      </select>
                      <div className="error">
                        {formik.touched.country && formik.errors.country}
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <input
                        type="text"
                        placeholder="First Name"
                        className="form-control checkout-input"
                        name="firstname"
                        onChange={formik.handleChange("firstname")}
                        value={formik.values.firstname}
                        onBlur={formik.handleBlur("firstname")}
                      />
                      <div className="error">
                        {formik.touched.firstname && formik.errors.firstname}
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <input
                        type="text"
                        placeholder="Last Name"
                        className="form-control checkout-input"
                        name="lastname"
                        onChange={formik.handleChange("lastname")}
                        value={formik.values.lastname}
                        onBlur={formik.handleBlur("lastname")}
                      />
                      <div className="error">
                        {formik.touched.lastname && formik.errors.lastname}
                      </div>
                    </div>
                    <div className="w-100">
                      <input
                        type="text"
                        placeholder="Address"
                        className="form-control checkout-input"
                        name="address"
                        onChange={formik.handleChange("address")}
                        value={formik.values.address}
                        onBlur={formik.handleBlur("address")}
                      />
                      <div className="error">
                        {formik.touched.address && formik.errors.address}
                      </div>
                    </div>
                    <div className="w-100">
                      <input
                        type="text"
                        placeholder="Apartment, Suite ,etc"
                        className="form-control checkout-input"
                        name="other"
                        onChange={formik.handleChange("other")}
                        value={formik.values.other}
                        onBlur={formik.handleBlur("other")}
                      />
                      <div className="error">
                        {formik.touched.other && formik.errors.other}
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <input
                        type="text"
                        placeholder="City"
                        className="form-control checkout-input"
                        name="city"
                        onChange={formik.handleChange("city")}
                        value={formik.values.city}
                        onBlur={formik.handleBlur("city")}
                      />
                      <div className="error">
                        {formik.touched.city && formik.errors.city}
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <select
                        name="state"
                        onChange={formik.handleChange("state")}
                        value={formik.values.state}
                        onBlur={formik.handleBlur("state")}
                        className="form-control checkout-input form-select"
                        id=""
                      >
                        <option value="" selected disabled>
                          Select State
                        </option>
                        <option value="Maharashtra">Maharashtra</option>
                      </select>
                      <div className="error">
                        {formik.touched.state && formik.errors.state}
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <input
                        type="text"
                        placeholder="Zipcode"
                        className="form-control checkout-input"
                        name="pincode"
                        onChange={formik.handleChange("pincode")}
                        value={formik.values.pincode}
                        onBlur={formik.handleBlur("pincode")}
                      />
                      <div className="error">
                        {formik.touched.pincode && formik.errors.pincode}
                      </div>
                    </div>
                    <div className="w-100">
                      <div className="checkout-btn">
                        <button type="submit" className="button">
                          Place Order{" "}
                          <ChevronDoubleRightIcon className="cart-icon" />
                        </button>
                        <Link to="/cart" className="text-return">
                          <BiArrowBack className="me-2" />
                          Return to Cart
                        </Link>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-5 main-right">
                <div className="border-checkout py-4">
                  {userCartState &&
                    userCartState?.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="d-flex gap-10 mb-2 align-align-items-center"
                        >
                          <div className="w-75 d-flex gap-10 mb-4">
                            <div className=" position-relative img-container">
                              <span
                                style={{ top: "-6px", right: "-6px" }}
                                className="badge-checkout bg-secondary text-white rounded-circle p-2 position-absolute"
                              >
                                {item?.quantity}
                              </span>
                              <img
                                className="img-fluid"
                                src={item?.productId?.images[0].url}
                                alt="product"
                              />
                            </div>
                            <div className="checkout-title w-75">
                              <h5 className="total-price">
                                {item?.productId?.title}
                              </h5>
                              <p className="total-price">
                                {item?.color?.title}
                              </p>
                            </div>
                          </div>
                          <div className="flex-grow-1 mb-4 price-item">
                            <h5 className="total text-white">
                              $ {item?.price * item?.quantity}
                            </h5>
                          </div>
                        </div>
                      );
                    })}
                </div>
                <div className="border-checkout py-4 ">
                  <div className="d-flex justify-content-between align-items-center total-checkout ">
                    <p className="total">Subtotal</p>
                    <p className="total-price">
                      $ {totalAmount ? totalAmount : 0}
                    </p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center total-checkout">
                    <p className="mb-0 total">Shipping</p>
                    <p className="mb-0 total-price">$ 5</p>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center border-b-checkout py-4 total-checkout">
                  <h4 className="total">Total</h4>
                  <h5 className="total-price">
                    $ {totalAmount ? totalAmount + 5 : 0}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
