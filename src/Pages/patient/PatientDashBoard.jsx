import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import API_URL from "../../config";

const PatientDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`${API_URL}/api/appointments`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  const handleCancel = async (appointmentId) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      try {
        await fetch(`${API_URL}/api/appointments/${appointmentId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setAppointments(appointments.filter(appt => appt.appointment_id !== appointmentId));
      } catch (error) {
        console.error("Error canceling appointment:", error);
      }
    }
  };

  const handleReschedule = (appointment) => {
    navigate(`/patient/reschedule/${appointment.appointment_id}`, {
      state: { currentAppointment: appointment }
    });
  };

  // Format date and time for display.
  const formatDateTime = (dateString, timeString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString).toLocaleDateString(undefined, options);
    const time = new Date(`1970-01-01T${timeString}`).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
    return `${date} at ${time}`;
  };

  return (
    <div className="dashboard-container">
      <div className="left-half">
        <h2 className="section-title">Upcoming Appointments</h2>
        <div className="appointments-container">
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <div key={appointment.appointment_id} className="appointment-card">
                <h3>{appointment.doctor_name}</h3>
                <p>Specialization: {appointment.specialization}</p>
                <p>Status: <strong>{appointment.status}</strong></p>
                <p>Date: {formatDateTime(appointment.appointment_date, appointment.appointment_time)}</p>
                <div className="appointment-buttons">
                  <button className="action-button" onClick={() => handleReschedule(appointment)}>
                    Reschedule
                  </button>
                  <button className="action-button" onClick={() => handleCancel(appointment.appointment_id)}>
                    Cancel
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No upcoming appointments.</p>
          )}
        </div>
      </div>
      <div>
        <NavLink to="/patient/history" className="action-button">History</NavLink>
      </div>
    </div>
  );
};

export default PatientDashboard;
