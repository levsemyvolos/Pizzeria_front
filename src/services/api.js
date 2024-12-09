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
    const originalRequest = error.config;
    const isAuthRequest =
      originalRequest.url.includes("/api/auth/login") ||
      originalRequest.url.includes("/api/auth/register");

    if (error.response?.status === 401 && !isAuthRequest) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Auth
export const login = async (email, password) => {
  try {
    const response = await api.post("/api/auth/login", { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const register = async (data) => {
  const response = await api.post("/api/auth/register", data);
  return response.data;
};

export const getProfile = async () => {
  try {
    const response = await api.get("/api/users/me");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async (data) => {
  const response = await api.put("/api/users/me", data);
  return response.data;
};

export const changePassword = async (data) => {
  const response = await api.put("/api/users/me/password", data);
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

export const getMyOrders = async () => {
  const response = await api.get("/api/orders/my");
  return response.data;
};

export const cancelOrder = async (orderId) => {
  const response = await api.put(`/api/orders/${orderId}/cancel`);
  return response.data;
};

export default api;
