import api from "../lib/api";

export const getAllCourses = async () => {
  try {
    const response = await api.get("/course/all-courses");
    return response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};
