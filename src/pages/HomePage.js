// src/pages/HomePage.js
import React, { useEffect, useState } from "react";
import { getPizzas } from "../services/api";
import PizzaCard from "../components/PizzaCard";
import PizzaModal from "../components/PizzaModal";

const HomePage = () => {
  const [pizzas, setPizzas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPizza, setSelectedPizza] = useState(null);
  const [sortBy, setSortBy] = useState("name");
  const [sortDir, setSortDir] = useState("asc");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPizzas = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        search: searchTerm,
        // Без пагинации для упрощения
        sortBy,
        sortDir,
      };
      const data = await getPizzas(params);
      // Если бекенд возвращает сразу массив без пагинации:
      const content = data.content || data;
      setPizzas(content);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch pizzas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPizzas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, sortBy, sortDir]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDir("asc");
    }
  };

  return (
    <div className="home-page">
      <h1>All Pizzas</h1>
      <div className="controls">
        <input
          type="text"
          placeholder="Search pizza..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <div className="sort-options">
          <button onClick={() => handleSort("name")}>
            Sort by Name {sortBy === "name" && (sortDir === "asc" ? "↑" : "↓")}
          </button>
          <button onClick={() => handleSort("basePrice")}>
            Sort by Price{" "}
            {sortBy === "basePrice" && (sortDir === "asc" ? "↑" : "↓")}
          </button>
        </div>
      </div>
      {loading && <p>Loading pizzas...</p>}
      {error && <p className="error">{error}</p>}
      <div className="pizza-list">
        {pizzas.map((pizza) => (
          <PizzaCard key={pizza.id} pizza={pizza} onSelect={setSelectedPizza} />
        ))}
      </div>
      {selectedPizza && (
        <PizzaModal
          pizza={selectedPizza}
          onClose={() => setSelectedPizza(null)}
        />
      )}
    </div>
  );
};

export default HomePage;
