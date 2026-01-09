import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Layout, Descriptions, Table, Tag, Card, Space, message } from "antd";
import storeService from "../services/storeService";

const { Header, Content } = Layout;

function StoreDetails() {
  const { id } = useParams();
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch store details
  const fetchStoreDetails = async () => {
    setLoading(true);
    try {
      const response = await storeService.getStoreById(id);
      setStore(response.data);
    } catch (error) {
      message.error("Failed to load store details", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStoreDetails();
  }, [id]);

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
  ];

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
    <Layout>
      <Header style={{ background: "#fff", padding: "0 50px" }}>
        <Space>
          <h1 style={{ margin: 0 }}>Store Details</h1>
        </Space>
      </Header>
      <Content style={{ background: "#fff", padding: "0 50px" }}>
        <Card title="Store Information">
          <Descriptions column={2}>
            <Descriptions.Item label="Store Number">
              {store.storeNumber}
            </Descriptions.Item>
            <Descriptions.Item label="Name">{store.name}</Descriptions.Item>
            <Descriptions.Item label="Status">{store.status}</Descriptions.Item>
            <Descriptions.Item label="Completeness">
              {store.expectedDevices.length > 0 ? "✔" : "✖"}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        <Card title="Expected Devices">
          <Table
            columns={expectedColumns}
            dataSource={store.expectedDevices}
            rowKey="id"
            pagination={false}
            size="small"
          />
        </Card>

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
    </Layout>
  );
}

export default StoreDetails;
