// src/components/Header.js
import React, { useState } from "react";

const Header = ({ onSearch, cartCount }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter") onSearch(searchTerm);
  };

  return (
    <header className="header">
      <div className="logo">My Pizzeria</div>
      <input
        type="text"
        placeholder="Search pizza..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <div className="cart-button">
        <span>{cartCount} items</span>
      </div>
    </header>
  );
};

export default Header;
