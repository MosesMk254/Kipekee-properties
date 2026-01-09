import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://127.0.0.1:5000/api/login", {
        email,
        password,
      });

      if (response.data.status === "success") {
        localStorage.setItem("isAdmin", "true");
        navigate("/admin/dashboard");
      }
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen bg-brand-navy flex items-center justify-center px-6">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-heading font-bold text-brand-navy">
            Admin Portal
          </h1>
          <p className="text-gray-400 text-sm mt-2">
            Please log in to manage your properties.
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              className="w-full bg-gray-50 border border-gray-200 rounded p-4 text-sm focus:outline-none focus:border-brand-gold transition-colors"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full bg-gray-50 border border-gray-200 rounded p-4 text-sm focus:outline-none focus:border-brand-gold transition-colors"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="w-full bg-brand-navy text-white font-bold py-4 rounded shadow-lg hover:bg-brand-gold transition-colors uppercase text-xs tracking-widest">
            Login Securely
          </button>
        </form>

        <div className="mt-8 text-center">
          <a
            href="/"
            className="text-xs text-gray-400 hover:text-brand-navy underline"
          >
            Back to Website
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
