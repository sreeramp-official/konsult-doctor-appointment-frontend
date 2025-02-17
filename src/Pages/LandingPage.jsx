import React from "react";
import { useNavigate } from "react-router-dom";
import NavbarAuth from "../components/NavbarAuth";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <NavbarAuth />
      <div className="content">
        <h1>Welcome to Kosult</h1>
        <p>Your trusted platform for seamless online consultations.</p>
        <button className="get-started" onClick={() => navigate("/register")}>
          Get Started 🚀
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
