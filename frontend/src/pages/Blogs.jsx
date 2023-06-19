import React, { useEffect } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import BlogCard from "../components/BlogCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../features/blog/blogSlice";

const Blogs = () => {
  const dispatch = useDispatch();

  const blogState = useSelector((state) => state?.blog?.blog);

  useEffect(() => {
    getBlogs();
  }, []);

  const getBlogs = () => {
    dispatch(getAllBlogs());
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
              <div className="row">
                <BlogCard data={blogState ? blogState : []} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blogs;
