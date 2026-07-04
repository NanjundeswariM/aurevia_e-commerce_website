import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./context/CartContext";
import { WishlistContext } from "./context/WishlistContext";
import logo from "./assets/logo.jpg";
function HeroBar() {
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);
  const { wishlistItems } = useContext(WishlistContext);
  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const [loginOpen, setLoginOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [results, setResults] = useState([]);
  const searchRef = useRef(null);
  useEffect(() => {
    Promise.all([
      fetch("http://localhost:3000/dresses").then((res) => res.json()),
      fetch("http://localhost:3000/clothing").then((res) => res.json()),
      fetch("http://localhost:3000/cosmetics").then((res) => res.json()),
      fetch("http://localhost:3000/footwear").then((res) => res.json()),
      fetch("http://localhost:3000/accessories").then((res) => res.json()),
      fetch("http://localhost:3000/skincare").then((res) => res.json()),
      fetch("http://localhost:3000/haircare").then((res) => res.json()),
    ]).then(
      ([
        dresses,
        clothing,
        cosmetics,
        footwear,
        accessories,
        skincare,
        haircare,
      ]) => {
        const allProducts = [
          ...dresses.map((p) => ({ ...p, routeCategory: "dresses" })),
          ...clothing.map((p) => ({ ...p, routeCategory: "clothing" })),
          ...cosmetics.map((p) => ({ ...p, routeCategory: "cosmetics" })),
          ...footwear.map((p) => ({ ...p, routeCategory: "footwear" })),
          ...accessories.map((p) => ({
            ...p,
            routeCategory: "accessories",
          })),
          ...skincare.map((p) => ({ ...p, routeCategory: "skincare" })),
          ...haircare.map((p) => ({ ...p, routeCategory: "haircare" })),
        ];
        setProducts(allProducts);
      }
    );
  }, []);
  useEffect(() => {
    if (search.trim() === "") {
      setResults([]);
      return;
    }
    const filtered = products.filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase())
    );
    setResults(filtered.slice(0, 5));
  }, [search, products]);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target)
      ) {
        setResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);
  return (
    <nav
      className="navbar navbar-expand-lg bg-white shadow-sm fixed-top px-3"
      style={{ zIndex: 1000 }}
    >
      <div className="container-fluid">

        <img
          src={logo}
          alt="Logo"
          style={{
            width: "55px",
            height: "55px",
            objectFit: "contain",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        />
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#heroNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse"
          id="heroNavbar"
        >
          <div
            ref={searchRef}
            className="position-relative mx-lg-4 my-3 my-lg-0 flex-grow-1"
          >
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <i className="bi bi-search"></i>
              </span>
              <input
                className="form-control border-start-0"
                placeholder="Search for Products, Brands and More"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            {results.length > 0 && (
              <div
                className="position-absolute bg-white shadow rounded w-100 mt-1"
                style={{
                  maxHeight: "350px",
                  overflowY: "auto",
                  zIndex: 2000,
                }}
              >
                {results.map((item) => (
                  <div
                    key={`${item.routeCategory}-${item.id}`}
                    className="d-flex align-items-center p-2 border-bottom"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      navigate(
                        `/product/${item.routeCategory}/${item.id}`
                      );
                      setSearch("");
                      setResults([]);
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      width="50"
                      height="50"
                      style={{ objectFit: "cover" }}
                    />
                    <div className="ms-3">
                      <div>{item.name}</div>
                      <small>₹{item.price}</small>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li
              className="nav-item dropdown"
              onMouseEnter={() => setLoginOpen(true)}
              onMouseLeave={() => setLoginOpen(false)}
            >
              <a
                href="#"
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
              >
                <i className="bi bi-person-circle me-1"></i>
                Login
              </a>
              <ul className="dropdown-menu">
                <li>
                  <h6 className="dropdown-header">
                    New Customer?
                    <span
                      className="text-primary ms-2"
                      style={{ cursor: "pointer" }}
                    >
                      Sign Up
                    </span>
                  </h6>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => navigate("/profile")}
                  >
                    <i className="bi bi-person me-2"></i>
                    My Profile
                  </button>
                </li>
                <li>
                  <button className="dropdown-item">
                    <i className="bi bi-box me-2"></i>
                    Orders
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => navigate("/wishlist")}
                  >
                    <i className="bi bi-heart me-2"></i>
                    Wishlist
                  </button>
                </li>
              </ul>
            </li>
            <li
              className="nav-item dropdown ms-lg-3"
              onMouseEnter={() => setMoreOpen(true)}
              onMouseLeave={() => setMoreOpen(false)}
            >
              <a
                href="#"
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
              >
                More
              </a>
              <ul className="dropdown-menu">
                <li>
                  <button className="dropdown-item">
                    Become Seller
                  </button>
                </li>
                <li>
                  <button className="dropdown-item">
                    Customer Care
                  </button>
                </li>
                <li>
                  <button className="dropdown-item">
                    Notification Settings
                  </button>
                </li>
              </ul>
            </li>
            <li className="nav-item ms-lg-3">
              <button
                className="btn btn-link text-dark text-decoration-none fw-semibold"
                onClick={() => navigate("/wishlist")}
              >
                <i className="bi bi-heart-fill text-danger me-1"></i>
                Wishlist ({wishlistItems.length})
              </button>
            </li>
            <li className="nav-item ms-lg-2">
              <button
                className="btn btn-link text-dark text-decoration-none fw-semibold"
                onClick={() => navigate("/cart")}
              >
                <i className="bi bi-cart-fill me-1"></i>
                Cart ({cartCount})
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default HeroBar;