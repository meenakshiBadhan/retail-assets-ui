import { useState } from "react";
import { Layout, Button, Modal } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import StoresList from "../components/stores/StoresList";
import StoreForm from "../components/stores/StoreForm";

const { Header, Content } = Layout;

// Stores Page Component
function Stores() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStore, setEditingStore] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // Show modal for creating a new store
  const showModal = () => {
    setEditingStore(null);
    setIsModalOpen(true);
  };

  // Show modal for editing a store
  const handleEdit = (store) => {
    setEditingStore(store);
    setIsModalOpen(true);
  };

  // Handle modal cancel action and refresh
  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingStore(null);
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Header with navigation and create store button */}
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
            marginRight: "auto",
          }}
        >
          Stores
        </h1>
        <Button type="primary" onClick={showModal}>
          Create Store
        </Button>
      </Header>

      {/* Stores List */}
      <Content
        style={{
          background: "#fff",
          padding: "24px",
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <StoresList onEdit={handleEdit} refreshKey={refreshKey} />
      </Content>

      {/* Modal for creating/editing stores */}
      <Modal
        title={editingStore ? "Edit Store" : "Create Store"}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <StoreForm onSuccess={handleCancel} editingStore={editingStore} />
      </Modal>
    </Layout>
  );
}

export default Stores;
