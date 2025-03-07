import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PatientDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        
        const response = await fetch("http://localhost:5000/api/appointments", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    const fetchDoctors = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/doctors");
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchAppointments();
    fetchDoctors();
  }, []);

  const handleCancel = async (appointmentId) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      try {
        await fetch(`http://localhost:5000/api/appointments/${appointmentId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setAppointments(appointments.filter(appt => appt.appointment_id !== appointmentId));
      } catch (error) {
        console.error("Error canceling appointment:", error);
      }
    }
  };

  // Pass the entire appointment object as currentAppointment in state.
  const handleReschedule = (appointment) => {
    navigate(`/patient/reschedule/${appointment.appointment_id}`, {
      state: { currentAppointment: appointment }
    });
  };
  

  // Format date and time for display.
  const formatDateTime = (dateString, timeString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString).toLocaleDateString(undefined, options);
    const time = new Date(`1970-01-01T${timeString}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return `${date} at ${time}`;
  };

  return (
    <div className="dashboard-container">
      {/* Left Side: Upcoming Appointments */}
      <div className="left-half">
        <h2 className="section-title">Upcoming Appointments</h2>
        <div className="appointments-container">
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <div key={appointment.appointment_id} className="appointment-card">
                <h3>{appointment.doctor_name}</h3>
                <p>Specialization: {appointment.specialization}</p>
                <p>Status: <strong>{appointment.status}</strong></p>
                <p>
                  Date: {formatDateTime(appointment.appointment_date, appointment.appointment_time)}
                </p>
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

      {/* Right Side: Available Doctors */}
      <div className="right-half">
        <h2 className="section-title">Available Doctors</h2>
        <div className="available-doctors-container">
          {doctors.length > 0 ? (
            doctors.map((doctor) => (
              <div key={doctor.doctor_id} className="doctor-card">
                <div>
                  <h3>{doctor.doctor_name}</h3>
                  <p>Specialization: {doctor.specialization}</p>
                  <p>Clinic: {doctor.clinic_address}</p>
                </div>
                <p className="available-text">Available Now</p>
              </div>
            ))
          ) : (
            <p>No doctors available at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
