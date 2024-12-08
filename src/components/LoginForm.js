// src/components/LoginForm.js
import React, { useState, useContext } from "react";
import { login, getProfile } from "../services/api";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography } from "@mui/material";

const LoginForm = () => {
  const { login: loginContext } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const validate = () => {
    if (!email.includes("@")) {
      return "Please enter a valid email address.";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const valError = validate();
    if (valError) {
      setError(valError);
      return;
    }

    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.token);
      const user = await getProfile();
      loginContext(data.token, user);
      navigate("/");
    } catch (err) {
      console.error("Login error:", err.response || err.message);
      setError(
        err.response?.data?.error ||
          "Incorrect email or password. Please try again."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <Typography variant="h5" textAlign="center" marginBottom={2}>
        Login
      </Typography>
      {error && (
        <Typography className="error" textAlign="center">
          {error}
        </Typography>
      )}
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <Button type="submit" variant="contained" fullWidth sx={{ marginTop: 2 }}>
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
