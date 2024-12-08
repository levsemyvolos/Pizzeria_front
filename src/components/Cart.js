// src/components/Cart.js
import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, updateCartItem, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    navigate("/checkout"); // Создайте страницу оформления заказа
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartItems.length === 0 && <p>No items in cart.</p>}
      {cartItems.map((item, idx) => (
        <div key={idx} className="cart-item">
          <h3>{item.name}</h3>
          <p>Size: {item.selectedSize}</p>
          <p>Dough: {item.selectedDough}</p>
          {item.extras.length > 0 && (
            <p>Extras: {item.extras.map((e) => e.name).join(", ")}</p>
          )}
          <p>Price: ${item.price.toFixed(2)}</p>
          <div className="quantity-control">
            <button onClick={() => updateCartItem(idx, item.quantity - 1)}>
              -
            </button>
            <span>{item.quantity}</span>
            <button onClick={() => updateCartItem(idx, item.quantity + 1)}>
              +
            </button>
          </div>
        </div>
      ))}
      {cartItems.length > 0 && (
        <>
          <p>Total: ${total.toFixed(2)}</p>
          <button onClick={handleCheckout}>Proceed to Checkout</button>
          <button onClick={clearCart}>Clear Cart</button>
        </>
      )}
    </div>
  );
};

export default Cart;
