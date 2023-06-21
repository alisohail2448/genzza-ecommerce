import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ReactStars from "react-rating-stars-component";
import Color from "../components/Color";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../features/product/productSlice";

const OurStore = () => {
  const dispatch = useDispatch();
  const [grid, setGrid] = useState(4);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  //Filter States
  const [category, setCategory] = useState(null);
  const [tag, setTag] = useState(null);
  const [brand, setBrand] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [sort, setSort] = useState(null);

  const productState = useSelector((state) => state.product?.product);

  useEffect(() => {
    getProducts();
  }, [sort, tag, brand, category, minPrice, maxPrice]);

  const getProducts = () => {
    setLoading(true); // Set loading to true before fetching data

    // Simulate API call delay with setTimeout
    setTimeout(() => {
      dispatch(
        getAllProducts({ sort, tag, brand, category, minPrice, maxPrice })
      );
      setLoading(false); // Set loading to false after data is fetched
    }, 1000);
  };

  useEffect(() => {
    let newBrands = [];
    let category = [];
    let newTags = [];
    let newColors = [];
    for (let index = 0; index < productState?.length; index++) {
      const element = productState[index];
      newBrands.push(element?.brand);
      category.push(element?.category);
      newTags.push(element?.tags);
    }
    setBrands(newBrands);
    setCategories(category);
    setTags(newTags);
  }, [productState]);

  return (
    <>
      <Meta title={"Our Store"} />
      <BreadCrumb title="Our Store" />
      <div className="store-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-3">
              <div className="filter-card mb-3">
                <h3 className="filter-title">Shop By Categories</h3>
                <div className="">
                  <ul className="ps-0">
                    {categories &&
                      [...new Set(categories)]?.map((item, index) => {
                        return (
                          <li
                            className=""
                            key={index}
                            onClick={() => setCategory(item)}
                          >
                            {item}
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
              <div className="filter-card mb-3">
                <h3 className="filter-title">Filter By</h3>
                <div>
                  <h5 className="sub-title">Price</h5>
                  <div className="d-flex align-items-center gap-10">
                    <div className="form-floating">
                      <input
                        type="number"
                        className="form-control form-price"
                        id="floatingInput"
                        placeholder="From"
                        onChange={(e) => setMinPrice(e.target.value)}
                      />
                      <label htmlFor="floatingInput">From</label>
                    </div>
                    <div className="form-floating">
                      <input
                        type="number"
                        className="form-control form-price"
                        id="floatingInput1"
                        placeholder="To"
                        onChange={(e) => setMaxPrice(e.target.value)}
                      />
                      <label htmlFor="floatingInput1">To</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="filter-card mb-3">
                <h3 className="filter-title">Product Tags</h3>
                <div>
                  <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                    {tags &&
                      [...new Set(tags)]?.map((item, index) => {
                        return (
                          <span
                            key={index}
                            onClick={() => setTag(item)}
                            style={{
                              backgroundColor: "#9c9b9b38",
                              color: "#d4d5d7",
                              fontSize: "14px",
                            }}
                            className="tags-badge rounded-3 py-2 px-3 text-capitalize"
                          >
                            {item}
                          </span>
                        );
                      })}
                  </div>
                </div>
              </div>
              <div className="filter-card mb-3">
                <h3 className="filter-title">Product Brands</h3>
                <div>
                  <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                    {brands &&
                      [...new Set(brands)]?.map((item, index) => {
                        return (
                          <span
                            key={index}
                            onClick={() => setBrand(item)}
                            style={{
                              backgroundColor: "#9c9b9b38",
                              color: "#d4d5d7",
                              fontSize: "14px",
                            }}
                            className="tags-badge rounded-3 py-2 px-3 text-capitalize"
                          >
                            {item}
                          </span>
                        );
                      })}
                  </div>
                </div>
              </div>
              {/* <div className="filter-card mb-3">
                <h3 className="filter-title">Random Product</h3>
                <div>
                  <div className="random-products mb-3 d-flex">
                    <div className="w-50">
                      <img
                        src="images/watch.jpg"
                        className="img-fluid"
                        alt="watch"
                      />
                    </div>
                    <div className="w-50">
                      <h5>
                        Kids headphones bulk 10 pack multi colored for students
                      </h5>
                      <ReactStars
                        count={5}
                        size={24}
                        value={4}
                        edit={false}
                        activeColor="#ffd700"
                      />
                      <b>$ 300</b>
                    </div>
                  </div>
                  <div className="random-products d-flex">
                    <div className="w-50">
                      <img
                        src="images/watch.jpg"
                        className="img-fluid"
                        alt="watch"
                      />
                    </div>
                    <div className="w-50">
                      <h5>
                        Kids headphones bulk 10 pack multi colored for students
                      </h5>
                      <ReactStars
                        count={5}
                        size={24}
                        value={4}
                        edit={false}
                        activeColor="#ffd700"
                      />
                      <b>$ 300</b>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
            <div className="col-9">
              <div className="filter-sort-grid mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-10">
                    <p
                      className="mb-0"
                      style={{ width: "100px", color: "rgb(191, 189, 189)" }}
                    >
                      Sort By:
                    </p>
                    <select
                      name=""
                      defaultValue={"manula"}
                      className="form-control form-select"
                      id=""
                      style={{ backgroundColor: "#1c1c1c" }}
                      onChange={(e) => setSort(e.target.value)}
                    >
                      <option
                        style={{
                          backgroundColor: "#1c1c1c",
                          color: "rgb(191, 189, 189)",
                        }}
                        value="title"
                      >
                        Alphabetically, A-Z
                      </option>
                      <option
                        style={{
                          backgroundColor: "#1c1c1c",
                          color: "rgb(191, 189, 189)",
                        }}
                        value="-title"
                      >
                        Alphabetically, Z-A
                      </option>
                      <option
                        style={{
                          backgroundColor: "#1c1c1c",
                          color: "rgb(191, 189, 189)",
                        }}
                        value="price"
                      >
                        Price, low to high
                      </option>
                      <option
                        style={{
                          backgroundColor: "#1c1c1c",
                          color: "rgb(191, 189, 189)",
                        }}
                        value="-price"
                      >
                        Price, high to low
                      </option>
                      <option
                        style={{
                          backgroundColor: "#1c1c1c",
                          color: "rgb(191, 189, 189)",
                        }}
                        value="createdAt"
                      >
                        Date, old to new
                      </option>
                      <option
                        style={{
                          backgroundColor: "#1c1c1c",
                          color: "rgb(191, 189, 189)",
                        }}
                        value="-createdAt"
                      >
                        Date, new to old
                      </option>
                    </select>
                  </div>
                  <div className="d-flex align-items-center gap-10">
                    <p className="total-products mb-0">21 Products</p>
                    <div className="d-flex gap-10 align-items-center grid">
                      <img
                        onClick={() => {
                          setGrid(3);
                        }}
                        src="images/gr4.svg"
                        className="d-block img-fluid"
                        alt="grid"
                      />
                      <img
                        onClick={() => {
                          setGrid(4);
                        }}
                        src="images/gr3.svg"
                        className="d-block img-fluid"
                        alt="grid"
                      />
                      <img
                        onClick={() => {
                          setGrid(6);
                        }}
                        src="images/gr2.svg"
                        className="d-block img-fluid"
                        alt="grid"
                      />

                      <img
                        onClick={() => {
                          setGrid(12);
                        }}
                        src="images/gr.svg"
                        className="d-block img-fluid"
                        alt="grid"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {loading ? (
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
                <div className="products-list pb-">
                  <div className="d-flex gap-10 flex-wrap">
                    <ProductCard data={productState ? productState : []} grid={grid} />
                  </div>
                </div>
              )} 
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurStore;
