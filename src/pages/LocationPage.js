// src/pages/LocationPage.js
import React from "react";

const LocationPage = () => {
  return (
    <div className="location-page">
      <h1>Our Location</h1>
      <div className="map" style={{ marginBottom: "20px" }}>
        <iframe
          title="Store Location"
          width="600"
          height="450"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src="https://maps.google.com/maps?q=new%20york&t=&z=13&ie=UTF8&iwloc=&output=embed"
        ></iframe>
      </div>
      <p>Address: 123 Main St, Open from 9:00 AM to 11:00 PM</p>
    </div>
  );
};

export default LocationPage;
