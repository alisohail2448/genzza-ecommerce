import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const BlogCard = (props) => {
  const { data } = props;
  return (
    <>
      {data && data?.map((item, index) => {
        return (
          <div className="col-6 mb-3" key={index}>
            <div className="blog-card">
              <div className="card-image">
                <img
                  src={item?.images[0].url ? item?.images[0].url : "images/blog-1.jpg"}
                  className="img-fluid w-100 img"
                  alt="blog"
                />
              </div>
              <div className="blog-content">
                <p className="date">{moment(item?.date).format('MMMM Do YYYY, h:mm:ss a')}</p>
                <h5 className="title">{item?.title}</h5>
                <p
                  className="desc"
                  dangerouslySetInnerHTML={{ __html: item?.description.substr(0, 70) + "..." }}
                ></p>
                <Link to={`/blog/${item?._id}`} className="button">
                  Read More
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default BlogCard;
