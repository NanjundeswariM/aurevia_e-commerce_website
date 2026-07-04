import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Footwear() {
  const [Footwear, setFootwear] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:3000/footwear")
      .then((res) => res.json())
      .then((data) => setFootwear(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="container mt-4">
      <h4 className="mb-3">Footwear</h4>
      <div
        className="d-flex overflow-auto gap-3 pb-2"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {Footwear.map((item) => (
          <div
            key={item.id}
            className="card flex-shrink-0 shadow-sm"
            style={{ width: "220px", scrollSnapAlign: "start", cursor: "pointer"}}
            onClick={()=>navigate(`/product/footwear/${item.id}`)}
          >
            <img
              src={item.image}
              className="card-img-top"
              alt={item.name}
              style={{ height: "280px", objectFit: "cover" }}
            />
            <div className="card-body p-2">
              <h6 className="mb-1 text-truncate">{item.name}</h6>
              <p className="mb-1 text-success fw-bold">
                ₹{item.price}{" "}
                <small className="text-muted text-decoration-line-through">
                  ₹{item.oldPrice}
                </small>
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
          }}
          onClick={()=>navigate('/footwear')}
        >
          →
        </div>
      </div>
    </div>
  );
}

export default Footwear;