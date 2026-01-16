import React, { useContext } from "react";
import "./App.css";
import RegisterForm from "./pages/register.jsx";
import LoginForm from "./pages/Login.jsx";
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
import NewPassword from "./pages/NewPassword.jsx";
import AllCoursesPage from "./pages/AllCourses.jsx";
import AllUsers from "./pages/AllUsers.jsx";
import CreateLesson from "./pages/CreateLesson.jsx";
import CreateModule from "./pages/CreateModule.jsx";
import CourseDetails from "./pages/CourseDetails.jsx";
import DashboardLayout from "./component/DashboardLayout.jsx";

const Layout = () => {
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const isAuthPage =
    location.pathname === "/register" ||
    location.pathname === "/login" ||
    location.pathname === "/verify-otp" ||
    location.pathname === "/forget-password" ||
    location.pathname === "/reset-password";

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
        <Route path="/reset-password" element={<NewPassword />} />

        {/* Protected Routes Wrapped in DashboardLayout */}
        <Route
          element={
            user ? <DashboardLayout /> : <Navigate to="/login" replace />
          }
        >
          <Route path="/" element={<Navigate to="/courses" replace />} />
          <Route path="/courses" element={<AllCoursesPage />} />
          <Route path="/course/:id" element={<CourseDetails />} />
          <Route path="/create-lesson" element={<CreateLesson />} />
          <Route path="/create-module" element={<CreateModule />} />
          <Route path="/users" element={<AllUsers />} />
        </Route>
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
