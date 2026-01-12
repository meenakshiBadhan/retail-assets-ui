import { useState, useEffect } from "react";
import { Form, Input, Button, Select, message } from "antd";
import deviceTypeService from "../../services/deviceTypeService";
import expectedDeviceService from "../../services/expectedDeviceService";

// Component for adding/editing expected devices in a store
function ExpectedDeviceForm({
  onSuccess,
  storeId,
  editingDevice,
  existingDevices,
}) {
  const [form] = Form.useForm();
  const [deviceTypes, setDeviceTypes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load device types on mount
    const loadDeviceTypes = async () => {
      try {
        const data = await deviceTypeService.getDeviceTypes();
        setDeviceTypes(data.deviceTypes || []);
      } catch {
        message.error("Failed to load device types");
      }
    };
    loadDeviceTypes();

    // Set form values if editing
    if (editingDevice) {
      form.setFieldsValue({
        deviceTypeId: editingDevice.deviceType?.name,
        quantity: editingDevice.expectedQuantity,
      });
    }
  }, [editingDevice]);

  // Get available device types (exclude already added ones)
  const getAvailableDeviceTypes = () => {
    if (editingDevice) {
      // When editing, show all device types
      return deviceTypes;
    }
    // When adding, exclude device types that are already in the list
    const existingDeviceTypeIds =
      existingDevices?.map((d) => d.deviceType?.id) || [];
    return deviceTypes.filter(
      (type) => !existingDeviceTypeIds.includes(type.id)
    );
  };

  // Handle form submission
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const deviceType = deviceTypes.find(
        (dt) => dt.name === values.deviceTypeId
      );
      const submitData = {
        deviceTypeId: deviceType?.id,
        expectedQuantity: values.quantity,
      };

      // Add or update expected device based on editing state
      if (editingDevice) {
        await expectedDeviceService.updateExpectedDevice(
          storeId,
          editingDevice.id,
          submitData
        );
        message.success("Expected device updated successfully!");
      } else {
        await expectedDeviceService.addExpectedDevice(storeId, submitData);
        message.success("Expected device added successfully!");
      }
      form.resetFields();
      onSuccess();
    } catch {
      message.error("Failed to save expected device");
    } finally {
      setLoading(false);
    }
  };

  return (
    // Expected device form
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        label="Device Type"
        name="deviceTypeId"
        rules={[{ required: true, message: "Please select device type!" }]}
      >
        <Select placeholder="Select device type" disabled={!!editingDevice}>
          {getAvailableDeviceTypes().map((type) => (
            <Select.Option key={type.id} value={type.name}>
              {type.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Quantity"
        name="quantity"
        rules={[{ required: true, message: "Please input quantity!" }]}
      >
        <Input placeholder="Enter quantity" type="number" min={1} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          {editingDevice ? "Update" : "Add"}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default ExpectedDeviceForm;
