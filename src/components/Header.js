// src/components/Header.js
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { AuthContext } from "../contexts/AuthContext";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

const Header = () => {
  const { cartItems } = useContext(CartContext);
  const { auth, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "orange" }}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ color: "#fff", textDecoration: "none", marginRight: "auto" }}
        >
          My Pizzeria
        </Typography>

        <Box>
          <Button component={Link} to="/location" sx={{ color: "#fff" }}>
            Location
          </Button>
          <Button component={Link} to="/cart" sx={{ color: "#fff" }}>
            Cart ({cartItems.length})
          </Button>
          {auth.user ? (
            <>
              <Typography variant="body1" sx={{ color: "#fff", marginLeft: 2 }}>
                Welcome, {auth.user.name}
              </Typography>
              <Button
                component={Link}
                to="/profile"
                sx={{ color: "#fff", marginLeft: 2 }}
              >
                Profile
              </Button>
              <Button
                onClick={handleLogout}
                sx={{ color: "#fff", marginLeft: 2 }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                component={Link}
                to="/login"
                sx={{ color: "#fff", marginLeft: 2 }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/register"
                sx={{ color: "#fff", marginLeft: 2 }}
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
