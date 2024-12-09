// src/pages/HomePage.js
import React, { useEffect, useState } from "react";
import { getPizzas } from "../services/api";
import PizzaCard from "../components/PizzaCard";
import PizzaModal from "../components/PizzaModal";
import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  Container,
  CircularProgress,
  ButtonGroup,
  Pagination,
} from "@mui/material";
import {
  Sort as SortIcon,
  ArrowUpward as ArrowUpIcon,
  ArrowDownward as ArrowDownIcon,
} from "@mui/icons-material";
import { toast } from "react-toastify";

const HomePage = () => {
  const [pizzas, setPizzas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPizza, setSelectedPizza] = useState(null);
  const [sortBy, setSortBy] = useState("name");
  const [sortDir, setSortDir] = useState("asc");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPizzas = async () => {
    setLoading(true);
    try {
      const params = {
        search: searchTerm,
        page: page - 1,
        sizePage: 6,
        sortBy,
        sortDir,
      };
      const data = await getPizzas(params);
      setPizzas(data.content || data);
      setTotalPages(data.totalPages || 3);
    } catch (err) {
      toast.error("Failed to load pizzas. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPizzas();
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
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          All Pizzas
        </Typography>

        <Box sx={{ mb: 4, display: "flex", gap: 2, flexWrap: "wrap" }}>
          <TextField
            variant="outlined"
            label="Search pizza"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
            sx={{ flexGrow: 1, maxWidth: 300 }}
          />
          <ButtonGroup variant="contained" size="small">
            <Button
              onClick={() => handleSort("name")}
              startIcon={
                sortBy === "name" &&
                (sortDir === "asc" ? <ArrowUpIcon /> : <ArrowDownIcon />)
              }
            >
              Sort by Name
            </Button>
            <Button
              onClick={() => handleSort("basePrice")}
              startIcon={
                sortBy === "basePrice" &&
                (sortDir === "asc" ? <ArrowUpIcon /> : <ArrowDownIcon />)
              }
            >
              Sort by Price
            </Button>
          </ButtonGroup>
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Grid container spacing={3}>
              {pizzas.map((pizza) => (
                <Grid item xs={12} sm={6} md={4} key={pizza.id}>
                  <PizzaCard pizza={pizza} onSelect={setSelectedPizza} />
                </Grid>
              ))}
            </Grid>

            <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(e, value) => setPage(value)}
                color="primary"
                size="large"
              />
            </Box>
          </>
        )}
      </Box>

      {selectedPizza && (
        <PizzaModal
          pizza={selectedPizza}
          onClose={() => setSelectedPizza(null)}
        />
      )}
    </Container>
  );
};

export default HomePage;
