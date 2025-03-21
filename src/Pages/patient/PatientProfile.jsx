import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pencil } from "lucide-react";

const PatientProfile = () => {
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        phone_number: "",
    });

    const [originalProfile, setOriginalProfile] = useState({});
    const [editField, setEditField] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isUpdated, setIsUpdated] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get("http://localhost:5000/api/patient/profile", {
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
        setProfile({ ...profile, [e.target.name]: e.target.value });

        // Check if any field is changed from original
        setIsUpdated(
            Object.keys(profile).some((key) => profile[key] !== originalProfile[key])
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const token = localStorage.getItem("token");
            const res = await axios.put("http://localhost:5000/api/patient/profile", profile, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setOriginalProfile(profile); // Update original profile state
            setSuccess(res.data.message || "Profile updated successfully");
            setIsUpdated(false);
            setEditField(null); // Disable all editing fields
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
                {["name", "email", "phone_number"].map((field) => (
                    <div key={field} className="form-group">
                        <label htmlFor={field}>{field.replace("_", " ").toUpperCase()}</label>
                        <div className="input-container">
                            <input
                                id={field}
                                name={field}
                                type={field === "email" ? "email" : "text"}
                                value={profile[field]}
                                onChange={handleChange}
                                disabled={editField !== field}
                                required
                            />
                            <Pencil
                                className="edit-icon"
                                onClick={() => setEditField(field)}
                            />
                        </div>
                    </div>
                ))}
                <button type="submit" className={`update-button ${!isUpdated ? "disabled" : ""}`} disabled={!isUpdated}>
                    Update Profile
                </button>
            </form>
        </div>
    );
};

export default PatientProfile;
