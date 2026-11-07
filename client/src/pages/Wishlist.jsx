import React, { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
function Wishlist() {
  const navigate = useNavigate();
  const {
    wishlistItems,
    removeFromWishlist,
  } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  return (
    <div className="container py-5">
      <h2 className="mb-4">
        ❤️ My Wishlist
      </h2>
      {wishlistItems.length === 0 ? (
        <div className="text-center mt-5">
          <h4>Your Wishlist is Empty</h4>
          <p className="text-muted">
            Save your favourite products here.
          </p>
          <button
            className="btn btn-dark"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="row">
          {wishlistItems.map((item) => (
            <div
              className="col-md-4 col-lg-3 mb-4"
              key={item.id}
            >
              <div className="card shadow-sm h-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="card-img-top"
                  style={{
                    height: "250px",
                    objectFit: "cover",
                  }}
                />
                <div className="card-body d-flex flex-column">
                  <h5>{item.name}</h5>
                  <p className="text-danger fw-bold">
                    ₹{item.price}
                  </p>
                  <div className="mt-auto">
                    <button
                      className="btn btn-warning w-100 mb-2"
                      onClick={() => {
                        addToCart({
                          ...item,
                          quantity: 1,
                        });
                        removeFromWishlist(item.id);
                      }}
                    >
                      Move to Cart
                    </button>
                    <button
                      className="btn btn-outline-danger w-100"
                      onClick={() =>
                        removeFromWishlist(item.id)
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;