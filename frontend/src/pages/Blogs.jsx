import React, { useEffect, useState } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import BlogCard from "../components/BlogCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../features/blog/blogSlice";

const Blogs = () => {
  const dispatch = useDispatch();
  const blogState = useSelector((state) => state?.blog?.blog);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    getBlogs();
  }, []);

  const getBlogs = () => {
    dispatch(getAllBlogs())
      .then(() => setIsLoading(false))
      .catch((error) => {
        setIsLoading(false);
      });
  };
  return (
    <>
      <Meta title={"Blogs"} />
      <BreadCrumb title="Blogs" />
      <div className="blog-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-3">
              <div className="filter-card mb-3">
                <h3 className="filter-title">Shop By Categories</h3>
                <div className="">
                  <ul className="ps-0">
                    <li>Watch</li>
                    <li>TV</li>
                    <li>Camera</li>
                    <li>Laptop</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-9">
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
                <div className="row">
                  <BlogCard data={blogState ? blogState : []} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blogs;
