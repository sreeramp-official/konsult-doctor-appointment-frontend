import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const NavbarAuth = () => {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <NavLink to="/" className="nav-button">Home</NavLink>
        <NavLink to="/register" className="nav-button">Register</NavLink>
        <NavLink to="/login" className="nav-button">Login</NavLink>
      </div>
    </nav>
  );
};

export default NavbarAuth;
