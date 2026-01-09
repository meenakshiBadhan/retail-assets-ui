import { useState, useEffect } from "react";
import { Layout, Form, Input, Button, Select, message } from "antd";
import deviceService from "../services/deviceService";
import storeService from "../services/storeService";
import deviceTypeService from "../services/deviceTypeService";

const { Header, Content } = Layout;

function DeviceRegistration() {
  const [form] = Form.useForm();
  const [stores, setStores] = useState([]);
  const [deviceTypes, setDeviceTypes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load stores and device types on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const storesData = await storeService.getStores();
        setStores(storesData.stores || storesData || []);

        const deviceTypesData = await deviceTypeService.getDeviceTypes();
        setDeviceTypes(deviceTypesData.deviceTypes || deviceTypesData || []);
      } catch (error) {
        message.error("Failed to load data", error.message);
      }
    };
    loadData();
  }, []);

  // Handle form submission
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await deviceService.registerDevice(values);

      if (response.success) {
        message.success("Device registered successfully!");
        form.resetFields();
      } else {
        message.error(response.message || "Registration failed");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Registration failed";
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ background: "#fff", padding: "0 50px" }}>
        <h1 style={{ margin: 0 }}>Device Registration</h1>
      </Header>
      <Content style={{ padding: "50px", background: "#fff" }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          style={{ maxWidth: 500 }}
        >
          <Form.Item
            label="Serial Number"
            name="serialNumber"
            rules={[{ required: true, message: "Please input serial number!" }]}
          >
            <Input placeholder="Enter serial number" />
          </Form.Item>

          <Form.Item
            label="Device Type"
            name="deviceTypeId"
            rules={[{ required: true, message: "Please select device type!" }]}
          >
            <Select placeholder="Select device type">
              {deviceTypes.map((type) => (
                <Select.Option key={type.id} value={type.id}>
                  {type.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Store"
            name="storeId"
            rules={[{ required: true, message: "Please select store!" }]}
          >
            <Select placeholder="Select store">
              {stores.map((store) => (
                <Select.Option key={store.id} value={store.id}>
                  {store.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Register Device
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
}

export default DeviceRegistration;
