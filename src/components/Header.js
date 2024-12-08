// src/components/Header.js
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { AuthContext } from "../contexts/AuthContext";

const Header = () => {
  const { cartItems } = useContext(CartContext);
  const { auth, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">My Pizzeria</Link>
      </div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/location">Location</Link>
        <Link to="/cart">Cart ({cartItems.length})</Link>
        {auth.user ? (
          <>
            <span style={{ marginLeft: "15px" }}>
              Welcome, {auth.user.name}
            </span>
            <button onClick={handleLogout} style={{ marginLeft: "15px" }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ marginLeft: "15px" }}>
              Login
            </Link>
            <Link to="/register" style={{ marginLeft: "15px" }}>
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
