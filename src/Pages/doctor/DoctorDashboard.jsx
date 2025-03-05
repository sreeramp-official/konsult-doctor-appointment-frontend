// Pages/doctor/DoctorDashboard.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../AuthContext";

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctorName, setDoctorName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        // Fetch doctor's details and appointments in parallel
        const [doctorRes, appointmentsRes] = await Promise.all([
          axios.get("http://localhost:5000/api/doctor/details", {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get("http://localhost:5000/api/doctor/appointments", {
            headers: { Authorization: `Bearer ${token}` }
          })
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

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="doctor-dashboard">
      <h1>Welcome, {doctorName}</h1>
      <h2>Today's Upcoming Appointments</h2>
      <div className="appointments-container">
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <div key={appointment.appointment_id} className="appointment-card">
              <div className="appointment-details">
                <p><strong>Patient:</strong> {appointment.patient_name}</p>
                <p><strong>Contact:</strong> {appointment.patient_phone}</p>
                <p><strong>Date:</strong> {new Date(appointment.appointment_date).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {appointment.appointment_time}</p>
                <p><strong>Notes:</strong> {appointment.details || "No additional notes"}</p>
              </div>
              <div className="appointment-actions">
                <a href={`tel:${appointment.patient_phone}`} className="call-button">
                  Call Patient
                </a>
                <button className="reschedule-button">Reschedule</button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-appointments">No appointments scheduled for today</p>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;