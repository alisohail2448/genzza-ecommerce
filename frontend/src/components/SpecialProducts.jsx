import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
const SpecialProduct = (props) => {
  const { title, brand, totalRating, price, sold, qty, image, id } = props;
  return (
    <>
      <div className="col-6 mb-3">
        <div className="special-product-card">
          <div className="special-con">
            <div className="spc-image">
              <img src={image ? image : "images/watch.jpg"} className="img-fluid  sp-img" alt="watch" />
            </div>
            <div className="special-product-content">
              <h5 className="brand">{brand}</h5>
              <h6 className="title">{title}</h6>
              <ReactStars
                count={5}
                size={24}
                value={totalRating}
                edit={false}
                activeColor="#ffd700"
              />
              <p className="price">
                <span className="red-p">${price}</span> &nbsp;{" "}
                <strike>${price * 2}</strike>
              </p>
              <div className="discount-till d-flex align-items-center gap-10">
                <p className="mb-0">
                  <b>5 </b>days
                </p>
                <div className="d-flex gap-10 align-items-center">
                  <span className="badge rounded-circle p-3 round-badge">1</span>:
                  <span className="badge rounded-circle p-3 round-badge">1</span>:
                  <span className="badge rounded-circle p-3 round-badge">1</span>
                </div>
              </div>
              <div className="prod-count my-3">
                <p>Products: {qty}</p>
                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{
                      width: (qty / qty + sold) * 10 + "%",
                      height: "6px",
                      backgroundColor: "rgb(191, 189, 189)",
                    }}
                    aria-valuenow={(qty / qty + sold) * 10}
                    aria-valuemin={qty}
                    aria-valuemax={sold + qty}
                  ></div>
                </div>
              </div>
              <Link to={`/product/${id}`} className="button">View </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SpecialProduct;
