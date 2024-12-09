// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import { getProfile } from "../services/api";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem("token") || null,
    user: JSON.parse(localStorage.getItem("user")) || null,
  });

  const login = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setAuth({ token, user });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuth({ token: null, user: null });
  };

  useEffect(() => {
    const fetchProfile = async () => {
      if (auth.token) {
        try {
          const user = await getProfile();
          setAuth({ token: auth.token, user });
        } catch (err) {
          console.error("Failed to fetch profile:", err);
          logout();
        }
      }
    };
    fetchProfile();
  }, [auth.token]);

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
