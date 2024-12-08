// src/pages/CartPage.js
import React from "react";
import Cart from "../components/Cart";

const CartPage = ({ cartItems, onUpdateCartItem, onCheckout }) => {
  return (
    <div className="cart-page">
      <Cart
        items={cartItems}
        onUpdateQuantity={(idx, qty) => onUpdateCartItem(idx, qty)}
        onCheckout={onCheckout}
      />
    </div>
  );
};

export default CartPage;
