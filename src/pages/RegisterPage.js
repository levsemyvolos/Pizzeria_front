// src/pages/RegisterPage.js
import React from "react";
import RegisterForm from "../components/RegisterForm";
import { Box, Paper } from "@mui/material";

const RegisterPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: 4,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 500,
        }}
      >
        <RegisterForm />
      </Paper>
    </Box>
  );
};

export default RegisterPage;
