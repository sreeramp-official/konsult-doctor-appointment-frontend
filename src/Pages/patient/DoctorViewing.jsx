import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../../config";

const DoctorViewing = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [specialties, setSpecialties] = useState([]);
  const navigate = useNavigate();

  // Helper: Sort doctors alphabetically ignoring "Dr." prefix
  const sortDoctorsAlphabetically = useCallback((data) => {
    return data.sort((a, b) => {
      const nameA = a.name.replace(/^Dr\.?\s*/i, "").trim();
      const nameB = b.name.replace(/^Dr\.?\s*/i, "").trim();
      return nameA.localeCompare(nameB);
    });
  }, []);

  // API Call: Fetch doctors by name (memoized)
  const fetchDoctorsByName = useCallback(async (name) => {
    try {
      const response = await fetch(`${API_URL}/api/doctorview/search?name=${name}`);
      const data = await response.json();
      setDoctors(sortDoctorsAlphabetically(data));
    } catch (error) {
      console.error("Error fetching doctors by name:", error);
    }
  }, [sortDoctorsAlphabetically]);

  // API Call: Fetch doctors by specialty (memoized)
  const fetchDoctorsBySpecialty = useCallback(async (specialty) => {
    try {
      const response = await fetch(`${API_URL}/api/doctorview/specialty?specialty=${specialty}`);
      const data = await response.json();
      setDoctors(sortDoctorsAlphabetically(data));
    } catch (error) {
      console.error("Error fetching doctors by specialty:", error);
    }
  }, [sortDoctorsAlphabetically]);

  // API Call: Fetch distinct specialties (memoized)
  const fetchSpecialties = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/api/doctorview/specialties`);
      const data = await response.json();
      setSpecialties(data);
    } catch (error) {
      console.error("Error fetching specialties:", error);
    }
  }, []);

  // Fetch specialties once when the component mounts.
  useEffect(() => {
    fetchSpecialties();
  }, [fetchSpecialties]);

  // Fetch doctors whenever searchQuery changes.
  useEffect(() => {
    if (searchQuery) {
      fetchDoctorsByName(searchQuery);
    } else {
      fetchDoctorsBySpecialty(""); // Fetch all doctors if no search query.
    }
  }, [searchQuery, fetchDoctorsByName, fetchDoctorsBySpecialty]);

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
            {specialties.map((specialty, index) => (
              <button
                key={index}
                onClick={() => fetchDoctorsBySpecialty(specialty)}
                className="specialty-button"
              >
                {specialty}
              </button>
            ))}
          </div>
        </div>
        <div className="doctor-cards">
          {doctors.length > 0 ? (
            doctors.map((doctor) => (
              <div key={doctor.user_id} className="doctor-card1">
                <h3 className="doctor-name">{doctor.name}</h3>
                <p className="doctor-specialty">{doctor.specialization}</p>
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

export default DoctorViewing;
