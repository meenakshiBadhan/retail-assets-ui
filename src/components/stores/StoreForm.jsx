import { useState, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import storeService from "../../services/storeService";

// Component for creating and editing stores
function StoreForm({ onSuccess, editingStore }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Set form values if editing
  useEffect(() => {
    if (editingStore) {
      form.setFieldsValue({
        storeNumber: editingStore.storeNumber,
        name: editingStore.name,
      });
    }
  }, [editingStore]);

  // Handle form submission
  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Create or update store based on editing state
      if (editingStore) {
        await storeService.updateStore(editingStore.id, values);
        message.success("Store updated successfully!");
      } else {
        await storeService.createStore(values);
        message.success("Store created successfully!");
      }
      // Reset form and notify parent component
      form.resetFields();
      onSuccess?.();
    } catch (error) {
      message.error("Failed to save store", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    // Create store form
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

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          {editingStore ? "Update Store" : "Save Store"}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default StoreForm;
