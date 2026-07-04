import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
function Payment() {
  const navigate = useNavigate();
  const {
    cartItems,
    buyNowItem,
    setBuyNowItem,
    clearCart,
    setLastOrder,
  } = useContext(CartContext);
  const [paymentMethod, setPaymentMethod] = useState("");
  const orderItems = buyNowItem ? [buyNowItem] : cartItems;
  const subtotal = orderItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const deliveryCharge = subtotal > 999 ? 0 : 50;
  const discount = subtotal >= 5000 ? 500 : 0;
  const total = subtotal + deliveryCharge - discount;
  const handlePayment = () => {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }
    if (buyNowItem) {
      setLastOrder([buyNowItem]);
      setBuyNowItem(null);
    } else {
      setLastOrder(cartItems);
      clearCart();
    }
    navigate("/success");
  };
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card shadow-sm p-4">
            <h2 className="text-center mb-4">
              Payment
            </h2>
            <h5>Select Payment Method</h5>
            <div className="form-check mt-3">
              <input
                className="form-check-input"
                type="radio"
                value="UPI"
                name="payment"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label className="form-check-label">
                UPI
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                value="Credit Card"
                name="payment"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label className="form-check-label">
                Credit / Debit Card
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                value="Net Banking"
                name="payment"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label className="form-check-label">
                Net Banking
              </label>
            </div>
            <div className="form-check mb-4">
              <input
                className="form-check-input"
                type="radio"
                value="Cash on Delivery"
                name="payment"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label className="form-check-label">
                Cash on Delivery
              </label>
            </div>
            <hr />
            <div className="d-flex justify-content-between fs-5">
              <span>Total Amount</span>
              <strong>₹{total}</strong>
            </div>
            <button
              className="btn btn-success w-100 mt-4"
              onClick={handlePayment}
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;