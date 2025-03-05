import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DoctorView = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery) {
      fetchDoctorsByName(searchQuery);
    } else {
      fetchDoctorsBySpecialty(""); // Fetch all doctors initially
    }
  }, [searchQuery]);

  // API Call: Fetch doctors by name
  const fetchDoctorsByName = async (name) => {
    try {
      const response = await fetch(`http://localhost:5000/api/doctorview/search?name=${name}`);
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  // API Call: Fetch doctors by specialty
  const fetchDoctorsBySpecialty = async (specialty) => {
    try {
      const response = await fetch(`http://localhost:5000/api/doctorview/specialty?specialty=${specialty}`);
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  return (
    <div className="doctor-view-container">
      <div className="doctor-view-content">
        <div className="sidebar">
          <input
            type="text"
            placeholder="Search by doctor name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <div className="specialty-buttons">
            {["General Physician", "Gynecologist", "Dermatologist", "Pediatrician", "Neurologist", "Gastroenterologist"].map(
              (specialty, index) => (
                <button
                  key={index}
                  onClick={() => fetchDoctorsBySpecialty(specialty)}
                  className="specialty-button"
                >
                  {specialty}
                </button>
              )
            )}
          </div>
        </div>
        <div className="doctor-cards">
          {doctors.length > 0 ? (
            doctors.map((doctor) => (
              <div key={doctor.user_id} className="doctor-card1">
                <h3 className="doctor-name">{doctor.name}</h3>
                <p className="doctor-specialty">{doctor.specialty}</p>
                <p className="doctor-location">{doctor.location}</p>
                <p className="doctor-rating">Rating: {doctor.rating}</p>
                <div className="doctor-actions">
                <button
                        className="action-button"
                        onClick={() =>
                          navigate("/patient/review", { state: { doctor: doctor.user_id } })
                        }
                      >
                        Review
                </button>

                  <button
                    className="action-button"
                    // Pass only the doctor ID in navigation state
                    onClick={() =>
                      navigate("/patient/booking", { state: { doctor: doctor.user_id } })
                    }
                  >
                    Make an Appointment
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-doctors">No doctors found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorView;
