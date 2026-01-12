import { useState, useEffect } from "react";
import { Table, message, Space } from "antd";
import storeService from "../../services/storeService";

// Component to display list of stores with pagination
function StoresList({ onEdit, refreshKey }) {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(
    import.meta.env.VITE_DEFAULT_PAGE_SIZE
  );

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
        <Space size={12}>
          <a href={`/stores/${record.id}`}>View Details</a>
          <a onClick={() => onEdit(record)}>Edit</a>
        </Space>
      ),
    },
  ];

  // Fetch stores from API
  const fetchStores = async (
    page = 1,
    pageSize = import.meta.env.VITE_DEFAULT_PAGE_SIZE
  ) => {
    setLoading(true);
    try {
      // Fetch stores with pagination
      const response = await storeService.getStores(page, pageSize);

      // Update state with fetched data
      setStores(response.stores || []);
      setTotal(response.meta.total || 0);
      setPageSize(response.meta.perPage);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching stores:", error);
      message.error("Failed to load stores");
    } finally {
      setLoading(false);
    }
  };

  // Load stores on component mount and when refreshKey changes
  useEffect(() => {
    fetchStores();
  }, [refreshKey]);

  return (
    // Render table with stores data
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
