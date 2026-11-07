import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./context/CartContext";
import { WishlistContext } from "./context/WishlistContext";
import { AuthContext } from "./context/AuthContext";
import { getAllProducts } from "./services/api";
import logo from "./assets/logo.jpg";

function HeroBar() {
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);
  const { wishlistItems } = useContext(WishlistContext);
  const { user, isLoggedIn, logout } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [results, setResults] = useState([]);
  const searchRef = useRef(null);
  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getAllProducts();
        const formattedProducts = data.map((item) => ({
          ...item,
          routeCategory: item.category,
        }));
        setProducts(formattedProducts);
      } catch (error) {
        console.error("Error loading search products:", error);
      }
    };
    loadProducts();
  }, []);
  useEffect(() => {
    if (search.trim() === "") {
      setResults([]);
      return;
    }
    const searchText = search.toLowerCase();
    const filtered = products.filter(
      (item) =>
        item.name?.toLowerCase().includes(searchText) ||
        item.category?.toLowerCase().includes(searchText)
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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav
      className="navbar navbar-expand-lg bg-white shadow-sm fixed-top px-3"
      style={{ zIndex: 1050, position: "fixed", top:0,left:0,right:0 }}
    >
      <div className="container-fluid">
        <img
          src={logo}
          alt="Aurevia Logo"
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
          aria-controls="heroNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
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
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle border-0 bg-transparent"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-person-circle me-1"></i>
                {isLoggedIn
                  ? `Hello, ${user?.name || "Account"}`
                  : "Login"}
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                {!isLoggedIn ? (
                  <>
                    <li>
                      <h6 className="dropdown-header">
                        New Customer?
                        <button
                          className="btn btn-link text-primary text-decoration-none p-0 ms-2"
                          onClick={() => navigate("/register")}
                        >
                          Sign Up
                        </button>
                      </h6>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => navigate("/login")}
                      >
                        <i className="bi bi-box-arrow-in-right me-2"></i>
                        Login
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    {user?.role === "admin" ? (
                      <>
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => navigate("/admin")}
                          >
                            <i className="bi bi-speedometer2 me-2"></i>
                              Admin Dashboard
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => navigate("/admin/products")}
                          >
                            <i className="bi bi-box-seam me-2"></i>
                              Manage Products
                          </button>
                        </li>
                      </>
                      ) : (
                      <>
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => navigate("/my-orders")}
                          >
                            <i className="bi bi-box me-2"></i>
                            My Orders
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
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => navigate("/cart")}
                          >
                            <i className="bi bi-cart3 me-3"></i>
                            Cart
                          </button>
                        </li>
                      </>
                    )}
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button
                        className="dropdown-item text-danger"
                        onClick={handleLogout}
                      >
                        <i className="bi bi-box-arrow-right me-2"></i>
                        Logout
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </li>
            {/* <li className="nav-item dropdown ms-lg-3">
              <button
                className="nav-link dropdown-toggle border-0 bg-transparent"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                More
              </button>

              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => navigate("/")}
                  >
                    Customer Care
                  </button>
                </li>
              </ul>
            </li> */}

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