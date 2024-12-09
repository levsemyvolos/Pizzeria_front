// src/components/PizzaModal.js
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton,
  Divider,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { toast } from "react-toastify";

const PizzaModal = ({ pizza, onClose }) => {
  const { addToCart } = useContext(CartContext);
  const [selectedSize, setSelectedSize] = useState(pizza.availableSizes[0]);
  const [selectedDough, setSelectedDough] = useState(pizza.doughTypes[0]);

  const calculateTotalPrice = () => {
    let price = pizza.basePrice;
    // Здесь можно добавить логику расчета цены в зависимости от размера и типа теста
    return price;
  };

  const handleAddToCart = () => {
    addToCart({
      pizzaId: pizza.id,
      name: pizza.name,
      selectedSize,
      selectedDough,
      price: calculateTotalPrice(),
      quantity: 1,
    });
    toast.success("Pizza added to cart!");
    onClose();
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          overflow: "hidden",
        },
      }}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {pizza.name}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Box
          component="img"
          src={pizza.imageUrl}
          alt={pizza.name}
          sx={{
            width: "100%",
            height: 300,
            objectFit: "cover",
            borderRadius: 1,
            mb: 2,
          }}
        />

        <Typography variant="body1" sx={{ mb: 2 }}>
          {pizza.description}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" gutterBottom fontWeight="bold">
          Size
        </Typography>
        <RadioGroup
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
          row
        >
          {pizza.availableSizes.map((size) => (
            <FormControlLabel
              key={size}
              value={size}
              control={<Radio />}
              label={size}
            />
          ))}
        </RadioGroup>

        <Typography
          variant="subtitle1"
          gutterBottom
          fontWeight="bold"
          sx={{ mt: 2 }}
        >
          Dough
        </Typography>
        <RadioGroup
          value={selectedDough}
          onChange={(e) => setSelectedDough(e.target.value)}
          row
        >
          {pizza.doughTypes.map((dough) => (
            <FormControlLabel
              key={dough}
              value={dough}
              control={<Radio />}
              label={dough}
            />
          ))}
        </RadioGroup>
      </DialogContent>

      <DialogActions sx={{ p: 2, justifyContent: "space-between" }}>
        <Typography variant="subtitle1" color="primary" fontWeight="bold">
          ${calculateTotalPrice().toFixed(2)}
        </Typography>
        <Box>
          <Button onClick={onClose} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleAddToCart} color="primary">
            Add to Cart
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default PizzaModal;
