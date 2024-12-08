// src/pages/HomePage.js
import React, { useEffect, useState } from "react";
import { getPizzas } from "../services/api";
import PizzaCard from "../components/PizzaCard";
import PizzaModal from "../components/PizzaModal";
import { TextField, Button, Box } from "@mui/material";
import Pagination from "@mui/material/Pagination";

const HomePage = () => {
  const [pizzas, setPizzas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPizza, setSelectedPizza] = useState(null);
  const [sortBy, setSortBy] = useState("name");
  const [sortDir, setSortDir] = useState("asc");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPizzas = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        search: searchTerm,
        page: page - 1,
        sizePage: 6,
        sortBy,
        sortDir,
      };
      const data = await getPizzas(params);
      const content = data.content || data;
      setPizzas(content);
      setTotalPages(data.totalPages || 3); // У вас 17 піц, при size=6 totalPages=3
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch pizzas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPizzas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, sortBy, sortDir, page]);

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
      <h1 style={{ marginBottom: "20px" }}>All Pizzas</h1>
      <Box display="flex" alignItems="center" gap={2} marginBottom={2}>
        <TextField
          variant="outlined"
          label="Search pizza"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
        />
        <Button variant="contained" onClick={() => handleSort("name")}>
          Sort by Name {sortBy === "name" && (sortDir === "asc" ? "↑" : "↓")}
        </Button>
        <Button variant="contained" onClick={() => handleSort("basePrice")}>
          Sort by Price{" "}
          {sortBy === "basePrice" && (sortDir === "asc" ? "↑" : "↓")}
        </Button>
      </Box>
      {loading && <p>Loading pizzas...</p>}
      {error && <p className="error">{error}</p>}
      <div className="pizza-list">
        {pizzas.map((pizza) => (
          <PizzaCard key={pizza.id} pizza={pizza} onSelect={setSelectedPizza} />
        ))}
      </div>
      <Box marginTop={2} display="flex" justifyContent="center">
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
        />
      </Box>
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
