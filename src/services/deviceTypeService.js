import axiosApi from "./requestInterceptor";

// Get all device types
const getDeviceTypes = async () => {
  const response = await axiosApi.get(`/api/device-types`);
  return response.data;
};

export default {
  getDeviceTypes,
};
