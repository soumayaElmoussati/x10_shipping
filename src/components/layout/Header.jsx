
import { useState } from "react";
import {
  Search, Sun, Moon, Bell, ChevronDown,
  Menu, Globe, User, Settings, LogOut,
  Package, CheckCircle, Clock
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function Header({ onMenuClick, title }) {
  const { theme, toggleTheme } = useTheme();
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [language, setLanguage] = useState("EN");

  return (
    <header className="admin-header">
      <div className="header-left">
        <button className="header-menu-btn" onClick={onMenuClick}>
          <Menu size={21} />
        </button>

        <div className="header-page-info">
          <span>Workspace / {title}</span>
          <h2>{title}</h2>
        </div>
      </div>

      <div className="header-right">
        <div className="header-search">
          <Search size={18} />
          <input placeholder="Search anything..." />
          <kbd>⌘ K</kbd>
        </div>

        <div className="header-divider" />

        <div className="header-dropdown-wrapper">
          <button
            className="header-icon-btn"
            onClick={() => setLanguage(language === "EN" ? "AR" : "EN")}
            title="Change language"
          >
            <Globe size={19} />
            <span className="language-label">{language}</span>
          </button>
        </div>

        <button
          className="header-icon-btn"
          onClick={toggleTheme}
          title="Toggle theme"
        >
          {theme === "light" ? <Moon size={19} /> : <Sun size={19} />}
        </button>

        <div className="header-dropdown-wrapper">
          <button
            className="header-icon-btn notification-btn"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
          >
            <Bell size={19} />
            <span className="notification-dot" />
          </button>

          {notificationsOpen && (
            <div className="header-dropdown notification-dropdown">
              <div className="dropdown-heading">
                <strong>Notifications</strong>
                <span>3 new</span>
              </div>

              <div className="notification-item">
                <span className="notification-icon orange"><Package size={17}/></span>
                <div>
                  <strong>New shipment request</strong>
                  <p>A new shipment requires review.</p>
                  <small>5 minutes ago</small>
                </div>
              </div>

              <div className="notification-item">
                <span className="notification-icon green"><CheckCircle size={17}/></span>
                <div>
                  <strong>Shipment delivered</strong>
                  <p>X10-2026-00121 was delivered.</p>
                  <small>20 minutes ago</small>
                </div>
              </div>

              <div className="notification-item">
                <span className="notification-icon blue"><Clock size={17}/></span>
                <div>
                  <strong>Pickup scheduled</strong>
                  <p>Pickup scheduled for tomorrow.</p>
                  <small>1 hour ago</small>
                </div>
              </div>

              <button className="dropdown-footer">View all notifications</button>
            </div>
          )}
        </div>

        <div className="header-divider" />

        <div className="header-dropdown-wrapper">
          <button
            className="profile-trigger"
            onClick={() => setProfileOpen(!profileOpen)}
          >
            <div className="profile-avatar">SA</div>
            <div className="profile-info">
              <strong>Super Admin</strong>
              <small>Administrator</small>
            </div>
            <ChevronDown size={16} />
          </button>

          {profileOpen && (
            <div className="header-dropdown profile-dropdown">
              <div className="profile-dropdown-heading">
                <strong>Super Admin</strong>
                <small>admin@x10shipping.com</small>
              </div>
              <button><User size={17}/> My Profile</button>
              <button><Settings size={17}/> Account Settings</button>
              <button
                className="logout-dropdown"
                onClick={() => {
                  localStorage.removeItem("x10_admin");
                  window.location.href = "/login";
                }}
              >
                <LogOut size={17}/> Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
