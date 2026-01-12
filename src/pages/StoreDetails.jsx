import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Layout,
  Descriptions,
  Table,
  Tag,
  Card,
  Space,
  Button,
  Modal,
  message,
  Popconfirm,
} from "antd";
import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import storeService from "../services/storeService";
import expectedDeviceService from "../services/expectedDeviceService";
import ExpectedDeviceForm from "../components/stores/ExpectedDeviceForm";

const { Header, Content } = Layout;

// Store Details Page Component
function StoreDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [completenessStatus, setCompletenessStatus] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDevice, setEditingDevice] = useState(null);

  // Fetch store details
  const fetchStoreDetails = async () => {
    setLoading(true);
    try {
      const response = await storeService.getStoreById(id);
      // Set store data and completeness status
      setStore(response.data);
      fetchCompletenessStatus(response.data);
    } catch (error) {
      message.error("Failed to load store details", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Determine completeness status
  // A store is complete if all expected devices are fully registered
  const fetchCompletenessStatus = (storeData) => {
    const expectedDevices = storeData.expectedDevices || [];

    if (expectedDevices.length === 0) {
      setCompletenessStatus(false);
    } else {
      const inCompleteDevices = expectedDevices.filter(
        (device) =>
          parseInt(device.expectedQuantity) >
          parseInt(device.registeredQuantity)
      );
      setCompletenessStatus(inCompleteDevices.length === 0);
    }
  };

  useEffect(() => {
    fetchStoreDetails();
  }, [id]);

  // Handle adding a new expected device
  const handleAddDevice = () => {
    setEditingDevice(null);
    setIsModalOpen(true);
  };

  // Handle editing an expected device
  const handleEditDevice = (device) => {
    setEditingDevice(device);
    setIsModalOpen(true);
  };

  // Handle deleting an expected device
  const handleDeleteDevice = async (deviceId) => {
    try {
      await expectedDeviceService.deleteExpectedDevice(id, deviceId);
      message.success("Expected device deleted successfully!");
      fetchStoreDetails();
    } catch {
      message.error("Failed to delete expected device");
    }
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingDevice(null);
    fetchStoreDetails();
  };

  // Table columns for expected devices
  const expectedColumns = [
    {
      title: "Device Type",
      dataIndex: ["deviceType", "name"],
      key: "deviceType",
    },
    {
      title: "Expected Quantity",
      dataIndex: "expectedQuantity",
      key: "expectedQuantity",
    },
    {
      title: "Registered Quantity",
      dataIndex: "registeredQuantity",
      key: "registeredQuantity",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <a onClick={() => handleEditDevice(record)}>Edit</a>
          <Popconfirm
            title="Are you sure you want to delete this expected device?"
            onConfirm={() => handleDeleteDevice(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <a>Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // Table columns for registered devices
  const registeredColumns = [
    {
      title: "Serial Number",
      dataIndex: "serialNumber",
      key: "serialNumber",
    },
    {
      title: "Device Type",
      dataIndex: ["deviceType", "name"],
      key: "deviceType",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  if (loading || !store) {
    return <div>Loading...</div>;
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Header with back button */}
      <Header style={{ background: "#fff", padding: "0 50px" }}>
        <Space>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(-1)}
            style={{ marginRight: "16px" }}
          />
          <h1 style={{ margin: 0 }}>Store Details</h1>
        </Space>
      </Header>
      {/* Content area */}
      <Content style={{ background: "#fff", padding: "24px 50px" }}>
        {/* Store Information Card */}
        <Card title="Store Information">
          <Descriptions column={2}>
            <Descriptions.Item label="Store Number">
              {store.storeNumber}
            </Descriptions.Item>
            <Descriptions.Item label="Name">{store.name}</Descriptions.Item>
            <Descriptions.Item label="Status">{store.status}</Descriptions.Item>
            <Descriptions.Item label="Completeness">
              {completenessStatus ? "✔" : "✖"}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        {/* Expected Devices Card */}
        <Card
          title="Expected Devices"
          extra={
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddDevice}
              size="small"
            >
              Add
            </Button>
          }
        >
          <Table
            columns={expectedColumns}
            dataSource={store.expectedDevices}
            rowKey="id"
            pagination={false}
            size="small"
          />
        </Card>

        {/* Registered Devices Card */}
        <Card title="Registered Devices">
          <Table
            columns={registeredColumns}
            dataSource={store.devices}
            rowKey="id"
            pagination={false}
            size="small"
          />
        </Card>
      </Content>

      {/* Modal for adding/editing expected devices */}
      <Modal
        title={editingDevice ? "Edit Expected Device" : "Add Expected Device"}
        open={isModalOpen}
        onCancel={handleModalClose}
        footer={null}
      >
        <ExpectedDeviceForm
          storeId={id}
          onSuccess={handleModalClose}
          editingDevice={editingDevice}
          existingDevices={store?.expectedDevices}
        />
      </Modal>
    </Layout>
  );
}

export default StoreDetails;
