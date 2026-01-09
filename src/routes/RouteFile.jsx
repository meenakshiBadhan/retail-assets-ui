import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Stores from "../pages/Stores";
import StoreDetails from "../pages/StoreDetails";
import DeviceRegistration from "../pages/DeviceRegistration";

const RouteFile = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Stores />} />
        <Route path="/stores" element={<Stores />} />
        <Route path="/stores/:id" element={<StoreDetails />} />
        <Route path="/device-registration" element={<DeviceRegistration />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteFile;
