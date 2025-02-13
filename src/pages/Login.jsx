import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { IoEye, IoEyeOff } from "react-icons/io5"; // Import eye icons

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Validate password (at least 6 characters, 1 number, 1 special character)
        const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
        if (!passwordRegex.test(password)) {
            setError("Password must be at least 6 characters long and include a number and a special character.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/login",
                { email, password },
                { headers: { "Content-Type": "application/json" } }
            );

            console.log("Login response:", response.data);
            localStorage.setItem("token", response.data.token);

            const storedToken = localStorage.getItem("token");
            console.log("Stored token:", storedToken);

            navigate("/");
        } catch (err) {
            console.error("Login error details:", err.response?.data);
            setError(err.response?.data?.error || "Login failed. Please try again.");
        }
    };

    return (
        <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h1 className="mt-10 text-center text-2xl font-bold tracking-tight">KONSULT</h1>
                <h2 className="mt-6 text-center text-xl font-bold tracking-tight">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium">
                            Email address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                            className="mt-2 block w-full rounded-md px-3 py-2 border border-gray-300 focus:outline-indigo-600"
                        />
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium">
                                Password
                            </label>
                            <div className="text-sm">
                                <Link to="/resetpassword" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Forgot password?
                                </Link>
                            </div>
                        </div>
                        <div className="relative mt-2">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"} // Toggle input type
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                                className="block w-full rounded-md px-3 py-2 border border-gray-300 focus:outline-indigo-600"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 cursor-pointer"
                            >
                                {showPassword ? <IoEyeOff /> : <IoEye />} {/* Toggle eye icon */}
                            </button>
                        </div>
                        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-[#114B5F] px-3 py-2 text-sm font-semibold text-[#E4FDE1] shadow-md hover:bg-[#0e3d4c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                <p className="mt-6 text-center text-sm text-gray-500">
                    Not a member?{' '}
                    <Link to="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;