import React, { useContext, useState } from "react";
import { Mail, ArrowLeft, KeyRound } from "lucide-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const { forgetPassword } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgetPassword(email);
    setEmail("");
    setError("");

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    try {
      console.log("Sending reset link to:", email);

      setIsSubmitted(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        {isSubmitted ? (
          <div className="text-center animate-in fade-in zoom-in duration-300">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="text-green-600 w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              Check your email
            </h2>
            <p className="text-gray-500 mt-2 mb-6">
              We've sent password reset instructions to <br />
              <span className="font-medium text-gray-800">{email}</span>
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="text-indigo-600 font-semibold hover:underline"
            >
              Didn't receive the email? Try again
            </button>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <KeyRound className="text-indigo-600 w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Forgot password?
              </h2>
              <p className="text-gray-500 mt-2">
                No worries, we'll send you reset instructions.
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
                    placeholder="Enter your email"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg outline-none transition-all ${
                      error
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                    } focus:ring-2`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-indigo-200 transition-all duration-200"
              >
                Reset Password
              </button>
            </form>

            <div className="mt-8 text-center">
              <Link
                to="/login"
                className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to log in
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
