// src/services/api.js
import axios from "axios";

const API_URL = "http://localhost:8080"; // Adjust to your backend URL

// Set up interceptor if needed for auth token
// example: axios.interceptors.request.use((config) => { ... });

export const getPizzas = async (params = {}) => {
  // params: { search, size, dough, page, sizePage, sortBy, sortDir }
  const response = await axios.get(`${API_URL}/api/pizzas`, { params });
  return response.data;
};

export const getPizzaById = async (id) => {
  const response = await axios.get(`${API_URL}/api/pizzas/${id}`);
  return response.data;
};

// Auth
export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/api/auth/login`, {
    email,
    password,
  });
  return response.data;
};

export const registerUser = async (data) => {
  const response = await axios.post(`${API_URL}/api/auth/register`, data);
  return response.data;
};

// Orders
export const createOrder = async (orderData, token) => {
  const response = await axios.post(`${API_URL}/api/orders`, orderData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// ... Add more as needed
