// src/pages/RegisterPage.js
import React from "react";
import RegisterForm from "../components/RegisterForm";
import { Box } from "@mui/material";

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
      <RegisterForm />
    </Box>
  );
};

export default RegisterPage;
