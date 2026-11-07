import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProductsBySection } from "./services/api";

function ProductCard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProductsBySection("new-arrivals");
        setProducts(data);
      } catch (error) {
        console.error("Error fetching new arrivals:", error);
        setError("Failed to load new arrivals.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-center align-items-center flex-column gap-2 mb-4">
        <h3 className="banner-text">
          New Arrivals <i className="bi bi-stars"></i>
        </h3>
        <small className="banner-text text-center">
          Explore our newest collections designed to make every moment stylish.
        </small>
      </div>
      {loading && <p className="text-center">Loading new arrivals...</p>}
      {error && <p className="text-danger text-center">{error}</p>}
      {!loading && !error && products.length === 0 && (
        <p className="text-center">No new arrivals found.</p>
      )}
      <div className="row g-4">
        {products.map((product) => (
          <div
            className="col-lg-3 col-md-4 col-sm-6"
            key={product.id}
          >
            <div
              className="card shadow-sm h-100"
              style={{ cursor: "pointer" }}
              onClick={() =>
                navigate(`/product/new-arrivals/${product.id}`)
              }
            >
              <img
                src={product.image}
                className="card-img-top product-image"
                alt={product.name}
              />

              <div className="card-body">
                <span className="badge bg-dark">
                  {product.tag}
                </span>

                <h5 className="mt-2 text-truncate" title={product.name}>
                  {product.name}
                </h5>

                <p className="text-muted">
                  {product.category}
                </p>

                <h6>
                  ₹{product.price}

                  <del className="ms-2 text-muted">
                    ₹{product.oldPrice}
                  </del>
                </h6>

                <p>
                  ⭐ {product.rating} ({product.reviews})
                </p>

                <button
                  className="btn btn-dark w-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/product/new-arrivals/${product.id}`);
                  }}
                >
                  <i className="bi bi-cart"></i> Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductCard;
