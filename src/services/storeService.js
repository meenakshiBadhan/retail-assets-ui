import axios from "axios";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

// Get all stores with pagination
const getStores = async (page = 1, limit = 10) => {
  const response = await api.get(`/api/stores?page=${page}&limit=${limit}`);
  return response.data;
};

// Get single store by ID
const getStoreById = async (id) => {
  const response = await api.get(`/api/stores/${id}`);
  return response.data;
};

// Create new store
const createStore = async (storeData) => {
  const response = await api.post("/api/stores", storeData);
  return response.data;
};

export default {
  getStores,
  getStoreById,
  createStore,
};
