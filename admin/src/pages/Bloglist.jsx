import { Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteABlog, getBlogs, resetState } from '../features/blogs/blogSlice';
import CustomModal from '../components/CustomModal';

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "name",
  },
  {
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];


const Bloglist = () => {
  const [open, setOpen] = useState(false);
  const [blogId, setBlogId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setBlogId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getBlogs());
  }, []);
  
  const getBlogState = useSelector((state) => state.blogs.blogs);

  const data1 = [];
  for (let i = 0; i < getBlogState.length; i++) {
    data1.push({
      key: i + 1,
      name: getBlogState[i].title,
      category: getBlogState[i].category,

      action: (
        <>
          <Link
            to={`/admin/blog/${getBlogState[i].id}`}
            className=" fs-3" style={{color: "#404142"}}
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 bg-transparent border-0" style={{color: "#404142"}}
            onClick={() => showModal(getBlogState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const deleteBlog = (e) => {
    dispatch(deleteABlog(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getBlogs());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Blogs List</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteBlog(blogId);
        }}
        title="Are you sure you want to delete this blog?"
      />
    </div>
  )
}

export default Bloglist