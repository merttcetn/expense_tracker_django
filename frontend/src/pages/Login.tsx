import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface LoginResponse {
    token: string;
}

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post<LoginResponse>(
                "http://localhost:8000/api/auth/login/",
                {
                    username,
                    password,
                }
            );
            // Başarılı girişte token'ı localStorage'a kaydedin
            localStorage.setItem("token", response.data.token);
            navigate("/");
        } catch (err) {
            setError("Invalid username or password");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6">Login</h1>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Username
                    </label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full rounded-lg border p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-lg border p-2"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                    Login
                </button>
            </form>
        </div>
    );
}
