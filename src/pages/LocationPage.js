// src/pages/LocationPage.js
import React from "react";
import { Box, Typography, Paper, Container, Grid } from "@mui/material";
import { LocationOn, AccessTime, Phone } from "@mui/icons-material";

const LocationPage = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Contacts
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <LocationOn color="primary" />
                <Typography variant="h6">Address</Typography>
              </Box>
              <Typography>123 Main Street, New York, NY 10001</Typography>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <AccessTime color="primary" />
                <Typography variant="h6">Working Hours</Typography>
              </Box>
              <Typography>
                Monday - Friday: 9:00 AM - 10:00 PM
                <br />
                Saturday - Sunday: 10:00 AM - 11:00 PM
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Phone color="primary" />
                <Typography variant="h6">Contact</Typography>
              </Box>
              <Typography>
                Phone: (555) 123-4567
                <br />
                Email: info@pizzashop.com
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                height: 400,
                overflow: "hidden",
                position: "relative",
              }}
            >
              <Box
                component="iframe"
                title="Store Location"
                src="https://maps.google.com/maps?q=new%20york&t=&z=13&ie=UTF8&iwloc=&output=embed"
                sx={{
                  width: "100%",
                  height: "100%",
                  border: 0,
                }}
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default LocationPage;
