import React, { useEffect, useState } from "react";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import { Column } from "@ant-design/plots";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getMonthlyOrdersIncome, getOrders, getYearlyOrdersIncome } from "../features/auth/authSlice";


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
    title: "Product Count",
    dataIndex: "product",
  },
  {
    title: "Total Price",
    dataIndex: "price",
  },
  {
    title: "Total Price After Discount",
    dataIndex: "dprice",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const monthlyDataState = useSelector((state) => state?.auth?.monthlyData);
  const yearlyDataState = useSelector((state) => state?.auth?.yearlyData);
  const orderDataState = useSelector((state) => state?.auth?.orders?.orders);

  const [monthlyData, setMonthlyData] = useState([]);
  const [monthlyDataSales, setMonthlyDataSales] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // New state to track loading state

  useEffect(() => {
    dispatch(getMonthlyOrdersIncome());
    dispatch(getYearlyOrdersIncome());
    dispatch(getOrders())
      .then(() => setIsLoading(false)) // Set isLoading to false when data is fetched successfully
      .catch(() => setIsLoading(false)); // Set isLoading to false if there's an error
  }, [dispatch]);

  useEffect(() => {
    // Only update the state if data is available
    if (monthlyDataState && yearlyDataState && orderDataState) {
      let monthsNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      let data = [];
      let monthlyOrderCount = [];

      for (let index = 0; index < monthlyDataState.length; index++) {
        const element = monthlyDataState[index];
        data.push({ type: monthsNames[element._id.month], income: element.count });
        monthlyOrderCount.push({ type: monthsNames[element._id.month], sales: element.count });
      }
      setMonthlyData(data);
      setMonthlyDataSales(monthlyOrderCount);

      const data1 = [];
      for (let i = 0; i < orderDataState.length; i++) {
        data1.push({
          key: i,
          name: orderDataState[i].user.firstname + " " + orderDataState[i].user.lastname,
          product: orderDataState[i].orderItems.length,
          price: orderDataState[i].totalPrice,
          dprice: orderDataState[i].totalPriceAfterDiscount,
          status: orderDataState[i].orderStatus,
        });
      }
      setOrderData(data1);
    }
  }, [monthlyDataState, yearlyDataState, orderDataState]);

  if (isLoading) {
    return <p>Loading...</p>; // Render a loading state while data is being fetched
  }
  const config = {
    data: monthlyData,
    xField: "type",
    yField: "income",
    color: ({ type }) => {
      return "#1a1c1e";
    },
    label: {
      position: "middle",
      style: {
        borderRadius:"15px",
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  };

  const config2 = {
    data: monthlyDataSales,
    xField: "type",
    yField: "sales",
    color: ({ type }) => {
      return "#1a1c1e";
    },
    label: {
      position: "middle",
      style: {
        borderRadius:"15px",
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Sales",
      },
    },
  };
  return (
    <div>
      <h3 className="mb-4 title">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex justify-content-between align-items-end flex-grow-1 p-3" style={{background:"#9d9c9c2b", borderRadius: "10px"}}>
          <div>
            <p className="desc">Total Income</p>
            <h4 className="mb-0 sub-title">${yearlyDataState && yearlyDataState[0]?.amount}</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <p className="mb-0  desc">Income in Last Year from Today</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 p-3" style={{background:"#9d9c9c2b", borderRadius: "10px"}} >
          <div>
            <p className="desc">Total Sales</p>
            <h4 className="mb-0 sub-title">{yearlyDataState && yearlyDataState[0]?.count}</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <p className="mb-0  desc">Sales in Last Year from Today</p>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between gap-3">
      <div className="mt-4 title flex-grow-1 w-50">
        <h3 className="mb-5 title">Income Statics</h3>
        <div>
          <Column {...config} />
        </div>
      </div>
      <div className="mt-4 title flex-grow-1 w-50">
        <h3 className="mb-5 title">Sales Statics</h3>
        <div>
          <Column {...config2} />
        </div>
      </div>
      </div>
      <div className="mt-4 title">
        <h3 className="mb-5 title">Recent Orders</h3>
        <div>
          <Table columns={columns} dataSource={orderData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
