import React, { useEffect, useState } from "react";
import { getMyOrders } from "../services/api";

function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getMyOrders();
                setOrders(data.orders || []);
            } catch (err) {
                setError(
                    err.response?.data?.message ||
                    "Unable to load your orders."
                );
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);
    if (loading) {
        return <div className="container text-center my-5">
            Loading your orders...
        </div>;
    }
    if (error) {
        return <div className="container text-center my-5 text-danger">
            {error}
        </div>;
    }
    return (
        <div className="container my-5">
            <h2 className="mb-4">My Orders</h2>
            {orders.length === 0 ? (
                <div className="text-center py-5">
                    <h4>No orders yet!</h4>
                    <p>Your orders will appear here.</p>
                </div>
            ) : (
                orders.map((order) => (
                    <div className="card mb-4 shadow-sm" key={order._id}>
                        <div className="card-body">
                            <div className="d-flex justify-content-between flex-wrap mb-3">
                                <h5>Order #{order._id}</h5>
                                <span className="badge bg-success">
                                    {order.orderStatus}
                                </span>
                            </div>
                            <p>
                                <strong>Order Date:</strong>{" "}
                                {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                            <hr />
                            {order.orderItems.map((item, index) => (
                                <div key={index} className="mb-3">
                                    <h6>{item.name}</h6>
                                    <p className="mb-1">
                                        Quantity: {item.quantity}
                                    </p>
                                    <p className="mb-1">
                                        Price: ₹{item.price}
                                    </p>
                                    {item.selectedSize && (
                                        <p>Size: {item.selectedSize}</p>
                                    )}
                                </div>
                            ))}
                            <hr />
                            <p>
                                <strong>Total Amount:</strong>{" "}
                                ₹{order.totalAmount}
                            </p>
                            <p>
                                <strong>Payment Method:</strong>{" "}
                                {order.paymentMethod}
                            </p>
                            <p>
                                <strong>Payment Status:</strong>{" "}
                                {order.paymentStatus}
                            </p>
                            <hr />
                            <h6>Delivery Address</h6>
                            <p className="mb-0">
                                {order.deliveryAddress.name}<br />
                                {order.deliveryAddress.phone}<br />
                                {order.deliveryAddress.address}<br />
                                {order.deliveryAddress.city},{" "}
                                {order.deliveryAddress.state} -{" "}
                                {order.deliveryAddress.pincode}
                            </p>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default MyOrders;