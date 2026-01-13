import axios from "axios";
import { server } from "./server.js";

const api = axios.create({
  baseURL: server,
  headers: {
    "Content-type": "application/json",
  },
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
