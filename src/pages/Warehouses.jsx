import { useState } from "react";
import { Layout, Button, Modal, Tabs } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ExpectedDevicesList from "../components/devices/ExpectedDevicesList";
import RegisteredDevicesList from "../components/devices/RegisteredDevicesList";
import DeviceForm from "../components/devices/DeviceForm";

const { Header, Content } = Layout;

// Warehouses Page Component
function Warehouses() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assignDevice, setAssignDevice] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // Show modal for registering a new device
  const showModal = () => {
    setAssignDevice(null);
    setIsModalOpen(true);
  };

  // Handle device assignment
  const handleAssign = (device) => {
    setAssignDevice(device);
    setIsModalOpen(true);
  };

  // Handle modal cancel and refresh
  const handleCancel = () => {
    setIsModalOpen(false);
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Header section */}
      <Header
        style={{
          background: "#fff",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Button
          icon={<HomeOutlined />}
          onClick={() => navigate("/")}
          style={{ marginRight: "20px" }}
        />
        <h1
          style={{
            margin: 0,
            marginRight: "auto",
          }}
        >
          Warehouses
        </h1>
        {/* <Button type="primary" onClick={showModal}>
          Register Device
        </Button> */}
      </Header>

      {/* Content section */}
      <Content
        style={{
          background: "#fff",
          padding: "24px",
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <Tabs
          defaultActiveKey="expected"
          items={[
            {
              key: "expected",
              label: "Expected Devices",
              children: (
                <ExpectedDevicesList
                  onAssign={handleAssign}
                  refreshKey={refreshKey}
                />
              ),
            },
            {
              key: "registered",
              label: "Registered Devices",
              children: <RegisteredDevicesList refreshKey={refreshKey} />,
            },
          ]}
        />
      </Content>

      {/* Modal for registering devices */}
      <Modal
        title="Register Device"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <DeviceForm
          onSuccess={handleCancel}
          storeId={assignDevice?.store?.id}
          deviceTypeId={assignDevice?.deviceType?.id}
        />
      </Modal>
    </Layout>
  );
}

export default Warehouses;
