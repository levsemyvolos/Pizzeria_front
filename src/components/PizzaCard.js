// src/components/PizzaCard.js
import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";

const PizzaCard = ({ pizza, onSelect }) => {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 4,
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={pizza.imageUrl}
        alt={pizza.name}
        sx={{ objectFit: "cover" }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          {pizza.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {pizza.description}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" color="primary">
            From ${pizza.basePrice.toFixed(2)}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onSelect(pizza)}
            sx={{
              textTransform: "none",
              borderRadius: 2,
            }}
          >
            Select
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PizzaCard;
