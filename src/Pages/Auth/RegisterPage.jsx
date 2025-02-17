import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [clinicAddress, setClinicAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!selectedRole) {
      setError("Please select a role");
      return;
    }

    try {
      // First register the user
      const userResponse = await axios.post("http://localhost:5000/api/register", {
        name,
        email,
        phone_number: phone,
        password,
        role: selectedRole
      });

      // If doctor, register doctor details
      if (selectedRole === "doctor") {
        await axios.post("http://localhost:5000/api/register/doctor", {
          userId: userResponse.data.userId,
          specialization,
          contactNumber,
          clinicAddress
        });
      }

      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Register</h2>
        
        {/* Role Selection */}
        {!selectedRole && (
          <div className="role-selection">
            <div 
              className="role-box"
              onClick={() => handleRoleSelect("doctor")}
            >
              <h3>Register as Doctor</h3>
            </div>
            <div 
              className="role-box"
              onClick={() => handleRoleSelect("patient")}
            >
              <h3>Register as Patient</h3>
            </div>
          </div>
        )}

        {selectedRole && (
          <>
            {/* Common Fields */}
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              pattern="[0-9]{10}"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Doctor Specific Fields */}
            {selectedRole === "doctor" && (
              <>
                <input
                  type="text"
                  placeholder="Specialization"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  required
                />
                <input
                  type="tel"
                  placeholder="Clinic Contact Number"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  pattern="[0-9]{10}"
                  required
                />
                <textarea
                  placeholder="Clinic Address"
                  value={clinicAddress}
                  onChange={(e) => setClinicAddress(e.target.value)}
                  required
                />
              </>
            )}

            <button type="submit">Register</button>
            <p className="link" onClick={() => setSelectedRole(null)}>
              Back to Role Selection
            </p>
          </>
        )}

        {error && <p className="error">{error}</p>}
        <p className="link" onClick={() => navigate("/login")}>
          Already have an account? Login
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;