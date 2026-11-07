import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProductsBySection } from "../services/api";

function NewArrival() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const data = await getProductsBySection("new-arrivals");
        setProducts(data);
      } catch (error) {
        console.error("Error fetching new arrivals:", error);
      }
    };
    fetchNewArrivals();
  }, []);

  return (
    <div className="container pt-4 mt-3 mb-4">
      <div className="d-flex justify-content-center align-items-center flex-column gap-2 mb-3">
        <h1 className="fs-2 text-center">
          Explore our newest collections designed to make every moment stylish
        </h1>
      </div>
      <div className="row g-4">
        {products.map((product) => (
          <div className="col-lg-3 col-md-4 col-sm-6" key={product.id}>
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
                <span className="badge bg-primary">
                  {product.tag}
                </span>
                <h5 className="mt-2">{product.name}</h5>
                <p className="text-muted">{product.category}</p>
                <h6>
                  ₹{product.price}
                  <del className="ms-2 text-muted">
                    ₹{product.oldPrice}
                  </del>
                </h6>
                <p>
                  ⭐ {product.rating} ({product.reviews})
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewArrival;