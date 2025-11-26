import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../hooks/useAppContext";
import { api } from "../../services/api";

const Login: React.FC = () => {
    const { login } = useAppContext();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const response = await api.login(username, password);
            console.log("Login response:", response); // Debug log

            if (response.success && response.token) {
                console.log("Token received:", response.token); // Debug log
                login(response.token); // Store token and update context
                setSuccess("Login successful! Redirecting...");
                // Dashboard will show automatically because isAuthenticated is now true
            } else {
                console.log("Login failed:", response.message); // Debug log
                setError(response.message || "Invalid credentials. Please try again.");
            }
        } catch (err) {
            console.error("Login error:", err); // Debug log
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-dark-bg">
            <div className="p-8 bg-white dark:bg-[#24283b] rounded-lg shadow-2xl max-w-sm w-full">
                <h1 className="text-2xl font-bold mb-6 text-center dark:text-dark-cyan">Admin Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter username"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            autoFocus
                            placeholder="******************"
                        />
                        {error && <p className="text-red-500 text-xs italic mt-2">{error}</p>}
                        {success && <p className="text-green-500 text-xs italic mt-2">{success}</p>}
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Signing In..." : "Sign In"}
                        </button>
                    </div>
                    <div className="text-center mt-4">
                        <button onClick={() => navigate("/")} className="text-sm text-gray-500 hover:underline">
                            Back to Portfolio
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
