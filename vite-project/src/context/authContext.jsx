import React, { useState, createContext, useEffect } from "react";
import api from "../utils/api.js";

export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("authToken");
    return token ? { token } : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token && !user) {
      setUser({ token });
    }
  }, []);

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post("/user/register", userData);
      setUser(response.data);
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (otpData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post("/user/verify-email-otp", otpData);
      setUser(response.data);
    } catch (error) {
      setError(error?.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const login = async (credential) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post("/user/login", credential);
      setUser(response.data);
      localStorage.setItem("authToken", response.data.token);
      return response.data;
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const forgetPassword = async (email) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post("/user/forget-password", { email });
      setUser(response.data);
    } catch (error) {
      setError(error?.response?.data?.message || "Forget password failed");
    }
  };

  const resetPassword = async (passwordData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post("/user/reset-password", passwordData);
      setUser(response.data);
    } catch (error) {
      setError(error?.response?.data?.message || "Reset password failed");
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async (credential) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post("/google/google-login", {
        Idtoken: credential,
      });
      setUser(response.data.user);
      localStorage.setItem("authToken", response.data.token);
      return response.data;
    } catch (err) {
      setError(err?.response?.data?.message || "Google Login failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        register,
        login,
        verifyOtp,
        forgetPassword,
        resetPassword,
        googleLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
