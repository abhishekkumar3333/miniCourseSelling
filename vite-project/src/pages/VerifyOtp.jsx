import React, { useState, useRef, useContext } from "react";
import { Mail, ShieldCheck, CheckCircle2 } from "lucide-react";
import { AuthContext } from "../context/authContext";
import { useNavigate, Link } from "react-router-dom";

const VerifyOtp = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const { verifyOtp, loading } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.nextSibling && element.value !== "") {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const validateErro = () => {
    let valid = true;
    setError(null);
    let newError = "";
    if (!email.trim()) {
      newError = "Email is required";
      valid = false;
    }
    setError(newError);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateErro()) return;
    const otpValue = otp.join("");

    const result = await verifyOtp({ email, otp: otpValue });

    if (result !== false) {
      setIsVerified(true);
      setEmail("");
      setOtp(new Array(6).fill(""));
    } else {
      setError("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 transition-all">
        {isVerified ? (
          <div className="text-center py-4 animate-in fade-in zoom-in duration-300">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="text-green-600 w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">OTP Verified!</h2>
            <p className="text-gray-500 mt-2 mb-6">
              Your email has been successfully verified.
            </p>
            <Link
              to="/login"
              className="inline-block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow-lg transition-all"
            >
              Go to Login
            </Link>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="text-indigo-600 w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Verify your email
              </h2>
              <p className="text-gray-500 mt-2">
                We've sent a 6-digit code to your inbox
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    placeholder="name@company.com"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {error && (
                  <div className="text-red-600 text-sm mt-2 font-medium">
                    {error}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                  Verification Code
                </label>
                <div className="flex justify-between gap-2">
                  {otp.map((data, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      ref={(el) => (inputRefs.current[index] = el)}
                      className="w-12 h-14 border-2 rounded-xl text-center text-xl font-bold text-indigo-600 border-gray-200 focus:border-indigo-500 focus:ring-2 outline-none transition-all"
                      value={data}
                      onChange={(e) => handleChange(e.target, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                    />
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-indigo-200 transition-all duration-200"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="text-sm text-indigo-600 hover:underline font-medium"
              >
                Back to Login
              </Link>
            </div>

            <p className="text-center mt-4 text-sm text-gray-500">
              Didn't receive the code?{" "}
              <button className="text-indigo-600 font-medium hover:underline">
                Resend OTP
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyOtp;
