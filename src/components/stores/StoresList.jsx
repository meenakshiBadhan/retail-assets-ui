import { useState, useEffect } from "react";
import { Table, message } from "antd";
import storeService from "../../services/storeService";

function StoresList() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Table columns configuration
  const columns = [
    {
      title: "Store Number",
      dataIndex: "storeNumber",
      key: "storeNumber",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <a href={`/stores/${record.id}`}>View Details</a>
      )
    },
  ];

  // Fetch stores from API
  const fetchStores = async (page = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const response = await storeService.getStores(page, pageSize);
      setStores(response.stores || []);
      setTotal(response.meta.total || 0);
      setPageSize(response.meta.perPage || 10);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching stores:", error);
      message.error("Failed to load stores");
    } finally {
      setLoading(false);
    }
  };

  // Load stores on component mount
  useEffect(() => {
    fetchStores();
  }, []);

  return (
    <Table
      columns={columns}
      dataSource={stores}
      loading={loading}
      pagination={{
        total: total,
        pageSize: pageSize,
        current: currentPage,
        onChange: (page, pageSize) => fetchStores(page, pageSize),
      }}
      rowKey="id"
      style={{ width: "100%", margin: "0 auto" }}
    />
  );
}

export default StoresList;
