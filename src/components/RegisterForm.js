// src/components/RegisterForm.js
import React, { useState } from "react";
import { register } from "../services/api";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography } from "@mui/material";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    address: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validate = () => {
    if (!form.name.trim()) return "Name cannot be empty.";
    if (!form.email.includes("@")) return "Please enter a valid email address.";
    if (!form.phone.startsWith("+") || form.phone.length < 10)
      return "Phone must start with '+' and be at least 10 characters.";
    if (!form.address.trim()) return "Address cannot be empty.";
    if (form.password.length < 6)
      return "Password must be at least 6 characters.";
    return null;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const valError = validate();
    if (valError) {
      setError(valError);
      setSuccess("");
      return;
    }

    try {
      await register(form);
      setSuccess("Registration successful! You can now log in.");
      setError("");
      setForm({
        email: "",
        password: "",
        name: "",
        phone: "",
        address: "",
      });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(
        err.response?.data?.error || "Registration failed. Please try again."
      );
      setSuccess("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <Typography variant="h5" textAlign="center" marginBottom={2}>
        Register
      </Typography>
      {error && (
        <Typography className="error" textAlign="center">
          {error}
        </Typography>
      )}
      {success && (
        <Typography className="success" textAlign="center">
          {success}
        </Typography>
      )}
      <TextField
        label="Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Phone"
        name="phone"
        value={form.phone}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Address"
        name="address"
        value={form.address}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <Button variant="contained" type="submit" fullWidth sx={{ marginTop: 2 }}>
        Register
      </Button>
    </form>
  );
};

export default RegisterForm;
