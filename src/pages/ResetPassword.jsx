import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ResetPassword() {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [step, setStep] = useState(1);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSendOTP = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:5000/api/send-otp", { email });
            if (response.status === 200) {
                setStep(2);
                setSuccess("OTP sent to your email!");
                setError("");
            }
        } catch (err) {
            setError(err.response?.data?.error || "Failed to send OTP");
            setSuccess("");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:5000/api/verify-otp", {
                email,
                otp
            });
            if (response.status === 200) {
                setStep(3);
                setSuccess("OTP verified successfully!");
                setError("");
            }
        } catch (err) {
            setError(err.response?.data?.error || "Invalid OTP");
            setSuccess("");
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post("http://localhost:5000/api/reset-password", {
                email,
                otp,
                newPassword
            });
            if (response.status === 200) {
                setSuccess("Password updated successfully!");
                setTimeout(() => navigate("/login"), 2000);
            }
        } catch (err) {
            setError(err.response?.data?.error || "Password update failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Reset Password</h2>

                {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
                {success && <p className="text-green-500 text-sm text-center mb-4">{success}</p>}

                <form
                    onSubmit={
                        step === 1 ? handleSendOTP :
                            step === 2 ? handleVerifyOTP :
                                handlePasswordUpdate
                    }
                    className="space-y-4"
                >
                    {step === 1 && (
                        <>
                            <input
                                type="email"
                                placeholder="Enter registered email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={loading}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#114B5F] text-[#E4FDE1] py-3 rounded-md focus:outline-none cursor-pointer"
                            >
                                {loading ? "Sending..." : "Send OTP"}
                            </button>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <input
                                type="number"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                                disabled={loading}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#114B5F] text-[#E4FDE1] py-3 rounded-md focus:outline-none"
                            >
                                {loading ? "Verifying..." : "Verify OTP"}
                            </button>
                        </>
                    )}

                    {step === 3 && (
                        <>
                            <input
                                type="password"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                disabled={loading}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                disabled={loading}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-indigo-500 text-white py-3 rounded-md focus:outline-none hover:bg-indigo-600 transition"
                            >
                                {loading ? "Updating..." : "Update Password"}
                            </button>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;
