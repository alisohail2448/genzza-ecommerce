import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import watch from "../images/watch.jpg";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import {
  ArrowRightOnRectangleIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductFromUserCart,
  getUserCart,
  updateQtyFromCart,
} from "../features/user/userSlice";

const Cart = () => {
  const [updateProductDetail, setUpdateProductDetail] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const dispatch = useDispatch();
  const userCartState = useSelector((state) => state?.auth?.cartProducts);

  useEffect(() => {
    dispatch(getUserCart());
  }, []);

  useEffect(() => {
    if(updateProductDetail !== null){
      dispatch(
        updateQtyFromCart({
          cartItemId: updateProductDetail?.cartItemId,
          newQuantity: updateProductDetail?.quantity,
        })
      );
      setTimeout(() => {
        dispatch(getUserCart());
      }, 200);
    }
  }, [updateProductDetail]);

  const deleteCartProduct = (id) => {
    dispatch(deleteProductFromUserCart(id));
    setTimeout(() => {
      dispatch(getUserCart());
    }, 200);
  };


  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < userCartState?.length; index++) {
      sum = sum + (Number(userCartState[index].quantity) * userCartState[index].price)
      setTotalAmount(sum);
    }
  }, [userCartState])
  

  return (
    <>
      <Meta title={"Cart"} />
      <BreadCrumb title="Cart" />
      <div className="cart-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="cart-bg">
              <div className="col-12">
                <div className="cart-header py-3 d-flex justify-content-between align-items-center">
                  <h4 className="cart-col-1">Product</h4>
                  <h4 className="cart-col-2">Price</h4>
                  <h4 className="cart-col-3">Quantity</h4>
                  <h4 className="cart-col-4">Total</h4>
                </div>

                {userCartState &&
                  userCartState?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center"
                      >
                        <div className="cart-col-1 gap-15 d-flex align-items-center">
                          <div className="w-25">
                            <img
                              src={item?.productId?.images[0]?.url}
                              className="img-fluid"
                              alt="product image"
                            />
                          </div>
                          <div className="w-75">
                            <p className="cart-title">
                              {item?.productId?.title}
                            </p>
                            {/* <p>Size: hgf</p> */}
                            <p className="d-flex gap-3 align-items-center">
                              Color:{" "}
                              <ul className="colors ps-0 mb-0">
                                <li
                                  style={{
                                    backgroundColor: item?.color?.title,
                                    cursor: "pointer",
                                  }}
                                ></li>
                              </ul>
                            </p>
                          </div>
                        </div>
                        <div className="cart-col-2">
                          <h5 className="price">$ {item?.price}</h5>
                        </div>
                        <div className="cart-col-3 d-flex align-items-center gap-15">
                          <div>
                            <input
                              className="form-control qty-input"
                              type="number"
                              name=""
                              min={1}
                              max={10}
                              id=""
                              value={
                                updateProductDetail?.quantity
                                  ? updateProductDetail?.quantity
                                  : item?.quantity
                              }
                              onChange={(e) => {
                                setUpdateProductDetail({
                                  cartItemId: item?._id,
                                  quantity: e.target.value,
                                });
                              }}
                            />
                          </div>
                          <div className="">
                            <AiFillDelete
                              className=" delete-icon"
                              onClick={() => deleteCartProduct(item?._id)}
                            />
                          </div>
                        </div>
                        <div className="cart-col-4">
                          <h5 className="price">
                            $ {item?.price * item?.quantity}
                          </h5>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="col-12 py-2 mt-4">
              <div className="d-flex justify-content-end align-items-baseline">
                <div className="continue">
                  <Link to="/store" className="button">
                    Continue To Shopping{" "}
                    <ArrowRightOnRectangleIcon className="cart-icon" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center total-cart">
              {
                (totalAmount !== null || totalAmount !== 0) && (
                  <div className="cart-content">
                <h4>
                  SubTotal: <span className="sub-total">$ {totalAmount ? totalAmount : 0}</span>
                </h4>
                <p>Taxes and shipping calculated at checkout</p>
              </div>
                )
              }
              <div className="continue">
                <Link to="/checkout" className="button">
                  Checkout <ChevronDoubleRightIcon className="cart-icon" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
