import React from "react";
import "./App.css";
import RegisterForm from "./pages/register.jsx";
import LoginForm from "./pages/Login.jsx";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";
import { Navigate } from "react-router-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import VerifyOtp from "./pages/verifyOtp.jsx";
import ForgotPassword from "./pages/ForgetPassword.jsx";

const Layout = () => {
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const isAuthPage =
    location.pathname === "/register" ||
    location.pathname === "/login" ||
    location.pathname === "/verify-otp" ||
    location.pathname === "/forget-password";
  if (!user && !isAuthPage) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/forget-password" element={<ForgotPassword />} />

        <Route
          path="/"
          element={
            user ? (
              <div className="main-content">
                <h1>Main Content</h1>
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
