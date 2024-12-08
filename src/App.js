// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import LocationPage from "./pages/LocationPage";
import Header from "./components/Header";
import "./App.css";

function App() {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (item) => {
    // If pizza with same size/dough already in cart, increment quantity
    const index = cartItems.findIndex(
      (ci) =>
        ci.pizzaId === item.pizzaId &&
        ci.selectedSize === item.selectedSize &&
        ci.selectedDough === item.selectedDough
    );
    if (index >= 0) {
      const newCart = [...cartItems];
      newCart[index].quantity += 1;
      setCartItems(newCart);
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const handleUpdateCartItem = (idx, qty) => {
    const newCart = [...cartItems];
    if (qty <= 0) {
      newCart.splice(idx, 1);
    } else {
      newCart[idx].quantity = qty;
    }
    setCartItems(newCart);
  };

  const handleCheckout = () => {
    // Implement order creation via API
    alert("Proceeding to checkout...");
  };

  return (
    <Router>
      <Header cartCount={cartItems.length} />
      <nav>
        <Link to="/">Home</Link> | <Link to="/cart">Cart</Link> |{" "}
        <Link to="/location">Location</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage onAddToCart={handleAddToCart} />} />
        <Route
          path="/cart"
          element={
            <CartPage
              cartItems={cartItems}
              onUpdateCartItem={handleUpdateCartItem}
              onCheckout={handleCheckout}
            />
          }
        />
        <Route path="/location" element={<LocationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
