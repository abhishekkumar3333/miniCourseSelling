import React, { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

const LoginForm = () => {
  const { login, googleLogin, loading, error } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateErrors = () => {
    let valid = true;
    let newError = { email: "", password: "" };
    if (!formData.email.trim()) {
      newError.email = "Email is required";
      valid = false;
    }
    if (!formData.password.trim()) {
      newError.password = "Password is required";
      valid = false;
    }
    setErrorMessage(newError);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateErrors()) return;
    const result = await login(formData);
    if (!error && result !== false) {
      navigate("/");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="you@example.com"
            />
          </div>
          {errorMessage.email && (
            <div className="text-red-600">{errorMessage.email}</div>
          )}

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input type="checkbox" />
              <label className="ml-2 text-sm text-gray-700">Remember me</label>
            </div>

            <span
              className="ml-4 text-sm text-gray-700 hover:underline"
              onClick={() => navigate("/forget-password")}
            >
              forget-password
            </span>
          </div>
          {errorMessage.password && (
            <div className="text-red-600">{errorMessage.password}</div>
          )}

          <button
            type="submit"
            className="w-full py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>
          <div className="text-xs text-center text-gray-500 uppercase dark:text-gray-400">
            or login with Google
          </div>
          <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>
        </div> */}

        <div className="flex justify-center mt-4">
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              const result = await googleLogin(credentialResponse.credential);
              if (result) {
                navigate("/");
              }
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>

        <p className="text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <a
            href="#"
            className="text-blue-500 hover:underline"
            onClick={() => navigate("/register")}
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
