import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import { HiOutlineArrowLeft } from "react-icons/hi";
import Meta from "../components/Meta";
import blog from "../images/blog-1.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getABlog } from "../features/blog/blogSlice";

const SingleBlog = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const singleBlogState = useSelector((state) => state?.blog?.singleBlog);
  const getBlogId = location.pathname.split("/")[2];

  

  useEffect(() => {
    getSingleBlog();
  }, []);

  const getSingleBlog = () => {
    dispatch(getABlog(getBlogId));
  };
  return (
    <>
      <Meta title={singleBlogState?.title} />
      <BreadCrumb title={singleBlogState?.title} />
      <div className="blog-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="single-blog-card">
                <Link to="/blogs" className="d-flex align-items-center gap-10">
                  <HiOutlineArrowLeft className="fs-4" /> Go back to Blogs
                </Link>
                <h3 className="title">{singleBlogState?.title}</h3>
                <div className="img-con">
                  <img
                    src={
                      singleBlogState?.images[0].url
                        ? singleBlogState?.images[0].url
                        : blog
                    }
                    className="img-fluid mb-4 w-100 imgBlog"
                    alt="blog"
                  />
                  <p
                    dangerouslySetInnerHTML={{
                      __html: singleBlogState?.description,
                    }}
                  ></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBlog;
