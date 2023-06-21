import React, { useEffect, useState } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import Color from "../components/Color";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCompareProduct,
  getCompareProducts,
} from "../features/user/userSlice";
import { XMarkIcon } from "@heroicons/react/24/outline";

const CompareProduct = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const compareState = useSelector((state) => state?.auth?.getCompare?.compare);

  useEffect(() => {
    getCompare();
  }, []);

  const getCompare = async () => {
    setLoading(true);
    await dispatch(getCompareProducts());
    setLoading(false);
  };

  const removeFromCompare = (id) => {
    dispatch(deleteCompareProduct(id));
    setTimeout(() => {
      dispatch(getCompareProducts());
    }, 300);
  };

  return (
    <>
      <Meta title={"Compare Products"} />
      <BreadCrumb title="Compare Products" />

      <div className="compare-product-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          {compareState?.length === 0 ? (
            <p style={{ textAlign: "center" }}>
              There is no Product for Compare!!
            </p>
          ) : (
            ""
          )}
          <div className="row">
            {compareState &&
              compareState?.map((item, index) => {
                return (
                  <div className="compare-col-3" key={index}>
                    <div className="compare-product-card position-relative">
                      <XMarkIcon
                        className="product-icon position-absolute cross"
                        onClick={(e) => removeFromCompare(item?._id)}
                      />
                      <div className="product-image">
                        <img
                          src={item?.images[0]?.url && item?.images[0]?.url}
                          alt="watch"
                          className="img-fluid w-100 d-block mx-auto"
                        />
                      </div>
                      <div className="compare-product-details">
                        <h5 className="title mt-4">{item?.title}</h5>
                        <h6 className="price mb-3 mt-3">$ {item?.price}</h6>

                        <div>
                          <div className="product-detail">
                            <h5>Brand:</h5>
                            <p>{item?.brand}</p>
                          </div>
                          <div className="product-detail">
                            <h5>Type:</h5>
                            <p>{item?.category}</p>
                          </div>
                          <div className="product-detail">
                            <h5>Availability:</h5>
                            <p>{item?.quantity ? "In Stock" : "Sold Out"}</p>
                          </div>
                          <div className="product-detail">
                            <h5>Color:</h5>
                            <ul className="colors ps-0">
                              <li
                                style={{
                                  backgroundColor: item?.color[0]?.title,
                                  cursor: "pointer",
                                }}
                              ></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            {loading && (
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
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CompareProduct;
