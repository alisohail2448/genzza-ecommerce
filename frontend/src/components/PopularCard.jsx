import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import prodcompare from "../images/prodcompare.svg";
import wish from "../images/wish.svg";
import wishlist from "../images/wishlist.svg";
import watch from "../images/watch-boat.jpg";
import watch2 from "../images/watch-boat02.jpg";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist } from "../features/product/productSlice";
import { ArrowPathIcon, EyeIcon, HeartIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";

const PopularCard = (props) => {
  const { data } = props;
  let location = useLocation();
  const dispatch = useDispatch();

  const addWishlist = (id) => {
    dispatch(addToWishlist(id));
  };
  return (
    <>
      {data &&
        data?.map((item, index) => {
          if (item.tags === "popular") {
            return (
              <div key={index} className={"col-3"}>
                <Link
                  // to="/product/:id"
                  className="product-card position-relative"
                >
                  <div className="wishlist-icon position-absolute">
                    <button
                      className="border-0 bg-transparent"
                      onClick={(e) => addWishlist(item?._id)}
                    >
                    <HeartIcon className="product-icon" />
                    </button>
                  </div>
                  <div className="product-image">
                    <img
                      src={item?.images[0].url}
                      className="img-fluid"
                      alt="product image"
                    />
                    <img
                      src={watch2}
                      className="img-fluid"
                      alt="product image"
                    />
                  </div>
                  <div className="product-details">
                    <h6 className="brand">{item?.brand}</h6>
                    <h5 className="product-title">{item?.title}</h5>
                    <ReactStars
                      count={5}
                      size={24}
                      value={item?.totalRatings.toString()}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <p
                      className={"d-none"}
                      dangerouslySetInnerHTML={{ __html: item?.description }}
                    ></p>
                    <p className="price">${item?.price}</p>
                  </div>
                  <div className="action-bar position-absolute">
                    <div className="d-flex flex-column gap-15">
                      <button className="border-0 bg-transparent">
                      <ArrowPathIcon className="product-icon" />
                      </button>
                      <button className="border-0 bg-transparent">
                      <Link to={`/product/${item?._id}`}>
                        <EyeIcon className="product-icon" />
                      </Link>
                      </button>
                      <button className="border-0 bg-transparent">
                      <ShoppingCartIcon className="product-icon" />
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            );
          }
        })}
    </>
  );
};

export default PopularCard;
