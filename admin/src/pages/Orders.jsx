import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getOrders, updateOrderStatus } from "../features/auth/authSlice";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

const Orders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, []);
  
  const orderState = useSelector((state) => state?.auth?.orders?.orders);

  const data1 = [];
  for (let i = 0; i < orderState?.length; i++) {
    data1.push({
      key: i + 1,
      name: orderState[i]?.user?.firstname,
      product: (
        <Link to={`/admin/order/${orderState[i]?._id}`} style={{color: "black"}}>
          View Orders
        </Link>
      ),
      amount: orderState[i]?.totalPrice,
      date: new Date(orderState[i]?.createdAt)?.toLocaleString(),
      action: (
        <>
                 <div>
        <select
          name=""
          defaultValue={orderState[i]?.orderStatus}
          className="form-control form-select " style={{cursor: "pointer"}}
          id=""
          onChange={(e) => updateOrder(orderState[i]?._id, e.target.value)}
        >
          <option style={{cursor: "pointer"}} value="Processed">Processed</option>
          <option style={{cursor: "pointer"}} value="Shipped">Shipped</option>
          <option style={{cursor: "pointer"}} value="Out for Delivery">In Progress</option>
          <option style={{cursor: "pointer"}} value="Delivered">Out for Delivery</option>
          <option style={{cursor: "pointer"}} value="Delivered">Delivered</option>
        </select>
      </div>
        </>
      ),
    });
  }


  const updateOrder = (a, b) => {
    dispatch(updateOrderStatus({ id: a, status: b }));
  }

  return (
    <div>
      <h3 className="mb-4 title">Orders</h3>
      <div>{<Table columns={columns} dataSource={data1} />}</div>
    </div>
  );
};

export default Orders;