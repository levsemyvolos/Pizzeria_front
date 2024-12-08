// src/components/PizzaCard.js
import React from "react";

const PizzaCard = ({ pizza, onSelect }) => {
  return (
    <div className="pizza-card">
      <img src={pizza.imageUrl} alt={pizza.name} />
      <h3>{pizza.name}</h3>
      <p>{pizza.description}</p>
      <p>From ${pizza.basePrice.toFixed(2)}</p>
      <button onClick={() => onSelect(pizza)}>Select</button>
    </div>
  );
};

export default PizzaCard;
