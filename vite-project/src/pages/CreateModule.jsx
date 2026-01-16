import React, { useState, useEffect } from "react";
import api from "../utils/api";
import {
  Layers,
  FileText,
  BookOpen,
  ChevronDown,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const CreateModule = () => {
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);

  const [formData, setFormData] = useState({
    courseId: "",
    title: "",
    content: "",
  });

  const [status, setStatus] = useState("idle"); // idle, submitting, success, error
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get("/course/all-courses");
        const data = response.data;
        const payload = data?.courses ?? data ?? [];

        let normalized = [];
        if (Array.isArray(payload)) {
          normalized = payload;
        } else if (payload && typeof payload === "object") {
          if (Array.isArray(payload.data)) normalized = payload.data;
          else normalized = Object.values(payload);
        }

        setCourses(normalized);
      } catch (err) {
        console.error("Failed to fetch courses", err);
      } finally {
        setLoadingCourses(false);
      }
    };
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.courseId) {
      alert("Please select a course");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      await api.post(`/module/create/${formData.courseId}`, {
        title: formData.title,
        content: formData.content,
      });

      setStatus("success");
      setFormData({ ...formData, title: "", content: "" }); // Keep course selected

      // Reset success message after 3 seconds
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      console.error(error);
      setStatus("error");
      setErrorMessage(
        error.response?.data?.message ||
          error.response?.data?.errors?.[0]?.message ||
          "Failed to create module"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 bg-gradient-to-br from-indigo-50 to-blue-50">
      <div className="bg-white max-w-xl w-full rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-indigo-600 p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute right-0 top-0 transform translate-x-1/3 -translate-y-1/3 w-64 h-64 bg-white rounded-full"></div>
            <div className="absolute left-0 bottom-0 transform -translate-x-1/3 translate-y-1/3 w-64 h-64 bg-white rounded-full"></div>
          </div>

          <div className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm relative z-10">
            <Layers className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-extrabold text-white relative z-10">
            Create Module
          </h2>
          <p className="text-indigo-100 mt-2 relative z-10">
            Structure your course content effectively
          </p>
        </div>

        <div className="p-8">
          {status === "success" && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 text-green-700 mb-6 animate-fade-in">
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <p className="font-medium">Module created successfully!</p>
            </div>
          )}

          {status === "error" && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700 mb-6 animate-fade-in">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="font-medium">{errorMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Course Selection */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-500" />
                Select Course
              </label>
              <div className="relative">
                <select
                  name="courseId"
                  value={formData.courseId}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all bg-gray-50 focus:bg-white appearance-none cursor-pointer"
                  disabled={loadingCourses}
                >
                  <option value="" disabled>
                    {loadingCourses
                      ? "Loading courses..."
                      : "Choose a course..."}
                  </option>
                  {courses.map((course) => (
                    <option
                      key={course.id || course._id}
                      value={course.id || course._id}
                    >
                      {course.title || course.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
              {courses.length === 0 && !loadingCourses && (
                <p className="text-xs text-amber-600">
                  No courses found. Create a course first.
                </p>
              )}
            </div>

            {/* Module Title */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-500" />
                Module Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. React Fundamentals"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all bg-gray-50 focus:bg-white"
              />
            </div>

            {/* Module Content */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-500" />
                Content Overview
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Describe what this module covers..."
                required
                rows="4"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all bg-gray-50 focus:bg-white resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={
                status === "submitting" ||
                loadingCourses ||
                courses.length === 0
              }
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            >
              {status === "submitting" ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Creating Module...
                </>
              ) : (
                "Create Module"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateModule;
