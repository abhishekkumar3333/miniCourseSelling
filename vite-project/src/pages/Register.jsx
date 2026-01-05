import React, { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
const RegisterForm = () => {
  const { register, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    isSubscribed: false,
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const validateErrors = () => {
    let valid = true;
    let newError = { name: "", email: "", password: "" };
    if (!formData.name.trim()) {
      newError.name = "Name is required";
      valid = false;
    }
    if (!formData.email.trim()) {
      newError.email = "Email is required";
      valid = false;
    }
    if (!formData.password.trim()) {
      newError.password =
        "Password is required and must be at least 6 characters";
      valid = false;
    }
    setError(newError);
    return valid;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateErrors()) return;
    const result = await register(formData);
    if (!error && result !== false) {
      setFormData({
        name: "",
        email: "",
        password: "",
        isSubscribed: false,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Create Account
          </h2>
          <p className="text-gray-500 mt-2">Join our community today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
          </div>
          {error?.name && <div className="text-red-600">{error.name}</div>}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@company.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
          </div>
          {error?.email && <div className="text-red-600">{error.email}</div>}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
          </div>
          {error?.password && (
            <div className="text-red-600">{error.password}</div>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transform transition-active:scale-95 duration-200 shadow-lg shadow-indigo-200"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a
            href="#"
            className="text-indigo-600 font-semibold hover:underline"
            onClick={() => navigate("/login")}
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
