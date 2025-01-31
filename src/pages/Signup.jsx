import { useState } from "react";
import { Link } from "react-router-dom";


const Signup = () => {
    const [role, setRole] = useState("patient");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const validatePassword = (value) => {
        setPassword(value);
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!strongPasswordRegex.test(value)) {
            setPasswordError("Password must be at least 8 characters long, include one uppercase letter, one number, and one special character.");
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

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h1 className='mt-10 text-center text-2xl font-bold tracking-tight'>KONSULT</h1>
                <h2 className="mt-10 text-center text-2xl font-bold tracking-tight">
                    Create a new account
                </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium">Full Name</label>
                        <input type="text" required className="block w-full rounded-md px-3 py-2 border border-gray-300 focus:outline-indigo-600" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Email Address</label>
                        <input type="email" required className="block w-full rounded-md px-3 py-2 border border-gray-300 focus:outline-indigo-600" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Phone Number</label>
                        <div className="flex gap-2">
                            <select className="rounded-md px-3 py-1.5 outline-gray-300">
                                {/* <option value="+1">+1 (USA)</option>
                                <option value="+44">+44 (UK)</option> */}
                                <option value="+91">+91 (India)</option>
                                {/* <option value="+61">+61 (Australia)</option> */}
                            </select>
                            <input type="text" required className="block w-full rounded-md px-3 py-2 border border-gray-300 focus:outline-indigo-600" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Role</label>
                        <div className="flex gap-4 mt-2">
                            <label className="flex items-center">
                                <input type="radio" name="role" value="patient" checked={role === "patient"} onChange={() => setRole("patient")} className="mr-2" /> Patient
                            </label>
                            <label className="flex items-center">
                                <input type="radio" name="role" value="doctor" checked={role === "doctor"} onChange={() => setRole("doctor")} className="mr-2" /> Doctor
                            </label>
                        </div>
                    </div>

                    {role === "doctor" && (
                        <>
                            <div>
                                <label htmlFor="specialization" className="block text-sm font-medium">
                                    Specialization
                                </label>
                                <input
                                    id="specialization"
                                    name="specialization"
                                    type="text"
                                    required
                                    className="block w-full rounded-md px-3 py-2 border border-gray-300 focus:outline-indigo-600"
                                />
                            </div>
                            <div>
                                <label htmlFor="license" className="block text-sm font-medium">
                                    Medical License Number
                                </label>
                                <input
                                    id="license"
                                    name="license"
                                    type="text"
                                    required
                                    className="block w-full rounded-md px-3 py-2 border border-gray-300 focus:outline-indigo-600"
                                />
                            </div>
                            <div>
                                <label htmlFor="experience" className="block text-sm font-medium">
                                    Years of Experience
                                </label>
                                <input
                                    id="experience"
                                    name="experience"
                                    type="number"
                                    min="0"
                                    required
                                    className="block w-full rounded-md px-3 py-2 border border-gray-300 focus:outline-indigo-600"
                                />
                            </div>
                        </>
                    )}

                    <div>
                        <label className="block text-sm font-medium">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => validatePassword(e.target.value)}
                            className="block w-full rounded-md px-3 py-2 border border-gray-300 focus:outline-indigo-600"
                        />
                        {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Confirm Password</label>
                        <input
                            type="password"
                            required
                            value={confirmPassword}
                            onChange={(e) => validateConfirmPassword(e.target.value)}
                            className="block w-full rounded-md px-3 py-2 border border-gray-300 focus:outline-indigo-600"
                        />
                        {confirmPasswordError && <p className="text-red-500 text-xs mt-1">{confirmPasswordError}</p>}
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full rounded-md bg-[#114B5F] px-3 py-1.5 text-sm font-semibold text-[#E4FDE1] shadow-xs cursor-pointer">
                            Sign Up
                        </button>
                    </div>
                </form>
                <p className="mt-10 text-center text-sm text-gray-500">
                    Already have an account? <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
