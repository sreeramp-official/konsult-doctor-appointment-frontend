import React, { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../../config";

const PatientProfile = () => {
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        phone_number: "",
    });
    const [originalProfile, setOriginalProfile] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isUpdated, setIsUpdated] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`${API_URL}/api/patient/profile`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setProfile(res.data);
                setOriginalProfile(res.data);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.error || "Failed to fetch profile");
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e) => {
        const updatedProfile = { ...profile, [e.target.name]: e.target.value };
        setProfile(updatedProfile);

        // Check if any field is changed from original
        setIsUpdated(
            Object.keys(updatedProfile).some((key) => updatedProfile[key] !== originalProfile[key])
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const token = localStorage.getItem("token");
            const res = await axios.put(`${API_URL}/api/patient/profile`, profile, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setOriginalProfile(profile); // Update original profile state
            setSuccess(res.data.message || "Profile updated successfully");
            setIsUpdated(false);
            setIsEditing(false);
        } catch (err) {
            setError(err.response?.data?.error || "Failed to update profile");
        }
    };

    if (loading) return <p className="loading">Loading profile...</p>;

    return (
        <div className="patient-profile-container">
            <h2 className="profile-title">Patient Profile</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <form onSubmit={handleSubmit} className="profile-form">
                <div className="form-group">
                    <label htmlFor="name">NAME</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={profile.name}
                        onChange={handleChange}
                        disabled={!isEditing}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">EMAIL</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={profile.email}
                        onChange={handleChange}
                        disabled={!isEditing}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone_number">PHONE NUMBER</label>
                    <input
                        id="phone_number"
                        name="phone_number"
                        type="text"
                        value={profile.phone_number}
                        onChange={handleChange}
                        disabled={!isEditing}
                        required
                    />
                </div>
                <div className="button-group">
                    <button
                        type="button"
                        className="edit-button"
                        onClick={() => setIsEditing(true)}
                        disabled={isEditing}
                    >
                        Edit Profile
                    </button>
                    <button
                        type="submit"
                        className={`update-button ${!isUpdated ? "disabled" : ""}`}
                        disabled={!isUpdated}
                    >
                        Update Profile
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PatientProfile;
