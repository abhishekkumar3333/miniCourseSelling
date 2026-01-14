export const server = import.meta.env.API_URL || "http://localhost:3000/api/V1";
export const getAllCourses = `${server}/course/all-courses`;
export const getAllUsers = `${server}/user/all-users`;
export const courseDeletedById = (id) => `${server}/course/delete-course/${id}`;
export const userDeletedById = (id) => `${server}/user/delete-user/${id}`;
export const getUserProfile = `${server}/user/get-user-profile`;
