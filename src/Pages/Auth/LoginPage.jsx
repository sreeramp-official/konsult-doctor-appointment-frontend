import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import axios from "axios";
import "./Auth.css";
import API_URL from "../../config";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/login`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Login response:", response.data);
      login(response.data.token, response.data.role);
    } catch (err) {
      console.error("Login error details:", err.response?.data);
      setError(err.response?.data?.error || "Login failed. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleLogin} className="auth-form">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="auth-btn" type="submit">Login</button>
        <p onClick={() => navigate("/reset-password")} className="link">Forgot Password?</p>
        <p className="login-link">Don't have an account? <span onClick={() => navigate("/register")}>Register</span></p>
      </form>
    </div>
  );
}

export default LoginPage;
