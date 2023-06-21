import React, { useEffect, useState } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../features/user/userSlice";

const Order = () => {
  const dispatch = useDispatch();
  const orderState = useSelector((state) => state?.auth?.getOrderedProduct?.orders);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    dispatch(getUserOrders())
      .then(() => setIsLoading(false))
      .catch((error) => {
        setIsLoading(false);
      });
  }, []); 

  return (
    <>
      <Meta title={"My Orders"} />
      <BreadCrumb title="Orders" />
      <div className="cart-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="order-container" style={{ marginBottom: "60px" }}>
            <div
              className="row"
              style={{
                paddingBottom: "10px",
                borderBottom: "1px solid #3e3e3e",
              }}
            >
              <div className="col-12">
                <div className="row">
                  <div className="col-3 text-white text-center">
                    <h5>Order Id</h5>
                  </div>
                  <div className="col-3 text-white text-center">
                    <h5>Total Amount</h5>
                  </div>
                  <div className="col-3 text-white text-center">
                    <h5>Total Amount After Discount</h5>
                  </div>
                  <div className="col-3 text-white text-center">
                    <h5>Status</h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 mt-3">
              {isLoading ? ( // Render loading state
                <div className="load">
                  <div class="loader">
                    <div class="square" id="sq1"></div>
                    <div class="square" id="sq2"></div>
                    <div class="square" id="sq3"></div>
                    <div class="square" id="sq4"></div>
                    <div class="square" id="sq5"></div>
                    <div class="square" id="sq6"></div>
                    <div class="square" id="sq7"></div>
                    <div class="square" id="sq8"></div>
                    <div class="square" id="sq9"></div>
                  </div>
                </div>
              ) : (
                orderState &&
                orderState?.map((item, index) => {
                  return (
                    <div key={index} className="row pt-3 my-3">
                      <div className="col-3">
                        <p className="text-center">{item?._id}</p>
                      </div>
                      <div className="col-3">
                        <p className="text-center">{item?.totalPrice}</p>
                      </div>
                      <div className="col-3">
                        <p className="text-center">
                          {item?.totalPriceAfterDiscount}
                        </p>
                      </div>
                      <div className="col-3">
                        <p className="text-center">{item?.orderStatus}</p>
                      </div>

                      <div className="col-12">
                        <div
                          className="row p-3"
                          style={{
                            background: "#383a3cb0 ",
                            borderRadius: "15px",
                          }}
                        >
                          <div className="col-3 mt-2">
                            <h6 className="text-center text-white">
                              Product Name
                            </h6>
                          </div>
                          <div className="col-3 mt-2">
                            <h6 className="text-center text-white">Quantity</h6>
                          </div>
                          <div className="col-3 mt-2">
                            <h6 className="text-center text-white">Price</h6>
                          </div>
                          <div className="col-3 mt-2">
                            <h6 className="text-center text-white">Color</h6>
                          </div>
                          {item?.orderItems?.map((i, index) => {
                            return (
                              <div key={index} className="col-12">
                                <div
                                  className="row p-3"
                                  style={{
                                    background: "rgb(35, 37, 38)",
                                    borderRadius: "15px",
                                    margin: "10px 0px",
                                  }}
                                >
                                  <div className="col-3 d-flex align-items-center">
                                    <p className="mb-0">{i?.product?.title}</p>
                                  </div>
                                  <div className="col-3 d-flex justify-content-center align-items-center">
                                    <p className="text-center mb-0">
                                      {i?.quantity}
                                    </p>
                                  </div>
                                  <div className="col-3 d-flex justify-content-center align-items-center">
                                    <p className="text-center mb-0">
                                      $ {i?.price}
                                    </p>
                                  </div>
                                  <div className="col-3 d-flex justify-content-center align-items-center">
                                    <ul
                                      className="colors ps-0 mb-0"
                                      style={{ marginLeft: "45px" }}
                                    >
                                      <li
                                        style={{
                                          backgroundColor: i?.color,
                                          cursor: "pointer",
                                        }}
                                      ></li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                  </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
