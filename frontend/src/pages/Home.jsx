import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Marquee from "react-fast-marquee";
import BlogCard from "../components/BlogCard";
import ProductCard from "../components/ProductCard";
import SpecialProducts from "../components/SpecialProducts";
import { services } from "../utils/Data";
import { getAllBlogs } from "../features/blog/blogSlice";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  addToWishlist,
  getAllProducts,
} from "../features/product/productSlice";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import wish from "../images/wish.svg";
import watch2 from "../images/watch-boat02.jpg";
import ReactStars from "react-rating-stars-component";
import prodcompare from "../images/prodcompare.svg";
import slide from "../images/slide.jpg";
import slide2 from "../images/slide2.jpg";
import PopularCard from "../components/PopularCard";
import CarouselCard from "../components/CarouselCard";
import {
  ArrowPathIcon,
  EyeIcon,
  HeartIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { addProductToCompare } from "../features/user/userSlice";
import { toast } from "react-hot-toast";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const blogState = useSelector((state) => state?.blog?.blog);
  const productState = useSelector((state) => state.product?.product);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogs();
    getProducts();
  }, []);

  const getBlogs = () => {
    dispatch(getAllBlogs()).then(() => setLoading(false));
  };

  const getProducts = () => {
    dispatch(getAllProducts()).then(() => setLoading(false));
  };

  const addWishlist = (id) => {
    dispatch(addToWishlist(id));
    toast.success("Product Added to Wishlist!!");
  };

  const addToCompare = (id) => {
    dispatch(addProductToCompare(id));
  };

  if (loading) {
    return (
      <div className="load-home">
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
    );
  }

  return (
    <>
      <section className="home-wrapper-1 py-5">
        <div className="container-xxl">
          <CarouselCard />
        </div>
      </section>

      <section className="home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="services d-flex align-items-center justify-content-between">
                {services?.map((i, j) => {
                  return (
                    <div
                      className="d-flex align-items-center gap-15 service"
                      key={j}
                    >
                      <img src={i.image} alt="services" />
                      <div>
                        <h6>{i.title}</h6>
                        <p className="mb-0">{i.tagline}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="categories d-flex justify-content-center align-items-center flex-wrap">
                <div className="d-flex gap-30 align-items-center">
                  <div className="">
                    <h6 className="bold">Cameras</h6>
                    <p className="">10 Items</p>
                  </div>
                  <img src="images/camera.jpg" alt="camera" />
                </div>
                <div className="d-flex gap-30 align-items-center">
                  <div className="">
                    <h6 className="bold">Smart Television</h6>
                    <p className="">10 Items</p>
                  </div>
                  <img src="images/tv.jpg" alt="tv" />
                </div>
                <div className="d-flex gap-30 align-items-center">
                  <div className="">
                    <h6 className="bold">Smart Speakers</h6>
                    <p className="">10 Items</p>
                  </div>
                  <img src="images/speaker.jpg" alt="watch" />
                </div>
                <div className="d-flex gap-30 align-items-center">
                  <div className="">
                    <h6 className="bold">Headphones</h6>
                    <p className="">10 Items</p>
                  </div>
                  <img src="images/headphone.jpg" alt="headphones" />
                </div>
                <div className="d-flex gap-30 align-items-center">
                  <div className="">
                    <h6 className="bold">Computers & Laptops</h6>
                    <p className="">10 Items</p>
                  </div>
                  <img src="images/laptop.jpg" alt="laptop" />
                </div>
                <div className="d-flex gap-30 align-items-center">
                  <div className="">
                    <h6 className="bold">Airpods</h6>
                    <p className="">10 Items</p>
                  </div>
                  <img src="images/acc.jpg" alt="Airpods" />
                </div>
                <div className="d-flex gap-30 align-items-center">
                  <div className="">
                    <h6 className="bold">Smart Watches</h6>
                    <p className="">10 Items</p>
                  </div>
                  <img src="images/speaker.jpg" alt="watch" />
                </div>
                <div className="d-flex gap-30 align-items-center">
                  <div className="">
                    <h6 className="bold">Home Appliances</h6>
                    <p className="">13 Items</p>
                  </div>
                  <img src="images/homeapp.jpg" alt="headphones" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="featured-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Featured Collections</h3>
            </div>
            {productState &&
              productState?.map((item, index) => {
                if (item?.tags === "featured") {
                  if (index < 5) {
                    return (
                      <div key={index} className={"col-3"}>
                        <Link className="product-card position-relative">
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
                              className={"description d-none"}
                              dangerouslySetInnerHTML={{
                                __html: item?.description,
                              }}
                            ></p>
                            <p className="price">${item?.price}</p>
                          </div>
                          <div className="action-bar position-absolute">
                            <div className="d-flex flex-column gap-15">
                              <button
                                className="border-0 bg-transparent"
                                onClick={(e) => addToCompare(item?._id)}
                              >
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
                }
              })}
          </div>
        </div>
      </section>

      <section className="famous-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-3">
              <div className="famous-card position-relative">
                <img
                  src="images/famous-1.webp"
                  className="img-fluid"
                  alt="famous"
                />
                <div className="famous-content position-absolute">
                  <h5>Big Screen</h5>
                  <h6>Smart Watch Series 7</h6>
                  <p>From $399or $16.62/mo. for 24 mo.*</p>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="famous-card position-relative">
                <img
                  src="images/famous-2.webp"
                  className="img-fluid"
                  alt="famous"
                />
                <div className="famous-content position-absolute">
                  <h5 className="text-dark">Studio Display</h5>
                  <h6 className="text-dark">600 nits of brightness.</h6>
                  <p className="text-dark">27-inch 5K Retina display</p>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="famous-card position-relative">
                <img
                  src="images/famous-3.webp"
                  className="img-fluid"
                  alt="famous"
                />
                <div className="famous-content position-absolute">
                  <h5 className="text-dark">smartphones</h5>
                  <h6 className="text-dark">Smartphone 13 Pro.</h6>
                  <p className="text-dark">
                    Now in Green. From $999.00 or $41.62/mo. for 24 mo.
                    Footnote*
                  </p>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="famous-card position-relative">
                <img
                  src="images/famous-3.webp"
                  className="img-fluid"
                  alt="famous"
                />
                <div className="famous-content position-absolute">
                  <h5 className="text-dark">home speakers</h5>
                  <h6 className="text-dark">Room-filling sound.</h6>
                  <p className="text-dark">
                    From $699 or $116.58/mo. for 12 mo.*
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="special-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Special Products</h3>
            </div>
          </div>
          <div className="row">
            {productState &&
              productState?.map((item, index) => {
                if (item?.tags === "special") {
                  return (
                    <SpecialProducts
                      key={index}
                      title={item?.title}
                      brand={item?.brand}
                      totalRating={item?.totalRatings.toString()}
                      price={item?.price}
                      sold={item?.sold}
                      qty={item?.quantity}
                      image={item?.images[0].url}
                      id={item?._id}
                    />
                  );
                }
              })}
          </div>
        </div>
      </section>

      <section className="popular-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Our Popular Products</h3>
            </div>
          </div>
          <div className="row">
            <PopularCard data={productState} />
          </div>
        </div>
      </section>

      <section className="marquee-wrapper py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="marque-inner-wrapper card-wrapper">
                <Marquee>
                  <div className="mx-4 w-25">
                    <img src="images/brand-01.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-02.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-03.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-04.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-05.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-06.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-07.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-08.png" alt="brand" />
                  </div>
                </Marquee>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="blog-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Our Latest Blogs</h3>
            </div>
          </div>
          <div className="row">
            {blogState &&
              blogState?.map((item, index) => {
                if (index < 4) {
                  return (
                    <div className="col-4" key={index}>
                      <div className="blog-card">
                        <div className="card-image">
                          <img
                            src={
                              item?.images[0].url
                                ? item?.images[0].url
                                : "images/blog-1.jpg"
                            }
                            className="img-fluid w-100 img"
                            alt="blog"
                          />
                        </div>
                        <div className="blog-content">
                          <p className="date">
                            {moment(item?.date).format(
                              "MMMM Do YYYY, h:mm:ss a"
                            )}
                          </p>
                          <h5 className="title">{item?.title}</h5>
                          <p
                            className="desc"
                            dangerouslySetInnerHTML={{
                              __html: item?.description.substr(0, 70) + "...",
                            }}
                          ></p>
                          <Link to={`/blog/${item?._id}`} className="button">
                            Read More
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
