import axiosApi from "./requestInterceptor";

// Register a new device
const registerDevice = async (deviceData) => {
  const response = await axiosApi.post(`/api/devices`, deviceData);
  return response.data;
};

// Get devices with pagination
const getDevices = async (
  apiParams,
  page = 1,
  pageSize = import.meta.env.VITE_DEFAULT_PAGE_SIZE
) => {
  const response = await axiosApi.get(`/api/devices`, {
    params: { ...apiParams, page, pageSize },
  });
  return response.data;
};

// Get expected devices with pagination
const getExpectedDevices = async (
  apiParams,
  page = 1,
  pageSize = import.meta.env.VITE_DEFAULT_PAGE_SIZE
) => {
  const response = await axiosApi.get(`/api/expected-devices`, {
    params: { ...apiParams, page, pageSize },
  });
  return response.data;
};

export default {
  registerDevice,
  getDevices,
  getExpectedDevices,
};
