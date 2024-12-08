// src/components/PizzaModal.js
import React, { useState, useContext } from "react";
import { CartContext } from "../contexts/CartContext";

const PizzaModal = ({ pizza, onClose }) => {
  const { addToCart } = useContext(CartContext);
  const [selectedSize, setSelectedSize] = useState(pizza.availableSizes[0]);
  const [selectedDough, setSelectedDough] = useState(pizza.doughTypes[0]);

  const calculateTotalPrice = () => {
    // Простая логика: цена базовая
    return pizza.basePrice;
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
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <img
          src={pizza.imageUrl}
          alt={pizza.name}
          style={{ width: "100%", height: "auto" }}
        />
        <h2>{pizza.name}</h2>
        <p>{pizza.description}</p>

        <div className="options">
          <div className="option-group">
            <h4>Size</h4>
            {pizza.availableSizes.map((size) => (
              <button
                key={size}
                className={size === selectedSize ? "active" : ""}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>

          <div className="option-group">
            <h4>Dough</h4>
            {pizza.doughTypes.map((dough) => (
              <button
                key={dough}
                className={dough === selectedDough ? "active" : ""}
                onClick={() => setSelectedDough(dough)}
              >
                {dough}
              </button>
            ))}
          </div>
        </div>

        <div className="footer">
          <p>Total: ${calculateTotalPrice().toFixed(2)}</p>
          <button onClick={handleAddToCart}>Add to Cart</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default PizzaModal;
