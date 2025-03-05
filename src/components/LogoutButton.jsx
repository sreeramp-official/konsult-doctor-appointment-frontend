import React from "react";
import { useAuth } from "../AuthContext"; 

const LogoutButton = () => {
  const { logout } = useAuth();

  return (
    <button
      onClick={logout}
      style={{
        position: "fixed",  // Ensures it stays at the top right
        top: "10px",
        right: "10px",
        background: "red",
        color: "white",
        padding: "10px 15px",
        borderRadius: "15px",
        border: "none",
        cursor: "pointer",
        zIndex: 1000, // Ensures it stays above other elements
      }}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
