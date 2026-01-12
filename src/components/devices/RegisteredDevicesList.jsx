import { useState, useEffect } from "react";
import { Table, message } from "antd";
import { useNavigate } from "react-router-dom";
import deviceService from "../../services/deviceService";

// Registered Devices List Component
function RegisteredDevicesList({ refreshKey }) {
  const navigate = useNavigate();
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(
    import.meta.env.VITE_DEFAULT_PAGE_SIZE
  );

  // Table columns
  const columns = [
    {
      title: "Serial Number",
      dataIndex: "serialNumber",
      key: "serialNumber",
    },
    {
      title: "Store",
      key: "store",
      render: (_, record) => (
        <a onClick={() => navigate(`/stores/${record.store?.id}`)}>
          {record.store?.name}
        </a>
      ),
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

  // Fetch registered devices with pagination
  const fetchDevices = async (
    page = 1,
    pageSize = import.meta.env.VITE_DEFAULT_PAGE_SIZE10
  ) => {
    setLoading(true);
    try {
      // Fetch devices with status 'assigned'
      const response = await deviceService.getDevices(
        { deviceStatus: "assigned" },
        page,
        pageSize
      );
      // Update state with fetched data
      setDevices(response.devices || []);
      setTotal(response.meta?.total || 0);
      setPageSize(response.meta?.perPage);
      setCurrentPage(page);
    } catch {
      message.error("Failed to load registered devices");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, [refreshKey]);

  return (
    // Registered devices table
    <Table
      columns={columns}
      dataSource={devices}
      loading={loading}
      pagination={{
        total: total,
        pageSize: pageSize,
        current: currentPage,
        onChange: (page, pageSize) => fetchDevices(page, pageSize),
      }}
      rowKey="id"
    />
  );
}

export default RegisteredDevicesList;
