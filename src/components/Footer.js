// src/components/Footer.js
import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const Footer = () => {
  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#333", marginTop: "20px" }}
    >
      <Toolbar>
        <Typography variant="body1" sx={{ color: "#fff", margin: "0 auto" }}>
          © 2024 My Pizzeria. All rights reserved.
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
