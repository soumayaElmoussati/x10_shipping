
import { useMemo, useState } from "react";
import {
  Search, Filter, RefreshCw, Plus, Package, Truck,
  Clock, CheckCircle2, AlertCircle, MapPin, Calendar,
  ArrowUpRight, Eye, MoreHorizontal, X, ChevronLeft,
  ChevronRight, Weight, User, Phone, Mail, Box,
  ArrowRight, Building2, ClipboardList, Send,
  Globe2, History, Check, RotateCcw, FileText
} from "lucide-react";
import "./ShipmentRequests.css";

const initialShipments = [
  {
    id: "SHP-2026-001",
    customer: "Ahmed Benali",
    email: "ahmed.benali@gmail.com",
    phone: "+971 50 123 4567",
    origin: "Dubai",
    originCountry: "UAE",
    destination: "Riyadh",
    destinationCountry: "Saudi Arabia",
    type: "Documents",
    weight: "1.2 kg",
    dimensions: "30 × 20 × 5 cm",
    pieces: 1,
    service: "Express",
    date: "2026-11-19",
    status: "New Request",
    priority: "Normal",
    carrier: null,
    price: 45,
    currency: "AED",
    description: "Business documents in a sealed envelope.",
    recipient: "Mohammed Al Saud",
    recipientPhone: "+966 55 987 6543",
  },
  {
    id: "SHP-2026-002",
    customer: "Sara Khalid",
    email: "sara.k@gmail.com",
    phone: "+971 55 222 3344",
    origin: "Abu Dhabi",
    originCountry: "UAE",
    destination: "Doha",
    destinationCountry: "Qatar",
    type: "Electronics",
    weight: "3.5 kg",
    dimensions: "40 × 30 × 20 cm",
    pieces: 1,
    service: "Standard",
    date: "2026-11-19",
    status: "Under Review",
    priority: "High",
    carrier: null,
    price: 85,
    currency: "AED",
    description: "Electronic accessories, carefully packed.",
    recipient: "Fatima Hassan",
    recipientPhone: "+974 33 123 456",
  },
  {
    id: "SHP-2026-003",
    customer: "Omar Abdullah",
    email: "omar.a@gmail.com",
    phone: "+971 52 456 7890",
    origin: "Sharjah",
    originCountry: "UAE",
    destination: "Kuwait City",
    destinationCountry: "Kuwait",
    type: "Clothing",
    weight: "5 kg",
    dimensions: "50 × 40 × 30 cm",
    pieces: 2,
    service: "Express",
    date: "2026-11-18",
    status: "Ready for Assignment",
    priority: "Normal",
    carrier: null,
    price: 110,
    currency: "AED",
    description: "Clothing items.",
    recipient: "Yousef Ahmad",
    recipientPhone: "+965 55 123 456",
  },
  {
    id: "SHP-2026-004",
    customer: "Noura Ibrahim",
    email: "noura.i@gmail.com",
    phone: "+971 56 111 2233",
    origin: "Dubai",
    originCountry: "UAE",
    destination: "Manama",
    destinationCountry: "Bahrain",
    type: "Personal Items",
    weight: "8 kg",
    dimensions: "60 × 40 × 35 cm",
    pieces: 3,
    service: "Standard",
    date: "2026-11-18",
    status: "Assigned",
    priority: "Normal",
    carrier: "iMile",
    trackingNumber: "IML987654321",
    price: 160,
    currency: "AED",
    description: "Personal belongings.",
    recipient: "Ali Hassan",
    recipientPhone: "+973 39 123 456",
  },
  {
    id: "SHP-2026-005",
    customer: "Khalid Mansour",
    email: "khalid.m@gmail.com",
    phone: "+971 54 333 2211",
    origin: "Ajman",
    originCountry: "UAE",
    destination: "Muscat",
    destinationCountry: "Oman",
    type: "Electronics",
    weight: "2 kg",
    dimensions: "35 × 25 × 15 cm",
    pieces: 1,
    service: "Express",
    date: "2026-11-17",
    status: "In Transit",
    priority: "High",
    carrier: "iMile",
    trackingNumber: "IML123456789",
    price: 95,
    currency: "AED",
    description: "Electronic device.",
    recipient: "Salim Al Balushi",
    recipientPhone: "+968 99 123 456",
  },
  {
    id: "SHP-2026-006",
    customer: "Mariam Saeed",
    email: "mariam.s@gmail.com",
    phone: "+971 50 444 5566",
    origin: "Dubai",
    originCountry: "UAE",
    destination: "Riyadh",
    destinationCountry: "Saudi Arabia",
    type: "Documents",
    weight: "0.8 kg",
    dimensions: "25 × 18 × 3 cm",
    pieces: 1,
    service: "Express",
    date: "2026-11-16",
    status: "Delivered",
    priority: "Normal",
    carrier: "iMile",
    trackingNumber: "IML456789123",
    price: 40,
    currency: "AED",
    description: "Legal documents.",
    recipient: "Sara Mohammed",
    recipientPhone: "+966 50 123 4567",
  },
];

