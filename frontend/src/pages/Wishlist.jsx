import React, { useEffect } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { useDispatch, useSelector } from "react-redux";
import { getUserProductWishlist } from "../features/user/userSlice";
import { addToWishlist } from "../features/product/productSlice";
import WishlistCard from "../components/WishlistCard";

const Wishlist = () => {
  const dispatch = useDispatch();

  const wishListState = useSelector((state) => state?.auth?.wishlist?.wishlist);
  useEffect(() => {
    getUserWishlist();
  }, []);

  const getUserWishlist = () => {
    dispatch(getUserProductWishlist());
  };


  
  const removeFromWishlist = (id) =>{
    dispatch(addToWishlist(id));
    setTimeout(() => {
      dispatch(getUserProductWishlist());
    }, 300);
  }

  return (
    <>
      <Meta title={"Wishlist"} />
      <BreadCrumb title="Wishlist" />

      <div className="wishlist-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <WishlistCard data={wishListState ? wishListState : []} removeFromWishlist={removeFromWishlist} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Wishlist;
