import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Patient.css"


const SlotSelection = ({ formData, setFormData }) => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");

  const generateNext7Days = () => {
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() + i);
      return date;
    });
  };

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
  ];

  const handleConfirm = () => {
    // Update the shared formData with the selected date and time
    setFormData((prev) => ({
      ...prev,
      date: selectedDate.toISOString().split("T")[0],
      time: selectedTime,
    }));
    // Navigate back to the booking page
    navigate("/patient/booking");
  };

  return (
    <div className="slot-selection-container">
      <h2 className="heading">Select a Time Slot</h2>
      <div className="date-buttons">
        {generateNext7Days().map((date, index) => (
          <button
            key={index}
            className={`date-btn ${selectedDate.toDateString() === date.toDateString() ? 'selected' : ''}`}
            onClick={() => setSelectedDate(date)}
          >
            {date.toDateString().split(" ").slice(0, 3).join(" ")}
          </button>
        ))}
      </div>
      <div className="time-buttons">
        {timeSlots.map((time, index) => (
          <button
            key={index}
            className={`time-btn ${selectedTime === time ? 'selected' : ''}`}
            onClick={() => setSelectedTime(time)}
          >
            {time}
          </button>
        ))}
      </div>
      <button
        className="confirm-btn"
        onClick={handleConfirm}
        disabled={!selectedTime}
      >
        Confirm Slot
      </button>
    </div>
  );
};

export default SlotSelection;
