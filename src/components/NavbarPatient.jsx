import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import "./Navbar.css";

const NavbarPatient = () => {
  return (
    <div>
      <nav className="navbar">
        <div className="nav-links">
          <NavLink to="/patient/dashboard" className="nav-button">Home</NavLink>
          <NavLink to="/patient/doctors" className="nav-button">Doctors</NavLink>
          <NavLink to="/patient/booking" className="nav-button">Booking</NavLink>
        </div>
      </nav>
      {/* Logout Button Outside Navbar */}
      <LogoutButton />
    </div>
  );
};

export default NavbarPatient;
