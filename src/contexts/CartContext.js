// src/contexts/CartContext.js
import React, { createContext, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    const index = cartItems.findIndex(
      (ci) =>
        ci.pizzaId === item.pizzaId &&
        ci.selectedSize === item.selectedSize &&
        ci.selectedDough === item.selectedDough
    );
    if (index >= 0) {
      const newCart = [...cartItems];
      newCart[index].quantity += item.quantity;
      setCartItems(newCart);
    } else {
      setCartItems([...cartItems, item]);
    }
  };

  const updateCartItem = (index, quantity) => {
    const newCart = [...cartItems];
    if (quantity <= 0) {
      newCart.splice(index, 1);
    } else {
      newCart[index].quantity = quantity;
    }
    setCartItems(newCart);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateCartItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
