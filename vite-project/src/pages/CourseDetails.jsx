import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import {
  BookOpen,
  Clock,
  Layers,
  FileText,
  PlayCircle,
  ArrowLeft,
  Calendar,
  DollarSign,
  AlertCircle,
} from "lucide-react";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await api.get(`/course/${id}`);
        // Handle different possible response structures
        const data = response.data?.data || response.data;
        setCourse(data);
      } catch (err) {
        console.error("Failed to fetch course details", err);
        setError("Failed to load course details. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchCourseDetails();
  }, [id]);

  const handleEnroll = async () => {
    try {
      const response = await api.post(`/payment/create/${id}`, {});
      if (response.data.success) {
        alert("Enrollment successful!");
        // Optionally navigate or refresh
      }
    } catch (error) {
      console.error("Enrollment failed", error);
      alert("Enrollment failed. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-red-100 text-center max-w-md w-full">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-900">
            Error Loading Course
          </h3>
          <p className="text-gray-500 mt-2">{error || "Course not found"}</p>
          <button
            onClick={() => navigate("/courses")}
            className="mt-6 px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors w-full"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => navigate("/courses")}
            className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-colors mb-6 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to courses
          </button>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Course
                </span>
                <span className="flex items-center gap-1 text-gray-500 text-sm">
                  <Calendar className="w-4 h-4" />
                  {new Date(course.createdAt).toLocaleDateString()}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
                {course.title}
              </h1>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl leading-relaxed">
                {course.description}
              </p>
            </div>

            <div className="flex items-center gap-2 bg-green-50 px-6 py-3 rounded-2xl border border-green-100">
              <DollarSign className="w-6 h-6 text-green-600" />
              <span className="text-2xl font-bold text-green-700">
                {course.price ? course.price.toFixed(2) : "Free"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content: Modules & Lessons */}
          <div className="lg:col-span-2 space-y-10">
            {/* Modules Section */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                  <Layers className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Modules</h2>
              </div>

              {course.modules && course.modules.length > 0 ? (
                <div className="space-y-4">
                  {course.modules.map((module) => (
                    <div
                      key={module.id}
                      className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="p-5 border-b border-gray-50 bg-gray-50/50">
                        <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                          <FileText className="w-4 h-4 text-gray-400" />
                          {module.title}
                        </h3>
                      </div>
                      <div className="p-5 text-gray-600 text-sm leading-relaxed">
                        {module.content}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl border border-dashed border-gray-300 p-8 text-center">
                  <p className="text-gray-500">No structured modules yet.</p>
                </div>
              )}
            </section>

            {/* Lessons Section */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                  <PlayCircle className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Lessons</h2>
              </div>

              {course.lessions && course.lessions.length > 0 ? (
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Title
                        </th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Topic
                        </th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Duration
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {course.lessions.map((lesson) => (
                        <tr
                          key={lesson.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="font-medium text-gray-900">
                              {lesson.title}
                            </div>
                            {lesson.description && (
                              <div className="text-xs text-gray-500 mt-0.5 truncate max-w-xs">
                                {lesson.description}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
                              {lesson.topic}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            {lesson.duration} min
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="bg-white rounded-xl border border-dashed border-gray-300 p-8 text-center">
                  <p className="text-gray-500">No lessons uploaded yet.</p>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar / Stats */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Course Stats
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                      <Layers className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-gray-700">
                      Start Modules
                    </span>
                  </div>
                  <span className="font-bold text-gray-900">
                    {course.modules?.length || 0}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-pink-100 rounded-lg text-pink-600">
                      <PlayCircle className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-gray-700">
                      Total Lessons
                    </span>
                  </div>
                  <span className="font-bold text-gray-900">
                    {course.lessions?.length || 0}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg text-green-600">
                      <Clock className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-gray-700">
                      Total Duration
                    </span>
                  </div>
                  <span className="font-bold text-gray-900">
                    {course.lessions?.reduce(
                      (acc, curr) => acc + (curr.duration || 0),
                      0
                    ) || 0}{" "}
                    min
                  </span>
                </div>
              </div>

              <button
                onClick={handleEnroll}
                className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-indigo-200"
              >
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
