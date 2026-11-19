
import { Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import AdminLayout from "./layouts/AdminLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/customers/Customers";
import ShipmentRequests from "./pages/shipments/ShipmentRequests";
import Carriers from "./pages/carriers/Carriers";
import AllShipments from "./pages/shipments/AllShipments";
import DispatchManagement from "./pages/dispatch/DispatchManagement";
import PickupMonitoring from "./pages/pickup/PickupMonitoring";
import TrackingMonitoring from "./pages/track/TrackingMonitoring";
import SupportTickets from "./pages/tickets/SupportTickets";
import CarrierPayments from "./pages/payment/CarrierPayments";
import ReportsAnalytics from "./pages/reportsAnalytics/ReportsAnalytics";



function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("x10_admin");
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function Placeholder({ title }) {
  return (
    <div className="placeholder-page">
      <span className="eyebrow">X10 SHIPPING / WORKSPACE</span>
      <h1>{title}</h1>
      <p>This module will be implemented in the next development stage.</p>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/requests" element={<ShipmentRequests />} />
          <Route path="carriers" element={<Carriers />} />
          <Route path="/shipments" element={<AllShipments />} />
          <Route path="/dispatch" element={<DispatchManagement />} />
          <Route path="/pickups" element={<PickupMonitoring />} />
          <Route path="/tracking" element={<TrackingMonitoring />} />
          <Route path="/support" element={<SupportTickets />} />
          <Route path="/payments" element={<CarrierPayments />} />
          <Route path="/reports" element={<ReportsAnalytics />} />

          {[
            ["requests", "Shipment Requests"],
            ["shipments", "All Shipments"],
            ["dispatch", "Dispatch Management"],
            ["pickups", "Pickup Management"],
            ["customers", "Customers"],
            ["carriers", "Carriers"],
            ["tracking", "Tracking"],
            ["payments", "Payments"],
            ["reports", "Reports & Analytics"],
            ["support", "Support"],
          ].map(([path, title]) => (
            <Route
              key={path}
              path={path}
              element={<Placeholder title={title} />}
            />
          ))}
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </ThemeProvider>
  );
}
