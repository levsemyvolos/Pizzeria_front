// src/pages/HomePage.js
import React, { useEffect, useState } from "react";
import { getPizzas } from "../services/api";
import PizzaCard from "../components/PizzaCard";
import PizzaModal from "../components/PizzaModal";

const HomePage = ({ onAddToCart }) => {
  const [pizzas, setPizzas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPizza, setSelectedPizza] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPizzas({ search: searchTerm });
      // data expected to have content if pagination implemented
      // if no pagination, just data array
      // Adjust based on API response
      const content = data.content || data;
      setPizzas(content);
    };
    fetchData();
  }, [searchTerm]);

  return (
    <div className="home-page">
      <h1>All Pizzas</h1>
      <div className="pizza-list">
        {pizzas.map((pizza) => (
          <PizzaCard key={pizza.id} pizza={pizza} onSelect={setSelectedPizza} />
        ))}
      </div>

      {selectedPizza && (
        <PizzaModal
          pizza={selectedPizza}
          onClose={() => setSelectedPizza(null)}
          onAddToCart={onAddToCart}
        />
      )}
    </div>
  );
};

export default HomePage;
