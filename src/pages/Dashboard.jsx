import { Card, Col, Row, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

// Dashboard Page Component
const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "24px" }}>
      <Title>Welcome User!</Title>
      <Row gutter={16}>
        <Col span={12}>
          <Card hoverable onClick={() => navigate("/stores")}>
            <Title level={3}>Stores</Title>
          </Card>
        </Col>
        <Col span={12}>
          <Card hoverable onClick={() => navigate("/warehouses")}>
            <Title level={3}>Warehouses</Title>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
