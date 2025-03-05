import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import "./Navbar.css";

const NavbarDoctor = () => {


  return (
    <div>
    <nav className="navbar">
      <div className="nav-links">
        <NavLink to="/doctor/dashboard" className="nav-button">Home</NavLink>
        <NavLink to="/doctor/profile" className="nav-button">Profile</NavLink>
      </div>
    </nav>
       {/* Logout Button Outside Navbar */}
       <LogoutButton />  
    </div>
  );
};

export default NavbarDoctor;
