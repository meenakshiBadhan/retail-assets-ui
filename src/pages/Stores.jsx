import { useState } from "react";
import { Layout, Button, Modal } from "antd";
import StoresList from "../components/stores/StoresList";
import StoreForm from "../components/stores/StoreForm";

const { Header, Content } = Layout;

function Stores() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Show modal for creating a new store
  const showModal = () => {
    setIsModalOpen(true);
  };

  // Handle modal cancel action
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Layout>
      <Header
        style={{
          background: "#fff",
          display: "flex",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            margin: 0,
            marginRight: "auto",
          }}
        >
          Stores
        </h1>
        <Button type="primary" onClick={showModal}>
          Create Store
        </Button>
      </Header>
      <Content
        style={{
          background: "#fff",
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <StoresList />
      </Content>
      <Modal title="Create Store" open={isModalOpen} onCancel={handleCancel}>
        <StoreForm onSuccess={handleCancel} />
      </Modal>
    </Layout>
  );
}

export default Stores;
