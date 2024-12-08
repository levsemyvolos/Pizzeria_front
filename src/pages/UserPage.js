// src/pages/UserPage.js
import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import {
  getProfile,
  updateProfile,
  changePassword as changePassApi /* cancel order endpoint needed, get orders endpoint needed */,
} from "../services/api";
import { Tabs, Tab, Box, TextField, Button, Typography } from "@mui/material";

const UserPage = () => {
  const { auth, login } = useContext(AuthContext);
  const [tab, setTab] = useState(0);

  // Профіль
  const [profileData, setProfileData] = useState({
    name: auth.user.name,
    phone: auth.user.phone,
    address: auth.user.address,
  });
  const [profileMessage, setProfileMessage] = useState("");

  const handleProfileSave = async () => {
    try {
      const updated = await updateProfile(profileData);
      // Оновити дані користувача в контексті
      login(auth.token, updated);
      setProfileMessage("Profile updated successfully!");
    } catch (err) {
      setProfileMessage(err.response?.data?.error || "Update failed.");
    }
  };

  // Замовлення
  const [orders, setOrders] = useState([]);
  const [ordersMessage, setOrdersMessage] = useState("");

  const fetchOrders = async () => {
    try {
      const params = {}; // Якщо треба фільтрація
      const response = await (
        await fetch(`${window.location.origin}/api/orders/my`, {
          headers: { Authorization: `Bearer ${auth.token}` },
        })
      ).json();
      // Або додайте в api.js getMyOrders
      // Тут для простоти: створимо getMyOrders в api.js
    } catch (err) {
      setOrdersMessage("Failed to fetch orders.");
    }
  };

  useEffect(() => {
    // fetch orders
    getMyOrders();
  }, []);

  const getMyOrders = async () => {
    try {
      const res = await fetch(`${window.location.origin}/api/orders/my`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      const data = await res.json();
      // Припустимо data - це pageable content
      const content = data.content || data;
      setOrders(content);
    } catch {
      setOrdersMessage("Failed to load orders.");
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      const res = await fetch(
        `${window.location.origin}/api/orders/${orderId}/cancel`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );
      if (!res.ok) {
        throw new Error("Failed to cancel order");
      }
      setOrdersMessage("Order cancelled.");
      getMyOrders();
    } catch (err) {
      setOrdersMessage("Cannot cancel this order.");
    }
  };

  // Зміна пароля
  const [passForm, setPassForm] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [passMessage, setPassMessage] = useState("");

  const handleChangePassword = async () => {
    if (passForm.newPassword.length < 6) {
      setPassMessage("New password must be at least 6 characters.");
      return;
    }
    try {
      const res = await changePassApi(passForm);
      setPassMessage("Password changed successfully!");
      setPassForm({ currentPassword: "", newPassword: "" });
    } catch (err) {
      setPassMessage(err.response?.data?.error || "Failed to change password.");
    }
  };

  return (
    <div>
      <Typography variant="h4" marginBottom={2}>
        User Profile
      </Typography>
      <Tabs
        value={tab}
        onChange={(e, v) => setTab(v)}
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab label="Profile Info" />
        <Tab label="My Orders" />
        <Tab label="Change Password" />
      </Tabs>
      {tab === 0 && (
        <Box marginTop={2}>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={profileData.name}
            onChange={(e) =>
              setProfileData({ ...profileData, name: e.target.value })
            }
          />
          <TextField
            label="Phone"
            fullWidth
            margin="normal"
            value={profileData.phone}
            onChange={(e) =>
              setProfileData({ ...profileData, phone: e.target.value })
            }
          />
          <TextField
            label="Address"
            fullWidth
            margin="normal"
            value={profileData.address}
            onChange={(e) =>
              setProfileData({ ...profileData, address: e.target.value })
            }
          />
          <Button
            variant="contained"
            onClick={handleProfileSave}
            sx={{ marginTop: 2 }}
          >
            Save
          </Button>
          {profileMessage && <p>{profileMessage}</p>}
        </Box>
      )}
      {tab === 1 && (
        <Box marginTop={2}>
          <Typography variant="h5" marginBottom={2}>
            My Orders
          </Typography>
          {ordersMessage && <p>{ordersMessage}</p>}
          {orders.length === 0 && <p>No orders found.</p>}
          {orders.map((order) => (
            <Box
              key={order.id}
              marginBottom={2}
              padding={2}
              bgcolor="#fff"
              borderRadius="8px"
              boxShadow={1}
            >
              <Typography>Order #{order.id}</Typography>
              <Typography>Status: {order.status}</Typography>
              <Typography>Total: ${order.totalPrice.toFixed(2)}</Typography>
              {order.status === "NEW" && (
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => cancelOrder(order.id)}
                  sx={{ marginTop: 1 }}
                >
                  Cancel order
                </Button>
              )}
            </Box>
          ))}
        </Box>
      )}
      {tab === 2 && (
        <Box marginTop={2}>
          <Typography variant="h5" marginBottom={2}>
            Change Password
          </Typography>
          {passMessage && <p>{passMessage}</p>}
          <TextField
            label="Current Password"
            type="password"
            fullWidth
            margin="normal"
            value={passForm.currentPassword}
            onChange={(e) =>
              setPassForm({ ...passForm, currentPassword: e.target.value })
            }
          />
          <TextField
            label="New Password"
            type="password"
            fullWidth
            margin="normal"
            value={passForm.newPassword}
            onChange={(e) =>
              setPassForm({ ...passForm, newPassword: e.target.value })
            }
          />
          <Button
            variant="contained"
            sx={{ marginTop: 2 }}
            onClick={handleChangePassword}
          >
            Change Password
          </Button>
        </Box>
      )}
    </div>
  );
};

export default UserPage;
