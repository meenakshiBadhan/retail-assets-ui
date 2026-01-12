import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Stores from "../pages/Stores";
import StoreDetails from "../pages/StoreDetails";
import Warehouses from "../pages/Warehouses";

const RouteFile = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/stores" element={<Stores />} />
        <Route path="/stores/:id" element={<StoreDetails />} />
        <Route path="/warehouses" element={<Warehouses />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteFile;
