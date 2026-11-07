
import React, { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus, getAllProducts, getTotalCustomers, getTotalRevenue } from "../services/api";

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingOrder, setUpdatingOrder] = useState("");
  const fetchDashboardData = async () => {
    try {
      const [
        orderData,
        productData,
        customerData,
        revenueData
      ] = await Promise.all([
        getAllOrders(),
        getAllProducts(),
        getTotalCustomers(),
        getTotalRevenue()
      ]);
      setOrders(orderData.orders || []);
      setTotalProducts(productData.length);
      setTotalCustomers(customerData.totalCustomers);
      setTotalRevenue(revenueData.totalRevenue);
      setError("");
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setError(
        error.response?.data?.message ||
        "Unable to load dashboard data."
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === orderId
          ? { ...order, selectedStatus: newStatus }
          : order
      )
    );
  };

  const handleUpdateStatus = async (order) => {
    try {
      setUpdatingOrder(order._id);
      const newStatus = order.selectedStatus || order.orderStatus;
      await updateOrderStatus(order._id, newStatus);
      alert("Order status updated successfully!");
      await fetchDashboardData();
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Unable to update order status."
      );
    } finally {
      setUpdatingOrder("");
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <h2 className="mb-4">Aurevia Admin Dashboard</h2>
      <div className="row mb-4">
        <div className="col-md-3 col-sm-6 mb-3">
          <div className="card shadow-sm p-3 h-100">
            <h5>Total Orders</h5>
            <h2>{orders.length}</h2>
          </div>
        </div>
        <div className="col-md-3 col-sm-6 mb-3">
          <div className="card shadow-sm p-3 h-100">
            <h5>Total Products</h5>
            <h2>{totalProducts}</h2>
          </div>
        </div>
        <div className="col-md-3 col-sm-6 mb-3">
          <div className="card shadow-sm p-3 h-100">
            <h5>Total Customers</h5>
            <h2>{totalCustomers}</h2>
          </div>
        </div>
        <div className="col-md-3 col-sm-6 mb-3">
          <div className="card shadow-sm p-3 h-100">
            <h5>Total Revenue</h5>
            <h2>₹{totalRevenue.toLocaleString("en-IN")}</h2>
          </div>
        </div>
      </div>
      <h4 className="mb-3">Customer Orders</h4>
      <h4 className="mb-3">Order Status Summary</h4>
      <div className="row mb-4">
        {[
          "Placed",
          "Processing",
          "Shipped",
          "Delivered",
          "Cancelled"
        ].map((status) => (
          <div className="col-md-4 col-lg mb-3" key={status}>
            <div className="card shadow-sm p-3 h-100">
              <h6>{status}</h6>
              <h3>
                {orders.filter(
                  (order) => order.orderStatus === status
                ).length}
              </h3>
            </div>
          </div>
        ))}
      </div>
      {loading && <p>Loading dashboard...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && orders.length === 0 && (
        <p>No orders found.</p>
      )}
      {!loading && orders.length > 0 && (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Total Amount</th>
                <th>Payment Method</th>
                <th>Current Status</th>
                <th>Update Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>
                    {order.deliveryAddress?.name || "N/A"}
                    <br />
                    <small>
                      {order.deliveryAddress?.email || ""}
                    </small>
                  </td>
                  <td>₹{order.totalAmount}</td>
                  <td>{order.paymentMethod}</td>
                  <td>{order.orderStatus}</td>
                  <td>
                    <select
                      className="form-select mb-2"
                      value={order.selectedStatus || order.orderStatus}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                    >
                      <option value="Placed">Placed</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleUpdateStatus(order)}
                      disabled={updatingOrder === order._id}
                    >
                      {updatingOrder === order._id
                        ? "Updating..."
                        : "Update"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
