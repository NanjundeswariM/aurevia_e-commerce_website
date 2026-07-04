import React from "react";
import { useNavigate } from "react-router-dom";

function Category() {
  const navigate = useNavigate();

  const categories = [
    { icon: "bi-person-heart", name: "For You", path: "/new-arrivals" },
    { icon: "bi-person-standing-dress", name: "Dresses", path: "/dresses" },
    { icon: "bi-handbag", name: "Clothing", path: "/clothing" },
    { icon: "bi-stars", name: "Cosmetics", path: "/cosmetics" },
    { icon: "bi-person-walking", name: "Footwear", path: "/footwear" },
    { icon: "bi-gem", name: "Accessories", path: "/accessories" },
    { icon: "bi-droplet", name: "Skincare", path: "/skincare" },
    { icon: "bi-scissors", name: "Haircare", path: "/haircare" },
  ];

  return (
    <div className="container-fluid bg-white shadow-sm pt-3">
      <div className="row justify-content-center text-center g-2">

        {categories.map((item, index) => (
          <div
            key={index}
            className="col-3 col-sm- col-md-2 col-lg-1"
          >
            <div
              onClick={() => navigate(item.path)}
              style={{ cursor: "pointer" }}
            >
              <i
                className={`bi ${item.icon}`}
                style={{
                  fontSize: "1.4rem",
                  color: "#222"
                }}
              ></i>

              <div
                className="fw-semibold mt-1"
                style={{
                  fontSize: "14px",
                  lineHeight: "1.2"
                }}
              >
                {item.name}
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default Category;