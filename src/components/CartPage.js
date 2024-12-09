import React from "react";
import Cart from "../components/Cart";
import { Box, Typography } from "@mui/material";

const CartPage = () => {
  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: 2 }}>
      <Typography variant="h4" gutterBottom align="center">
        Shopping Cart
      </Typography>
      <Cart />
    </Box>
  );
};

export default CartPage;
