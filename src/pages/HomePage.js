// src/pages/HomePage.js
import React, { useEffect, useState, useCallback } from "react";
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
  Paper,
} from "@mui/material";
import {
  ArrowUpward as ArrowUpIcon,
  ArrowDownward as ArrowDownIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import { toast } from "react-toastify";

const HomePage = () => {
  const [pizzas, setPizzas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPizza, setSelectedPizza] = useState(null);
  const [sortBy, setSortBy] = useState("id");
  const [sortDir, setSortDir] = useState("asc");
  const [userHasSorted, setUserHasSorted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPizzas = useCallback(async () => {
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
  }, [searchTerm, sortBy, sortDir, page]);

  useEffect(() => {
    fetchPizzas();
  }, [fetchPizzas]);

  const handleSort = (field) => {
    setUserHasSorted(true);
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
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "stretch", sm: "center" },
            justifyContent: "space-between",
            mb: 4,
            gap: 2,
          }}
        >
          <Typography variant="h4" component="h1">
            All Pizzas
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 1,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <TextField
              variant="outlined"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="small"
              sx={{ minWidth: 200 }}
              InputProps={{
                startAdornment: (
                  <SearchIcon sx={{ color: "text.secondary", mr: 1 }} />
                ),
              }}
            />
            <ButtonGroup size="small">
              <Button
                variant={
                  userHasSorted && sortBy === "name" ? "contained" : "outlined"
                }
                onClick={() => handleSort("name")}
                endIcon={
                  userHasSorted &&
                  sortBy === "name" &&
                  (sortDir === "asc" ? <ArrowUpIcon /> : <ArrowDownIcon />)
                }
              >
                Name
              </Button>
              <Button
                variant={
                  userHasSorted && sortBy === "basePrice"
                    ? "contained"
                    : "outlined"
                }
                onClick={() => handleSort("basePrice")}
                endIcon={
                  userHasSorted &&
                  sortBy === "basePrice" &&
                  (sortDir === "asc" ? <ArrowUpIcon /> : <ArrowDownIcon />)
                }
              >
                Price
              </Button>
            </ButtonGroup>
          </Box>
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {pizzas.map((pizza) => (
              <Grid item xs={12} sm={6} lg={4} key={pizza.id}>
                <PizzaCard pizza={pizza} onSelect={setSelectedPizza} />
              </Grid>
            ))}
          </Grid>
        )}

        {!loading && (
          <Box
            sx={{
              mt: 4,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Paper
              elevation={3}
              sx={{
                p: 1,
                borderRadius: 2,
                backgroundColor: "white",
              }}
            >
              <Pagination
                count={totalPages}
                page={page}
                onChange={(e, value) => setPage(value)}
                color="primary"
                size="large"
              />
            </Paper>
          </Box>
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
