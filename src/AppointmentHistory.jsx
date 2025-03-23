import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import API_URL from "../../config";

const AppointmentHistory = () => {
    const { token, role } = useAuth();
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                let endpoint = "";
                if (role === "doctor") {
                    endpoint = `${API_URL}/api/doctor/appointments/history`;
                } else if (role === "patient") {
                    endpoint = `${API_URL}/api/patient/appointments/history`;
                }
                const res = await axios.get(endpoint, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setAppointments(res.data);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.error || "Failed to fetch appointment history");
                setLoading(false);
            }
        };

        if (token && role) fetchHistory();
    }, [token, role]);

    if (loading) return <div className="loading">Loading appointment history...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="history-container">
            <h2 className="history-title">Appointment History</h2>
            {appointments.length > 0 ? (
                <table className="history-table">
                    <thead>
                        <tr>
                            <th>Appointment ID</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Status</th>
                            <th>Details</th>
                            {role === "doctor" && <th>Patient Contact</th>}
                            {role === "doctor" && <th>Patient Name</th>}
                            {role === "patient" && <th>Doctor Name</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appt) => (
                            <tr key={appt.appointment_id}>
                                <td>{appt.appointment_id}</td>
                                <td>{new Date(appt.appointment_date).toLocaleDateString()}</td>
                                <td>{appt.appointment_time}</td>
                                <td>{appt.status}</td>
                                <td>{appt.details || "N/A"}</td>
                                {role === "doctor" && <td>{appt.patient_phone}</td>}
                                {role === "doctor" && <td>{appt.patient_name}</td>}
                                {role === "patient" && <td>{appt.doctor_name}</td>}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No appointment history found.</p>
            )}
        </div>
    );
};

export default AppointmentHistory;
