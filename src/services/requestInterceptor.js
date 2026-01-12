import axios from "axios";

// Create axios instance with base configuration
const axiosApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

export default axiosApi;
