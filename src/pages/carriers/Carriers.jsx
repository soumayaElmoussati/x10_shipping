
import { useMemo, useState } from "react";
import {
  Search,
  Filter,
  RefreshCw,
  Plus,
  Truck,
  Globe2,
  CheckCircle2,
  AlertCircle,
  Clock,
  Eye,
  Edit3,
  Trash2,
  MoreHorizontal,
  X,
  ChevronLeft,
  ChevronRight,
  Settings,
  Activity,
  MapPin,
  Package,
  Calendar,
  ArrowRight,
  ShieldCheck,
  Zap,
  History,
  Save,
  Power,
  KeyRound,
  Server,
  Copy,
  ExternalLink,
  FileText,
  Check,
  Wifi,
  WifiOff,
  Building2,
  Layers,
  Code2,
} from "lucide-react";
import "./Carriers.css";

/* =========================================
   DUMMY DATA
========================================= */

const initialCarriers = [
  {
    id: "CAR-001",
    code: "IMILE",
    name: "iMile",
    description:
      "International last-mile delivery and logistics solutions across the Middle East.",
    website: "https://www.imile.com",
    email: "operations@imile.com",
    phone: "+971 4 123 4567",
    headquarters: "Dubai, UAE",
    logo: "IM",
    color: "imile",
    type: "Regional",
    countries: ["UAE", "Saudi Arabia", "Qatar", "Kuwait", "Bahrain", "Oman"],
    services: ["Express", "Standard", "Same Day"],
    pickup: true,
    packaging: true,
    tracking: true,
    returns: true,
    active: true,
    apiStatus: "Connected",
    apiEnvironment: "Sandbox",
    apiEndpoint: "https://api.imile.com",
    apiVersion: "v1",
    totalShipments: 1250,
    delivered: 1120,
    rating: 4.8,
    deliveryTime: "2–4 days",
    createdAt: "2026-08-12",
    lastSync: "2026-11-19 10:42",
    currency: "AED",
  },
  {
    id: "CAR-002",
    code: "ARAMEX",
    name: "Aramex",
    description:
      "Global transportation, logistics and express delivery services.",
    website: "https://www.aramex.com",
    email: "support@aramex.com",
    phone: "+971 600 544 000",
    headquarters: "Dubai, UAE",
    logo: "AR",
    color: "aramex",
    type: "International",
    countries: ["UAE", "Saudi Arabia", "Qatar", "Kuwait", "Bahrain", "Oman"],
    services: ["Express", "Standard"],
    pickup: true,
    packaging: true,
    tracking: true,
    returns: true,
    active: true,
    apiStatus: "Connected",
    apiEnvironment: "Production",
    apiEndpoint: "https://ws.aramex.net",
    apiVersion: "v2",
    totalShipments: 890,
    delivered: 810,
    rating: 4.6,
    deliveryTime: "2–5 days",
    createdAt: "2026-07-20",
    lastSync: "2026-11-19 09:35",
    currency: "AED",
  },
  {
    id: "CAR-003",
    code: "DHL",
    name: "DHL Express",
    description:
      "International express transportation and premium delivery network.",
    website: "https://www.dhl.com",
    email: "express@dhl.com",
    phone: "+971 600 567 567",
    headquarters: "Dubai, UAE",
    logo: "DH",
    color: "dhl",
    type: "International",
    countries: ["UAE", "Saudi Arabia", "Qatar", "Kuwait", "Bahrain", "Oman"],
    services: ["Express", "International"],
    pickup: true,
    packaging: true,
    tracking: true,
    returns: true,
    active: true,
    apiStatus: "Not Configured",
    apiEnvironment: "Sandbox",
    apiEndpoint: "",
    apiVersion: "v1",
    totalShipments: 520,
    delivered: 475,
    rating: 4.9,
    deliveryTime: "1–3 days",
    createdAt: "2026-09-02",
    lastSync: null,
    currency: "AED",
  },
  {
    id: "CAR-004",
    code: "SMSA",
    name: "SMSA Express",
    description:
      "Saudi-based logistics and express delivery provider.",
    website: "https://www.smsaexpress.com",
    email: "info@smsaexpress.com",
    phone: "+966 920 009 999",
    headquarters: "Riyadh, Saudi Arabia",
    logo: "SM",
    color: "smsa",
    type: "Regional",
    countries: ["Saudi Arabia", "UAE", "Bahrain", "Kuwait"],
    services: ["Express", "Standard"],
    pickup: true,
    packaging: false,
    tracking: true,
    returns: true,
    active: false,
    apiStatus: "Disconnected",
    apiEnvironment: "Sandbox",
    apiEndpoint: "",
    apiVersion: "v1",
    totalShipments: 240,
    delivered: 210,
    rating: 4.5,
    deliveryTime: "2–4 days",
    createdAt: "2026-09-15",
    lastSync: "2026-11-12 14:20",
    currency: "AED",
  },
  {
    id: "CAR-005",
    code: "AJEX",
    name: "AJEX Logistics",
    description:
      "Regional logistics solutions connecting Saudi Arabia and GCC markets.",
    website: "https://www.aj-ex.com",
    email: "contact@aj-ex.com",
    phone: "+966 800 100 0033",
    headquarters: "Riyadh, Saudi Arabia",
    logo: "AJ",
    color: "ajex",
    type: "Regional",
    countries: ["Saudi Arabia", "UAE", "Bahrain", "Oman"],
    services: ["Express", "Standard"],
    pickup: true,
    packaging: true,
    tracking: true,
    returns: false,
    active: true,
    apiStatus: "Error",
    apiEnvironment: "Sandbox",
    apiEndpoint: "https://sandbox.aj-ex.com/api",
    apiVersion: "v1",
    totalShipments: 180,
    delivered: 150,
    rating: 4.3,
    deliveryTime: "3–5 days",
    createdAt: "2026-10-01",
    lastSync: "2026-11-18 16:45",
    currency: "AED",
  },
];

