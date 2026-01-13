export const server = import.meta.env.API_URL || "http://localhost:3000/api/V1";
export const getAllCourses = `${server}/course/all-courses`;
