// src/components/Cart.js
import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  IconButton,
  Divider,
} from "@mui/material";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import { toast } from "react-toastify";

const Cart = () => {
  const { cartItems, updateCartItem, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    navigate("/checkout");
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Typography>No items in cart.</Typography>
      ) : (
        cartItems.map((item, idx) => (
          <Card key={idx} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">{item.name}</Typography>
              <Typography>Size: {item.selectedSize}</Typography>
              <Typography>Dough: {item.selectedDough}</Typography>
              {item.extras?.length > 0 && (
                <Typography>
                  Extras: {item.extras.map((e) => e.name).join(", ")}
                </Typography>
              )}
              <Typography>Price: ${item.price.toFixed(2)}</Typography>

              <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                <IconButton
                  onClick={() => updateCartItem(idx, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
                <IconButton
                  onClick={() => updateCartItem(idx, item.quantity + 1)}
                >
                  <AddIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        ))
      )}

      {cartItems.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
          <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCheckout}
              fullWidth
            >
              Proceed to Checkout
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={clearCart}
              fullWidth
            >
              Clear Cart
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Cart;
