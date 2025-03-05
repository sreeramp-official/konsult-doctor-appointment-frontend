import { Routes, Route } from "react-router-dom"; // ✅ Removed `Router`
import { useAuth } from "./AuthContext";
import NavbarAuth from "./components/NavbarAuth";
import NavbarDoctor from "./components/NavbarDoctor";
import NavbarPatient from "./components/NavbarPatient";
import LoginPage from "./Pages/Auth/LoginPage";
import RegisterPage from "./Pages/Auth/RegisterPage";
import ResetPasswordPage from "./Pages/Auth/ResetPasswordPage";
import DoctorDashboard from "./Pages/doctor/DoctorDashboard";
import SlotSelection from "./Pages/patient/SlotSelection";
import DSlotSelection from "./Pages/doctor/SlotSelection";
import DoctorProfile from "./Pages/doctor/DoctorProfile";
import PatientDashboard from "./Pages/patient/PatientDashBoard";
import DoctorViewing from "./Pages/patient/DoctorViewing";
import Booking from "./Pages/patient/Booking";
import LandingPage from "./Pages/LandingPage";
import ReviewPage from "./Pages/patient/ReviewPage"; // Adjust path as needed
import Reschedule from "./Pages/patient/Reschedule";

import React, { useState } from "react";
const AppRoutes = () => {
  const { token, role } = useAuth(); // Get user authentication status
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    doctor: "",
    date: "",
    time: "",
    detail: "",
  });
  return (
    <>
      {/* ✅ Navbar should change based on authentication */}
      {!token ? <NavbarAuth /> : role === "doctor" ? <NavbarDoctor /> : <NavbarPatient />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* Doctor Routes (Protected) */}
        {token && role === "doctor" && (
          <>
           
            <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
            <Route path="/doctor/slot-selection" element={<DSlotSelection />} />
            <Route path="/doctor/profile" element={<DoctorProfile />} />
          </>
        )}

        {/* Patient Routes (Protected) */}
        {token && role === "patient" && (
          <>
            
            <Route path="/patient/dashboard" element={<PatientDashboard />} />
            <Route path="/patient/doctors" element={<DoctorViewing />} />
            <Route path="/patient/booking" element={<Booking formData={formData} setFormData={setFormData} />} />
            <Route path="/patient/slot-selection" element={<SlotSelection formData={formData} setFormData={setFormData} />} />
            <Route path="/patient/reschedule" element={<Reschedule />} />
            <Route path="/patient/review" element={<ReviewPage />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default AppRoutes;
