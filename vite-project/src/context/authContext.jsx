import React, { useState, createContext } from "react";
import api from "../lib/api.js";

export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const login = async (credential) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post("/user/login", credential);
      setUser(response.data);
      localStorage.setItem("authToken", response.data.token);
      setLoading(false);
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, register, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
