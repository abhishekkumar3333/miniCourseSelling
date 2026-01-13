export const isAuthenticated = () => {
  const token = localStorage.getItem("authToken");
  return !!token;
};

export const logout = () => {
  localStorage.removeItem("authToken");
};
