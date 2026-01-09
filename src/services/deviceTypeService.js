import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Get all device types
const getDeviceTypes = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/device-types`);
  return response.data;
};

export default {
  getDeviceTypes,
};
