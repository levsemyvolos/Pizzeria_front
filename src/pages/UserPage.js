import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Divider,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Pagination,
} from "@mui/material";
import { Edit as EditIcon, Cancel as CancelIcon } from "@mui/icons-material";
import { format } from "date-fns";
import {
  getProfile,
  updateProfile,
  getMyOrders,
  cancelOrder,
  changePassword,
} from "../services/api";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import {
  profileValidationSchema,
  passwordChangeValidationSchema,
} from "../validation/validation";

const UserPage = () => {
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 2;

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const [userData, orderData] = await Promise.all([
        getProfile(),
        getMyOrders(),
      ]);
      setUser(userData);
      setEditedUser(userData);
      setOrders(orderData);
    } catch (err) {
      toast.error("Failed to load profile data");
    }
  };

  const profileFormik = useFormik({
    initialValues: {
      name: user.name || "",
      phone: user.phone || "",
      address: user.address || "",
    },
    validationSchema: profileValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        await updateProfile(values);
        setUser({ ...user, ...values });
        setEditMode(false);
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error("Failed to update profile");
      }
    },
  });

  const passwordFormik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: passwordChangeValidationSchema,
    onSubmit: async (values) => {
      try {
        await changePassword({
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        });
        setOpenPasswordDialog(false);
        passwordFormik.resetForm();
        toast.success("Password changed successfully");
      } catch (err) {
        const errorMessage =
          err.response?.data?.error || "Failed to change password";
        passwordFormik.setFieldError("oldPassword", errorMessage);
      }
    },
  });

  const handleCancelOrder = async (orderId) => {
    try {
      await cancelOrder(orderId);
      setOrders(
        orders.map((order) =>
          order.orderId === orderId ? { ...order, status: "CANCELLED" } : order
        )
      );
      toast.success("Order cancelled successfully");
    } catch (err) {
      toast.error("Failed to cancel order");
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      NEW: "primary",
      CANCELLED: "error",
      DELIVERED: "success",
      IN_PROGRESS: "warning",
    };
    return colors[status] || "default";
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Profile Section */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              display: "flex",
              flexDirection: "column",
              height: "fit-content",
            }}
          >
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
            >
              <Typography variant="h5" component="h2">
                Profile Information
              </Typography>
              {!editMode && (
                <Button
                  startIcon={<EditIcon />}
                  onClick={() => setEditMode(true)}
                >
                  Edit
                </Button>
              )}
            </Box>

            {editMode ? (
              <Box component="form" onSubmit={profileFormik.handleSubmit}>
                <TextField
                  label="Name"
                  name="name"
                  value={profileFormik.values.name}
                  onChange={profileFormik.handleChange}
                  error={
                    profileFormik.touched.name &&
                    Boolean(profileFormik.errors.name)
                  }
                  helperText={
                    profileFormik.touched.name && profileFormik.errors.name
                  }
                  fullWidth
                  size="small"
                  margin="dense"
                />
                <TextField
                  label="Email"
                  value={editedUser.email || ""}
                  disabled
                  fullWidth
                  size="small"
                  margin="dense"
                />
                <TextField
                  label="Phone"
                  name="phone"
                  value={profileFormik.values.phone}
                  onChange={profileFormik.handleChange}
                  error={
                    profileFormik.touched.phone &&
                    Boolean(profileFormik.errors.phone)
                  }
                  helperText={
                    profileFormik.touched.phone && profileFormik.errors.phone
                  }
                  fullWidth
                  size="small"
                  margin="dense"
                />
                <TextField
                  label="Address"
                  name="address"
                  value={profileFormik.values.address}
                  onChange={profileFormik.handleChange}
                  error={
                    profileFormik.touched.address &&
                    Boolean(profileFormik.errors.address)
                  }
                  helperText={
                    profileFormik.touched.address &&
                    profileFormik.errors.address
                  }
                  fullWidth
                  multiline
                  rows={2}
                  size="small"
                  margin="dense"
                />
                <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                  <Button
                    variant="contained"
                    onClick={profileFormik.handleSubmit}
                    fullWidth
                  >
                    Save Changes
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setEditMode(false);
                      setEditedUser(user);
                    }}
                    fullWidth
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Typography>
                  <strong>Name:</strong> {user.name}
                </Typography>
                <Typography>
                  <strong>Email:</strong> {user.email}
                </Typography>
                <Typography>
                  <strong>Phone:</strong> {user.phone}
                </Typography>
                <Typography>
                  <strong>Address:</strong> {user.address}
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => setOpenPasswordDialog(true)}
                  sx={{ mt: 2 }}
                >
                  Change Password
                </Button>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Orders Section */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              maxHeight: "calc(100vh - 250px)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h5"
              component="h2"
              sx={{
                mb: 3,
                position: "sticky",
                top: 0,
                bgcolor: "background.paper",
                zIndex: 1,
              }}
            >
              Order History
            </Typography>
            <Box
              sx={{
                flex: 1,
                overflowY: "auto",
                minHeight: 0,
              }}
            >
              {orders.length === 0 ? (
                <Typography color="text.secondary">No orders yet</Typography>
              ) : (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {currentOrders.map((order) => (
                    <Card key={order.orderId} variant="outlined">
                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb: 2,
                          }}
                        >
                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontWeight: 500,
                              color: "primary.main",
                              fontSize: "0.95rem",
                            }}
                          >
                            {format(
                              new Date(order.orderDate),
                              "d MMMM yyyy, HH:mm"
                            )}
                          </Typography>
                          <Chip
                            label={order.status}
                            color={getStatusColor(order.status)}
                            size="small"
                          />
                        </Box>
                        <Typography color="text.secondary" gutterBottom>
                          {order.items.map((item, index) => (
                            <Box key={index} sx={{ my: 1 }}>
                              <Typography>
                                {item.quantity}x Pizza #{item.pizzaId} -{" "}
                                {item.selectedSize}, {item.selectedDough} dough
                              </Typography>
                              <Typography color="text.secondary">
                                ${item.unitPrice} each (Total: $
                                {item.totalItemPrice})
                              </Typography>
                            </Box>
                          ))}
                        </Typography>
                        <Divider sx={{ my: 1 }} />
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mt: 2,
                          }}
                        >
                          <Typography variant="h6">
                            Total: ${order.totalPrice}
                          </Typography>
                          {order.status === "NEW" && (
                            <Button
                              startIcon={<CancelIcon />}
                              color="error"
                              onClick={() => handleCancelOrder(order.orderId)}
                            >
                              Cancel Order
                            </Button>
                          )}
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              )}
            </Box>
            {orders.length > 0 && (
              <Box
                sx={{
                  pt: 2,
                  mt: 2,
                  borderTop: 1,
                  borderColor: "divider",
                  backgroundColor: "background.paper",
                }}
              >
                <Pagination
                  count={Math.ceil(orders.length / ordersPerPage)}
                  page={currentPage}
                  onChange={(e, page) => setCurrentPage(page)}
                  color="primary"
                />
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Password Change Dialog */}
      <Dialog
        open={openPasswordDialog}
        onClose={() => {
          setOpenPasswordDialog(false);
          passwordFormik.resetForm();
        }}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Box component="form" onSubmit={passwordFormik.handleSubmit}>
            <TextField
              size="small"
              margin="dense"
              label="Current Password"
              type="password"
              name="oldPassword"
              value={passwordFormik.values.oldPassword}
              onChange={passwordFormik.handleChange}
              error={
                passwordFormik.touched.oldPassword &&
                Boolean(passwordFormik.errors.oldPassword)
              }
              helperText={
                passwordFormik.touched.oldPassword &&
                passwordFormik.errors.oldPassword
              }
              fullWidth
            />
            <TextField
              size="small"
              margin="dense"
              label="New Password"
              type="password"
              name="newPassword"
              value={passwordFormik.values.newPassword}
              onChange={passwordFormik.handleChange}
              error={
                passwordFormik.touched.newPassword &&
                Boolean(passwordFormik.errors.newPassword)
              }
              helperText={
                passwordFormik.touched.newPassword &&
                passwordFormik.errors.newPassword
              }
              fullWidth
            />
            <TextField
              size="small"
              margin="dense"
              label="Confirm New Password"
              type="password"
              name="confirmPassword"
              value={passwordFormik.values.confirmPassword}
              onChange={passwordFormik.handleChange}
              error={
                passwordFormik.touched.confirmPassword &&
                Boolean(passwordFormik.errors.confirmPassword)
              }
              helperText={
                passwordFormik.touched.confirmPassword &&
                passwordFormik.errors.confirmPassword
              }
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenPasswordDialog(false);
              passwordFormik.resetForm();
            }}
          >
            Cancel
          </Button>
          <Button onClick={passwordFormik.handleSubmit} variant="contained">
            Change Password
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserPage;
