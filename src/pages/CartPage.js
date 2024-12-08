// src/pages/CartPage.js
import React, { useContext, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import { AuthContext } from "../contexts/AuthContext";
import { createOrder } from "../services/api";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cartItems, updateCartItem, clearCart } = useContext(CartContext);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (!auth.token) {
      navigate("/login");
      return;
    }

    const orderData = {
      items: cartItems.map((item) => ({
        pizzaId: item.pizzaId,
        quantity: item.quantity,
        selectedSize: item.selectedSize,
        selectedDough: item.selectedDough,
      })),
      customerName: auth.user.name,
      customerPhone: auth.user.phone,
      deliveryAddress: auth.user.address,
    };

    setLoading(true);
    setError(null);
    try {
      await createOrder(orderData);
      clearCart();
      alert("Order placed successfully!");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cartItems.length === 0 && <p>No items in cart.</p>}
      {cartItems.map((item, idx) => (
        <div key={idx} className="cart-item">
          <h3>{item.name}</h3>
          <p>Size: {item.selectedSize}</p>
          <p>Dough: {item.selectedDough}</p>
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
          {error && <p className="error">{error}</p>}
          <button onClick={handleCheckout} disabled={loading}>
            {loading ? "Processing..." : "Proceed to Checkout"}
          </button>
          <button onClick={clearCart} disabled={loading}>
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
};

export default CartPage;
