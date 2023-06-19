import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import ReactImageZoom from "react-image-zoom";
import Color from "../components/Color";
import { TbGitCompare } from "react-icons/tb";
import { AiOutlineHeart, AiOutlineLink } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import watch from "../images/watch.jpg";
import { ArrowPathIcon, HeartIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import {
  addRating,
  getAProduct,
  getAllProducts,
} from "../features/product/productSlice";
import PopularCard from "../components/PopularCard";
import { toast } from "react-hot-toast";
import { addProductToCart, getUserCart } from "../features/user/userSlice";

const SingleProduct = () => {
  const [color, setColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const getProductId = location.pathname.split("/")[2];
  const singleProductState = useSelector(
    (state) => state?.product?.singleProduct
  );

  const productState = useSelector((state) => state.product?.product);

  const userCartState = useSelector((state) => state?.auth?.cartProducts);

  const dispatch = useDispatch();
  useEffect(() => {
    getProducts();
    dispatch(getAProduct(getProductId));
    dispatch(getUserCart());
  }, []);

  useEffect(() => {
    for (let index = 0; index < userCartState?.length; index++) {
      if (getProductId === userCartState[index]?.productId?._id) {
        setAlreadyAdded(true);
      }
    }
  }, []);

  const getProducts = () => {
    dispatch(getAllProducts());
  };

  const uploadCart = () => {
    if (color === null) {
      toast.error("Please Choose Color!");
    } else {
      dispatch(
        addProductToCart({
          productId: singleProductState?._id,
          quantity,
          color,
          price: singleProductState?.price,
        })
      );
    }
  };

  const props = {
    width: 594,
    height: 600,
    zoomWidth: 600,

    img: singleProductState?.images[0]?.url
      ? singleProductState?.images[0]?.url
      : "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg",
  };

  const [orderedProduct, setOrderedProduct] = useState(true);
  const copyToClipboard = (text) => {
    console.log("text", text);
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
    toast.success("Product Link Copied Successfully!");
  };
  const closeModal = () => {};

  const [star, setStar] = useState(null);
  const [comment, setComment] = useState(null);

  const addRatingToProduct = (e) => {
    e.preventDefault();
    if (star === null) {
      toast.error("Please Add Some Rating");
      return false;
    } else if (comment === null) {
      toast.error("Please Write a Review about the Product");
      return false;
    } else {
      dispatch(
        addRating({ star: star, comment: comment, prodId: getProductId })
      );
      setTimeout(() => {
        dispatch(getAProduct(getProductId));
      }, 100);
      setComment(null);
      setStar(null);
    }
    return false;
  };

  return (
    <>
      <Meta title={singleProductState?.title} />
      <BreadCrumb title={singleProductState?.title} />
      <div className="main-product-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <div className="main-product-image">
                <div>
                  <ReactImageZoom {...props} />
                </div>
              </div>
              <div className="other-product-images d-flex flex-wrap gap-15">
                {singleProductState?.images.map((item, index) => {
                  return (
                    <div key={index}>
                      <img src={item?.url} className="img-fluid" alt="" />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="col-6">
              <div className="main-product-details">
                <div className="">
                  <h3 className="title">{singleProductState?.title}</h3>
                </div>
                <div className="price-content py-3">
                  <div className="main-price">
                    <p className="price">$ {singleProductState?.price}</p>
                  </div>
                  <div className="review-content d-flex  gap-10">
                    <ReactStars
                      count={5}
                      size={24}
                      value={singleProductState?.totalRatings.toString()}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <p className="mb-0 t-review">( 2 Reviews )</p>
                    <a className="review-btn" href="#review">
                      Write a Review
                    </a>
                  </div>
                </div>
                <div className="main-content py-3">
                  <div className="content-left">
                    <div className="d-flex gap-10 align-items-center my-2">
                      <h3 className="product-heading">Type :</h3>
                      <p className="product-data">
                        {singleProductState?.category}
                      </p>
                    </div>
                    <div className="d-flex gap-10 align-items-center my-2">
                      <h3 className="product-heading">Brand :</h3>
                      <p className="product-data">
                        {singleProductState?.brand}
                      </p>
                    </div>
                    <div className="d-flex gap-10 align-items-center my-2">
                      <h3 className="product-heading">Category :</h3>
                      <p className="product-data">
                        {singleProductState?.category}
                      </p>
                    </div>
                    <div className="d-flex gap-10 align-items-center my-2">
                      <h3 className="product-heading">Tags :</h3>
                      <p className="product-data">{singleProductState?.tags}</p>
                    </div>
                    <div className="d-flex gap-10 align-items-center my-2">
                      <h3 className="product-heading">Availablity :</h3>
                      <p className="product-data">In Stock</p>
                    </div>
                  </div>
                  <div className="content-right">
                    <div className="d-flex gap-10 flex-column mt-2 mb-3">
                      <h3 className="product-heading">Size :</h3>
                      <div className="d-flex flex-wrap gap-15">
                        <span className="badge border border-1 bg-white text-dark border-secondary">
                          S
                        </span>
                        <span className="badge border border-1 bg-white text-dark border-secondary">
                          M
                        </span>
                        <span className="badge border border-1 bg-white text-dark border-secondary">
                          XL
                        </span>
                        <span className="badge border border-1 bg-white text-dark border-secondary">
                          XXL
                        </span>
                      </div>
                    </div>
                    {!alreadyAdded && (
                      <>
                        <div className="d-flex gap-10 flex-column mt-2 mb-3">
                          <h3 className="product-heading">Color :</h3>
                          <Color
                            colorData={singleProductState?.color}
                            setColor={setColor}
                          />
                        </div>
                      </>
                    )}
                    <div className="d-flex align-items-center gap-15 flex-row mb-2">
                      {!alreadyAdded && (
                        <>
                          <h3 className="product-heading">Quantity :</h3>
                          <div className="">
                            <input
                              type="number"
                              name=""
                              min={1}
                              max={10}
                              className="form-control qty-input"
                              style={{ width: "70px" }}
                              id=""
                              onChange={(e) => setQuantity(e.target.value)}
                              value={quantity}
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <div className="w-50 ">
                    <Link className="main-func">
                      <ArrowPathIcon className="main-icon" />
                      Add to Compare
                    </Link>
                  </div>
                  <div>
                    <Link className="main-func">
                      <HeartIcon className="main-icon" /> Add to Wishlist
                    </Link>
                  </div>
                </div>
                <div className="d-flex gap-10 flex-column  my-3">
                  <h3 className="product-heading">Shipping & Returns :</h3>
                  <p className="product-data">
                    Free shipping and returns available on all orders! <br /> We
                    ship all US domestic orders within
                    <b> 5-10 business days!</b>
                  </p>
                </div>
                <div className="d-flex gap-10 align-items-center mt-3 mb-5">
                  <h3 className="product-heading">Product Link:</h3>{" "}
                  <div className="link">
                    <a
                      href="javascript:void(0);"
                      onClick={() => {
                        copyToClipboard(
                          "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg"
                        );
                      }}
                      style={{ marginRight: "5px" }}
                    >
                      Copy Product Link
                    </a>
                    <AiOutlineLink />
                  </div>
                </div>
                <div className="d-flex align-items-center gap-30">
                  <button
                    className="cart-btn border-0"
                    // data-bs-toggle="modal"
                    // data-bs-target="#staticBackdrop"
                    type="button"
                    onClick={() => {
                      alreadyAdded
                        ? navigate("/cart")
                        : uploadCart(productState?._id);
                    }}
                  >
                    {alreadyAdded ? "Go to Cart" : "Add to Cart"}
                  </button>
                  <button className="buy-btn">Buy It Now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="description-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h4>Description</h4>
              <div className="desc-bg p-3">
                <p
                  dangerouslySetInnerHTML={{
                    __html: singleProductState?.description,
                  }}
                ></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="reviews-wrapper home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 id="review">Reviews</h3>
              <div className="review-inner-wrapper">
                <div className="review-head d-flex justify-content-between align-items-end">
                  <div>
                    <h4 className="mb-2">Customer Reviews</h4>
                    <div className="d-flex align-items-center gap-10">
                      <ReactStars
                        count={5}
                        size={24}
                        value={4}
                        edit={false}
                        activeColor="#ffd700"
                      />
                      <p className="mb-0">Based on 2 Reviews</p>
                    </div>
                  </div>
                  {orderedProduct && (
                    <div>
                      <a className="text-decoration-underline" href="">
                        Write a Review
                      </a>
                    </div>
                  )}
                </div>
                <div className="review-form py-4">
                  <h4>Write a Review</h4>
                  <form
                    action=""
                    onSubmit={addRatingToProduct}
                    className="d-flex flex-column gap-15"
                  >
                    <div>
                      <ReactStars
                        count={5}
                        size={24}
                        value={4}
                        edit={true}
                        onChange={(e) => setStar(e)}
                        activeColor="#ffd700"
                      />
                    </div>
                    <div>
                      <textarea
                        name=""
                        id=""
                        className="w-100 form-control comments-input"
                        cols="30"
                        rows="4"
                        placeholder="Comments"
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="d-flex justify-content-end">
                      <button type="submit" className="button border-0">
                        Submit Review
                      </button>
                    </div>
                  </form>
                </div>
                <div className="reviews mt-4">
                  {singleProductState &&
                    singleProductState?.ratings?.map((item, index) => {
                      return (
                        <div className="review" key={index}>
                          <div className="d-flex gap-10 align-items-center">
                            <h6 className="mb-0">Navdeep</h6>
                            <ReactStars
                              count={5}
                              size={24}
                              value={item?.star}
                              edit={false}
                              activeColor="#ffd700"
                            />
                          </div>
                          <p className="mt-3">{item?.comment}</p>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="popular-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Our Popular Products</h3>
            </div>
            <div className="row">
              <PopularCard data={productState} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
