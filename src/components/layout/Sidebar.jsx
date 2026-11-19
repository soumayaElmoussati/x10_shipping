
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard, Users, Package, Truck,
  ClipboardList, MapPin, Warehouse, CreditCard,
  Receipt, BarChart3, Settings, Headphones,
  ChevronLeft, ChevronRight, LogOut, X,
  Zap
} from "lucide-react";

const menuGroups = [
  {
    title: "OVERVIEW",
    items: [
      { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    ],
  },
  {
    title: "OPERATIONS",
    items: [
      { label: "Shipment Requests", icon: ClipboardList, path: "/requests", badge: "12" },
      { label: "All Shipments", icon: Package, path: "/shipments" },
      { label: "Dispatch Management", icon: Truck, path: "/dispatch" },
      { label: "Pickup Management", icon: MapPin, path: "/pickups" },
      { label: "Warehouse", icon: Warehouse, path: "/warehouse" },
    ],
  },
  {
    title: "MANAGEMENT",
    items: [
      { label: "Customers", icon: Users, path: "/customers" },
      { label: "Carriers", icon: Truck, path: "/carriers" },
      { label: "Tracking", icon: MapPin, path: "/tracking" },
    ],
  },
  {
    title: "FINANCE",
    items: [
      { label: "Payments", icon: CreditCard, path: "/payments" },
      { label: "Invoices", icon: Receipt, path: "/invoices" },
      { label: "Reports & Analytics", icon: BarChart3, path: "/reports" },
    ],
  },
  {
    title: "SYSTEM",
    items: [
      { label: "Settings", icon: Settings, path: "/settings" },
      { label: "Support", icon: Headphones, path: "/support" },
    ],
  },
];

export default function Sidebar({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}) {
  return (
    <>
      {mobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside className={`sidebar ${collapsed ? "collapsed" : ""} ${mobileOpen ? "mobile-open" : ""}`}>
        <div className="sidebar-brand">
          <img src="/logo_x10_shipping.jpeg" alt="X10 Shipping" />
          <button
            className="mobile-close"
            onClick={() => setMobileOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <div className="sidebar-workspace">
          <span className="workspace-icon"><Zap size={18} /></span>
          {!collapsed && (
            <div>
              <strong>X10 Operations</strong>
              <small>UAE & GCC Workspace</small>
            </div>
          )}
        </div>

        <nav className="sidebar-nav">
          {menuGroups.map((group) => (
            <div className="nav-group" key={group.title}>
              {!collapsed && (
                <p className="nav-group-title">{group.title}</p>
              )}

              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    title={collapsed ? item.label : ""}
                    className={({ isActive }) =>
                      `nav-item ${isActive ? "active" : ""}`
                    }
                    onClick={() => setMobileOpen(false)}
                  >
                    <Icon size={19} />
                    {!collapsed && <span>{item.label}</span>}
                    {!collapsed && item.badge && (
                      <span className="nav-badge">{item.badge}</span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="sidebar-bottom">
          {!collapsed && (
            <div className="sidebar-support">
              <div className="support-icon">
                <Headphones size={20} />
              </div>
              <strong>Need assistance?</strong>
              <p>Our operations team is here to help.</p>
              <button>Contact support</button>
            </div>
          )}

          <button
            className="collapse-btn"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed
              ? <ChevronRight size={18} />
              : <><ChevronLeft size={18} /><span>Collapse sidebar</span></>}
          </button>

          <button
            className="sidebar-logout"
            onClick={() => {
              localStorage.removeItem("x10_admin");
              window.location.href = "/login";
            }}
          >
            <LogOut size={18} />
            {!collapsed && <span>Sign out</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
