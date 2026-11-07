import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../services/api";

function Payment() {
  const navigate = useNavigate();
  const {
    cartItems,
    buyNowItem,
    setBuyNowItem,
    clearCart,
    setLastOrder,
    deliveryAddress,
  } = useContext(CartContext);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const orderItems = buyNowItem ? [buyNowItem] : cartItems;
  const subtotal = orderItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const deliveryCharge = subtotal > 999 ? 0 : 50;
  const discount = subtotal >= 5000 ? 500 : 0;
  const total = subtotal + deliveryCharge - discount;
  const handlePayment = async () => {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }
    if (orderItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    if (
      !deliveryAddress ||
      !deliveryAddress.name ||
      !deliveryAddress.phone ||
      !deliveryAddress.address
    ) {
      alert("Please enter your delivery address first.");
      navigate("/checkout");
      return;
    }
    try {
      setLoading(true);
      const orderData = {
        orderItems: orderItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          selectedSize: item.selectedSize || "",
        })),
        deliveryAddress,
        paymentMethod,
      };
      const response = await createOrder(orderData);
      if (!response.success) {
        throw new Error(response.message || "Order creation failed.");
      }
      setLastOrder(response.order.orderItems);
      if (buyNowItem) {
        setBuyNowItem(null);
      } else {
        clearCart();
      }
      alert("Your order has been placed successfully!");
      navigate("/success");
    } catch (error) {
      console.error("Order creation error:", error);
      alert(
        error.response?.data?.message ||
        error.message ||
        "Unable to place your order. Please try again."
      );
    } finally {
      setLoading(false);
    }
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
                checked={paymentMethod === "UPI"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                disabled={loading}
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
                checked={paymentMethod === "Credit Card"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                disabled={loading}
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
                checked={paymentMethod === "Net Banking"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                disabled={loading}
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
                checked={paymentMethod === "Cash on Delivery"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                disabled={loading}
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
              disabled={loading}
            >
              {loading ? "Placing Order..." : "Pay Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;