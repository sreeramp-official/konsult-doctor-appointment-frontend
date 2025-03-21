import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../AuthContext";
import { useNavigate } from "react-router-dom";

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctorName, setDoctorName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        // Fetch doctor's details and appointments in parallel
        const [doctorRes, appointmentsRes] = await Promise.all([
          axios.get("http://localhost:5000/api/doctor/details", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/api/doctor/appointments", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setDoctorName(`Dr. ${doctorRes.data.name}`);
        setAppointments(appointmentsRes.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching data. Please try again later.");
        setLoading(false);
        console.error("Fetch error:", err);
      }
    };

    if (token) fetchDoctorData();
  }, [token]);

  const handleReschedule = (appointment) => {
    navigate(`/doctor/reschedule/${appointment.appointment_id}`, {
      state: { currentAppointment: appointment },
    });
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="doctor-dashboard">
      <header className="dashboard-header">
        <h1>Welcome, {doctorName}</h1>
        <h2>Today's Upcoming Appointments</h2>
      </header>

      <div className="appointments-container">
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <div key={appointment.appointment_id} className="appointment-card">
              <div className="appointment-details">
                <p>
                  <span className="label">Patient:</span> {appointment.patient_name}
                </p>
                <p>
                  <span className="label">Contact:</span> {appointment.patient_phone}
                </p>
                <p>
                  <span className="label">Date:</span>{" "}
                  {new Date(appointment.appointment_date).toLocaleDateString()}
                </p>
                <p>
                  <span className="label">Time:</span> {appointment.appointment_time}
                </p>
                <p>
                  <span className="label">Notes:</span>{" "}
                  {appointment.details || "No additional notes"}
                </p>
              </div>
              <div className="appointment-actions">
                <a href={`tel:${appointment.patient_phone}`} className="action-button call-button">
                  Call Patient
                </a>
                <button
                  className="action-button reschedule-button"
                  onClick={() => handleReschedule(appointment)}
                >
                  Reschedule
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-appointments">No appointments scheduled for today.</p>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;
