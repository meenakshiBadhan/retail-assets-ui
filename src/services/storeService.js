import axiosApi from "./requestInterceptor";

// Get all stores with pagination
const getStores = async (
  page = 1,
  limit = import.meta.env.VITE_DEFAULT_PAGE_SIZE
) => {
  const response = await axiosApi.get(
    `/api/stores?page=${page}&limit=${limit}`
  );
  return response.data;
};

// Get single store by ID
const getStoreById = async (id) => {
  const response = await axiosApi.get(`/api/stores/${id}`);
  return response.data;
};

// Create new store
const createStore = async (storeData) => {
  const response = await axiosApi.post("/api/stores", storeData);
  return response.data;
};

// Update store
const updateStore = async (id, storeData) => {
  const response = await axiosApi.put(`/api/stores/${id}`, storeData);
  return response.data;
};

export default {
  getStores,
  getStoreById,
  createStore,
  updateStore,
};
