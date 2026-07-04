import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from '../context/WishlistContext';
function ProductDetails() {
  const { category, id } = useParams();
  const navigate = useNavigate();
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const {
    addToCart,
    setBuyNowItem
  } = useContext(CartContext);
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3000/${category}/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Product not found");
        }
        return res.json();
      })
      .then((data) => {
        setProduct(data);

        if (data.size && data.size.length > 0) {
          setSelectedSize(data.size[0]);
        }

        setLoading(false);
      })
      .catch(() => {
        setError("Unable to load product.");
        setLoading(false);
      });
  }, [category, id]);
  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border text-dark"></div>
        <p className="mt-3">Loading Product...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="container text-center mt-5">
        <h3>{error}</h3>
        <button
          className="btn btn-dark mt-3"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }
  const item = {
    ...product,
    quantity,
    selectedSize,
  };
  const handleAddToCart = () => {
    addToCart(item);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 1000);
  };
  const handleBuyNow = () => {
    setBuyNowItem(item);
    navigate("/checkout");
  };
  return (
    <div className="container pt-3 pb-2">
      <button
        className="btn btn-outline-dark mb-4"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>
      <div className="row g-5">
        <div className="col-lg-6 text-center">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded shadow"
            style={{
              maxHeight: "600px",
              objectFit: "cover",
            }}
          />
        </div>
        <div className="col-lg-6">
          <h2>{product.name}</h2>
          <p className="text-muted fs-5">
            {product.category}
          </p>
          <div className="mb-3">
            <h2 className="text-danger d-inline">
              ₹{product.price}
            </h2>
            {product.oldPrice && (
              <del className="text-muted ms-3 fs-5">
                ₹{product.oldPrice}
              </del>
            )}
          </div>
          <h5 className="mb-3">
            ⭐ {product.rating}
            <span className="text-muted fs-6">
              {" "}({product.reviews} Reviews)
            </span>
          </h5>
          <hr />
          {product.size && (
            <>
              <h5>Select Size</h5>
              <div className="mb-4">
                {product.size.map((size) => (
                  <button
                    key={size}
                    className={`btn me-2 mb-2 ${
                      selectedSize === size
                        ? "btn-dark"
                        : "btn-outline-dark"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <hr />
            </>
          )}
          <h5>Quantity</h5>
          <div className="d-flex align-items-center mb-4">
            <button
              className="btn btn-outline-dark"
              disabled={quantity === 1}
              onClick={() => setQuantity(quantity - 1)}
            >
              -
            </button>
            <span className="mx-3 fs-5">
              {quantity}
            </span>
            <button
              className="btn btn-outline-dark"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
          <hr />
          <h5>Description</h5>
          <p>{product.description}</p>
          {product.material && (
            <p>
              <strong>Material :</strong> {product.material}
            </p>
          )}
          <p>
            <strong>Availability :</strong>{" "}
            {product.stock > 0 ? (
              <span className="text-success">
                In Stock ({product.stock})
              </span>
            ) : (
              <span className="text-danger">
                Out of Stock
              </span>
            )}
          </p>
          {showMessage && (
            <div className="alert alert-success py-2 my-3">
              ✅ Added to Cart
            </div>
          )}
          <div className="d-flex gap-3 mt-4">
            <button
              className="btn btn-outline-danger"
              onClick={() => toggleWishlist(product)}
            >
              <i
                className={`bi ${
                isInWishlist(product.id)
                ?  "bi-heart-fill"
                : "bi-heart"
                }`}
              ></i>
            </button>
            <button
              className="btn btn-warning px-4"
              onClick={handleAddToCart}
            >
              <i className="bi bi-cart-plus me-2"></i>
              Add To Cart
            </button>
            <button className="btn btn-dark px-4" onClick={handleBuyNow}>
              <i className="bi bi-bag me-2"></i>
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;