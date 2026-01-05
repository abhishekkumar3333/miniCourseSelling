import axios from "axios";

const API_BASE = import.meta.env.API_URL || "http://localhost:3000/api/V1";

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-type": "application/json",
  },
});

export default api;
