// src/pages/LocationPage.js
import React from "react";

const LocationPage = () => {
  return (
    <div className="location-page">
      <h1>Our Location</h1>
      <div className="map" style={{ marginBottom: "20px" }}>
        {/* Стабильный iframe с публичной локацией */}
        <iframe
          title="Store Location"
          width="600"
          height="450"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d714.0853305986228!2d30.751473877564806!3d46.459833644055905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c633d8a2e2ceb3%3A0x4db0f83c94b41b5a!2z0JjQvdGB0YLQuNGC0YPRgiDQutC-0LzQv9GM0Y7RgtC10YDQvdGL0YUg0YHQuNGB0YLQtdC8!5e0!3m2!1sru!2sde!4v1733693693302!5m2!1sru!2sde"
        ></iframe>
      </div>
      <p>Address: 123 Main St, Open from 9:00 AM to 11:00 PM</p>
    </div>
  );
};

export default LocationPage;
