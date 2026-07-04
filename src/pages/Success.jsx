import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
function Success() {
  const navigate = useNavigate();
  const {
    lastOrder,
    deliveryAddress,
  } = useContext(CartContext);
  const total = lastOrder.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  return (
    <div className="container py-5">
      <div className="card shadow p-5 text-center">
        <div className="display-1 text-success">
          ✅
        </div>
        <h2 className="mt-3">
          Order Placed Successfully!
        </h2>
        <p className="text-muted">
          Thank you for shopping with us.
        </p>
        <hr />
        <h4 className="mb-4">
          Order Summary
        </h4>
        {lastOrder.map((item) => (
          <div
            key={`${item.category}-${item.id}-${item.selectedSize}`}
            className="d-flex justify-content-between mb-3"
          >
            <div className="text-start">
              <strong>{item.name}</strong>
              <br />
              {item.selectedSize && (
                <small>
                  Size : {item.selectedSize}
                </small>
              )}
              <br />
              Qty : {item.quantity}
            </div>
            <strong>
              ₹{item.price * item.quantity}
            </strong>
          </div>
        ))}
        <hr />
        <div className="d-flex justify-content-between fs-5">
          <strong>Total Paid</strong>
          <strong className="text-success">
            ₹{total}
          </strong>
        </div>
        <hr />
        <h5 className="mt-3">
          Delivery Address
        </h5>
        <p className="mb-1">
          <strong>{deliveryAddress.name}</strong>
        </p>
        <p className="mb-1">
          {deliveryAddress.address}
        </p>
        <p className="mb-1">
          {deliveryAddress.city}, {deliveryAddress.state}
        </p>
        <p>
          {deliveryAddress.pincode}
        </p>
        <button
          className="btn btn-dark mt-4"
          onClick={() => navigate("/")}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default Success;