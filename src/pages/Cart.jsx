import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
function Cart() {
  const navigate = useNavigate();
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useContext(CartContext);
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const deliveryCharge = subtotal > 999 ? 0 : 50;
  const discount = subtotal >= 5000 ? 500 : 0;
  const total = subtotal + deliveryCharge - discount;
  return (
    <div className="container py-5">
      <h2 className="mb-4 text-align-center">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <div className="text-center mt-5">
          <h4>Your Cart is Empty</h4>
          <p className="text-muted">Add some products to continue shopping.</p>
          <button className="btn btn-primary" onClick={()=>navigate('/')}>Home</button>
        </div>
      ) : (
        <div className="row">
          <div className="col-lg-8">
            {cartItems.map((item) => (
              <div className="card shadow-sm mb-3" key={item.id}>
                <div className="row g-0 align-items-center p-3">
                  <div className="col-md-3 text-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="img-fluid rounded"
                      style={{
                        maxHeight: "150px",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                  <div className="col-md-6">
                    <h5>{item.name}</h5>
                    <p className="text-danger fw-bold mb-1">
                      ₹{item.price}
                    </p>
                    {item.selectedSize && (
                      <p className="mb-2">
                        <strong>Size:</strong> {item.selectedSize}
                      </p>
                    )}
                    <div className="d-flex align-items-center gap-2 mt-3">
                      <button
                        className="btn btn-outline-dark btn-sm"
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        -
                      </button>
                      <span className="fw-bold">{item.quantity}</span>
                      <button
                        className="btn btn-outline-dark btn-sm"
                        onClick={() => increaseQuantity(item.id)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="btn btn-outline-danger btn-sm mt-3"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <i className="bi bi-trash"></i> Remove
                    </button>
                  </div>
                  <div className="col-md-3 text-end">
                    <h5 className="text-success">
                      ₹{item.price * item.quantity}
                    </h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-lg-4">
            <div className="card shadow-sm p-4 sticky-top" style={{top:"90px", maxHeight: "calc(100vh - 110px)", overflow:"auto"}}>
              <h4 className="mb-3">Price Details</h4>
              <hr />
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Delivery</span>

                <span className="text-success">
                  {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
                </span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Discount</span>
                <span className="text-success">
                  -₹{discount}
                </span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold fs-5">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
              <button className="btn btn-warning mt-4 w-100" onClick={()=>navigate("/checkout")}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;