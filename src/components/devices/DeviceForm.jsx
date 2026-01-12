import { useState, useEffect } from "react";
import { Form, Input, Button, Select, message } from "antd";
import deviceService from "../../services/deviceService";
import storeService from "../../services/storeService";
import deviceTypeService from "../../services/deviceTypeService";

// Component for registering a new device
function DeviceForm({ onSuccess, storeId, deviceTypeId }) {
  const [form] = Form.useForm();
  const [stores, setStores] = useState([]);
  const [deviceTypes, setDeviceTypes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load stores and device types on mount
    const loadData = async () => {
      try {
        // Reset form fields
        form.resetFields();

        // Fetch stores
        const storesData = await storeService.getStores(1, 100);
        setStores(storesData.stores || storesData || []);

        // Fetch device types
        const deviceTypesData = await deviceTypeService.getDeviceTypes();
        setDeviceTypes(deviceTypesData.deviceTypes || deviceTypesData || []);

        // Set default values if provided
        if (storeId || deviceTypeId) {
          form.setFieldsValue({
            storeId,
            deviceTypeId,
          });
        }
      } catch {
        message.error("Failed to load data");
      }
    };
    loadData();
  }, [storeId, deviceTypeId]);

  // Handle form submission
  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Register the device
      const response = await deviceService.registerDevice(values);
      if (response.success) {
        message.success("Device registered successfully!");
        form.resetFields();
        onSuccess();
      } else {
        message.error(response.message || "Registration failed");
      }
    } catch (error) {
      message.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    // Device registration form
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        label="Store"
        name="storeId"
        rules={[{ required: true, message: "Please select store!" }]}
      >
        <Select placeholder="Select store" disabled={!!storeId}>
          {stores.map((store) => (
            <Select.Option key={store.id} value={store.id}>
              {store.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Device Type"
        name="deviceTypeId"
        rules={[{ required: true, message: "Please select device type!" }]}
      >
        <Select placeholder="Select device type" disabled={!!deviceTypeId}>
          {deviceTypes.map((type) => (
            <Select.Option key={type.id} value={type.id}>
              {type.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Serial Number"
        name="serialNumber"
        rules={[{ required: true, message: "Please input serial number!" }]}
      >
        <Input placeholder="Enter serial number" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          Register Device
        </Button>
      </Form.Item>
    </Form>
  );
}

export default DeviceForm;