const carriers = [
  {
    id: "imile",
    name: "iMile",
    description: "UAE & GCC delivery network",
    services: ["Express", "Standard"],
    coverage: ["Saudi Arabia", "Qatar", "Kuwait", "Bahrain", "Oman", "UAE"],
    logo: "IM",
    price: 45,
    delivery: "2–4 business days",
    active: true,
  },
  {
    id: "aramex",
    name: "Aramex",
    description: "International shipping services",
    services: ["Express", "Standard"],
    coverage: ["Saudi Arabia", "Qatar", "Kuwait", "Bahrain", "Oman", "UAE"],
    logo: "AR",
    price: 55,
    delivery: "2–5 business days",
    active: true,
  },
  {
    id: "dhl",
    name: "DHL Express",
    description: "International express delivery",
    services: ["Express"],
    coverage: ["Saudi Arabia", "Qatar", "Kuwait", "Bahrain", "Oman", "UAE"],
    logo: "DH",
    price: 75,
    delivery: "1–3 business days",
    active: true,
  },
];

const statusOptions = [
  "New Request",
  "Under Review",
  "Ready for Assignment",
  "Assigned",
  "Pickup Scheduled",
  "Picked Up",
  "In Transit",
  "Delivered",
  "Cancelled",
];

const statusClass = (status) => {
  const map = {
    "New Request": "new",
    "Under Review": "review",
    "Ready for Assignment": "ready",
    Assigned: "assigned",
    "Pickup Scheduled": "scheduled",
    "Picked Up": "picked",
    "In Transit": "transit",
    Delivered: "delivered",
    Cancelled: "cancelled",
  };
  return map[status] || "review";
};

function StatusBadge({ status }) {
  return (
    <span className={`shipment-status status-${statusClass(status)}`}>
      <span className="status-dot" />
      {status}
    </span>
  );
}

