import React from "react";
import { useNavigate } from "react-router-dom";

const Booking = ({ formData, setFormData }) => {
  const navigate = useNavigate();
  const [message, setMessage] = React.useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // When the date field is clicked, navigate to the SlotSelection page
  const handleDateClick = () => {
    navigate("/patient/slot-selection");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/book-appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("Appointment booked successfully!");
        // Reset the form (include 'time' if used)
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
              onChange={handleChange}
              placeholder="Doctor name"
              required
              className="input-field"
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
          <textarea
            name="detail"
            value={formData.detail}
            onChange={handleChange}
            placeholder="Enter detail"
            className="textarea-field"
          />
          <button
            type="submit"
            className="submit-btn"
          >
            BOOK
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