const initialLogs = [
  {
    id: 1,
    carrier: "iMile",
    event: "Authentication successful",
    type: "success",
    endpoint: "/auth/token",
    date: "2026-11-19 10:42:15",
    response: "200 OK",
  },
  {
    id: 2,
    carrier: "Aramex",
    event: "Shipment tracking synchronized",
    type: "success",
    endpoint: "/tracking",
    date: "2026-11-19 09:35:20",
    response: "200 OK",
  },
  {
    id: 3,
    carrier: "AJEX Logistics",
    event: "API connection timeout",
    type: "error",
    endpoint: "/api/shipments",
    date: "2026-11-18 16:45:10",
    response: "504 Gateway Timeout",
  },
  {
    id: 4,
    carrier: "iMile",
    event: "Shipment booking request",
    type: "info",
    endpoint: "/shipment/create",
    date: "2026-11-18 14:20:00",
    response: "200 OK",
  },
  {
    id: 5,
    carrier: "SMSA Express",
    event: "Connection disconnected",
    type: "warning",
    endpoint: "/connection",
    date: "2026-11-12 14:20:00",
    response: "Connection closed",
  },
];

const countries = [
  "UAE",
  "Saudi Arabia",
  "Qatar",
  "Kuwait",
  "Bahrain",
  "Oman",
];

const serviceOptions = [
  "Express",
  "Standard",
  "Same Day",
  "International",
  "Economy",
];

const emptyCarrier = {
  name: "",
  code: "",
  description: "",
  website: "",
  email: "",
  phone: "",
  headquarters: "",
  type: "Regional",
  countries: ["UAE"],
  services: ["Express"],
  pickup: true,
  packaging: false,
  tracking: true,
  returns: false,
  active: true,
  apiStatus: "Not Configured",
  apiEnvironment: "Sandbox",
  apiEndpoint: "",
  apiVersion: "v1",
};

/* =========================================
   HELPERS
========================================= */

function CarrierBadge({ status }) {
  const config = {
    Connected: ["connected", "Connected"],
    Disconnected: ["disconnected", "Disconnected"],
    "Not Configured": ["not-configured", "Not Configured"],
    Error: ["error", "Connection Error"],
  };

  const [className, label] = config[status] || config["Not Configured"];

  return (
    <span className={`carrier-api-badge ${className}`}>
      <span className="carrier-status-dot" />
      {label}
    </span>
  );
}

function CarrierLogo({ carrier, large = false }) {
  return (
    <div
      className={`carrier-logo ${carrier.color || "default"} ${
        large ? "large" : ""
      }`}
    >
      {carrier.logo || carrier.name?.slice(0, 2).toUpperCase()}
    </div>
  );
}

function ModalHeader({ eyebrow, title, description, onClose }) {
  return (
    <div className="carrier-modal-header">
      <div>
        <span className="carrier-modal-eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <button
        className="carrier-modal-close"
        onClick={onClose}
        type="button"
      >
        <X size={18} />
      </button>
    </div>
  );
}

/* =========================================
   MAIN COMPONENT
========================================= */

