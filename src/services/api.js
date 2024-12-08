// src/services/api.js
import axios from "axios";

const API_URL = "http://localhost:8080"; // Ваш бэк на 8080

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

// Auth
export const login = async (email, password) => {
  const response = await api.post("/api/auth/login", { email, password });
  return response.data;
};

export const register = async (data) => {
  const response = await api.post("/api/auth/register", data);
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get("/api/users/me");
  return response.data;
};

// Pizzas
export const getPizzas = async (params = {}) => {
  const response = await api.get("/api/pizzas", { params });
  return response.data;
};

// Orders
export const createOrder = async (orderData) => {
  const response = await api.post("/api/orders", orderData);
  return response.data;
};

export const updateProfile = async (data) => {
  const response = await api.put("/api/users/me", data);
  return response.data;
};

export const changePassword = async (data) => {
  const response = await api.put("/api/users/me/password", data);
  return response.data;
};

export default api;
