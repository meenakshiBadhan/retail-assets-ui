import axiosApi from "./requestInterceptor";

// Add expected device to store
const addExpectedDevice = async (storeId, deviceData) => {
  const response = await axiosApi.post(`/api/stores/${storeId}/expected-devices`, deviceData);
  return response.data;
};

// Update expected device
const updateExpectedDevice = async (storeId, deviceId, deviceData) => {
  const response = await axiosApi.put(`/api/stores/${storeId}/expected-devices/${deviceId}`, deviceData);
  return response.data;
};

// Delete expected device
const deleteExpectedDevice = async (storeId, deviceId) => {
  const response = await axiosApi.delete(`/api/stores/${storeId}/expected-devices/${deviceId}`);
  return response.data;
};

export default {
  addExpectedDevice,
  updateExpectedDevice,
  deleteExpectedDevice,
};