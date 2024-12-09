// src/components/Header.js
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { AuthContext } from "../contexts/AuthContext";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Badge,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  ShoppingCart as CartIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { toast } from "react-toastify";

const Header = () => {
  const { cartItems } = useContext(CartContext);
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleLogout = () => {
    logout();
    toast.info("You have been logged out");
    navigate("/");
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: theme.palette.primary.main }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            color: "#fff",
            textDecoration: "none",
            flexGrow: 1,
            fontWeight: "bold",
          }}
        >
          Pizza Shop
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          {!isMobile && (
            <Button component={Link} to="/location" sx={{ color: "#fff" }}>
              Location
            </Button>
          )}

          <IconButton component={Link} to="/cart" sx={{ color: "#fff", ml: 1 }}>
            <Badge badgeContent={cartItems.length} color="error">
              <CartIcon />
            </Badge>
          </IconButton>

          {auth.user ? (
            <>
              <Button
                component={Link}
                to="/profile"
                sx={{ color: "#fff", ml: 1 }}
              >
                {auth.user.name}
              </Button>
              <Button onClick={handleLogout} sx={{ color: "#fff", ml: 1 }}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                component={Link}
                to="/login"
                sx={{ color: "#fff", ml: 1 }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/register"
                sx={{ color: "#fff", ml: 1 }}
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
