import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

const Reschedule = () => {
  const navigate = useNavigate();
  const { appointmentId } = useParams();
  const location = useLocation();
  // Always set a value (null if missing) so hooks are called unconditionally.
  const currentAppointment = location.state?.currentAppointment || null;

  // Compute initial values regardless of whether appointment data exists.
  const initialDate = currentAppointment
    ? new Date(currentAppointment.appointment_date)
    : new Date();
    
  const convert24To12 = (time24) => {
    const [hours, minutes] = time24.split(":");
    let hourNum = parseInt(hours, 10);
    const amPm = hourNum >= 12 ? "PM" : "AM";
    hourNum = hourNum % 12 || 12;
    return `${hourNum}:${minutes} ${amPm}`;
  };
  
  const initialTime = currentAppointment
    ? convert24To12(currentAppointment.appointment_time)
    : "";

  // Unconditionally call hooks.
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [selectedTime, setSelectedTime] = useState(initialTime);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [error, setError] = useState("");

  // Fetch available slots for the selected date if appointment data exists.
  useEffect(() => {
    if (!currentAppointment) return;
    const fetchSlots = async () => {
      try {
        setError("");
        // Use either property name.
        const doctorId = currentAppointment.doctor_id || currentAppointment.doctorId;
        const dateString = selectedDate.toISOString().split("T")[0];
        const response = await fetch(
          `http://localhost:5000/api/available-slot?doctor_id=${doctorId}&date=${dateString}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch available slots");
        }
        const data = await response.json();
        // Only show slots that are available.
        const available = data.filter((slot) => slot.slot_status === "available");
        setAvailableSlots(available);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchSlots();
  }, [selectedDate, currentAppointment]);

  // Generate next 7 days for date selection.
  const generateNext7Days = () => {
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() + i);
      return date;
    });
  };

  // Convert a 12-hour time (e.g., "09:00 AM") to 24-hour format (e.g., "09:00:00")
  const convertTo24HourFormat = (time12h) => {
    const [time, modifier] = time12h.split(" ");
    let [hours, minutes] = time.split(":");
    if (modifier === "PM" && hours !== "12") hours = parseInt(hours, 10) + 12;
    if (modifier === "AM" && hours === "12") hours = "00";
    return `${hours.toString().padStart(2, "0")}:${minutes}:00`;
  };

  // Confirm reschedule by calling the backend PUT endpoint.
  const handleConfirm = async () => {
    if (!selectedTime) {
      setError("Please select a time slot.");
      return;
    }
    const newDate = selectedDate.toISOString().split("T")[0];
    const newTime = convertTo24HourFormat(selectedTime);
    const doctorId = currentAppointment
      ? currentAppointment.doctor_id || currentAppointment.doctorId
      : null;
    try {
      const response = await fetch(`http://localhost:5000/api/appointments/${appointmentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ newDate, newTime, doctorId }),
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Rescheduling failed");
      }
      navigate("/patient/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="slot-selection-container">
      { !currentAppointment ? (
          <div>Error: Appointment data not available.</div>
      ) : (
        <>
          <h2 className="heading">Reschedule Appointment</h2>
          
          {/* Date Selection */}
          <div className="date-buttons">
            {generateNext7Days().map((date, index) => (
              <button
                key={index}
                className={`date-btn ${
                  selectedDate.toDateString() === date.toDateString() ? "selected" : ""
                }`}
                onClick={() => setSelectedDate(date)}
                disabled={date < new Date(new Date().setHours(0, 0, 0, 0))}
              >
                {date.toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </button>
            ))}
          </div>

          {/* Available Slots */}
          <div className="time-buttons">
            {error && <p className="error">{error}</p>}
            {availableSlots.length > 0 ? (
              availableSlots.map((slot, index) => {
                const displayTime = slot.display_time || convert24To12(slot.start_time);
                return (
                  <button
                    key={index}
                    className={`time-btn ${selectedTime === displayTime ? "selected" : ""}`}
                    onClick={() => setSelectedTime(displayTime)}
                  >
                    {displayTime}
                  </button>
                );
              })
            ) : (
              <p>No available slots on this date.</p>
            )}
          </div>

          {/* Confirm Button */}
          <button className="confirm-btn" onClick={handleConfirm} disabled={!selectedTime}>
            Confirm Reschedule
          </button> 
          {error && <p className="error">{error}</p>}
        </>
      )}
    </div>
  );
};

export default Reschedule;
