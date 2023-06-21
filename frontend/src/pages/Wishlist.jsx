import React, { useEffect, useState } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { useDispatch, useSelector } from "react-redux";
import { getUserProductWishlist } from "../features/user/userSlice";
import { addToWishlist } from "../features/product/productSlice";
import WishlistCard from "../components/WishlistCard";
import { toast } from "react-hot-toast";

const Wishlist = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const wishListState = useSelector((state) => state?.auth?.wishlist?.wishlist);

  useEffect(() => {
    getUserWishlist();
  }, []);

  const getUserWishlist = async () => {
    setLoading(true);
    await dispatch(getUserProductWishlist());
    setLoading(false);
  };

  const removeFromWishlist = (id) => {
    dispatch(addToWishlist(id));
    toast.success("Product Removed from Wishlist!!");
    setTimeout(() => {
      dispatch(getUserProductWishlist());
    }, 300);
  };

  return (
    <>
      <Meta title={"Wishlist"} />
      <BreadCrumb title="Wishlist" />

      <div className="wishlist-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          {loading ? (
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
              <WishlistCard
                data={wishListState ? wishListState : []}
                removeFromWishlist={removeFromWishlist}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Wishlist;
