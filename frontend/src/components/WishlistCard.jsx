import React from 'react'

const WishlistCard = (props) => {
    const { data, removeFromWishlist } = props;
  return (
    <>
         {data.length === 0 && <div className="text-center fs-5">There is no wish listed product</div>}
            {data?.map((item, index) => {
              return (
                <div className="col-3" key={index}>
                  <div className="wishlist-card position-relative">
                    <img
                    onClick={(e) => removeFromWishlist(item?._id)}
                      src="images/cross.svg"
                      alt="cross"
                      className="position-absolute cross img-fluid"
                    />
                    <div className="wishlist-card-image bg-white">
                      <img
                        src={
                          item?.images[0].url
                            ? item?.images[0].url
                            : "images/watch.jpg"
                        }
                        className="img-fluid w-100 d-block mx-auto"
                        alt={item?.category}
                      />
                    </div>
                    <div className="py-3 px-3">
                      <h5 className="title">{item?.title}</h5>
                      <h6 className="price">$ {item?.price}</h6>
                    </div>
                  </div>
                </div>
              );
            })}
    </>
  )
}

export default WishlistCard