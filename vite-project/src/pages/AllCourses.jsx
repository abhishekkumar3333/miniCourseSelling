import React, { useEffect, useState } from "react";
import { getAllCourses } from "../hooks/getAllCourses";
import { BookOpen, AlertCircle, Search, Layers } from "lucide-react";

const AllCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getAllCourses();
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
    <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-4 animate-pulse">
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
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                Explore All Courses
              </h1>
              <p className="mt-3 text-lg text-gray-500">
                Unlock your potential with our expert-led online curriculum.
              </p>
            </div>
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors w-5 h-5" />
              <input
                type="text"
                placeholder="Search for courses..."
                className="pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none w-full md:w-80 transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 align-center">
        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : courses.length === 0 ? (
          /* Empty State */
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
          /* Course Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {courses.map((c) => (
              <div
                key={c.id ?? c._id ?? c.slug}
                className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-2xl hover:shadow-indigo-100 hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                {/* Image Placeholder/Visual */}
                <div className="h-48 bg-gradient-to-br from-indigo-500 to-purple-600 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                  <BookOpen className="absolute bottom-4 right-4 text-white/20 w-16 h-16" />
                  <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-white uppercase tracking-wider">
                    {c.category ?? "Development"}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors mb-3">
                    {c.title ?? c.name}
                  </h3>

                  {c.description && (
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">
                      {c.description}
                    </p>
                  )}

                  <div className="pt-4 border-t border-gray-100 mt-auto flex items-center justify-between">
                    <span className="text-indigo-600 font-bold text-lg">
                      {c.price ? `$${c.price}` : "Free"}
                    </span>
                    <button className="bg-gray-900 text-white text-sm px-4 py-2 rounded-lg font-medium hover:bg-indigo-600 transition-colors shadow-sm">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCoursesPage;
