
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

const pageTitles = {
  "/dashboard": "Dashboard",
  "/requests": "Shipment Requests",
  "/shipments": "All Shipments",
  "/dispatch": "Dispatch Management",
  "/pickups": "Pickup Management",
  "/customers": "Customers",
  "/carriers": "Carriers",
  "/tracking": "Tracking",
  "/payments": "Payments",
  "/reports": "Reports & Analytics",
  "/support": "Support",
};

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const title = pageTitles[location.pathname] || "Dashboard";

  return (
    <div className="admin-layout">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <main className={`admin-main ${collapsed ? "sidebar-collapsed" : ""}`}>
        <Header
          title={title}
          onMenuClick={() => setMobileOpen(!mobileOpen)}
        />

        <div className="admin-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
