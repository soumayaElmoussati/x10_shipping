
import { Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import AdminLayout from "./layouts/AdminLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

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

          {[
            ["requests", "Shipment Requests"],
            ["shipments", "All Shipments"],
            ["dispatch", "Dispatch Management"],
            ["pickups", "Pickup Management"],
            ["warehouse", "Warehouse"],
            ["customers", "Customers"],
            ["carriers", "Carriers"],
            ["tracking", "Tracking"],
            ["payments", "Payments"],
            ["invoices", "Invoices"],
            ["reports", "Reports & Analytics"],
            ["settings", "Settings"],
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
