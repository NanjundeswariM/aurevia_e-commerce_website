import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProductsBySection } from "../services/api";

function Accessories() {
  const [accessories, setAccessories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        const data = await getProductsBySection("accessories");
        setAccessories(data);
      } catch (error) {
        console.error("Error fetching accessories:", error);
        setError("Failed to load accessories products.");
      } finally {
        setLoading(false);
      }
    };
    fetchAccessories();
  }, []);

  return (
    <div className="container mt-4">
      <h4 className="mb-3">Accessories</h4>
      {loading && <p>Loading accessories...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && accessories.length === 0 && (
        <p>No accessories products found.</p>
      )}
      <div
        className="d-flex overflow-auto gap-3 pb-2"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {accessories.map((item) => (
          <div
            key={item.id}
            className="card flex-shrink-0 shadow-sm"
            style={{
              width: "220px",
              scrollSnapAlign: "start",
              cursor: "pointer",
            }}
            onClick={() =>
              navigate(`/product/accessories/${item.id}`)
            }
          >
            <img
              src={item.image}
              className="card-img-top"
              alt={item.name}
              style={{
                height: "280px",
                objectFit: "cover",
              }}
            />
            <div className="card-body p-2">
              <h6 className="mb-1 text-truncate">
                {item.name}
              </h6>
              <p className="mb-1 text-success fw-bold">
                ₹{item.price}{" "}
                {item.oldPrice && (
                  <small className="text-muted text-decoration-line-through ms-1">
                    ₹{item.oldPrice}
                  </small>
                )}
              </p>
              <small className="text-muted">
                ⭐ {item.rating} ({item.reviews})
              </small>
            </div>
          </div>
        ))}
        <div
          className="d-flex align-items-center justify-content-center bg-light shadow-sm"
          style={{
            width: "80px",
            fontSize: "30px",
            cursor: "pointer",
            borderRadius: "8px",
          }}
          onClick={() => navigate("/accessories")}
        >
          →
        </div>
      </div>
    </div>
  );
}
export default Accessories;