import React, { useState, useEffect } from "react";
import {
  getProfile,
  updateProfile,
  getMyOrders,
  cancelOrder,
  changePassword,
} from "../services/api";

const UserPage = () => {
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getProfile();
        setUser(userData);
        const orderData = await getMyOrders();
        setOrders(orderData);
      } catch (err) {
        setError("Failed to load profile or orders.");
      }
    };
    fetchData();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(user);
      setSuccess("Profile updated successfully.");
    } catch (err) {
      setError("Failed to update profile.");
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      await changePassword(passwordData);
      setSuccess("Password changed successfully.");
    } catch (err) {
      setError("Failed to change password.");
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      await cancelOrder(orderId);
      setOrders(orders.filter((order) => order.id !== orderId));
      setSuccess("Order canceled successfully.");
    } catch (err) {
      setError("Failed to cancel order.");
    }
  };

  return (
    <div className="user-page">
      <h1>Profile</h1>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <form onSubmit={handleUpdateProfile}>
        <label>Name:</label>
        <input
          type="text"
          value={user.name || ""}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          required
        />
        <label>Email:</label>
        <input type="email" value={user.email || ""} disabled />
        <label>Phone:</label>
        <input
          type="tel"
          value={user.phone || ""}
          onChange={(e) => setUser({ ...user, phone: e.target.value })}
          required
        />
        <label>Address:</label>
        <input
          type="text"
          value={user.address || ""}
          onChange={(e) => setUser({ ...user, address: e.target.value })}
          required
        />
        <button type="submit">Update Profile</button>
      </form>

      <h1>Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="order">
            <p>
              Order #{order.id} - Status: {order.status}
            </p>
            <button
              onClick={() => handleCancelOrder(order.id)}
              disabled={order.status !== "NEW"}
            >
              Cancel Order
            </button>
          </div>
        ))
      )}

      <h1>Change Password</h1>
      <form onSubmit={handleChangePassword}>
        <label>Old Password:</label>
        <input
          type="password"
          value={passwordData.oldPassword}
          onChange={(e) =>
            setPasswordData({ ...passwordData, oldPassword: e.target.value })
          }
          required
        />
        <label>New Password:</label>
        <input
          type="password"
          value={passwordData.newPassword}
          onChange={(e) =>
            setPasswordData({ ...passwordData, newPassword: e.target.value })
          }
          required
        />
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default UserPage;