function ShipmentRequests() {
  const [shipments, setShipments] = useState(initialShipments);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [countryFilter, setCountryFilter] = useState("All Countries");
  const [serviceFilter, setServiceFilter] = useState("All Services");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const [selectedShipment, setSelectedShipment] = useState(null);
  const [showAssignment, setShowAssignment] = useState(false);
  const [selectedCarrier, setSelectedCarrier] = useState("");
  const [assignmentError, setAssignmentError] = useState("");
  const [menuId, setMenuId] = useState(null);

  const filteredShipments = useMemo(() => {
    return shipments.filter((shipment) => {
      const query = search.toLowerCase();

      const matchesSearch =
        shipment.id.toLowerCase().includes(query) ||
        shipment.customer.toLowerCase().includes(query) ||
        shipment.destination.toLowerCase().includes(query) ||
        shipment.origin.toLowerCase().includes(query) ||
        (shipment.trackingNumber || "").toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All Statuses" ||
        shipment.status === statusFilter;

      const matchesCountry =
        countryFilter === "All Countries" ||
        shipment.destinationCountry === countryFilter;

      const matchesService =
        serviceFilter === "All Services" ||
        shipment.service === serviceFilter;

      return matchesSearch && matchesStatus && matchesCountry && matchesService;
    });
  }, [shipments, search, statusFilter, countryFilter, serviceFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredShipments.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedShipments = filteredShipments.slice(
    startIndex,
    startIndex + pageSize
  );

  const stats = [
    {
      label: "Total Requests",
      value: shipments.length,
      icon: Package,
      color: "orange",
      description: "All shipment requests",
    },
    {
      label: "Pending Review",
      value: shipments.filter((s) =>
        ["New Request", "Under Review"].includes(s.status)
      ).length,
      icon: Clock,
      color: "blue",
      description: "Awaiting admin review",
    },
    {
      label: "Ready for Assignment",
      value: shipments.filter((s) => s.status === "Ready for Assignment").length,
      icon: Truck,
      color: "purple",
      description: "Awaiting carrier selection",
    },
    {
      label: "In Transit",
      value: shipments.filter((s) =>
        ["In Transit", "Picked Up"].includes(s.status)
      ).length,
      icon: Globe2,
      color: "green",
      description: "Currently being delivered",
    },
  ];

  const openAssignment = (shipment) => {
    setSelectedShipment(shipment);
    setSelectedCarrier("");
    setAssignmentError("");
    setShowAssignment(true);
    setMenuId(null);
  };

  const assignCarrier = () => {
    if (!selectedCarrier || !selectedShipment) {
      setAssignmentError("Please select a carrier before continuing.");
      return;
    }

    const carrier = carriers.find((c) => c.id === selectedCarrier);

    if (!carrier) return;

    const trackingNumber =
      `${carrier.logo}-${Date.now().toString().slice(-8)}`;

    const updated = shipments.map((shipment) =>
      shipment.id === selectedShipment.id
        ? {
            ...shipment,
            carrier: carrier.name,
            trackingNumber,
            status: "Assigned",
          }
        : shipment
    );

    setShipments(updated);
    setShowAssignment(false);
    setSelectedShipment(null);
  };

  const updateStatus = (shipment, newStatus) => {
    setShipments((prev) =>
      prev.map((s) =>
        s.id === shipment.id ? { ...s, status: newStatus } : s
      )
    );

    setSelectedShipment((prev) =>
      prev?.id === shipment.id ? { ...prev, status: newStatus } : prev
    );

    setMenuId(null);
  };

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("All Statuses");
    setCountryFilter("All Countries");
    setServiceFilter("All Services");
    setCurrentPage(1);
  };

  const closeDetails = () => setSelectedShipment(null);

  return (
    <div className="shipment-page">
      {/* PAGE HEADER */}
      <div className="shipment-page-heading">
        <div>
          <div className="shipment-breadcrumb">
            Operations <ArrowRight size={12} /> Shipments
            <ArrowRight size={12} /> <strong>Requests</strong>
          </div>
          <h1>Shipment Requests</h1>
          <p>
            Manage incoming shipments, review customer requests and assign
            the right delivery partner.
          </p>
        </div>

        <div className="shipment-heading-actions">
          <button
            className="shipment-btn-secondary"
            onClick={() => {
              setShipments([...initialShipments]);
              resetFilters();
            }}
          >
            <RefreshCw size={15} /> Refresh
          </button>
          <button
            className="shipment-btn-primary"
            onClick={() => alert("Connect this action to your shipment creation form.")}
          >
            <Plus size={16} /> New Shipment
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="shipment-stats-grid">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div className="shipment-stat-card" key={stat.label}>
              <div className="shipment-stat-top">
                <div className={`shipment-stat-icon ${stat.color}`}>
                  <Icon size={20} />
                </div>
                <span className="shipment-stat-period">Live overview</span>
              </div>
              <span className="shipment-stat-label">{stat.label}</span>
              <strong className="shipment-stat-number">{stat.value}</strong>
              <span className="shipment-stat-caption">{stat.description}</span>
            </div>
          );
        })}
      </div>

      {/* MAIN TABLE */}
      <div className="shipment-table-card">
        <div className="shipment-table-header">
          <div>
            <h3>All Shipment Requests</h3>
            <p>Review and manage customer shipping requests.</p>
          </div>
          <span className="shipment-total-pill">
            {filteredShipments.length} Requests
          </span>
        </div>

        {/* FILTERS */}
        <div className="shipment-toolbar">
          <div className="shipment-search">
            <Search size={16} />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search reference, customer, destination..."
            />
            {search && (
              <button onClick={() => setSearch("")}>
                <X size={14} />
              </button>
            )}
          </div>

          <div className="shipment-filter-group">
            <div className="shipment-filter-select">
              <Filter size={14} />
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option>All Statuses</option>
                {statusOptions.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            </div>

            <div className="shipment-filter-select">
              <Globe2 size={14} />
              <select
                value={countryFilter}
                onChange={(e) => {
                  setCountryFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option>All Countries</option>
                {[
                  "Saudi Arabia",
                  "Qatar",
                  "Kuwait",
                  "Bahrain",
                  "Oman",
                  "UAE",
                ].map((country) => (
                  <option key={country}>{country}</option>
                ))}
              </select>
            </div>

            <div className="shipment-filter-select">
              <Truck size={14} />
              <select
                value={serviceFilter}
                onChange={(e) => {
                  setServiceFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option>All Services</option>
                <option>Express</option>
                <option>Standard</option>
              </select>
            </div>

            <button
              className="shipment-reset-btn"
              onClick={resetFilters}
              title="Reset filters"
            >
              <RotateCcw size={15} />
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="shipment-table-responsive">
          <table className="shipment-table">
            <thead>
              <tr>
                <th>SHIPMENT / CUSTOMER</th>
                <th>ROUTE</th>
                <th>PACKAGE</th>
                <th>SERVICE</th>
                <th>REQUEST DATE</th>
                <th>CARRIER</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {paginatedShipments.map((shipment) => (
                <tr key={shipment.id}>
                  <td>
                    <div className="shipment-identity">
                      <div className="shipment-avatar">
                        <Package size={17} />
                      </div>
                      <div className="shipment-identity-info">
                        <strong>{shipment.id}</strong>
                        <span>{shipment.customer}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="shipment-route">
                      <strong>{shipment.origin}</strong>
                      <ArrowRight size={13} />
                      <strong>{shipment.destination}</strong>
                      <small>{shipment.destinationCountry}</small>
                    </div>
                  </td>

                  <td>
                    <div className="shipment-package">
                      <strong>{shipment.type}</strong>
                      <span>{shipment.weight} · {shipment.pieces} pc</span>
                    </div>
                  </td>

                  <td>
                    <span className={`shipment-service ${shipment.service.toLowerCase()}`}>
                      {shipment.service}
                    </span>
                  </td>

                  <td>
                    <span className="shipment-date">
                      <Calendar size={13} />
                      {shipment.date}
                    </span>
                  </td>

                  <td>
                    {shipment.carrier ? (
                      <span className="shipment-carrier">
                        <Truck size={14} /> {shipment.carrier}
                      </span>
                    ) : (
                      <span className="shipment-no-carrier">Not assigned</span>
                    )}
                  </td>

                  <td>
                    <StatusBadge status={shipment.status} />
                  </td>

                  <td>
                    <div className="shipment-actions">
                      <button
                        className="shipment-action-icon"
                        title="View details"
                        onClick={() => setSelectedShipment(shipment)}
                      >
                        <Eye size={15} />
                      </button>

                      <div className="shipment-menu-wrapper">
                        <button
                          className="shipment-action-icon"
                          title="More actions"
                          onClick={() =>
                            setMenuId(menuId === shipment.id ? null : shipment.id)
                          }
                        >
                          <MoreHorizontal size={17} />
                        </button>

                        {menuId === shipment.id && (
                          <div className="shipment-action-menu">
                            <button
                              onClick={() => {
                                setSelectedShipment(shipment);
                                setMenuId(null);
                              }}
                            >
                              <Eye size={14} /> View details
                            </button>

                            {["New Request", "Under Review", "Ready for Assignment"].includes(
                              shipment.status
                            ) && (
                              <button onClick={() => openAssignment(shipment)}>
                                <Truck size={14} /> Assign carrier
                              </button>
                            )}

                            {shipment.status === "New Request" && (
                              <button
                                onClick={() =>
                                  updateStatus(shipment, "Under Review")
                                }
                              >
                                <ClipboardList size={14} /> Start review
                              </button>
                            )}

                            {shipment.status === "Assigned" && (
                              <button
                                onClick={() =>
                                  updateStatus(shipment, "Pickup Scheduled")
                                }
                              >
                                <Calendar size={14} /> Schedule pickup
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {paginatedShipments.length === 0 && (
            <div className="shipment-empty">
              <Package size={34} />
              <strong>No shipment requests found</strong>
              <p>Try changing your search or filters.</p>
              <button onClick={resetFilters}>Clear filters</button>
            </div>
          )}
        </div>

        {/* PAGINATION */}
        <div className="shipment-pagination">
          <span>
            Showing <strong>{filteredShipments.length ? startIndex + 1 : 0}</strong> to{" "}
            <strong>{Math.min(startIndex + pageSize, filteredShipments.length)}</strong> of{" "}
            <strong>{filteredShipments.length}</strong> requests
          </span>

          <div className="shipment-pagination-controls">
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

      {/* SHIPMENT DETAILS MODAL */}
      {selectedShipment && (
        <div className="shipment-overlay" onClick={closeDetails}>
          <div
            className="shipment-modal shipment-details-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="shipment-modal-header">
              <div>
                <span className="shipment-modal-eyebrow">SHIPMENT OVERVIEW</span>
                <h2>{selectedShipment.id}</h2>
                <p>Complete shipment request information.</p>
              </div>
              <button
                className="shipment-modal-close"
                onClick={closeDetails}
              >
                <X size={18} />
              </button>
            </div>

            <div className="shipment-details-body">
              <div className="shipment-detail-status-row">
                <StatusBadge status={selectedShipment.status} />
                <span className="shipment-detail-reference">
                  Created on {selectedShipment.date}
                </span>
              </div>

              <div className="shipment-detail-grid">
                <div className="shipment-detail-box">
                  <h3><User size={16} /> Customer Information</h3>
                  <div className="shipment-detail-line">
                    <span>Full name</span>
                    <strong>{selectedShipment.customer}</strong>
                  </div>
                  <div className="shipment-detail-line">
                    <span>Email</span>
                    <strong>{selectedShipment.email}</strong>
                  </div>
                  <div className="shipment-detail-line">
                    <span>Phone</span>
                    <strong>{selectedShipment.phone}</strong>
                  </div>
                </div>

                <div className="shipment-detail-box">
                  <h3><MapPin size={16} /> Delivery Route</h3>
                  <div className="shipment-detail-line">
                    <span>Origin</span>
                    <strong>{selectedShipment.origin}, {selectedShipment.originCountry}</strong>
                  </div>
                  <div className="shipment-detail-line">
                    <span>Destination</span>
                    <strong>{selectedShipment.destination}, {selectedShipment.destinationCountry}</strong>
                  </div>
                  <div className="shipment-detail-line">
                    <span>Service</span>
                    <strong>{selectedShipment.service}</strong>
                  </div>
                </div>

                <div className="shipment-detail-box">
                  <h3><Box size={16} /> Package Information</h3>
                  <div className="shipment-detail-line">
                    <span>Package type</span>
                    <strong>{selectedShipment.type}</strong>
                  </div>
                  <div className="shipment-detail-line">
                    <span>Weight</span>
                    <strong>{selectedShipment.weight}</strong>
                  </div>
                  <div className="shipment-detail-line">
                    <span>Dimensions</span>
                    <strong>{selectedShipment.dimensions}</strong>
                  </div>
                  <div className="shipment-detail-line">
                    <span>Pieces</span>
                    <strong>{selectedShipment.pieces}</strong>
                  </div>
                </div>

                <div className="shipment-detail-box">
                  <h3><User size={16} /> Recipient Information</h3>
                  <div className="shipment-detail-line">
                    <span>Recipient</span>
                    <strong>{selectedShipment.recipient}</strong>
                  </div>
                  <div className="shipment-detail-line">
                    <span>Phone</span>
                    <strong>{selectedShipment.recipientPhone}</strong>
                  </div>
                </div>
              </div>

              <div className="shipment-detail-box shipment-carrier-detail">
                <h3><Truck size={16} /> Carrier Assignment</h3>
                <div className="shipment-detail-line">
                  <span>Selected carrier</span>
                  <strong>{selectedShipment.carrier || "Not assigned yet"}</strong>
                </div>
                <div className="shipment-detail-line">
                  <span>Tracking number</span>
                  <strong>{selectedShipment.trackingNumber || "Not available"}</strong>
                </div>
                <div className="shipment-detail-line">
                  <span>Estimated shipping price</span>
                  <strong>{selectedShipment.price} {selectedShipment.currency}</strong>
                </div>
              </div>

              <div className="shipment-detail-box shipment-description">
                <h3><FileText size={16} /> Package Description</h3>
                <p>{selectedShipment.description}</p>
              </div>
            </div>

            <div className="shipment-modal-footer">
              <button className="shipment-btn-secondary" onClick={closeDetails}>
                Close
              </button>

              {!selectedShipment.carrier &&
                ["New Request", "Under Review", "Ready for Assignment"].includes(
                  selectedShipment.status
                ) && (
                  <button
                    className="shipment-btn-primary"
                    onClick={() => openAssignment(selectedShipment)}
                  >
                    <Truck size={15} /> Assign Carrier
                  </button>
                )}
            </div>
          </div>
        </div>
      )}

      {/* CARRIER ASSIGNMENT MODAL */}
      {showAssignment && selectedShipment && (
        <div
          className="shipment-overlay"
          onClick={() => setShowAssignment(false)}
        >
          <div
            className="shipment-modal shipment-assignment-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="shipment-modal-header">
              <div>
                <span className="shipment-modal-eyebrow">CARRIER MANAGEMENT</span>
                <h2>Assign Delivery Partner</h2>
                <p>Select the most suitable carrier for this shipment.</p>
              </div>
              <button
                className="shipment-modal-close"
                onClick={() => setShowAssignment(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="shipment-assignment-content">
              <div className="shipment-assignment-summary">
                <div className="shipment-assignment-package">
                  <Package size={20} />
                </div>
                <div>
                  <strong>{selectedShipment.id}</strong>
                  <span>
                    {selectedShipment.origin} → {selectedShipment.destination},{" "}
                    {selectedShipment.destinationCountry}
                  </span>
                </div>
                <strong>{selectedShipment.weight}</strong>
              </div>

              <div className="shipment-assignment-section">
                <h3>Available Delivery Partners</h3>
                <p>
                  Choose a connected carrier compatible with this route and
                  requested service.
                </p>
              </div>

              <div className="shipment-carrier-list">
                {carriers
                  .filter(
                    (carrier) =>
                      carrier.active &&
                      carrier.coverage.includes(selectedShipment.destinationCountry) &&
                      carrier.services.includes(selectedShipment.service)
                  )
                  .map((carrier) => (
                    <button
                      key={carrier.id}
                      className={`shipment-carrier-option ${
                        selectedCarrier === carrier.id ? "selected" : ""
                      }`}
                      onClick={() => {
                        setSelectedCarrier(carrier.id);
                        setAssignmentError("");
                      }}
                    >
                      <div className={`shipment-carrier-logo ${carrier.id}`}>
                        {carrier.logo}
                      </div>

                      <div className="shipment-carrier-info">
                        <strong>{carrier.name}</strong>
                        <span>{carrier.description}</span>
                        <small>{carrier.delivery}</small>
                      </div>

                      <div className="shipment-carrier-price">
                        <strong>{carrier.price} AED</strong>
                        <span>Estimated</span>
                      </div>

                      <div className="shipment-carrier-check">
                        {selectedCarrier === carrier.id && <Check size={15} />}
                      </div>
                    </button>
                  ))}

                {carriers.filter(
                  (carrier) =>
                    carrier.active &&
                    carrier.coverage.includes(selectedShipment.destinationCountry) &&
                    carrier.services.includes(selectedShipment.service)
                ).length === 0 && (
                  <div className="shipment-no-carriers">
                    <AlertCircle size={22} />
                    <strong>No compatible carrier found</strong>
                    <span>
                      Please review partner coverage and service configuration.
                    </span>
                  </div>
                )}
              </div>

              {assignmentError && (
                <div className="shipment-assignment-error">
                  <AlertCircle size={15} />
                  {assignmentError}
                </div>
              )}

              <div className="shipment-assignment-warning">
                <AlertCircle size={16} />
                <span>
                  In production, confirmation will send the shipment data to
                  the selected carrier API. The carrier must confirm the
                  booking before the shipment is considered successfully
                  assigned.
                </span>
              </div>
            </div>

            <div className="shipment-modal-footer">
              <button
                className="shipment-btn-secondary"
                onClick={() => setShowAssignment(false)}
              >
                Cancel
              </button>
              <button
                className="shipment-btn-primary"
                onClick={assignCarrier}
                disabled={!selectedCarrier}
              >
                <Send size={15} /> Confirm Assignment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShipmentRequests;
