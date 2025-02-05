import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { IoEye, IoEyeOff } from "react-icons/io5"; // Import eye icons

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [clinicAddress, setClinicAddress] = useState("");
    const [medicalLicense, setMedicalLicense] = useState("");
    const [experience, setExperience] = useState("");
    const [role, setRole] = useState("patient");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // State for password visibility
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password visibility
    const navigate = useNavigate();

    // Phone number validation
    const validatePhoneNumber = (phone) => /^\d{10}$/.test(phone);

    const handleRoleChange = (newRole) => {
        setRole(newRole);
        if (newRole === "patient") {
            setSpecialization("");
            setClinicAddress("");
            setMedicalLicense("");
            setExperience("");
        }
    };

    const validatePassword = (value) => {
        setPassword(value);
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!strongPasswordRegex.test(value)) {
            setPasswordError(
                "Password must be at least 8 characters long, include one uppercase letter, one number, and one special character."
            );
        } else {
            setPasswordError("");
        }
    };

    const validateConfirmPassword = (value) => {
        setConfirmPassword(value);
        if (value !== password) {
            setConfirmPasswordError("Passwords do not match.");
        } else {
            setConfirmPasswordError("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Reset error before validation

        // Check if the phone number is valid
        console.log("Phone number:", phone, "Valid:", validatePhoneNumber(phone));

        // Validate required fields and phone number
        if (
            !name.trim() ||
            !email.trim() ||
            !phone.trim() ||
            !password ||
            !confirmPassword ||
            !validatePhoneNumber(phone) // Check phone number validity
        ) {
            setError("All fields are required, and phone number must be valid.");
            return;
        }

        // Doctor-specific validation
        if (role === "doctor") {
            console.log("Specialization:", specialization, "Clinic Address:", clinicAddress, "Medical License:", medicalLicense, "Experience:", experience);
            if (
                !specialization.trim() ||
                !clinicAddress.trim() ||
                !medicalLicense.trim() ||
                !experience.trim() // Ensure experience field is not empty
            ) {
                setError("All doctor fields are required, and phone number must be valid.");
                return;
            }
        }

        // Validate password and confirm password match
        if (password !== confirmPassword) {
            setConfirmPasswordError("Passwords do not match.");
            return;
        }

        // Check for password errors
        if (passwordError || confirmPasswordError) {
            setError("Fix password errors before proceeding.");
            return;
        }

        setLoading(true);

        try {
            // Register user
            const userResponse = await axios.post("http://localhost:5000/api/register", {
                name,
                email,
                phone_number: phone,
                password,
                role,
            });

            // If doctor, register additional details
            if (role === "doctor") {
                await axios.post("http://localhost:5000/api/register/doctor", {
                    userId: userResponse.data.userId, // Ensure you pass the correct userId here
                    specialization,
                    contactNumber: phone,
                    clinicAddress,
                });
            }

            // Show success and navigate to login
            alert("Registration successful!");
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.error || err.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h1 className="mt-10 text-center text-2xl font-bold tracking-tight">KONSULT</h1>
                <h2 className="mt-10 text-center text-2xl font-bold tracking-tight">Create a new account</h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium">Full Name</label>
                        <input
                            type="text"
                            required
                            className="block w-full rounded-md px-3 py-2 border border-gray-300 focus:outline-indigo-600"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Email Address</label>
                        <input
                            type="email"
                            required
                            className="block w-full rounded-md px-3 py-2 border border-gray-300 focus:outline-indigo-600"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Phone Number</label>
                        <div className="flex gap-2">
                            <select className="rounded-md px-3 py-1.5 outline-gray-300">
                                <option value="+91">+91 (India)</option>
                            </select>
                            <input
                                type="text"
                                required
                                className="block w-full rounded-md px-3 py-2 border border-gray-300 focus:outline-indigo-600"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Role</label>
                        <div className="flex gap-4 mt-2">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="role"
                                    value="patient"
                                    checked={role === "patient"}
                                    onChange={() => handleRoleChange("patient")}
                                    className="mr-2"
                                />
                                Patient
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="role"
                                    value="doctor"
                                    checked={role === "doctor"}
                                    onChange={() => handleRoleChange("doctor")}
                                    className="mr-2"
                                />
                                Doctor
                            </label>
                        </div>
                    </div>

                    {role === "doctor" && (
                        <>
                            <div>
                                <label className="block text-sm font-medium">Specialization</label>
                                <input
                                    type="text"
                                    required
                                    className="block w-full rounded-md px-3 py-2 border border-gray-300 focus:outline-indigo-600"
                                    value={specialization}
                                    onChange={(e) => setSpecialization(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Medical License Number</label>
                                <input
                                    type="text"
                                    required
                                    className="block w-full rounded-md px-3 py-2 border border-gray-300 focus:outline-indigo-600"
                                    value={medicalLicense}
                                    onChange={(e) => setMedicalLicense(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Years of Experience</label>
                                <input
                                    type="number"
                                    min="0"
                                    required
                                    className="block w-full rounded-md px-3 py-2 border border-gray-300 focus:outline-indigo-600"
                                    value={experience}
                                    onChange={(e) => setExperience(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Clinic Address</label>
                                <input
                                    type="text"
                                    required
                                    className="block w-full rounded-md px-3 py-2 border border-gray-300 focus:outline-indigo-600"
                                    value={clinicAddress}
                                    onChange={(e) => setClinicAddress(e.target.value)}
                                />
                            </div>
                        </>
                    )}

                    <div>
                        <label className="block text-sm font-medium">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"} // Toggle password visibility
                                required
                                value={password}
                                onChange={(e) => validatePassword(e.target.value)}
                                className="block w-full rounded-md px-3 py-2 border border-gray-300 focus:outline-indigo-600"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)} // Toggle visibility
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 cursor-pointer"
                            >
                                {showPassword ? <IoEyeOff /> : <IoEye />} {/* Toggle eye icon */}
                            </button>
                        </div>
                        {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Confirm Password</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"} // Toggle confirm password visibility
                                required
                                value={confirmPassword}
                                onChange={(e) => validateConfirmPassword(e.target.value)}
                                className="block w-full rounded-md px-3 py-2 border border-gray-300 focus:outline-indigo-600"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Toggle visibility
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 cursor-pointer"
                            >
                                {showConfirmPassword ? <IoEyeOff /> : <IoEye />} {/* Toggle eye icon */}
                            </button>
                        </div>
                        {confirmPasswordError && <p className="text-red-500 text-xs mt-1">{confirmPasswordError}</p>}
                    </div>

                    <div>
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                        <button
                            type="submit"
                            className={`w-full rounded-md px-3 py-1.5 text-sm font-semibold shadow-xs cursor-pointer 
                            ${loading ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-[#114B5F] text-[#E4FDE1]"}`}
                            disabled={loading}
                        >
                            {loading ? "Processing..." : "Sign Up"}
                        </button>
                    </div>
                </form>
                <p className="mt-10 text-center text-sm text-gray-500">
                    Already have an account?{" "}
                    <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;