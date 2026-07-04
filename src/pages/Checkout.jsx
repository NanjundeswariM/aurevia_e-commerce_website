import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
function Checkout() {
  const {
    cartItems,
    buyNowItem,
    deliveryAddress,
    setDeliveryAddress,
  } = useContext(CartContext);
  const navigate = useNavigate();
  const [form, setForm] = useState(deliveryAddress);
  const orderItems = buyNowItem ? [buyNowItem] : cartItems;
  const subtotal = orderItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const deliveryCharge = subtotal > 999 ? 0 : 50;
  const discount = subtotal >= 5000 ? 500 : 0;
  const total = subtotal + deliveryCharge - discount;
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const placeOrder = () => {
    if (
      !form.name ||
      !form.phone ||
      !form.address ||
      !form.city ||
      !form.state ||
      !form.pincode
    ) {
      alert("Please fill all required fields.");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      alert("Enter a valid mobile number.");
      return;
    }
    if (!/^\d{6}$/.test(form.pincode)) {
      alert("Enter a valid pincode.");
      return;
    }
    setDeliveryAddress(form);
    navigate("/payment");
  };
  return (
    <div className="container py-5">
      <h2 className="mb-4">Checkout</h2>
      <div className="row">
        <div className="col-lg-7">
          <div className="card shadow-sm p-4">
            <h4 className="mb-4">Delivery Address</h4>
            <input
              className="form-control mb-3"
              placeholder="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
            <input
              className="form-control mb-3"
              placeholder="Mobile Number"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
            <input
              className="form-control mb-3"
              placeholder="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
            <textarea
              className="form-control mb-3"
              rows="3"
              placeholder="Address"
              name="address"
              value={form.address}
              onChange={handleChange}
            />
            <div className="row">
              <div className="col-md-4">
                <input
                  className="form-control mb-3"
                  placeholder="City"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4">
                <input
                  className="form-control mb-3"
                  placeholder="State"
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4">
                <input
                  className="form-control mb-3"
                  placeholder="Pincode"
                  name="pincode"
                  value={form.pincode}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-5">
          <div
            className="card shadow-sm p-4 sticky-top"
            style={{ top: "90px" }}
          >
            <h4>Order Summary</h4>
            <hr />
            {orderItems.length === 0 ? (
              <div className="text-center">
                <p>Your cart is empty.</p>
                <button
                  className="btn btn-dark"
                  onClick={() => navigate("/")}
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                {orderItems.map((item) => (
                  <div
                    key={`${item.category}-${item.id}-${item.selectedSize}`}
                    className="d-flex justify-content-between mb-2"
                  >
                    <div>
                      <div>{item.name}</div>

                      {item.selectedSize && (
                        <small className="text-muted">
                          Size : {item.selectedSize}
                        </small>
                      )}
                      <div>
                        Qty : {item.quantity}
                      </div>
                    </div>
                    <div>
                      ₹{item.price * item.quantity}
                    </div>
                  </div>
                ))}
                <hr />
                <div className="d-flex justify-content-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Delivery</span>
                  <span className="text-success">
                    {deliveryCharge === 0
                      ? "FREE"
                      : `₹${deliveryCharge}`}
                  </span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Discount</span>
                  <span className="text-success">
                    -₹{discount}
                  </span>
                </div>
                <hr />
                <div className="d-flex justify-content-between fw-bold fs-4">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
                <button
                  className="btn btn-warning w-100 mt-4"
                  onClick={placeOrder}
                >
                  Continue to Payment
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;