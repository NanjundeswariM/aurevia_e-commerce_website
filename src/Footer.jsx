import { Link } from "react-router-dom";
import React from "react";
import logo from "./assets/logo.jpg";

function Footer() {
  return (
    <footer className="bg-dark text-white pt-4 pb-2 mt-4">
      <div className="container">
        <div className="row text-center">

          <div className="col-md-4">
            <img
              className="footer-logo ms-2"
              src={logo}
              alt="Aurevia Logo"
            />

            <br />
            <br />

            <p>
              Aurevia brings elegant fashion for every occasion. Discover
              trendy clothing, beauty, and accessories designed to inspire
              your unique style.
            </p>
          </div>

          <div className="col-md-4">
            <h5 className="fw-bold">Quick Links</h5>

            <div className="d-flex flex-column gap-2">
              <Link to="/" className="text-white">Home</Link>
              <Link to="/dresses" className="text-white">Dresses</Link>
              <Link to="/clothing" className="text-white">Clothing</Link>
              <Link to="/cosmetics" className="text-white">Cosmetics</Link>
              <Link to="/footwear" className="text-white">Footwear</Link>
              <Link to="/accessories" className="text-white">Accessories</Link>
            </div>
          </div>

          <div className="col-md-4">
            <h5 className="fw-bold">Follow Us</h5>

            <div className="d-flex flex-column gap-3 align-items-center">

              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-instagram fs-4"></i>
                <a
                  className="text-white"
                  href="https://www.instagram.com/_.nanthini_murugesan._/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </div>

              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-facebook fs-4"></i>
                <a
                  className="text-white"
                  href="#"
                >
                  Facebook
                </a>
              </div>

              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-twitter fs-4"></i>
                <a
                  className="text-white"
                  href="#"
                >
                  Twitter
                </a>
              </div>

              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-telephone-fill fs-4"></i>
                <a className="text-white" href="#">
                  +91-9876543210
                </a>
              </div>

            </div>
          </div>
        </div>

        <hr />

        <p className="text-center mb-0">
          &copy; 2026 Aurevia. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;