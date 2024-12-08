// src/components/Cart.js
import React from "react";

const Cart = ({ items, onUpdateQuantity, onCheckout }) => {
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {items.length === 0 && <p>No items in cart.</p>}
      {items.map((item, idx) => (
        <div key={idx} className="cart-item">
          <span>Pizza ID: {item.pizzaId}</span>
          <span>Size: {item.selectedSize}</span>
          <span>Dough: {item.selectedDough}</span>
          <span>Price: ${item.price.toFixed(2)}</span>
          <div>
            <button onClick={() => onUpdateQuantity(idx, item.quantity - 1)}>
              -
            </button>
            <span>{item.quantity}</span>
            <button onClick={() => onUpdateQuantity(idx, item.quantity + 1)}>
              +
            </button>
          </div>
        </div>
      ))}
      <p>Total: ${total.toFixed(2)}</p>
      {items.length > 0 && <button onClick={onCheckout}>Checkout</button>}
    </div>
  );
};

export default Cart;
