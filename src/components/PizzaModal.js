// src/components/PizzaModal.js
import React, { useState } from "react";

const PizzaModal = ({ pizza, onClose, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState(pizza.availableSizes[0]);
  const [selectedDough, setSelectedDough] = useState(pizza.doughTypes[0]);
  const [extras, setExtras] = useState([]); // If you have extra toppings, define them or fetch them

  const basePrice = pizza.basePrice; // can adjust based on size/dough if needed
  const extrasPrice = extras.length * 1.5; // example extra charge
  const totalPrice = basePrice + extrasPrice;

  const handleAddToCart = () => {
    onAddToCart({
      pizzaId: pizza.id,
      quantity: 1,
      selectedSize,
      selectedDough,
      price: totalPrice,
    });
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <img src={pizza.imageUrl} alt={pizza.name} />
        <h2>{pizza.name}</h2>
        <p>{pizza.description}</p>

        <div className="options">
          <div>
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

          <div>
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

          {/* Extras (example) */}
          <div>
            <h4>Extras</h4>
            {/* In a real app, you'd fetch these from API or define statically */}
            {["Extra cheese", "Bacon", "Mushrooms"].map((extra) => (
              <label key={extra}>
                <input
                  type="checkbox"
                  checked={extras.includes(extra)}
                  onChange={() => {
                    if (extras.includes(extra)) {
                      setExtras(extras.filter((e) => e !== extra));
                    } else {
                      setExtras([...extras, extra]);
                    }
                  }}
                />
                {extra} (+$1.50)
              </label>
            ))}
          </div>
        </div>

        <div className="footer">
          <p>Total: ${totalPrice.toFixed(2)}</p>
          <button onClick={handleAddToCart}>Add to Cart</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default PizzaModal;
