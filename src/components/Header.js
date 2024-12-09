// src/components/Header.js
import React, { useContext, useState } from "react";
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
  Menu,
  MenuItem,
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

  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);

  const handleLogout = () => {
    logout();
    toast.info("You have been logged out");
    navigate("/");
  };

  const handleMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
        borderBottom: "1px solid",
        borderColor: theme.palette.primary.main,
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            color: "#000",
            textDecoration: "none",
            flexGrow: 1,
            fontWeight: "bold",
          }}
        >
          Pizza Shop
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              color="primary"
              component={Link}
              to="/cart"
              sx={{ mr: 1 }}
            >
              <Badge badgeContent={cartItems.length} color="error">
                <CartIcon />
              </Badge>
            </IconButton>
            <IconButton edge="end" color="primary" onClick={handleMenuOpen}>
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={mobileMenuAnchor}
              open={Boolean(mobileMenuAnchor)}
              onClose={handleMenuClose}
            >
              <MenuItem
                component={Link}
                to="/location"
                onClick={handleMenuClose}
              >
                Location
              </MenuItem>
              {auth.user
                ? [
                    <MenuItem
                      key="profile"
                      component={Link}
                      to="/profile"
                      onClick={handleMenuClose}
                    >
                      {auth.user.name}
                    </MenuItem>,
                    <MenuItem
                      key="logout"
                      onClick={() => {
                        handleMenuClose();
                        handleLogout();
                      }}
                    >
                      Logout
                    </MenuItem>,
                  ]
                : [
                    <MenuItem
                      key="login"
                      component={Link}
                      to="/login"
                      onClick={handleMenuClose}
                    >
                      Login
                    </MenuItem>,
                    <MenuItem
                      key="register"
                      component={Link}
                      to="/register"
                      onClick={handleMenuClose}
                    >
                      Register
                    </MenuItem>,
                  ]}
            </Menu>
          </>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              component={Link}
              to="/location"
              sx={{
                color: "#000",
                "&:hover": {
                  backgroundColor: "rgba(255, 107, 0, 0.08)",
                },
              }}
            >
              Location
            </Button>
            <IconButton
              component={Link}
              to="/cart"
              color="primary"
              sx={{ ml: 1 }}
            >
              <Badge badgeContent={cartItems.length} color="error">
                <CartIcon />
              </Badge>
            </IconButton>
            {auth.user ? (
              <>
                <Button
                  component={Link}
                  to="/profile"
                  sx={{
                    color: "#000",
                    ml: 1,
                    "&:hover": {
                      backgroundColor: "rgba(255, 107, 0, 0.08)",
                    },
                  }}
                >
                  {auth.user.name}
                </Button>
                <Button
                  onClick={handleLogout}
                  sx={{
                    color: "#000",
                    ml: 1,
                    "&:hover": {
                      backgroundColor: "rgba(255, 107, 0, 0.08)",
                    },
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  component={Link}
                  to="/login"
                  sx={{
                    color: "#000",
                    ml: 1,
                    "&:hover": {
                      backgroundColor: "rgba(255, 107, 0, 0.08)",
                    },
                  }}
                >
                  Login
                </Button>
                <Button
                  component={Link}
                  to="/register"
                  sx={{
                    color: "#000",
                    ml: 1,
                    "&:hover": {
                      backgroundColor: "rgba(255, 107, 0, 0.08)",
                    },
                  }}
                >
                  Register
                </Button>
              </>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
