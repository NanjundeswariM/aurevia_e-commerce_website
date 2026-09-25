import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Clothing() {
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("default");
  const [filters, setFilters] = useState({
    price: "",
    rating: "",
    stock: false,
  });
  const navigate = useNavigate();
  useEffect(() => {
    fetch("/db.json")
      .then((res) => res.json())
      .then((data) => setProducts(data.clothing))
      .catch((err) => console.log(err));
  }, []);
  const filteredProducts = products.filter((p) => {
    let match = true;
    if (filters.price === "low" && p.price > 1000) match = false;
    if (
      filters.price === "mid" &&
      (p.price < 1000 || p.price > 2000)
    )
      match = false;
    if (filters.price === "high" && p.price < 2000)
      match = false;
    if (filters.rating === "4" && p.rating < 4) match = false;
    if (filters.rating === "3" && p.rating < 3) match = false;
    if (filters.stock && p.stock <= 0) match = false;
    return match;
  });
  const finalProducts = [...filteredProducts];
  switch (sortBy) {
    case "low-high":
      finalProducts.sort((a, b) => a.price - b.price);
      break;
    case "high-low":
      finalProducts.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      finalProducts.sort((a, b) => b.rating - a.rating);
      break;
    case "new":
      finalProducts.sort((a, b) => b.id - a.id);
      break;
    default:
      break;
  }
  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Find Your Perfect Style</h1>
        <select
          className="form-select"
          style={{ width: "250px" }}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="default">Sort By</option>
          <option value="low-high">Price: Low → High</option>
          <option value="high-low">Price: High → Low</option>
          <option value="rating">Highest Rated</option>
          <option value="new">Newest</option>
        </select>
      </div>
      <div className="row">
        <div className="col-lg-3 mb-4">
          <div className="card p-3 shadow-sm">
            <h5 className="mb-3">Filters</h5>
            <h6>Price</h6>
            <div>
              <div>
                <input
                  type="radio"
                  name="price"
                  checked={filters.price === "low"}
                  onChange={() =>
                    setFilters({ ...filters, price: "low" })
                  }
                />
                {" "}Under ₹1000
              </div>
              <div>
                <input
                  type="radio"
                  name="price"
                  checked={filters.price === "mid"}
                  onChange={() =>
                    setFilters({ ...filters, price: "mid" })
                  }
                />
                {" "}₹1000 - ₹2000
              </div>
              <div>
                <input
                  type="radio"
                  name="price"
                  checked={filters.price === "high"}
                  onChange={() =>
                    setFilters({ ...filters, price: "high" })
                  }
                />
                {" "}Above ₹2000
              </div>
            </div>
            <hr />
            <h6>Rating</h6>
            <div>
              <div>
                <input
                  type="radio"
                  name="rating"
                  checked={filters.rating === "4"}
                  onChange={() =>
                    setFilters({ ...filters, rating: "4" })
                  }
                />
                {" "}4★ & above
              </div>
              <div>
                <input
                  type="radio"
                  name="rating"
                  checked={filters.rating === "3"}
                  onChange={() =>
                    setFilters({ ...filters, rating: "3" })
                  }
                />
                {" "}3★ & above
              </div>
            </div>
            <hr />
            <div>
              <input
                type="checkbox"
                checked={filters.stock}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    stock: e.target.checked,
                  })
                }
              />
              {" "}In Stock Only
            </div>
            <button
              className="btn btn-outline-dark mt-3 w-100"
              onClick={() =>
                setFilters({
                  price: "",
                  rating: "",
                  stock: false,
                })
              }
            >
              Clear Filters
            </button>
          </div>
        </div>
        <div className="col-lg-9">
          <div className="row">
            {finalProducts.map((product) => (
              <div
                className="col-lg-4 col-md-6 col-sm-6 mb-4"
                key={product.id}
              >
                <div
                  className="card h-100 shadow-sm"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    navigate(`/product/clothing/${product.id}`)
                  }
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="card-img-top"
                    style={{
                      height: "280px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="card-body">
                    <h5>{product.name}</h5>

                    <p className="text-danger fw-bold mb-1">
                      ₹{product.price}
                    </p>
                    {product.oldPrice && (
                      <p className="text-muted">
                        <del>₹{product.oldPrice}</del>
                      </p>
                    )}
                    <p>
                      ⭐ {product.rating} ({product.reviews})
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {finalProducts.length === 0 && (
              <p className="text-center mt-4">
                No products found 😕
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Clothing;