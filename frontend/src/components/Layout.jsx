import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <Toaster position="top-center" reverseOrder={false}
        toastOptions={{
          style: {
            background: '#1c1c1c',
            color: '#fff',
          }
        }} />
    </>
  );
};

export default Layout;
