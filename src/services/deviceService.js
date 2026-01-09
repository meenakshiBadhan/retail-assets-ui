import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const registerDevice = async (deviceData) => {
  const response = await axios.post(`${API_BASE_URL}/api/devices`, deviceData);
  return response.data;
};

export default {
  registerDevice,
};
