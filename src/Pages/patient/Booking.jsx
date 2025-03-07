import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../AuthContext"; // Import auth context for token

const Booking = ({ formData, setFormData }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useAuth(); // Get JWT token
  const [message, setMessage] = useState("");

  // Get doctor id from navigation state and fill the form
  useEffect(() => {
    if (location.state?.doctor) {
      setFormData((prevForm) => ({
        ...prevForm,
        doctor: location.state.doctor, // Set doctor id only
      }));
    }
  }, [location.state, setFormData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateClick = () => {
    navigate("/patient/slot-selection");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setMessage("Unauthorized: Please log in to book an appointment.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/book-appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          doctor: formData.doctor,
          date: formData.date,
          time: formData.time,
          details: formData.detail,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Appointment booked successfully!");
        setFormData({ email: "", fullName: "", doctor: "", date: "", time: "", detail: "" });
      } else {
        setMessage(data.error || "Failed to book appointment.");
      }
    } catch (error) {
      setMessage("Error booking appointment.");
    }
  };

  return (
    <div className="booking-container">
      <div className="form-container">
        <h2 className="form-title">Booking Form</h2>
        {message && <p className="message">{message}</p>}
        <form onSubmit={handleSubmit} className="form">
          <div className="input-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="input-field"
            />
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              className="input-field"
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              name="doctor"
              value={formData.doctor}
              readOnly
              className="input-field"
              placeholder="Doctor ID"
            />
            <input
              type="text"
              name="date"
              value={formData.date}
              onClick={handleDateClick}
              placeholder="Pick a date"
              required
              readOnly
              className="input-field date-field"
            />
          </div>
          <input
            type="text"
            name="time"
            value={formData.time}
            onChange={handleChange}
            placeholder="Selected time slot"
            required
            readOnly
            className="input-field"
          />
          <textarea
            name="detail"
            value={formData.detail}
            onChange={handleChange}
            placeholder="Enter detail"
            className="textarea-field"
          />
          <button type="submit" className="submit-btn">
            BOOK
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
