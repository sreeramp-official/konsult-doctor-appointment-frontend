import React, { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../../config";

const DoctorProfile = () => {
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        phone_number: "",
        specialization: "",
        contactNumber: "",
        clinicAddress: "",
        rating: null,
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
                const res = await axios.get(`${API_URL}/api/doctor/profile`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                // Map backend fields to state keys:
                const fetchedProfile = {
                    name: res.data.name,
                    email: res.data.email,
                    phone_number: res.data.phone_number,
                    specialization: res.data.specialization,
                    contactNumber: res.data.doctor_contact, // mapping from doctor_contact
                    clinicAddress: res.data.clinic_address,  // mapping from clinic_address
                    rating: res.data.rating,
                };
                setProfile(fetchedProfile);
                setOriginalProfile(fetchedProfile);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.error || "Failed to fetch profile");
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e) => {
        const updated = { ...profile, [e.target.name]: e.target.value };
        setProfile(updated);
        // Check if any field has changed from original profile
        setIsUpdated(
            Object.keys(updated).some((key) => updated[key] !== originalProfile[key])
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        try {
            const token = localStorage.getItem("token");
            const res = await axios.put(`${API_URL}/api/doctor/profile`, profile, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setOriginalProfile(res.data.profile);
            setSuccess(res.data.message || "Profile updated successfully");
            setIsUpdated(false);
            setIsEditing(false);
        } catch (err) {
            setError(err.response?.data?.error || "Failed to update profile");
        }
    };

    if (loading) return <p className="loading">Loading profile...</p>;

    return (
        <div className="doctor-profile-container">
            <h2 className="profile-title">Doctor Profile</h2>
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
                <div className="form-group">
                    <label htmlFor="specialization">SPECIALIZATION</label>
                    <input
                        id="specialization"
                        name="specialization"
                        type="text"
                        value={profile.specialization}
                        onChange={handleChange}
                        disabled={!isEditing}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="contactNumber">CLINIC NUMBER</label>
                    <input
                        id="contactNumber"
                        name="contactNumber"
                        type="text"
                        value={profile.contactNumber}
                        onChange={handleChange}
                        disabled={!isEditing}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="clinicAddress">CLINIC ADDRESS</label>
                    <input
                        id="clinicAddress"
                        name="clinicAddress"
                        type="text"
                        value={profile.clinicAddress}
                        onChange={handleChange}
                        disabled={!isEditing}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="rating">RATING</label>
                    <input
                        id="rating"
                        name="rating"
                        type="text"
                        value={profile.rating || "N/A"}
                        disabled
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

export default DoctorProfile;
