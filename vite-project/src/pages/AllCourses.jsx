import React, { useEffect, useState } from "react";
import api from "../utils/api.js";
import useUserProfile from "../component/GetUSerProfile";
import { BookOpen, AlertCircle, Search, Layers, Trash } from "lucide-react";

const AllCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useUserProfile();
  const [open, setOpen] = useState(false);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await api.delete(`/course/delete-course/${id}`);
      setCourses((prev) =>
        prev.filter((course) => (course.id ?? course._id) !== id)
      );
    } catch (err) {
      alert("Failed to delete course");
      console.error(err);
    }
  };

  useEffect(() => {
    let mounted = true;

    (async () => {
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

        if (mounted) setCourses(normalized);
      } catch (err) {
        if (mounted) setError(err.message || "Failed to fetch courses");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => (mounted = false);
  }, []);

  // --- UI Sub-components ---
  const SkeletonCard = () => (
    <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 bg-white rounded-xl border border-gray-100 p-5 space-y-4 animate-pulse">
      <div className="h-40 bg-gray-200 rounded-lg w-full"></div>
      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      <div className="h-10 bg-gray-100 rounded-lg w-full mt-4"></div>
    </div>
  );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="text-center bg-white p-8 rounded-2xl shadow-sm border border-red-100">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-900">
            Oops! Error occurred
          </h3>
          <p className="text-gray-500 mt-2">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-xl font-extrabold text-gray-700 sm:text-4xl">
                Explore All Courses
              </h1>
              <p className="mt-3 text-lg text-gray-500">
                Unlock your potential with our expert-led online curriculum.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-3">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for courses..."
                  className="pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none w-full md:w-80"
                />
              </div>
              <div className="flex items-center gap-2 cursor-pointer">
                <div
                  className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center"
                  onClick={() => setOpen(true)}
                >
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {loading ? (
          <div className="flex flex-wrap gap-8 justify-center">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            <Layers className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900">
              No courses available
            </h3>
            <p className="text-gray-500 mt-2">
              Check back later or try a different search term.
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-8 items-center justify-center">
            {courses.map((c) => (
              <div
                key={c.id ?? c._id}
                className="
                  w-full
                  sm:w-1/2
                  lg:w-1/3
                  xl:w-1/8
                  bg-white
                  rounded-2xl
                  border
                  border-gray-200
                  overflow-hidden
                  hover:shadow-xl
                  transition
                "
              >
                <div className="relative h-40 bg-indigo-600">
                  <BookOpen className="absolute bottom-4 right-4 text-white/20 w-16 h-16" />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {c.title ?? c.name}
                  </h3>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <span className="text-indigo-600 font-bold">
                      {c.price ? `$${c.price}` : "Free"}
                    </span>
                    <div className="flex gap-2">
                      <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm">
                        View Details
                      </button>
                      <button
                        onClick={() => handleDelete(c.id ?? c._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {open && user && (
        <div className="fixed top-16 right-6 bg-white shadow-xl rounded-xl p-5 w-72">
          <h3 className="font-semibold text-lg">{user.name}</h3>
          <p className="text-sm text-gray-500">{user.email}</p>

          <div className="mt-3 text-sm">
            <p>Email: {user.email}</p>
            <p>IsSubscribed: {user.IsSubscribed ? "Yes" : "No"}</p>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="mt-4 w-full bg-gray-100 rounded-lg py-2"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default AllCoursesPage;