export default function Carriers() {
  const [carriers, setCarriers] = useState(initialCarriers);
  const [logs, setLogs] = useState(initialLogs);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [countryFilter, setCountryFilter] = useState("All Countries");

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showApi, setShowApi] = useState(false);
  const [showLogs, setShowLogs] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const [selectedCarrier, setSelectedCarrier] = useState(null);
  const [editingCarrier, setEditingCarrier] = useState(null);
  const [menuId, setMenuId] = useState(null);

  const [formData, setFormData] = useState(emptyCarrier);
  const [formError, setFormError] = useState("");

  const [apiData, setApiData] = useState({
    endpoint: "",
    version: "v1",
    environment: "Sandbox",
    authType: "Bearer Token",
    apiKey: "",
    apiSecret: "",
    timeout: "30000",
    webhookUrl: "",
  });

  const [showApiKey, setShowApiKey] = useState(false);
  const [showApiSecret, setShowApiSecret] = useState(false);

  /* FILTERING */

  const filteredCarriers = useMemo(() => {
    return carriers.filter((carrier) => {
      const query = search.toLowerCase();

      const matchesSearch =
        carrier.name.toLowerCase().includes(query) ||
        carrier.code.toLowerCase().includes(query) ||
        carrier.id.toLowerCase().includes(query) ||
        carrier.email.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All Statuses" ||
        (statusFilter === "Active" && carrier.active) ||
        (statusFilter === "Inactive" && !carrier.active) ||
        (statusFilter === "Connected" &&
          carrier.apiStatus === "Connected") ||
        (statusFilter === "Not Connected" &&
          carrier.apiStatus !== "Connected");

      const matchesType =
        typeFilter === "All Types" || carrier.type === typeFilter;

      const matchesCountry =
        countryFilter === "All Countries" ||
        carrier.countries.includes(countryFilter);

      return (
        matchesSearch &&
        matchesStatus &&
        matchesType &&
        matchesCountry
      );
    });
  }, [carriers, search, statusFilter, typeFilter, countryFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredCarriers.length / pageSize)
  );

  const startIndex = (currentPage - 1) * pageSize;

  const paginatedCarriers = filteredCarriers.slice(
    startIndex,
    startIndex + pageSize
  );

  /* STATISTICS */

  const stats = [
    {
      label: "Total Carriers",
      value: carriers.length,
      icon: Truck,
      color: "orange",
      description: "Registered delivery partners",
    },
    {
      label: "Active Carriers",
      value: carriers.filter((c) => c.active).length,
      icon: CheckCircle2,
      color: "green",
      description: "Available for assignments",
    },
    {
      label: "API Connected",
      value: carriers.filter((c) => c.apiStatus === "Connected").length,
      icon: Zap,
      color: "blue",
      description: "Configured integrations",
    },
    {
      label: "Integration Issues",
      value: carriers.filter(
        (c) => c.apiStatus === "Error" || c.apiStatus === "Disconnected"
      ).length,
      icon: AlertCircle,
      color: "purple",
      description: "Require technical attention",
    },
  ];

  /* FORM */

  const openAddForm = () => {
    setEditingCarrier(null);
    setFormData({ ...emptyCarrier, countries: ["UAE"], services: ["Express"] });
    setFormError("");
    setShowForm(true);
  };

  const openEditForm = (carrier) => {
    setEditingCarrier(carrier);
    setFormData({
      ...carrier,
      countries: [...carrier.countries],
      services: [...carrier.services],
    });
    setFormError("");
    setShowForm(true);
    setMenuId(null);
    setShowDetails(false);
  };

  const updateForm = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleArrayValue = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value],
    }));
  };

  const saveCarrier = (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.code.trim() ||
      !formData.email.trim()
    ) {
      setFormError("Please complete all required fields.");
      return;
    }

    if (!formData.countries.length || !formData.services.length) {
      setFormError("Select at least one country and one service.");
      return;
    }

    const codeExists = carriers.some(
      (c) =>
        c.code.toLowerCase() === formData.code.trim().toLowerCase() &&
        c.id !== editingCarrier?.id
    );

    if (codeExists) {
      setFormError("This carrier code already exists.");
      return;
    }

    if (editingCarrier) {
      setCarriers((prev) =>
        prev.map((c) =>
          c.id === editingCarrier.id
            ? { ...c, ...formData, name: formData.name.trim() }
            : c
        )
      );
    } else {
      const newCarrier = {
        ...formData,
        id: `CAR-${String(Date.now()).slice(-6)}`,
        name: formData.name.trim(),
        code: formData.code.trim().toUpperCase(),
        logo: formData.code.trim().slice(0, 2).toUpperCase(),
        color: "default",
        totalShipments: 0,
        delivered: 0,
        rating: 0,
        deliveryTime: "Not available",
        createdAt: new Date().toISOString().slice(0, 10),
        lastSync: null,
        currency: "AED",
      };

      setCarriers((prev) => [newCarrier, ...prev]);
      setCurrentPage(1);
    }

    setShowForm(false);
    setEditingCarrier(null);
  };

  /* DETAILS */

  const openDetails = (carrier) => {
    setSelectedCarrier(carrier);
    setShowDetails(true);
    setMenuId(null);
  };

  /* API CONFIGURATION */

  const openApiConfig = (carrier) => {
    setSelectedCarrier(carrier);

    setApiData({
      endpoint: carrier.apiEndpoint || "",
      version: carrier.apiVersion || "v1",
      environment: carrier.apiEnvironment || "Sandbox",
      authType: "Bearer Token",
      apiKey: "",
      apiSecret: "",
      timeout: "30000",
      webhookUrl: "",
    });

    setShowApi(true);
    setMenuId(null);
    setShowDetails(false);
  };

  const saveApiConfig = (e) => {
    e.preventDefault();

    if (!apiData.endpoint.trim()) {
      return;
    }

    setCarriers((prev) =>
      prev.map((c) =>
        c.id === selectedCarrier.id
          ? {
              ...c,
              apiEndpoint: apiData.endpoint,
              apiVersion: apiData.version,
              apiEnvironment: apiData.environment,
              apiStatus: "Not Configured",
            }
          : c
      )
    );

    setLogs((prev) => [
      {
        id: Date.now(),
        carrier: selectedCarrier.name,
        event: "API configuration saved",
        type: "info",
        endpoint: apiData.endpoint,
        date: new Date().toLocaleString(),
        response: "Configuration saved locally",
      },
      ...prev,
    ]);

    setShowApi(false);
  };

  /* SIMULATED CONNECTION TEST */

  const testConnection = () => {
    setCarriers((prev) =>
      prev.map((c) =>
        c.id === selectedCarrier.id
          ? { ...c, apiStatus: "Connected" }
          : c
      )
    );

    setLogs((prev) => [
      {
        id: Date.now(),
        carrier: selectedCarrier.name,
        event: "Manual connection test (simulation)",
        type: "success",
        endpoint: apiData.endpoint || selectedCarrier.apiEndpoint,
        date: new Date().toLocaleString(),
        response: "Simulation successful",
      },
      ...prev,
    ]);

    setSelectedCarrier((prev) => ({
      ...prev,
      apiStatus: "Connected",
    }));
  };

  /* STATUS */

  const toggleActive = (carrier) => {
    setCarriers((prev) =>
      prev.map((c) =>
        c.id === carrier.id ? { ...c, active: !c.active } : c
      )
    );
    setMenuId(null);
  };

  /* DELETE */

  const openDelete = (carrier) => {
    setSelectedCarrier(carrier);
    setShowDelete(true);
    setMenuId(null);
  };

  const deleteCarrier = () => {
    setCarriers((prev) =>
      prev.filter((c) => c.id !== selectedCarrier.id)
    );
    setShowDelete(false);
    setSelectedCarrier(null);
  };

  /* FILTER RESET */

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("All Statuses");
    setTypeFilter("All Types");
    setCountryFilter("All Countries");
    setCurrentPage(1);
  };

  const refreshPage = () => {
    resetFilters();
    setMenuId(null);
  };

  const closeModals = () => {
    setShowForm(false);
    setShowDetails(false);
    setShowApi(false);
    setShowLogs(false);
    setShowDelete(false);
  };

  /* =========================================
     RENDER
  ========================================= */

  return (
    <div className="carriers-page">

      {/* PAGE HEADER */}

      <div className="carriers-page-heading">
        <div>
          <div className="carriers-breadcrumb">
            Management <ArrowRight size={12} />
            <strong>Carriers</strong>
          </div>

          <h1>Carrier Management</h1>

          <p>
            Manage delivery partners, service coverage and API
            integration configurations.
          </p>
        </div>

        <div className="carriers-heading-actions">
          <button className="carriers-btn-secondary" onClick={refreshPage}>
            <RefreshCw size={15} />
            Refresh
          </button>

          <button
            className="carriers-btn-secondary"
            onClick={() => setShowLogs(true)}
          >
            <History size={15} />
            Integration Logs
          </button>

          <button className="carriers-btn-primary" onClick={openAddForm}>
            <Plus size={16} />
            Add Carrier
          </button>
        </div>
      </div>

      {/* STATS */}

      <div className="carriers-stats-grid">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div className="carriers-stat-card" key={stat.label}>
              <div className="carriers-stat-top">
                <div className={`carriers-stat-icon ${stat.color}`}>
                  <Icon size={20} />
                </div>
                <span className="carriers-stat-period">
                  Workspace overview
                </span>
              </div>

              <span className="carriers-stat-label">{stat.label}</span>
              <strong className="carriers-stat-number">
                {stat.value}
              </strong>
              <span className="carriers-stat-caption">
                {stat.description}
              </span>
            </div>
          );
        })}
      </div>

      {/* CARRIER TABLE */}

      <div className="carriers-table-card">
        <div className="carriers-table-header">
          <div>
            <h3>Delivery Partners</h3>
            <p>
              Manage your shipping partners and their operational
              availability.
            </p>
          </div>

          <span className="carriers-total-pill">
            {filteredCarriers.length} Carriers
          </span>
        </div>

        {/* TOOLBAR */}

        <div className="carriers-toolbar">
          <div className="carriers-search">
            <Search size={16} />

            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search carrier, code or email..."
            />

            {search && (
              <button onClick={() => setSearch("")}>
                <X size={14} />
              </button>
            )}
          </div>

          <div className="carriers-filter-group">
            <div className="carriers-filter-select">
              <Filter size={14} />
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option>All Statuses</option>
                <option>Active</option>
                <option>Inactive</option>
                <option>Connected</option>
                <option>Not Connected</option>
              </select>
            </div>

            <div className="carriers-filter-select">
              <Truck size={14} />
              <select
                value={typeFilter}
                onChange={(e) => {
                  setTypeFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option>All Types</option>
                <option>Regional</option>
                <option>International</option>
              </select>
            </div>

            <div className="carriers-filter-select">
              <Globe2 size={14} />
              <select
                value={countryFilter}
                onChange={(e) => {
                  setCountryFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option>All Countries</option>
                {countries.map((country) => (
                  <option key={country}>{country}</option>
                ))}
              </select>
            </div>

            <button
              className="carriers-reset-btn"
              onClick={resetFilters}
              title="Reset filters"
            >
              <RefreshCw size={15} />
            </button>
          </div>
        </div>

        {/* TABLE */}

        <div className="carriers-table-responsive">
          <table className="carriers-table">
            <thead>
              <tr>
                <th>DELIVERY PARTNER</th>
                <th>TYPE</th>
                <th>COUNTRIES COVERED</th>
                <th>SERVICES</th>
                <th>SHIPMENTS</th>
                <th>API STATUS</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {paginatedCarriers.map((carrier) => (
                <tr key={carrier.id}>
                  <td>
                    <div className="carrier-identity">
                      <CarrierLogo carrier={carrier} />

                      <div className="carrier-identity-info">
                        <strong>{carrier.name}</strong>
                        <span>{carrier.code} · {carrier.id}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className={`carrier-type ${carrier.type.toLowerCase()}`}>
                      {carrier.type}
                    </span>
                  </td>

                  <td>
                    <div className="carrier-countries">
                      {carrier.countries.slice(0, 3).map((country) => (
                        <span key={country}>{country}</span>
                      ))}

                      {carrier.countries.length > 3 && (
                        <span className="carrier-more-countries">
                          +{carrier.countries.length - 3}
                        </span>
                      )}
                    </div>
                  </td>

                  <td>
                    <div className="carrier-services">
                      {carrier.services.slice(0, 2).map((service) => (
                        <span key={service}>{service}</span>
                      ))}

                      {carrier.services.length > 2 && (
                        <small>+{carrier.services.length - 2}</small>
                      )}
                    </div>
                  </td>

                  <td>
                    <div className="carrier-shipment-count">
                      <strong>{carrier.totalShipments.toLocaleString()}</strong>
                      <span>
                        {carrier.delivered.toLocaleString()} delivered
                      </span>
                    </div>
                  </td>

                  <td>
                    <CarrierBadge status={carrier.apiStatus} />
                  </td>

                  <td>
                    <span
                      className={`carrier-active-status ${
                        carrier.active ? "active" : "inactive"
                      }`}
                    >
                      <span className="carrier-status-dot" />
                      {carrier.active ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td>
                    <div className="carriers-actions">
                      <button
                        className="carriers-action-icon"
                        title="View details"
                        onClick={() => openDetails(carrier)}
                      >
                        <Eye size={15} />
                      </button>

                      <div className="carriers-menu-wrapper">
                        <button
                          className="carriers-action-icon"
                          title="More actions"
                          onClick={() =>
                            setMenuId(
                              menuId === carrier.id ? null : carrier.id
                            )
                          }
                        >
                          <MoreHorizontal size={17} />
                        </button>

                        {menuId === carrier.id && (
                          <div className="carriers-action-menu">
                            <button onClick={() => openDetails(carrier)}>
                              <Eye size={14} /> View details
                            </button>

                            <button onClick={() => openEditForm(carrier)}>
                              <Edit3 size={14} /> Edit carrier
                            </button>

                            <button onClick={() => openApiConfig(carrier)}>
                              <Settings size={14} /> API configuration
                            </button>

                            <button onClick={() => toggleActive(carrier)}>
                              <Power size={14} />
                              {carrier.active ? "Deactivate" : "Activate"}
                            </button>

                            <div className="carrier-menu-divider" />

                            <button
                              className="danger"
                              onClick={() => openDelete(carrier)}
                            >
                              <Trash2 size={14} /> Delete carrier
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {paginatedCarriers.length === 0 && (
            <div className="carriers-empty">
              <Truck size={35} />
              <strong>No carriers found</strong>
              <p>Try changing your search or filters.</p>
              <button onClick={resetFilters}>Clear filters</button>
            </div>
          )}
        </div>

        {/* PAGINATION */}

        <div className="carriers-pagination">
          <span>
            Showing{" "}
            <strong>{filteredCarriers.length ? startIndex + 1 : 0}</strong>{" "}
            to{" "}
            <strong>
              {Math.min(startIndex + pageSize, filteredCarriers.length)}
            </strong>{" "}
            of <strong>{filteredCarriers.length}</strong> carriers
          </span>

          <div className="carriers-pagination-controls">
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={5}>5 / page</option>
              <option value={10}>10 / page</option>
              <option value={20}>20 / page</option>
            </select>

            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              <ChevronLeft size={15} />
            </button>

            <span>{currentPage} / {totalPages}</span>

            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* ADD / EDIT MODAL */}

      {showForm && (
        <div className="carrier-overlay" onClick={() => setShowForm(false)}>
          <div
            className="carrier-modal carrier-form-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <ModalHeader
              eyebrow="CARRIER MANAGEMENT"
              title={editingCarrier ? "Edit Carrier" : "Add New Carrier"}
              description="Configure your delivery partner information and capabilities."
              onClose={() => setShowForm(false)}
            />

            <form onSubmit={saveCarrier}>
              <div className="carrier-form-body">
                <div className="carrier-form-section">
                  <h3><Building2 size={16} /> General Information</h3>

                  <div className="carrier-form-grid">
                    <label className="carrier-field">
                      Carrier Name *
                      <input
                        value={formData.name}
                        onChange={(e) => updateForm("name", e.target.value)}
                        placeholder="e.g. iMile"
                      />
                    </label>

                    <label className="carrier-field">
                      Carrier Code *
                      <input
                        value={formData.code}
                        onChange={(e) =>
                          updateForm("code", e.target.value.toUpperCase())
                        }
                        placeholder="e.g. IMILE"
                      />
                    </label>

                    <label className="carrier-field full">
                      Description
                      <textarea
                        rows="3"
                        value={formData.description}
                        onChange={(e) =>
                          updateForm("description", e.target.value)
                        }
                        placeholder="Describe the carrier's services..."
                      />
                    </label>

                    <label className="carrier-field">
                      Website
                      <input
                        value={formData.website}
                        onChange={(e) => updateForm("website", e.target.value)}
                        placeholder="https://..."
                      />
                    </label>

                    <label className="carrier-field">
                      Business Email *
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateForm("email", e.target.value)}
                        placeholder="operations@carrier.com"
                      />
                    </label>

                    <label className="carrier-field">
                      Phone Number
                      <input
                        value={formData.phone}
                        onChange={(e) => updateForm("phone", e.target.value)}
                        placeholder="+971..."
                      />
                    </label>

                    <label className="carrier-field">
                      Headquarters
                      <input
                        value={formData.headquarters}
                        onChange={(e) =>
                          updateForm("headquarters", e.target.value)
                        }
                        placeholder="Dubai, UAE"
                      />
                    </label>

                    <label className="carrier-field full">
                      Carrier Type
                      <select
                        value={formData.type}
                        onChange={(e) => updateForm("type", e.target.value)}
                      >
                        <option>Regional</option>
                        <option>International</option>
                      </select>
                    </label>
                  </div>
                </div>

                <div className="carrier-form-section">
                  <h3><Globe2 size={16} /> Geographic Coverage</h3>
                  <p>Select the countries where this carrier operates.</p>

                  <div className="carrier-checkbox-grid">
                    {countries.map((country) => (
                      <label className="carrier-checkbox" key={country}>
                        <input
                          type="checkbox"
                          checked={formData.countries.includes(country)}
                          onChange={() =>
                            toggleArrayValue("countries", country)
                          }
                        />
                        <span>{country}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="carrier-form-section">
                  <h3><Layers size={16} /> Supported Services</h3>

                  <div className="carrier-checkbox-grid">
                    {serviceOptions.map((service) => (
                      <label className="carrier-checkbox" key={service}>
                        <input
                          type="checkbox"
                          checked={formData.services.includes(service)}
                          onChange={() =>
                            toggleArrayValue("services", service)
                          }
                        />
                        <span>{service}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="carrier-form-section">
                  <h3><Package size={16} /> Operational Capabilities</h3>

                  <div className="carrier-capabilities-grid">
                    {[
                      ["pickup", "Pickup service"],
                      ["packaging", "Packaging service"],
                      ["tracking", "Shipment tracking"],
                      ["returns", "Returns management"],
                    ].map(([field, label]) => (
                      <label className="carrier-checkbox" key={field}>
                        <input
                          type="checkbox"
                          checked={formData[field]}
                          onChange={(e) =>
                            updateForm(field, e.target.checked)
                          }
                        />
                        <span>{label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="carrier-form-section">
                  <h3><Power size={16} /> Availability</h3>

                  <label className="carrier-toggle">
                    <input
                      type="checkbox"
                      checked={formData.active}
                      onChange={(e) =>
                        updateForm("active", e.target.checked)
                      }
                    />
                    <span>
                      <strong>Active carrier</strong>
                      <small>
                        This carrier can be considered for shipment assignments.
                      </small>
                    </span>
                  </label>
                </div>

                {formError && (
                  <div className="carrier-form-error">
                    <AlertCircle size={15} />
                    {formError}
                  </div>
                )}
              </div>

              <div className="carrier-modal-footer">
                <button
                  type="button"
                  className="carriers-btn-secondary"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="carriers-btn-primary">
                  <Save size={15} />
                  {editingCarrier ? "Save Changes" : "Create Carrier"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DETAILS MODAL */}

      {showDetails && selectedCarrier && (
        <div className="carrier-overlay" onClick={() => setShowDetails(false)}>
          <div
            className="carrier-modal carrier-details-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <ModalHeader
              eyebrow="CARRIER PROFILE"
              title={selectedCarrier.name}
              description={`${selectedCarrier.code} · ${selectedCarrier.id}`}
              onClose={() => setShowDetails(false)}
            />

            <div className="carrier-details-body">
              <div className="carrier-profile-banner">
                <CarrierLogo carrier={selectedCarrier} large />

                <div className="carrier-profile-info">
                  <h3>{selectedCarrier.name}</h3>
                  <p>{selectedCarrier.description}</p>
                  <div className="carrier-profile-badges">
                    <CarrierBadge status={selectedCarrier.apiStatus} />
                    <span className={`carrier-active-status ${
                      selectedCarrier.active ? "active" : "inactive"
                    }`}>
                      <span className="carrier-status-dot" />
                      {selectedCarrier.active ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="carrier-details-stats">
                <div>
                  <span>Total Shipments</span>
                  <strong>{selectedCarrier.totalShipments}</strong>
                </div>
                <div>
                  <span>Delivered</span>
                  <strong>{selectedCarrier.delivered}</strong>
                </div>
                <div>
                  <span>Rating</span>
                  <strong>{selectedCarrier.rating || "—"} / 5</strong>
                </div>
              </div>

              <div className="carrier-details-grid">
                <div className="carrier-detail-box">
                  <h3><Building2 size={16} /> Company Information</h3>

                  <div className="carrier-detail-line">
                    <span>Website</span>
                    <strong>{selectedCarrier.website || "Not provided"}</strong>
                  </div>

                  <div className="carrier-detail-line">
                    <span>Email</span>
                    <strong>{selectedCarrier.email}</strong>
                  </div>

                  <div className="carrier-detail-line">
                    <span>Phone</span>
                    <strong>{selectedCarrier.phone || "Not provided"}</strong>
                  </div>

                  <div className="carrier-detail-line">
                    <span>Headquarters</span>
                    <strong>{selectedCarrier.headquarters || "Not provided"}</strong>
                  </div>

                  <div className="carrier-detail-line">
                    <span>Type</span>
                    <strong>{selectedCarrier.type}</strong>
                  </div>
                </div>

                <div className="carrier-detail-box">
                  <h3><Globe2 size={16} /> Geographic Coverage</h3>

                  <div className="carrier-detail-tags">
                    {selectedCarrier.countries.map((country) => (
                      <span key={country}>{country}</span>
                    ))}
                  </div>
                </div>

                <div className="carrier-detail-box">
                  <h3><Layers size={16} /> Available Services</h3>

                  <div className="carrier-detail-tags">
                    {selectedCarrier.services.map((service) => (
                      <span key={service}>{service}</span>
                    ))}
                  </div>
                </div>

                <div className="carrier-detail-box">
                  <h3><Package size={16} /> Capabilities</h3>

                  {[
                    ["Pickup", selectedCarrier.pickup],
                    ["Packaging", selectedCarrier.packaging],
                    ["Tracking", selectedCarrier.tracking],
                    ["Returns", selectedCarrier.returns],
                  ].map(([label, enabled]) => (
                    <div className="carrier-capability-line" key={label}>
                      <span>{label}</span>
                      {enabled ? (
                        <span className="capability-enabled">
                          <CheckCircle2 size={14} /> Available
                        </span>
                      ) : (
                        <span className="capability-disabled">
                          <X size={14} /> Unavailable
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="carrier-detail-box full">
                  <h3><Server size={16} /> API Integration Overview</h3>

                  <div className="carrier-detail-line">
                    <span>Connection</span>
                    <CarrierBadge status={selectedCarrier.apiStatus} />
                  </div>

                  <div className="carrier-detail-line">
                    <span>Environment</span>
                    <strong>{selectedCarrier.apiEnvironment}</strong>
                  </div>

                  <div className="carrier-detail-line">
                    <span>API Version</span>
                    <strong>{selectedCarrier.apiVersion}</strong>
                  </div>

                  <div className="carrier-detail-line">
                    <span>Last Synchronization</span>
                    <strong>{selectedCarrier.lastSync || "Never"}</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="carrier-modal-footer">
              <button
                className="carriers-btn-secondary"
                onClick={() => openApiConfig(selectedCarrier)}
              >
                <Settings size={15} /> API Configuration
              </button>

              <button
                className="carriers-btn-primary"
                onClick={() => openEditForm(selectedCarrier)}
              >
                <Edit3 size={15} /> Edit Carrier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* API CONFIGURATION MODAL */}

      {showApi && selectedCarrier && (
        <div className="carrier-overlay" onClick={() => setShowApi(false)}>
          <div
            className="carrier-modal carrier-api-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <ModalHeader
              eyebrow="TECHNICAL INTEGRATION"
              title="API Configuration"
              description={`Configure the integration parameters for ${selectedCarrier.name}.`}
              onClose={() => setShowApi(false)}
            />

            <form onSubmit={saveApiConfig}>
              <div className="carrier-api-body">
                <div className="carrier-api-notice">
                  <ShieldCheck size={19} />
                  <div>
                    <strong>Secure integration setup</strong>
                    <p>
                      This is a frontend configuration preview. Real
                      authentication and API requests will be handled by
                      your backend.
                    </p>
                  </div>
                </div>

                <div className="carrier-api-section">
                  <h3><Server size={16} /> Connection Settings</h3>

                  <div className="carrier-form-grid">
                    <label className="carrier-field full">
                      API Base URL *
                      <input
                        value={apiData.endpoint}
                        onChange={(e) =>
                          setApiData({
                            ...apiData,
                            endpoint: e.target.value,
                          })
                        }
                        placeholder="https://api.carrier.com"
                      />
                    </label>

                    <label className="carrier-field">
                      API Version
                      <select
                        value={apiData.version}
                        onChange={(e) =>
                          setApiData({
                            ...apiData,
                            version: e.target.value,
                          })
                        }
                      >
                        <option value="v1">Version 1</option>
                        <option value="v2">Version 2</option>
                        <option value="v3">Version 3</option>
                      </select>
                    </label>

                    <label className="carrier-field">
                      Environment
                      <select
                        value={apiData.environment}
                        onChange={(e) =>
                          setApiData({
                            ...apiData,
                            environment: e.target.value,
                          })
                        }
                      >
                        <option>Sandbox</option>
                        <option>Production</option>
                      </select>
                    </label>

                    <label className="carrier-field">
                      Authentication Type
                      <select
                        value={apiData.authType}
                        onChange={(e) =>
                          setApiData({
                            ...apiData,
                            authType: e.target.value,
                          })
                        }
                      >
                        <option>Bearer Token</option>
                        <option>API Key</option>
                        <option>Basic Authentication</option>
                        <option>OAuth 2.0</option>
                      </select>
                    </label>

                    <label className="carrier-field">
                      Request Timeout (ms)
                      <input
                        type="number"
                        value={apiData.timeout}
                        onChange={(e) =>
                          setApiData({
                            ...apiData,
                            timeout: e.target.value,
                          })
                        }
                      />
                    </label>
                  </div>
                </div>

                <div className="carrier-api-section">
                  <h3><KeyRound size={16} /> Authentication Credentials</h3>

                  <label className="carrier-field">
                    API Key / Client ID
                    <div className="carrier-secret-input">
                      <input
                        type={showApiKey ? "text" : "password"}
                        value={apiData.apiKey}
                        onChange={(e) =>
                          setApiData({
                            ...apiData,
                            apiKey: e.target.value,
                          })
                        }
                        placeholder="Enter API key or client ID"
                        autoComplete="off"
                      />
                      <button
                        type="button"
                        onClick={() => setShowApiKey(!showApiKey)}
                      >
                        {showApiKey ? "Hide" : "Show"}
                      </button>
                    </div>
                  </label>

                  <label className="carrier-field">
                    API Secret / Client Secret
                    <div className="carrier-secret-input">
                      <input
                        type={showApiSecret ? "text" : "password"}
                        value={apiData.apiSecret}
                        onChange={(e) =>
                          setApiData({
                            ...apiData,
                            apiSecret: e.target.value,
                          })
                        }
                        placeholder="Enter API secret"
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowApiSecret(!showApiSecret)
                        }
                      >
                        {showApiSecret ? "Hide" : "Show"}
                      </button>
                    </div>
                  </label>
                </div>

                <div className="carrier-api-section">
                  <h3><Activity size={16} /> Webhook Configuration</h3>

                  <label className="carrier-field">
                    Webhook Callback URL
                    <input
                      value={apiData.webhookUrl}
                      onChange={(e) =>
                        setApiData({
                          ...apiData,
                          webhookUrl: e.target.value,
                        })
                      }
                      placeholder="https://your-domain.com/api/webhooks/carriers"
                    />
                  </label>
                </div>

                <div className="carrier-api-warning">
                  <AlertCircle size={16} />
                  <span>
                    No real API request is performed. Credentials entered
                    here are temporary UI state and are not persisted.
                    Never use production secrets in this prototype.
                  </span>
                </div>
              </div>

              <div className="carrier-modal-footer">
                <button
                  type="button"
                  className="carriers-btn-secondary"
                  onClick={testConnection}
                >
                  <Wifi size={15} /> Simulate Test
                </button>

                <button
                  type="button"
                  className="carriers-btn-secondary"
                  onClick={() => setShowApi(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="carriers-btn-primary">
                  <Save size={15} /> Save Configuration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* INTEGRATION LOGS MODAL */}

      {showLogs && (
        <div className="carrier-overlay" onClick={() => setShowLogs(false)}>
          <div
            className="carrier-modal carrier-logs-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <ModalHeader
              eyebrow="SYSTEM MONITORING"
              title="Integration Logs"
              description="Monitor simulated API events and carrier integration activity."
              onClose={() => setShowLogs(false)}
            />

            <div className="carrier-logs-summary">
              <div>
                <CheckCircle2 size={17} />
                <span>
                  Successful
                  <strong>{logs.filter((l) => l.type === "success").length}</strong>
                </span>
              </div>

              <div>
                <AlertCircle size={17} />
                <span>
                  Errors
                  <strong>{logs.filter((l) => l.type === "error").length}</strong>
                </span>
              </div>

              <div>
                <History size={17} />
                <span>
                  Total Events
                  <strong>{logs.length}</strong>
                </span>
              </div>
            </div>

            <div className="carrier-logs-list">
              {logs.map((log) => (
                <div className="carrier-log-item" key={log.id}>
                  <div className={`carrier-log-icon ${log.type}`}>
                    {log.type === "success" ? (
                      <CheckCircle2 size={17} />
                    ) : log.type === "error" ? (
                      <AlertCircle size={17} />
                    ) : log.type === "warning" ? (
                      <AlertCircle size={17} />
                    ) : (
                      <Activity size={17} />
                    )}
                  </div>

                  <div className="carrier-log-content">
                    <div className="carrier-log-top">
                      <strong>{log.event}</strong>
                      <span className={`carrier-log-type ${log.type}`}>
                        {log.type}
                      </span>
                    </div>

                    <p>{log.carrier}</p>

                    <div className="carrier-log-meta">
                      <span><Code2 size={12} /> {log.endpoint}</span>
                      <span><Clock size={12} /> {log.date}</span>
                      <span>{log.response}</span>
                    </div>
                  </div>
                </div>
              ))}

              {logs.length === 0 && (
                <div className="carriers-empty">
                  <History size={30} />
                  <strong>No integration events</strong>
                  <p>Events will appear here when integrations are tested.</p>
                </div>
              )}
            </div>

            <div className="carrier-modal-footer">
              <button
                className="carriers-btn-secondary"
                onClick={() => setShowLogs(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION */}

      {showDelete && selectedCarrier && (
        <div className="carrier-overlay" onClick={() => setShowDelete(false)}>
          <div
            className="carrier-modal carrier-delete-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="carrier-delete-icon">
              <Trash2 size={25} />
            </div>

            <h2>Delete Carrier?</h2>

            <p>
              Are you sure you want to delete{" "}
              <strong>{selectedCarrier.name}</strong>?
              This action will remove the carrier from this prototype.
            </p>

            <div className="carrier-delete-warning">
              <AlertCircle size={15} />
              In production, carrier deletion should be restricted when
              active shipments or historical records depend on it.
            </div>

            <div className="carrier-modal-footer">
              <button
                className="carriers-btn-secondary"
                onClick={() => setShowDelete(false)}
              >
                Cancel
              </button>

              <button
                className="carrier-btn-danger"
                onClick={deleteCarrier}
              >
                <Trash2 size={15} /> Delete Carrier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
