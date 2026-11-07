import React from "react";
import { useNavigate } from "react-router-dom";
import banner1 from "./assets/banner.png";
import banner2 from "./assets/banner2.png";

function Banner() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="banner-wrapper">
        <img className="banner" src={banner1} alt="Banner 1" />
        <img className="banner" src={banner2} alt="Banner 2" />
      </div>
      <div className="banner-text-container">
        <small className="banner-text">
          Step Into Your Signature Style
        </small>
        <i className="bi bi-stars"></i>
        <small className="banner-text">
          Your Style, Your Story
        </small>
        <i className="bi bi-stars"></i>
        <small className="banner-text">
          Elegance Redefined, Style Made For You
        </small>
        <i className="bi bi-stars"></i>
        <small className="banner-text">
          Where Fashion Meets Confidence
        </small>
      </div>
      <div className="text-center mt-3">
        <button
          className="btn btn-dark"
          onClick={() => navigate("/new-arrivals")}
        >
          Shop Now
        </button>
      </div>
    </div>
  );
}

export default Banner;