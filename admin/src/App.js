import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./components/MainLayout";
import Enquiries from "./pages/Enquiries";
import ViewEnq from "./pages/ViewEnq";
import Bloglist from "./pages/Bloglist";
import BlogCategory from "./pages/BlogCategory";
import Orders from "./pages/Orders";
import Colorlist from "./pages/Colorlist";
import CategoryList from "./pages/CategoryList";
import Addblog from "./pages/Addblog";
import BrandList from "./pages/BrandList";
import Customers from "./pages/Customer";
import AddBlogCategory from "./pages/AddBlogCategory";
import AddColor from "./pages/AddColor";
import AddCategory from "./pages/AddCategory";
import AddBrand from "./pages/AddBrand";
import AddProduct from "./pages/AddProduct";
import { Toaster } from "react-hot-toast";
import CouponList from "./pages/CouponList";
import AddCoupon from "./pages/AddCoupon";
import ViewOrder from "./pages/ViewOrder";
import ProductList from "./pages/ProductList";
import { PrivateRoutes } from "./routing/privateRoutes";
import { OpenRoutes } from "./routing/openRoutes";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Router>
        <Routes>
          <Route path="/" element={<OpenRoutes><Login /></OpenRoutes>} />
          {/* <Route path="/reset-password" element={<ResetPassword />} /> */}
          {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
          <Route path="/admin" element={<PrivateRoutes><MainLayout /></PrivateRoutes>}>
            <Route index element={<Dashboard />} />
            <Route path="enquiries" element={<Enquiries />} />
            <Route path="enquiries/:id" element={<ViewEnq />} />
            <Route path="blog-list" element={<Bloglist />} />
            <Route path="blog" element={<Addblog />} />
            <Route path="blog/:id" element={<Addblog />} />
            <Route path="coupon-list" element={<CouponList />} />
            <Route path="coupon" element={<AddCoupon />} />
            <Route path="coupon/:id" element={<AddCoupon />} />
            <Route path="blog" element={<Addblog />} />
            <Route path="blog-category" element={<AddBlogCategory />} />
            <Route path="blog-category/:id" element={<AddBlogCategory />} />
            <Route path="blog-category-list" element={<BlogCategory />} />
            <Route path="orders" element={<Orders />} />
            <Route path="order/:id" element={<ViewOrder />} />
            <Route path="customers" element={<Customers />} />
            <Route path="list-color" element={<Colorlist />} />
            <Route path="color" element={<AddColor />} />
            <Route path="color/:id" element={<AddColor />} />
            <Route path="list-category" element={<CategoryList />} />
            <Route path="category" element={<AddCategory />} />
            <Route path="category/:id" element={<AddCategory />} />
            <Route path="list-brand" element={<BrandList />} />
            <Route path="brand" element={<AddBrand />} />
            <Route path="brand/:id" element={<AddBrand />} />
            <Route path="list-product" element={<ProductList />} />
            <Route path="product" element={<AddProduct />} />
            <Route path="product/:id" element={<AddProduct />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
