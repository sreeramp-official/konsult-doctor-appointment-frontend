import React from "react";
import { useAuth } from "../AuthContext";
import { FaSignOutAlt } from "react-icons/fa";

const LogoutButton = () => {
  const { logout } = useAuth();

  return (
    <button className="logout-button" onClick={logout}>
      <FaSignOutAlt size={18} />
    </button>
  );
};

export default LogoutButton;
