import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import compare from "../images/compare.svg";
import wishlist from "../images/wishlist.svg";
import user from "../images/user.svg";
import cart from "../images/cart.svg";
import menu from "../images/menu.svg";
import logo from "../images/logot3.png";
import {
  ArrowPathIcon,
  ArrowUpTrayIcon,
  HeartIcon,
  ShoppingCartIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { getUserCart } from "../features/user/userSlice";
import { Typeahead } from "react-bootstrap-typeahead"; // ES2015
import "react-bootstrap-typeahead/css/Typeahead.css";
import { getAProduct } from "../features/product/productSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [totalAmount, setTotalAmount] = useState(null);
  const [paginate, setPaginate] = useState(true);
  const [productOpt, setProductOpt] = useState([]);

  const userCartState = useSelector((state) => state?.auth?.cartProducts);
  const authState = useSelector((state) => state?.auth);

  const productState = useSelector((state) => state?.product?.product);

  useEffect(() => {
    dispatch(getUserCart());
  }, []);

  useEffect(() => {
    let data = [];
    for (let index = 0; index < productState?.length; index++) {
      const element = productState[index];
      data.push({ id: index, prod: element?._id, name: element?.title });
    }
    setProductOpt(data);
  }, [productState]);

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < userCartState?.length; index++) {
      sum =
        sum +
        Number(userCartState[index].quantity) * userCartState[index].price;
      setTotalAmount(sum);
    }
  }, [userCartState]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };
  return (
    <>
      <header className="header-top-strip py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <p className="heading-color mb-0">
                Free Shipping Over $100 & Free Returns
              </p>
            </div>
            <div className="col-6">
              <p className="text-end heading-color mb-0">
                Hotline:
                <a className="heading-color" href="tel:+91 7249047105">
                  +91 7249047105
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>
      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-2">
              <h2>
                <Link to="/" className="heading">
                  <img src={logo} alt="" />
                </Link>
              </h2>
            </div>
            <div className="col-5">
              <div className="search-input d-flex">
                <Typeahead
                  id="pagination-example"
                  onPaginate={() => console.log("Results paginated")}
                  options={productOpt}
                  onChange={(selected) => {
                    navigate(`/product/${selected[0]?.prod}`);
                    dispatch(getAProduct(selected[0]?.prod));
                  }}
                  paginate={paginate}
                  labelKey={"name"}
                  placeholder="Search for Products here..."
                  className=" search-input"
                  style={{ width: "100%" }}
                  minLength={2}
                  inputProps={{
                    className: "search-input",
                    style: {
                      height: "100%",
                    },
                  }}
                />
                {/* <input
                  type="text"
                  className="form-control py-2 search-input"
                  placeholder="Search Product Here..."
                  aria-label="Search Product Here..."
                  aria-describedby="basic-addon2"
                /> */}
                <span className="input-group-text p-3 search" id="basic-addon2">
                  <BsSearch className="search-icon" />
                </span>
              </div>
            </div>
            <div className="col-5">
              <div className="header-upper-links d-flex align-items-center justify-content-between">
                <div>
                  <Link
                    to="/compare-product"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <ArrowPathIcon className="list-icon" />
                    <p className="mb-0 list-ftr">Compare</p>
                  </Link>
                </div>
                <div>
                  <Link
                    to="/wishlist"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <HeartIcon className="list-icon" />
                    <p className="mb-0 list-ftr">Wishlist</p>
                  </Link>
                </div>
                <div>
                  <Link
                    to={authState?.user === null ? "/login" : "/my-profile"}
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <UserIcon className="list-icon" />
                    {authState?.user === null ? (
                      <p className="mb-0 list-ftr">Log In</p>
                    ) : (
                      <p className="mb-0 list-ftr text-capitalize">
                        Welcome {authState?.user?.lastname}
                      </p>
                    )}
                  </Link>
                </div>
                <div>
                  <Link
                    to="/cart"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <ShoppingCartIcon className="list-cart" />
                    <div className="d-flex flex-row gap-10">
                      <span className="badge text-dark">
                        {userCartState?.length ? userCartState?.length : 0}
                      </span>
                      <p className="mb-0 list-ftr">
                        $ {totalAmount ? totalAmount : 0}
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <header className="header-bottom py-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center justify-content-center gap-30">
                <div className="">
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-35 d-flex align-items-center"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src={menu} alt="" />
                      <span className="me-5 d-inline-block">
                        Shop Categories
                      </span>
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <Link className="dropdown-item text-white" to="">
                          Action
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="">
                          Another action
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="">
                          Something else here
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="menu-links">
                  <div className="d-flex align-items-center gap-15">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/store">Our Store</NavLink>
                    <NavLink to="/my-orders">My Orders</NavLink>
                    <NavLink to="/blogs">Blogs</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                    {authState?.user === null ? (
                      ""
                    ) : (
                      <button className="logout-btn" onClick={handleLogout}>
                        Logout <ArrowUpTrayIcon className="logout-icon" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
