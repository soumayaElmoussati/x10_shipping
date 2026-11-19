
import { useMemo, useState } from "react";
import {
  Search, Plus, Download, Users, UserCheck, UserX,
  UserPlus, MoreHorizontal, Eye, Pencil, Trash2,
  Ban, CheckCircle2, X, Mail, Phone, MapPin,
  CalendarDays, Package, Wallet, ChevronLeft,
  ChevronRight, ArrowUpRight, ArrowDownRight,
  Filter, RefreshCw, Clock, ShieldCheck,
  Truck, FileText, MessageSquare, ExternalLink
} from "lucide-react";
import "./Customers.css";

const initialCustomers = [
  {
    id: "X10-CUS-0001",
    firstName: "Mohammed",
    lastName: "Al Mansoori",
    email: "mohammed.almansoori@gmail.com",
    phone: "+971 50 234 5678",
    country: "UAE",
    city: "Dubai",
    address: "Business Bay, Dubai, UAE",
    status: "Active",
    shipments: 24,
    spent: 3450,
    joined: "2026-09-12",
    lastActivity: "2026-11-18",
    avatar: "MA",
    notes: "Regular customer. Prefers evening pickups.",
    shipmentsHistory: [
      { id: "X10-SHP-1045", route: "Dubai → Riyadh", date: "2026-11-18", status: "In Transit", amount: 180 },
      { id: "X10-SHP-0982", route: "Dubai → Abu Dhabi", date: "2026-11-10", status: "Delivered", amount: 65 },
      { id: "X10-SHP-0876", route: "Dubai → Doha", date: "2026-10-28", status: "Delivered", amount: 220 },
    ],
  },
  {
    id: "X10-CUS-0002",
    firstName: "Sarah",
    lastName: "Khalifa",
    email: "sarah.khalifa@gmail.com",
    phone: "+971 55 123 4567",
    country: "UAE",
    city: "Abu Dhabi",
    address: "Al Reem Island, Abu Dhabi, UAE",
    status: "Active",
    shipments: 18,
    spent: 2180,
    joined: "2026-08-20",
    lastActivity: "2026-11-17",
    avatar: "SK",
    notes: "Frequent international shipments.",
    shipmentsHistory: [
      { id: "X10-SHP-1039", route: "Abu Dhabi → Kuwait City", date: "2026-11-17", status: "Delivered", amount: 195 },
      { id: "X10-SHP-0910", route: "Abu Dhabi → Dubai", date: "2026-11-02", status: "Delivered", amount: 55 },
    ],
  },
  {
    id: "X10-CUS-0003",
    firstName: "Ahmed",
    lastName: "Al Rashid",
    email: "ahmed.rashid@gmail.com",
    phone: "+966 55 876 5432",
    country: "Saudi Arabia",
    city: "Riyadh",
    address: "Al Olaya, Riyadh, Saudi Arabia",
    status: "Active",
    shipments: 32,
    spent: 5890,
    joined: "2026-07-05",
    lastActivity: "2026-11-19",
    avatar: "AR",
    notes: "Business account. High shipment volume.",
    shipmentsHistory: [
      { id: "X10-SHP-1048", route: "Riyadh → Dubai", date: "2026-11-19", status: "Processing", amount: 260 },
      { id: "X10-SHP-0991", route: "Riyadh → Doha", date: "2026-11-12", status: "Delivered", amount: 310 },
    ],
  },
  {
    id: "X10-CUS-0004",
    firstName: "Fatima",
    lastName: "Al Thani",
    email: "fatima.thani@gmail.com",
    phone: "+974 55 678 9012",
    country: "Qatar",
    city: "Doha",
    address: "West Bay, Doha, Qatar",
    status: "Inactive",
    shipments: 7,
    spent: 920,
    joined: "2026-06-14",
    lastActivity: "2026-09-22",
    avatar: "FT",
    notes: "",
    shipmentsHistory: [],
  },
  {
    id: "X10-CUS-0005",
    firstName: "Omar",
    lastName: "Al Sabah",
    email: "omar.alsabah@gmail.com",
    phone: "+965 99 123 456",
    country: "Kuwait",
    city: "Kuwait City",
    address: "Salmiya, Kuwait City, Kuwait",
    status: "Active",
    shipments: 15,
    spent: 1640,
    joined: "2026-10-02",
    lastActivity: "2026-11-16",
    avatar: "OS",
    notes: "Requests express delivery.",
    shipmentsHistory: [
      { id: "X10-SHP-1020", route: "Kuwait → Dubai", date: "2026-11-16", status: "In Transit", amount: 175 },
    ],
  },
  {
    id: "X10-CUS-0006",
    firstName: "Layla",
    lastName: "Hassan",
    email: "layla.hassan@gmail.com",
    phone: "+973 33 456 789",
    country: "Bahrain",
    city: "Manama",
    address: "Juffair, Manama, Bahrain",
    status: "Suspended",
    shipments: 4,
    spent: 460,
    joined: "2026-05-19",
    lastActivity: "2026-08-14",
    avatar: "LH",
    notes: "Account suspended pending review.",
    shipmentsHistory: [],
  },
  {
    id: "X10-CUS-0007",
    firstName: "Khalid",
    lastName: "Al Mazrouei",
    email: "khalid.mazrouei@gmail.com",
    phone: "+971 52 987 6543",
    country: "UAE",
    city: "Sharjah",
    address: "Al Majaz, Sharjah, UAE",
    status: "Active",
    shipments: 11,
    spent: 1280,
    joined: "2026-11-03",
    lastActivity: "2026-11-18",
    avatar: "KM",
    notes: "",
    shipmentsHistory: [],
  },
  {
    id: "X10-CUS-0008",
    firstName: "Noura",
    lastName: "Al Farsi",
    email: "noura.alfarsi@gmail.com",
    phone: "+968 92 345 678",
    country: "Oman",
    city: "Muscat",
    address: "Al Khuwair, Muscat, Oman",
    status: "Active",
    shipments: 9,
    spent: 1150,
    joined: "2026-11-08",
    lastActivity: "2026-11-15",
    avatar: "NA",
    notes: "",
    shipmentsHistory: [],
  },
];

const emptyForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  country: "UAE",
  city: "",
  address: "",
  status: "Active",
  notes: "",
};

const countries = [
  "UAE",
  "Saudi Arabia",
  "Qatar",
  "Kuwait",
  "Bahrain",
  "Oman",
];

const formatMoney = (amount) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "AED",
    maximumFractionDigits: 0,
  }).format(amount);

const formatDate = (date) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const getInitials = (customer) =>
  `${customer.firstName?.[0] || ""}${customer.lastName?.[0] || ""}`.toUpperCase();

function StatusBadge({ status }) {
  const classes = {
    Active: "customer-status-active",
    Inactive: "customer-status-inactive",
    Suspended: "customer-status-suspended",
  };

  return (
    <span className={`customer-status ${classes[status] || ""}`}>
      <span />
      {status}
    </span>
  );
}

function Modal({ children, onClose, wide = false }) {
  return (
    <div className="customer-modal-overlay" onMouseDown={onClose}>
      <div
        className={`customer-modal ${wide ? "customer-modal-wide" : ""}`}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default function Customers() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [countryFilter, setCountryFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  const [modal, setModal] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState("");
  const [actionReason, setActionReason] = useState("");
  const [openMenu, setOpenMenu] = useState(null);

  const filteredCustomers = useMemo(() => {
    let result = [...customers];

    if (search.trim()) {
      const query = search.toLowerCase().trim();
      result = result.filter((customer) =>
        [
          customer.id,
          customer.firstName,
          customer.lastName,
          customer.email,
          customer.phone,
          customer.city,
          customer.country,
        ].some((value) => String(value).toLowerCase().includes(query))
      );
    }

    if (statusFilter !== "All") {
      result = result.filter((c) => c.status === statusFilter);
    }

    if (countryFilter !== "All") {
      result = result.filter((c) => c.country === countryFilter);
    }

    result.sort((a, b) => {
      if (sortBy === "newest") return b.joined.localeCompare(a.joined);
      if (sortBy === "oldest") return a.joined.localeCompare(b.joined);
      if (sortBy === "shipments") return b.shipments - a.shipments;
      if (sortBy === "spent") return b.spent - a.spent;
      return 0;
    });

    return result;
  }, [customers, search, statusFilter, countryFilter, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredCustomers.length / pageSize));
  const currentPage = Math.min(page, totalPages);

  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalCustomers = customers.length;
  const activeCustomers = customers.filter((c) => c.status === "Active").length;
  const suspendedCustomers = customers.filter((c) => c.status === "Suspended").length;

  const newCustomers = customers.filter((c) => {
    const joined = new Date(`${c.joined}T00:00:00`);
    const now = new Date();
    return (
      joined.getMonth() === now.getMonth() &&
      joined.getFullYear() === now.getFullYear()
    );
  }).length;

  const openAddModal = () => {
    setForm(emptyForm);
    setFormError("");
    setSelectedCustomer(null);
    setModal("add");
  };

  const openEditModal = (customer) => {
    setSelectedCustomer(customer);
    setForm({
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phone: customer.phone,
      country: customer.country,
      city: customer.city,
      address: customer.address,
      status: customer.status,
      notes: customer.notes || "",
    });
    setFormError("");
    setOpenMenu(null);
    setModal("edit");
  };

  const openDetails = (customer) => {
    setSelectedCustomer(customer);
    setOpenMenu(null);
    setModal("details");
  };

  const saveCustomer = (e) => {
    e.preventDefault();

    if (!form.firstName.trim() || !form.lastName.trim()) {
      setFormError("Please enter the customer's first and last name.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setFormError("Please enter a valid email address.");
      return;
    }

    if (!form.phone.trim() || !form.city.trim()) {
      setFormError("Phone number and city are required.");
      return;
    }

    const duplicateEmail = customers.some(
      (c) =>
        c.email.toLowerCase() === form.email.trim().toLowerCase() &&
        c.id !== selectedCustomer?.id
    );

    if (duplicateEmail) {
      setFormError("This email address is already registered.");
      return;
    }

    if (modal === "add") {
      const newCustomer = {
        ...form,
        id: `X10-CUS-${String(Date.now()).slice(-6)}`,
        shipments: 0,
        spent: 0,
        joined: new Date().toISOString().slice(0, 10),
        lastActivity: new Date().toISOString().slice(0, 10),
        avatar: getInitials(form),
        shipmentsHistory: [],
      };

      setCustomers((prev) => [newCustomer, ...prev]);
      setPage(1);
    } else {
      setCustomers((prev) =>
        prev.map((c) =>
          c.id === selectedCustomer.id
            ? { ...c, ...form, avatar: getInitials(form) }
            : c
        )
      );
    }

    setModal(null);
    setFormError("");
  };

  const openStatusModal = (customer) => {
    setSelectedCustomer(customer);
    setActionReason("");
    setOpenMenu(null);
    setModal(customer.status === "Suspended" ? "activate" : "suspend");
  };

  const confirmStatusChange = () => {
    if (!actionReason.trim()) return;

    const newStatus =
      modal === "activate" ? "Active" : "Suspended";

    setCustomers((prev) =>
      prev.map((c) =>
        c.id === selectedCustomer.id
          ? {
              ...c,
              status: newStatus,
              notes: actionReason,
            }
          : c
      )
    );

    setModal(null);
    setActionReason("");
  };

  const openDeleteModal = (customer) => {
    setSelectedCustomer(customer);
    setOpenMenu(null);
    setModal("delete");
  };

  const confirmDelete = () => {
    setCustomers((prev) =>
      prev.filter((c) => c.id !== selectedCustomer.id)
    );
    setModal(null);
    setSelectedCustomer(null);
  };

  const exportCSV = () => {
    const headers = [
      "Customer ID",
      "First Name",
      "Last Name",
      "Email",
      "Phone",
      "Country",
      "City",
      "Status",
      "Shipments",
      "Total Spent AED",
      "Joined Date",
    ];

    const rows = filteredCustomers.map((c) => [
      c.id,
      c.firstName,
      c.lastName,
      c.email,
      c.phone,
      c.country,
      c.city,
      c.status,
      c.shipments,
      c.spent,
      c.joined,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row
          .map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "x10-customers.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setCountryFilter("All");
    setSortBy("newest");
    setPage(1);
  };

  const handleFilterChange = (setter, value) => {
    setter(value);
    setPage(1);
  };

  return (
    <div className="customers-page">
      {/* PAGE HEADING */}
      <div className="customers-page-heading">
        <div>
          <div className="customers-breadcrumb">
            <span>Management</span>
            <ChevronRight size={13} />
            <strong>Customers</strong>
          </div>

          <h1>Customers Management</h1>
          <p>
            Manage your customers, monitor their activity and keep track
            of their shipment history.
          </p>
        </div>

        <div className="customers-heading-actions">
          <button className="customer-btn-secondary" onClick={exportCSV}>
            <Download size={16} />
            Export CSV
          </button>
          <button className="customer-btn-primary" onClick={openAddModal}>
            <Plus size={17} />
            Add Customer
          </button>
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="customers-stats-grid">
        <div className="customer-stat-card">
          <div className="customer-stat-top">
            <div className="customer-stat-icon orange">
              <Users size={20} />
            </div>
            <span className="customer-stat-trend positive">
              <ArrowUpRight size={14} /> 12.5%
            </span>
          </div>
          <span className="customer-stat-label">Total Customers</span>
          <div className="customer-stat-number">{totalCustomers.toLocaleString()}</div>
          <span className="customer-stat-caption">All registered accounts</span>
        </div>

        <div className="customer-stat-card">
          <div className="customer-stat-top">
            <div className="customer-stat-icon green">
              <UserCheck size={20} />
            </div>
            <span className="customer-stat-trend positive">
              <ArrowUpRight size={14} /> 8.2%
            </span>
          </div>
          <span className="customer-stat-label">Active Customers</span>
          <div className="customer-stat-number">{activeCustomers.toLocaleString()}</div>
          <span className="customer-stat-caption">Currently active accounts</span>
        </div>

        <div className="customer-stat-card">
          <div className="customer-stat-top">
            <div className="customer-stat-icon blue">
              <UserPlus size={20} />
            </div>
            <span className="customer-stat-trend positive">
              <ArrowUpRight size={14} /> 18.4%
            </span>
          </div>
          <span className="customer-stat-label">New This Month</span>
          <div className="customer-stat-number">{newCustomers.toLocaleString()}</div>
          <span className="customer-stat-caption">Registered this month</span>
        </div>

        <div className="customer-stat-card">
          <div className="customer-stat-top">
            <div className="customer-stat-icon red">
              <UserX size={20} />
            </div>
            <span className="customer-stat-trend neutral">
              Account review
            </span>
          </div>
          <span className="customer-stat-label">Suspended Customers</span>
          <div className="customer-stat-number">{suspendedCustomers.toLocaleString()}</div>
          <span className="customer-stat-caption">Accounts currently suspended</span>
        </div>
      </div>

      {/* TABLE CONTAINER */}
      <div className="customers-table-card">
        <div className="customers-table-header">
          <div>
            <h3>All Customers</h3>
            <p>View and manage all customers registered on X10 Shipping.</p>
          </div>
          <span className="customers-total-pill">
            {filteredCustomers.length} Customers
          </span>
        </div>

        {/* FILTERS */}
        <div className="customers-toolbar">
          <div className="customer-search-box">
            <Search size={17} />
            <input
              type="text"
              placeholder="Search name, email, phone or ID..."
              value={search}
              onChange={(e) => handleFilterChange(setSearch, e.target.value)}
            />
            {search && (
              <button onClick={() => setSearch("")} aria-label="Clear search">
                <X size={15} />
              </button>
            )}
          </div>

          <div className="customer-filter-group">
            <div className="customer-select-wrapper">
              <Filter size={14} />
              <select
                value={statusFilter}
                onChange={(e) =>
                  handleFilterChange(setStatusFilter, e.target.value)
                }
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>

            <div className="customer-select-wrapper">
              <MapPin size={14} />
              <select
                value={countryFilter}
                onChange={(e) =>
                  handleFilterChange(setCountryFilter, e.target.value)
                }
              >
                <option value="All">All Countries</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            <div className="customer-select-wrapper">
              <CalendarDays size={14} />
              <select
                value={sortBy}
                onChange={(e) =>
                  handleFilterChange(setSortBy, e.target.value)
                }
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="shipments">Most Shipments</option>
                <option value="spent">Highest Spending</option>
              </select>
            </div>

            <button
              className="customer-reset-btn"
              onClick={resetFilters}
              title="Reset filters"
            >
              <RefreshCw size={15} />
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="customers-table-responsive">
          <table className="customers-table">
            <thead>
              <tr>
                <th>CUSTOMER</th>
                <th>CONTACT</th>
                <th>LOCATION</th>
                <th>SHIPMENTS</th>
                <th>TOTAL SPENT</th>
                <th>JOINED DATE</th>
                <th>STATUS</th>
                <th className="customer-actions-column">ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {paginatedCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td>
                    <button
                      className="customer-identity"
                      onClick={() => openDetails(customer)}
                    >
                      <span className="customer-table-avatar">
                        {customer.avatar || getInitials(customer)}
                      </span>
                      <span className="customer-identity-info">
                        <strong>
                          {customer.firstName} {customer.lastName}
                        </strong>
                        <small>{customer.id}</small>
                      </span>
                    </button>
                  </td>

                  <td>
                    <div className="customer-contact">
                      <span><Mail size={12} /> {customer.email}</span>
                      <span><Phone size={12} /> {customer.phone}</span>
                    </div>
                  </td>

                  <td>
                    <div className="customer-location">
                      <strong>{customer.city}</strong>
                      <small>{customer.country}</small>
                    </div>
                  </td>

                  <td>
                    <span className="customer-shipment-count">
                      <Package size={14} />
                      {customer.shipments}
                    </span>
                  </td>

                  <td>
                    <strong className="customer-spent">
                      {formatMoney(customer.spent)}
                    </strong>
                  </td>

                  <td className="customer-date">
                    {formatDate(customer.joined)}
                  </td>

                  <td>
                    <StatusBadge status={customer.status} />
                  </td>

                  <td>
                    <div className="customer-row-actions">
                      <button
                        className="customer-action-icon"
                        title="View details"
                        onClick={() => openDetails(customer)}
                      >
                        <Eye size={15} />
                      </button>

                      <button
                        className="customer-action-icon"
                        title="Edit customer"
                        onClick={() => openEditModal(customer)}
                      >
                        <Pencil size={15} />
                      </button>

                      <div className="customer-menu-wrapper">
                        <button
                          className="customer-action-icon"
                          title="More actions"
                          onClick={() =>
                            setOpenMenu(
                              openMenu === customer.id ? null : customer.id
                            )
                          }
                        >
                          <MoreHorizontal size={17} />
                        </button>

                        {openMenu === customer.id && (
                          <div className="customer-action-menu">
                            <button onClick={() => openDetails(customer)}>
                              <Eye size={14} /> View profile
                            </button>
                            <button onClick={() => openEditModal(customer)}>
                              <Pencil size={14} /> Edit customer
                            </button>
                            <button onClick={() => openStatusModal(customer)}>
                              {customer.status === "Suspended" ? (
                                <><CheckCircle2 size={14} /> Reactivate account</>
                              ) : (
                                <><Ban size={14} /> Suspend account</>
                              )}
                            </button>
                            <button
                              className="delete-action"
                              onClick={() => openDeleteModal(customer)}
                            >
                              <Trash2 size={14} /> Delete customer
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}

              {paginatedCustomers.length === 0 && (
                <tr>
                  <td colSpan="8">
                    <div className="customers-empty-state">
                      <Users size={34} />
                      <strong>No customers found</strong>
                      <p>Try changing your search or filters.</p>
                      <button onClick={resetFilters}>Clear filters</button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="customers-pagination">
          <div className="pagination-info">
            Showing{" "}
            <strong>
              {filteredCustomers.length === 0
                ? 0
                : (currentPage - 1) * pageSize + 1}
              –
              {Math.min(currentPage * pageSize, filteredCustomers.length)}
            </strong>{" "}
            of <strong>{filteredCustomers.length}</strong> customers
          </div>

          <div className="pagination-controls">
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
              aria-label="Rows per page"
            >
              <option value={6}>6 / page</option>
              <option value={10}>10 / page</option>
              <option value={20}>20 / page</option>
            </select>

            <button
              disabled={currentPage === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              aria-label="Previous page"
            >
              <ChevronLeft size={16} />
            </button>

            <span className="pagination-current">
              {currentPage} / {totalPages}
            </span>

            <button
              disabled={currentPage >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              aria-label="Next page"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* ADD / EDIT CUSTOMER MODAL */}
      {(modal === "add" || modal === "edit") && (
        <Modal onClose={() => setModal(null)}>
          <div className="customer-modal-header">
            <div>
              <span className="customer-modal-eyebrow">
                CUSTOMER MANAGEMENT
              </span>
              <h2>{modal === "add" ? "Add New Customer" : "Edit Customer"}</h2>
              <p>
                {modal === "add"
                  ? "Create a new customer account in X10 Shipping."
                  : "Update customer information and account details."}
              </p>
            </div>
            <button className="customer-modal-close" onClick={() => setModal(null)}>
              <X size={19} />
            </button>
          </div>

          <form className="customer-form" onSubmit={saveCustomer}>
            <div className="customer-form-section-title">
              <Users size={16} />
              Personal Information
            </div>

            <div className="customer-form-grid">
              <div className="customer-form-field">
                <label>First Name *</label>
                <input
                  value={form.firstName}
                  onChange={(e) =>
                    setForm({ ...form, firstName: e.target.value })
                  }
                  placeholder="Enter first name"
                />
              </div>

              <div className="customer-form-field">
                <label>Last Name *</label>
                <input
                  value={form.lastName}
                  onChange={(e) =>
                    setForm({ ...form, lastName: e.target.value })
                  }
                  placeholder="Enter last name"
                />
              </div>

              <div className="customer-form-field">
                <label>Email Address *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  placeholder="customer@email.com"
                />
              </div>

              <div className="customer-form-field">
                <label>Phone Number *</label>
                <input
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                  }
                  placeholder="+971 50 000 0000"
                />
              </div>
            </div>

            <div className="customer-form-section-title">
              <MapPin size={16} />
              Location Information
            </div>

            <div className="customer-form-grid">
              <div className="customer-form-field">
                <label>Country *</label>
                <select
                  value={form.country}
                  onChange={(e) =>
                    setForm({ ...form, country: e.target.value })
                  }
                >
                  {countries.map((country) => (
                    <option key={country}>{country}</option>
                  ))}
                </select>
              </div>

              <div className="customer-form-field">
                <label>City *</label>
                <input
                  value={form.city}
                  onChange={(e) =>
                    setForm({ ...form, city: e.target.value })
                  }
                  placeholder="Enter city"
                />
              </div>

              <div className="customer-form-field full-width">
                <label>Full Address</label>
                <input
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                  placeholder="Street, building, area..."
                />
              </div>
            </div>

            <div className="customer-form-section-title">
              <ShieldCheck size={16} />
              Account Settings
            </div>

            <div className="customer-form-grid">
              <div className="customer-form-field">
                <label>Account Status</label>
                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm({ ...form, status: e.target.value })
                  }
                >
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Suspended</option>
                </select>
              </div>

              <div className="customer-form-field full-width">
                <label>Internal Notes</label>
                <textarea
                  rows="3"
                  value={form.notes}
                  onChange={(e) =>
                    setForm({ ...form, notes: e.target.value })
                  }
                  placeholder="Add internal notes about this customer..."
                />
              </div>
            </div>

            {formError && (
              <div className="customer-form-error">
                <X size={15} />
                {formError}
              </div>
            )}

            <div className="customer-modal-footer">
              <button
                type="button"
                className="customer-btn-secondary"
                onClick={() => setModal(null)}
              >
                Cancel
              </button>
              <button type="submit" className="customer-btn-primary">
                {modal === "add" ? <Plus size={16} /> : <CheckCircle2 size={16} />}
                {modal === "add" ? "Create Customer" : "Save Changes"}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* CUSTOMER DETAILS MODAL */}
      {modal === "details" && selectedCustomer && (
        <Modal onClose={() => setModal(null)} wide>
          <div className="customer-details-header">
            <button className="customer-modal-close" onClick={() => setModal(null)}>
              <X size={19} />
            </button>

            <div className="customer-profile-main">
              <div className="customer-profile-avatar">
                {selectedCustomer.avatar || getInitials(selectedCustomer)}
              </div>
              <div className="customer-profile-info">
                <span className="customer-modal-eyebrow">CUSTOMER PROFILE</span>
                <h2>
                  {selectedCustomer.firstName} {selectedCustomer.lastName}
                </h2>
                <p>{selectedCustomer.id}</p>
                <StatusBadge status={selectedCustomer.status} />
              </div>
            </div>

            <button
              className="customer-btn-primary"
              onClick={() => openEditModal(selectedCustomer)}
            >
              <Pencil size={15} /> Edit Profile
            </button>
          </div>

          <div className="customer-details-body">
            <div className="customer-detail-kpis">
              <div>
                <Package size={18} />
                <span>Total Shipments</span>
                <strong>{selectedCustomer.shipments}</strong>
              </div>
              <div>
                <Wallet size={18} />
                <span>Total Spent</span>
                <strong>{formatMoney(selectedCustomer.spent)}</strong>
              </div>
              <div>
                <CalendarDays size={18} />
                <span>Member Since</span>
                <strong>{formatDate(selectedCustomer.joined)}</strong>
              </div>
            </div>

            <div className="customer-details-grid">
              <section className="customer-detail-section">
                <h3><Users size={16} /> Personal Information</h3>
                <div className="customer-detail-line">
                  <span>Full Name</span>
                  <strong>{selectedCustomer.firstName} {selectedCustomer.lastName}</strong>
                </div>
                <div className="customer-detail-line">
                  <span>Email Address</span>
                  <strong>{selectedCustomer.email}</strong>
                </div>
                <div className="customer-detail-line">
                  <span>Phone Number</span>
                  <strong>{selectedCustomer.phone}</strong>
                </div>
                <div className="customer-detail-line">
                  <span>Country</span>
                  <strong>{selectedCustomer.country}</strong>
                </div>
                <div className="customer-detail-line">
                  <span>City</span>
                  <strong>{selectedCustomer.city}</strong>
                </div>
                <div className="customer-detail-line">
                  <span>Address</span>
                  <strong>{selectedCustomer.address || "Not provided"}</strong>
                </div>
              </section>

              <section className="customer-detail-section">
                <h3><Clock size={16} /> Account Activity</h3>
                <div className="customer-detail-line">
                  <span>Registration Date</span>
                  <strong>{formatDate(selectedCustomer.joined)}</strong>
                </div>
                <div className="customer-detail-line">
                  <span>Last Activity</span>
                  <strong>{formatDate(selectedCustomer.lastActivity)}</strong>
                </div>
                <div className="customer-detail-line">
                  <span>Account Status</span>
                  <StatusBadge status={selectedCustomer.status} />
                </div>
                <div className="customer-notes-box">
                  <span>Internal Notes</span>
                  <p>{selectedCustomer.notes || "No internal notes."}</p>
                </div>
              </section>
            </div>

            <section className="customer-detail-section customer-history-section">
              <div className="customer-history-heading">
                <h3><Truck size={16} /> Recent Shipments</h3>
                <span>{selectedCustomer.shipmentsHistory?.length || 0} records shown</span>
              </div>

              {selectedCustomer.shipmentsHistory?.length > 0 ? (
                <div className="customer-history-list">
                  {selectedCustomer.shipmentsHistory.map((shipment) => (
                    <div className="customer-history-item" key={shipment.id}>
                      <div className="customer-history-icon">
                        <Package size={17} />
                      </div>
                      <div className="customer-history-info">
                        <strong>{shipment.id}</strong>
                        <span>{shipment.route}</span>
                      </div>
                      <div className="customer-history-date">
                        {formatDate(shipment.date)}
                      </div>
                      <span className={`shipment-history-status ${
                        shipment.status === "Delivered"
                          ? "history-delivered"
                          : shipment.status === "In Transit"
                          ? "history-transit"
                          : "history-processing"
                      }`}>
                        {shipment.status}
                      </span>
                      <strong className="customer-history-amount">
                        {formatMoney(shipment.amount)}
                      </strong>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="customer-history-empty">
                  <Package size={25} />
                  <strong>No shipment history</strong>
                  <span>This customer has no recorded shipments yet.</span>
                </div>
              )}
            </section>
          </div>
        </Modal>
      )}

      {/* SUSPEND / REACTIVATE MODAL */}
      {(modal === "suspend" || modal === "activate") && selectedCustomer && (
        <Modal onClose={() => setModal(null)}>
          <div className="customer-confirm-modal">
            <div className={`customer-confirm-icon ${
              modal === "suspend" ? "danger" : "success"
            }`}>
              {modal === "suspend" ? <Ban size={25} /> : <CheckCircle2 size={25} />}
            </div>

            <h2>
              {modal === "suspend" ? "Suspend Customer?" : "Reactivate Customer?"}
            </h2>

            <p>
              {modal === "suspend"
                ? `Are you sure you want to suspend ${selectedCustomer.firstName} ${selectedCustomer.lastName}'s account?`
                : `Do you want to reactivate ${selectedCustomer.firstName} ${selectedCustomer.lastName}'s account?`}
            </p>

            <div className="customer-form-field customer-reason-field">
              <label>
                {modal === "suspend" ? "Suspension Reason *" : "Reactivation Note *"}
              </label>
              <textarea
                rows="3"
                value={actionReason}
                onChange={(e) => setActionReason(e.target.value)}
                placeholder="Enter the reason..."
              />
            </div>

            <div className="customer-modal-footer">
              <button className="customer-btn-secondary" onClick={() => setModal(null)}>
                Cancel
              </button>
              <button
                className={modal === "suspend" ? "customer-btn-danger" : "customer-btn-primary"}
                disabled={!actionReason.trim()}
                onClick={confirmStatusChange}
              >
                {modal === "suspend" ? "Confirm Suspension" : "Reactivate Account"}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {modal === "delete" && selectedCustomer && (
        <Modal onClose={() => setModal(null)}>
          <div className="customer-confirm-modal">
            <div className="customer-confirm-icon danger">
              <Trash2 size={25} />
            </div>

            <h2>Delete Customer?</h2>
            <p>
              You are about to delete{" "}
              <strong>
                {selectedCustomer.firstName} {selectedCustomer.lastName}
              </strong>{" "}
              ({selectedCustomer.id}). This action cannot be undone.
            </p>

            <div className="customer-delete-warning">
              <ShieldCheck size={16} />
              In production, verify related shipments, invoices and financial
              records before allowing permanent deletion.
            </div>

            <div className="customer-modal-footer">
              <button className="customer-btn-secondary" onClick={() => setModal(null)}>
                Cancel
              </button>
              <button className="customer-btn-danger" onClick={confirmDelete}>
                <Trash2 size={15} /> Delete Customer
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
