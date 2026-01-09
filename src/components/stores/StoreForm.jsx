import { useState, useEffect } from "react";
import { Form, Input, Button, message, Select, Space, Row, Col } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import deviceTypeService from "../../services/deviceTypeService";

function StoreForm({ onSuccess }) {
  const [form] = Form.useForm();
  const [deviceTypes, setDeviceTypes] = useState([]);
  const [selectedDeviceTypes, setSelectedDeviceTypes] = useState([]);

  // Load device types on mount
  useEffect(() => {
    const loadDeviceTypes = async () => {
      try {
        const data = await deviceTypeService.getDeviceTypes();
        setDeviceTypes(data.deviceTypes || []);
      } catch (error) {
        console.error("Failed to load device types:", error);
      }
    };
    loadDeviceTypes();
  }, []);

  // Handle form submission
  const onFinish = (values) => {
    console.log("Form values:", values);
    message.success("Store saved successfully!");
    form.resetFields();
    setSelectedDeviceTypes([]);
    onSuccess?.();
  };

  // Get available device types (exclude already selected)
  const getAvailableDeviceTypes = () => {
    return deviceTypes.filter(
      (type) => !selectedDeviceTypes.includes(type.name)
    );
  };

  // Handle device type selection
  const handleDeviceTypeChange = (value) => {
    setSelectedDeviceTypes([...selectedDeviceTypes, value]);
  };

  // Handle remove device type
  const handleRemoveDeviceType = (removedType) => {
    setSelectedDeviceTypes(
      selectedDeviceTypes.filter((id) => id !== removedType)
    );
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        label="Store Number"
        name="storeNumber"
        rules={[{ required: true, message: "Please input store number!" }]}
      >
        <Input placeholder="Enter store number" />
      </Form.Item>

      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input store name!" }]}
      >
        <Input placeholder="Enter store name" />
      </Form.Item>

      {/* Expected Devices Section */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ marginBottom: 8, fontWeight: 500 }}>Expected Devices</div>
        <Form.List name="expectedDevices">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Row key={key} gutter={8} style={{ marginBottom: 8 }}>
                  <Col span={12}>
                    <Form.Item
                      {...restField}
                      name={[name, "deviceTypeId"]}
                      rules={[{ required: true, message: "Required" }]}
                    >
                      <Select
                        placeholder="Select device type"
                        onChange={handleDeviceTypeChange}
                      >
                        {getAvailableDeviceTypes().map((type) => (
                          <Select.Option key={type.id} value={type.name}>
                            {type.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      name={[name, "quantity"]}
                      rules={[{ required: true, message: "Required" }]}
                    >
                      <Input placeholder="Quantity" type="number" min={1} />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Button
                      type="text"
                      danger
                      icon={<MinusCircleOutlined />}
                      onClick={() => {
                        const deviceTypeId = form.getFieldValue([
                          "expectedDevices",
                          name,
                          "deviceTypeId",
                        ]);
                        handleRemoveDeviceType(deviceTypeId);
                        remove(name);
                      }}
                    />
                  </Col>
                </Row>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                  disabled={selectedDeviceTypes.length >= deviceTypes.length}
                >
                  Add Device Type
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </div>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Save Store
        </Button>
      </Form.Item>
    </Form>
  );
}

export default StoreForm;
