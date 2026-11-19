
import { useMemo, useState } from "react";
import {
  Search,
  Filter,
  RotateCcw,
  Package,
  Truck,
  Clock,
  CheckCircle2,
  MapPin,
  CalendarDays,
  Eye,
  MoreHorizontal,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ArrowUpRight,
  Box,
  User,
  Phone,
  Mail,
  Weight,
  Globe,
  Hash,
  CircleDot,
  CircleCheck,
  AlertTriangle,
  ClipboardList,
  Navigation,
  PackageCheck,
  Building2,
  FileText,
  Plus,
  Send,
} from "lucide-react";
import "./AllShipments.css";

const initialShipments = [
  {
    id: "SHP-2026-001",
    customer: "Ahmed Benali",
    customerEmail: "ahmed.benali@email.com",
    customerPhone: "+971 50 123 4567",
    recipient: "Mohammed Al Rashid",
    recipientPhone: "+966 55 123 4567",
    origin: "Dubai, UAE",
    destination: "Riyadh, Saudi Arabia",
    package: "Documents",
    weight: "1.2 kg",
    service: "Express",
    carrier: null,
    tracking: null,
    status: "New Request",
    createdAt: "19 Nov 2026",
    estimatedDelivery: "22 Nov 2026",
    price: "45.00",
    currency: "USD",
    description: "Important business documents.",
    events: [
      {
        title: "Shipment request created",
        location: "X10 Shipping",
        date: "19 Nov 2026 · 09:30",
        completed: true,
      },
    ],
  },
  {
    id: "SHP-2026-002",
    customer: "Sara Khalid",
    customerEmail: "sara.khalid@email.com",
    customerPhone: "+971 50 234 5678",
    recipient: "Fatima Al Thani",
    recipientPhone: "+974 55 234 5678",
    origin: "Abu Dhabi, UAE",
    destination: "Doha, Qatar",
    package: "Electronics",
    weight: "3.5 kg",
    service: "Standard",
    carrier: null,
    tracking: null,
    status: "Under Review",
    createdAt: "18 Nov 2026",
    estimatedDelivery: "25 Nov 2026",
    price: "75.00",
    currency: "USD",
    description: "Electronic accessories.",
    events: [
      {
        title: "Shipment request created",
        location: "X10 Shipping",
        date: "18 Nov 2026 · 10:15",
        completed: true,
      },
      {
        title: "Request under review",
        location: "X10 Shipping",
        date: "18 Nov 2026 · 11:00",
        completed: true,
      },
    ],
  },
  {
    id: "SHP-2026-003",
    customer: "Omar Abdullah",
    customerEmail: "omar.abdullah@email.com",
    customerPhone: "+971 50 345 6789",
    recipient: "Yousef Al Sabah",
    recipientPhone: "+965 55 345 6789",
    origin: "Sharjah, UAE",
    destination: "Kuwait City, Kuwait",
    package: "Clothing",
    weight: "5 kg",
    service: "Express",
    carrier: null,
    tracking: null,
    status: "Ready for Assignment",
    createdAt: "17 Nov 2026",
    estimatedDelivery: "21 Nov 2026",
    price: "95.00",
    currency: "USD",
    description: "Clothing and personal accessories.",
    events: [
      {
        title: "Shipment request created",
        location: "X10 Shipping",
        date: "17 Nov 2026 · 08:45",
        completed: true,
      },
      {
        title: "Request approved",
        location: "X10 Shipping",
        date: "17 Nov 2026 · 14:20",
        completed: true,
      },
    ],
  },
  {
    id: "SHP-2026-004",
    customer: "Noura Ibrahim",
    customerEmail: "noura.ibrahim@email.com",
    customerPhone: "+971 50 456 7890",
    recipient: "Ali Hassan",
    recipientPhone: "+973 33 456 789",
    origin: "Dubai, UAE",
    destination: "Manama, Bahrain",
    package: "Personal Items",
    weight: "8 kg",
    service: "Standard",
    carrier: "iMile",
    tracking: "IML987654321",
    status: "Assigned",
    createdAt: "16 Nov 2026",
    estimatedDelivery: "23 Nov 2026",
    price: "120.00",
    currency: "USD",
    description: "Personal belongings.",
    events: [
      {
        title: "Shipment request created",
        location: "X10 Shipping",
        date: "16 Nov 2026 · 09:00",
        completed: true,
      },
      {
        title: "Carrier assigned",
        location: "iMile",
        date: "16 Nov 2026 · 12:30",
        completed: true,
      },
    ],
  },
  {
    id: "SHP-2026-005",
    customer: "Khalid Mansour",
    customerEmail: "khalid.mansour@email.com",
    customerPhone: "+971 50 567 8901",
    recipient: "Salim Al Harthy",
    recipientPhone: "+968 99 567 890",
    origin: "Ajman, UAE",
    destination: "Muscat, Oman",
    package: "Electronics",
    weight: "2 kg",
    service: "Express",
    carrier: "iMile",
    tracking: "IML123456789",
    status: "In Transit",
    createdAt: "15 Nov 2026",
    estimatedDelivery: "20 Nov 2026",
    price: "85.00",
    currency: "USD",
    description: "Electronic equipment.",
    events: [
      {
        title: "Shipment request created",
        location: "X10 Shipping",
        date: "15 Nov 2026 · 08:00",
        completed: true,
      },
      {
        title: "Carrier assigned",
        location: "iMile",
        date: "15 Nov 2026 · 09:30",
        completed: true,
      },
      {
        title: "Shipment picked up by carrier",
        location: "Ajman, UAE",
        date: "16 Nov 2026 · 10:20",
        completed: true,
      },
      {
        title: "Shipment in transit",
        location: "Carrier network",
        date: "18 Nov 2026 · 15:40",
        completed: true,
      },
    ],
  },
  {
    id: "SHP-2026-006",
    customer: "Mariam Saeed",
    customerEmail: "mariam.saeed@email.com",
    customerPhone: "+971 50 678 9012",
    recipient: "Abdulrahman Al Saud",
    recipientPhone: "+966 55 678 9012",
    origin: "Dubai, UAE",
    destination: "Riyadh, Saudi Arabia",
    package: "Documents",
    weight: "0.8 kg",
    service: "Express",
    carrier: "iMile",
    tracking: "IML456789123",
    status: "Delivered",
    createdAt: "12 Nov 2026",
    estimatedDelivery: "15 Nov 2026",
    price: "55.00",
    currency: "USD",
    description: "Official documents.",
    events: [
      {
        title: "Shipment request created",
        location: "X10 Shipping",
        date: "12 Nov 2026 · 08:00",
        completed: true,
      },
      {
        title: "Carrier assigned",
        location: "iMile",
        date: "12 Nov 2026 · 09:00",
        completed: true,
      },
      {
        title: "Shipment picked up by carrier",
        location: "Dubai, UAE",
        date: "12 Nov 2026 · 14:00",
        completed: true,
      },
      {
        title: "Shipment in transit",
        location: "Carrier network",
        date: "13 Nov 2026 · 11:30",
        completed: true,
      },
      {
        title: "Delivered to recipient",
        location: "Riyadh, Saudi Arabia",
        date: "15 Nov 2026 · 13:15",
        completed: true,
      },
    ],
  },
  {
    id: "SHP-2026-007",
    customer: "Yasmin Farouk",
    customerEmail: "yasmin.f@email.com",
    customerPhone: "+971 50 789 0123",
    recipient: "Hamad Al Kuwari",
    recipientPhone: "+974 55 789 0123",
    origin: "Dubai, UAE",
    destination: "Doha, Qatar",
    package: "Accessories",
    weight: "2.4 kg",
    service: "Standard",
    carrier: "Aramex",
    tracking: "ARX789123456",
    status: "Picked Up",
    createdAt: "18 Nov 2026",
    estimatedDelivery: "24 Nov 2026",
    price: "90.00",
    currency: "USD",
    description: "Fashion accessories.",
    events: [
      {
        title: "Shipment request created",
        location: "X10 Shipping",
        date: "18 Nov 2026 · 08:00",
        completed: true,
      },
      {
        title: "Carrier assigned",
        location: "Aramex",
        date: "18 Nov 2026 · 10:00",
        completed: true,
      },
      {
        title: "Shipment picked up by carrier",
        location: "Dubai, UAE",
        date: "19 Nov 2026 · 09:15",
        completed: true,
      },
    ],
  },
  {
    id: "SHP-2026-008",
    customer: "Hassan Nabil",
    customerEmail: "hassan.n@email.com",
    customerPhone: "+971 50 890 1234",
    recipient: "Mansoor Al Balushi",
    recipientPhone: "+968 99 890 1234",
    origin: "Abu Dhabi, UAE",
    destination: "Muscat, Oman",
    package: "Household Items",
    weight: "6 kg",
    service: "Express",
    carrier: "DHL",
    tracking: "DHL456123789",
    status: "Pickup Scheduled",
    createdAt: "19 Nov 2026",
    estimatedDelivery: "23 Nov 2026",
    price: "135.00",
    currency: "USD",
    description: "Small household accessories.",
    events: [
      {
        title: "Shipment request created",
        location: "X10 Shipping",
        date: "19 Nov 2026 · 07:45",
        completed: true,
      },
      {
        title: "Carrier assigned",
        location: "DHL",
        date: "19 Nov 2026 · 08:30",
        completed: true,
      },
      {
        title: "Pickup scheduled by carrier",
        location: "Abu Dhabi, UAE",
        date: "20 Nov 2026 · 10:00",
        completed: true,
      },
    ],
  },
];

const carriers = ["iMile", "Aramex", "DHL", "FedEx"];

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
  const classes = {
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

  return classes[status] || "new";
};

function StatusBadge({ status }) {
  return (
    <span className={`all-shipment-status ${statusClass(status)}`}>
      <span className="status-dot" />
      {status}
    </span>
  );
}

function Modal({ children, onClose, wide = false }) {
  return (
    <div className="all-shipment-overlay" onMouseDown={onClose}>
      <div
        className={`all-shipment-modal ${wide ? "wide" : ""}`}
        onMouseDown={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default function AllShipments() {
  const [shipments, setShipments] = useState(initialShipments);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [carrierFilter, setCarrierFilter] = useState("All Carriers");
  const [serviceFilter, setServiceFilter] = useState("All Services");
  const [page, setPage] = useState(1);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [assignShipment, setAssignShipment] = useState(null);
  const [selectedCarrier, setSelectedCarrier] = useState("iMile");
  const [cancelShipment, setCancelShipment] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);

  const pageSize = 6;

  const filteredShipments = useMemo(() => {
    return shipments.filter((shipment) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        shipment.id.toLowerCase().includes(searchText) ||
        shipment.customer.toLowerCase().includes(searchText) ||
        shipment.recipient.toLowerCase().includes(searchText) ||
        (shipment.tracking || "").toLowerCase().includes(searchText) ||
        shipment.origin.toLowerCase().includes(searchText) ||
        shipment.destination.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All Statuses" || shipment.status === statusFilter;

      const matchesCarrier =
        carrierFilter === "All Carriers" ||
        shipment.carrier === carrierFilter;

      const matchesService =
        serviceFilter === "All Services" ||
        shipment.service === serviceFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCarrier &&
        matchesService
      );
    });
  }, [shipments, search, statusFilter, carrierFilter, serviceFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredShipments.length / pageSize));

  const currentShipments = filteredShipments.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const stats = [
    {
      label: "Total Shipments",
      value: shipments.length,
      icon: Package,
      color: "orange",
      description: "All registered shipments",
    },
    {
      label: "Awaiting Assignment",
      value: shipments.filter((s) =>
        ["New Request", "Under Review", "Ready for Assignment"].includes(
          s.status
        )
      ).length,
      icon: Clock,
      color: "yellow",
      description: "Pending carrier assignment",
    },
    {
      label: "In Progress",
      value: shipments.filter((s) =>
        ["Assigned", "Pickup Scheduled", "Picked Up", "In Transit"].includes(
          s.status
        )
      ).length,
      icon: Truck,
      color: "blue",
      description: "Managed by external carriers",
    },
    {
      label: "Delivered",
      value: shipments.filter((s) => s.status === "Delivered").length,
      icon: CheckCircle2,
      color: "green",
      description: "Successfully completed",
    },
  ];

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("All Statuses");
    setCarrierFilter("All Carriers");
    setServiceFilter("All Services");
    setPage(1);
  };

  const assignCarrier = () => {
    if (!assignShipment || !selectedCarrier) return;

    setShipments((previous) =>
      previous.map((shipment) =>
        shipment.id === assignShipment.id
          ? {
              ...shipment,
              carrier: selectedCarrier,
              tracking: `${selectedCarrier
                .replace(/\s/g, "")
                .toUpperCase()}${Math.floor(100000000 + Math.random() * 900000000)}`,
              status: "Assigned",
              events: [
                ...shipment.events,
                {
                  title: "Carrier assigned",
                  location: selectedCarrier,
                  date: new Date().toLocaleString(),
                  completed: true,
                },
              ],
            }
          : shipment
      )
    );

    setAssignShipment(null);
    setSelectedCarrier("iMile");
  };

  const confirmCancellation = () => {
    if (!cancelShipment) return;

    setShipments((previous) =>
      previous.map((shipment) =>
        shipment.id === cancelShipment.id
          ? {
              ...shipment,
              status: "Cancelled",
              events: [
                ...shipment.events,
                {
                  title: "Shipment cancelled",
                  location: "X10 Shipping",
                  date: new Date().toLocaleString(),
                  completed: true,
                },
              ],
            }
          : shipment
      )
    );

    setCancelShipment(null);
    setSelectedShipment(null);
  };

  const openDetails = (shipment) => {
    setSelectedShipment(shipment);
    setOpenMenu(null);
  };

  const canAssign = (shipment) =>
    ["New Request", "Under Review", "Ready for Assignment"].includes(
      shipment.status
    );

  const canCancel = (shipment) =>
    !["Delivered", "Cancelled"].includes(shipment.status);

  return (
    <div className="all-shipments-page">
      <div className="all-shipment-breadcrumb">
        <span>Operations</span>
        <ChevronRight size={14} />
        <strong>All Shipments</strong>
      </div>

      <div className="all-shipment-page-header">
        <div>
          <h1>All Shipments</h1>
          <p>
            Manage shipments, carrier assignments and delivery tracking from
            one place.
          </p>
        </div>

        <div className="all-shipment-header-actions">
          <button className="all-shipment-btn secondary" onClick={resetFilters}>
            <RotateCcw size={16} />
            Reset filters
          </button>
        </div>
      </div>

      <div className="all-shipment-stats">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div className="all-shipment-stat-card" key={stat.label}>
              <div className={`all-shipment-stat-icon ${stat.color}`}>
                <Icon size={21} />
              </div>

              <div className="all-shipment-stat-content">
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
                <small>{stat.description}</small>
              </div>

              <ArrowUpRight className="stat-decoration" size={17} />
            </div>
          );
        })}
      </div>

      <div className="all-shipment-table-card">
        <div className="all-shipment-table-heading">
          <div>
            <div className="all-shipment-title-row">
              <h2>Shipment Overview</h2>
              <span className="all-shipment-count">
                {filteredShipments.length} shipments
              </span>
            </div>
            <p>View and manage all customer shipments.</p>
          </div>
        </div>

        <div className="all-shipment-toolbar">
          <div className="all-shipment-search">
            <Search size={17} />
            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Search ID, customer, tracking..."
            />
            {search && (
              <button onClick={() => setSearch("")}>
                <X size={15} />
              </button>
            )}
          </div>

          <div className="all-shipment-filters">
            <div className="all-shipment-filter">
              <Filter size={15} />
              <select
                value={statusFilter}
                onChange={(event) => {
                  setStatusFilter(event.target.value);
                  setPage(1);
                }}
              >
                <option>All Statuses</option>
                {statusOptions.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            </div>

            <select
              className="all-shipment-select"
              value={carrierFilter}
              onChange={(event) => {
                setCarrierFilter(event.target.value);
                setPage(1);
              }}
            >
              <option>All Carriers</option>
              {carriers.map((carrier) => (
                <option key={carrier}>{carrier}</option>
              ))}
            </select>

            <select
              className="all-shipment-select"
              value={serviceFilter}
              onChange={(event) => {
                setServiceFilter(event.target.value);
                setPage(1);
              }}
            >
              <option>All Services</option>
              <option>Express</option>
              <option>Standard</option>
            </select>
          </div>
        </div>

        <div className="all-shipment-table-wrap">
          <table className="all-shipment-table">
            <thead>
              <tr>
                <th>SHIPMENT</th>
                <th>CUSTOMER</th>
                <th>ROUTE</th>
                <th>PACKAGE</th>
                <th>CARRIER</th>
                <th>STATUS</th>
                <th>CREATED</th>
                <th />
              </tr>
            </thead>

            <tbody>
              {currentShipments.map((shipment) => (
                <tr key={shipment.id}>
                  <td>
                    <div className="shipment-id-cell">
                      <div className="shipment-package-icon">
                        <Package size={17} />
                      </div>
                      <div>
                        <strong>{shipment.id}</strong>
                        <span>{shipment.service}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="shipment-customer-cell">
                      <strong>{shipment.customer}</strong>
                      <span>{shipment.customerEmail}</span>
                    </div>
                  </td>

                  <td>
                    <div className="shipment-route-cell">
                      <span>{shipment.origin}</span>
                      <ArrowRight size={13} />
                      <span>{shipment.destination}</span>
                    </div>
                  </td>

                  <td>
                    <div className="shipment-package-cell">
                      <strong>{shipment.package}</strong>
                      <span>{shipment.weight}</span>
                    </div>
                  </td>

                  <td>
                    {shipment.carrier ? (
                      <div className="shipment-carrier-cell">
                        <Building2 size={15} />
                        <span>{shipment.carrier}</span>
                      </div>
                    ) : (
                      <span className="shipment-not-assigned">Not assigned</span>
                    )}
                  </td>

                  <td>
                    <StatusBadge status={shipment.status} />
                  </td>

                  <td>
                    <span className="shipment-date-cell">
                      {shipment.createdAt}
                    </span>
                  </td>

                  <td>
                    <div className="shipment-actions-cell">
                      <button
                        className="shipment-icon-btn"
                        title="View details"
                        onClick={() => openDetails(shipment)}
                      >
                        <Eye size={16} />
                      </button>

                      <div className="shipment-menu-wrapper">
                        <button
                          className="shipment-icon-btn"
                          title="More actions"
                          onClick={() =>
                            setOpenMenu(
                              openMenu === shipment.id ? null : shipment.id
                            )
                          }
                        >
                          <MoreHorizontal size={18} />
                        </button>

                        {openMenu === shipment.id && (
                          <div className="shipment-action-menu">
                            <button onClick={() => openDetails(shipment)}>
                              <Eye size={15} />
                              View details
                            </button>

                            {canAssign(shipment) && (
                              <button
                                onClick={() => {
                                  setAssignShipment(shipment);
                                  setOpenMenu(null);
                                }}
                              >
                                <Truck size={15} />
                                Assign carrier
                              </button>
                            )}

                            {shipment.carrier && (
                              <button onClick={() => openDetails(shipment)}>
                                <Navigation size={15} />
                                Track shipment
                              </button>
                            )}

                            {canCancel(shipment) && (
                              <button
                                className="danger"
                                onClick={() => {
                                  setCancelShipment(shipment);
                                  setOpenMenu(null);
                                }}
                              >
                                <X size={15} />
                                Cancel shipment
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}

              {currentShipments.length === 0 && (
                <tr>
                  <td colSpan="8">
                    <div className="all-shipment-empty">
                      <div>
                        <Package size={26} />
                      </div>
                      <strong>No shipments found</strong>
                      <span>
                        Try adjusting your search or filters to find shipments.
                      </span>
                      <button onClick={resetFilters}>Clear filters</button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="all-shipment-pagination">
          <span>
            Showing{" "}
            <strong>
              {filteredShipments.length === 0
                ? 0
                : (page - 1) * pageSize + 1}
              -
              {Math.min(page * pageSize, filteredShipments.length)}
            </strong>{" "}
            of <strong>{filteredShipments.length}</strong> shipments
          </span>

          <div>
            <button
              disabled={page <= 1}
              onClick={() => setPage((previous) => Math.max(1, previous - 1))}
            >
              <ChevronLeft size={16} />
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (number) => (
                <button
                  key={number}
                  className={page === number ? "active" : ""}
                  onClick={() => setPage(number)}
                >
                  {number}
                </button>
              )
            )}

            <button
              disabled={page >= totalPages}
              onClick={() =>
                setPage((previous) => Math.min(totalPages, previous + 1))
              }
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {selectedShipment && (
        <Modal onClose={() => setSelectedShipment(null)} wide>
          <div className="all-shipment-modal-header">
            <div>
              <span className="modal-eyebrow">SHIPMENT DETAILS</span>
              <h2>{selectedShipment.id}</h2>
              <div className="modal-header-status">
                <StatusBadge status={selectedShipment.status} />
                <span>Created {selectedShipment.createdAt}</span>
              </div>
            </div>

            <button
              className="modal-close-btn"
              onClick={() => setSelectedShipment(null)}
            >
              <X size={19} />
            </button>
          </div>

          <div className="all-shipment-modal-body">
            <div className="shipment-detail-main">
              <div className="shipment-detail-section">
                <div className="shipment-detail-section-title">
                  <Package size={17} />
                  <h3>Shipment Information</h3>
                </div>

                <div className="shipment-detail-grid">
                  <div>
                    <span>Service Type</span>
                    <strong>{selectedShipment.service}</strong>
                  </div>
                  <div>
                    <span>Package Type</span>
                    <strong>{selectedShipment.package}</strong>
                  </div>
                  <div>
                    <span>Weight</span>
                    <strong>{selectedShipment.weight}</strong>
                  </div>
                  <div>
                    <span>Shipment Price</span>
                    <strong>
                      {selectedShipment.price} {selectedShipment.currency}
                    </strong>
                  </div>
                  <div>
                    <span>Estimated Delivery</span>
                    <strong>{selectedShipment.estimatedDelivery}</strong>
                  </div>
                  <div>
                    <span>Carrier</span>
                    <strong>{selectedShipment.carrier || "Not assigned"}</strong>
                  </div>
                </div>

                <div className="shipment-detail-description">
                  <span>Description</span>
                  <p>{selectedShipment.description}</p>
                </div>
              </div>

              <div className="shipment-detail-section">
                <div className="shipment-detail-section-title">
                  <MapPin size={17} />
                  <h3>Shipping Route</h3>
                </div>

                <div className="shipment-route-detail">
                  <div className="route-detail-point">
                    <span className="route-point-dot origin" />
                    <div>
                      <small>ORIGIN</small>
                      <strong>{selectedShipment.origin}</strong>
                    </div>
                  </div>

                  <div className="route-detail-line" />

                  <div className="route-detail-point">
                    <span className="route-point-dot destination" />
                    <div>
                      <small>DESTINATION</small>
                      <strong>{selectedShipment.destination}</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="shipment-detail-section">
                <div className="shipment-detail-section-title">
                  <User size={17} />
                  <h3>Customer & Recipient</h3>
                </div>

                <div className="shipment-people-grid">
                  <div className="shipment-person-card">
                    <span className="person-card-label">SENDER</span>
                    <strong>{selectedShipment.customer}</strong>
                    <span>
                      <Mail size={13} />
                      {selectedShipment.customerEmail}
                    </span>
                    <span>
                      <Phone size={13} />
                      {selectedShipment.customerPhone}
                    </span>
                  </div>

                  <div className="shipment-person-card">
                    <span className="person-card-label">RECIPIENT</span>
                    <strong>{selectedShipment.recipient}</strong>
                    <span>
                      <Phone size={13} />
                      {selectedShipment.recipientPhone}
                    </span>
                    <span>
                      <MapPin size={13} />
                      {selectedShipment.destination}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="shipment-detail-sidebar">
              <div className="shipment-detail-section tracking-section">
                <div className="shipment-detail-section-title">
                  <Navigation size={17} />
                  <h3>Tracking History</h3>
                </div>

                {selectedShipment.tracking && (
                  <div className="tracking-number-box">
                    <span>TRACKING NUMBER</span>
                    <strong>{selectedShipment.tracking}</strong>
                  </div>
                )}

                {!selectedShipment.tracking && (
                  <div className="tracking-pending">
                    <Clock size={19} />
                    <strong>Awaiting carrier assignment</strong>
                    <span>
                      Tracking information will be available once a carrier has
                      been assigned.
                    </span>
                  </div>
                )}

                <div className="tracking-timeline">
                  {selectedShipment.events.map((event, index) => (
                    <div className="tracking-event" key={index}>
                      <div className="tracking-event-marker">
                        <CircleCheck size={17} />
                      </div>
                      <div>
                        <strong>{event.title}</strong>
                        <span>{event.location}</span>
                        <small>{event.date}</small>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="tracking-source-note">
                  <Globe size={14} />
                  <span>
                    Tracking events are reported by the assigned carrier.
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="all-shipment-modal-footer">
            {canAssign(selectedShipment) && (
              <button
                className="all-shipment-btn primary"
                onClick={() => {
                  setAssignShipment(selectedShipment);
                  setSelectedShipment(null);
                }}
              >
                <Truck size={16} />
                Assign Carrier
              </button>
            )}

            <button
              className="all-shipment-btn secondary"
              onClick={() => setSelectedShipment(null)}
            >
              Close
            </button>
          </div>
        </Modal>
      )}

      {assignShipment && (
        <Modal onClose={() => setAssignShipment(null)}>
          <div className="all-shipment-modal-header">
            <div>
              <span className="modal-eyebrow">CARRIER MANAGEMENT</span>
              <h2>Assign Carrier</h2>
              <p>{assignShipment.id}</p>
            </div>
            <button
              className="modal-close-btn"
              onClick={() => setAssignShipment(null)}
            >
              <X size={19} />
            </button>
          </div>

          <div className="assign-carrier-content">
            <div className="assign-shipment-summary">
              <div className="assign-summary-icon">
                <Package size={20} />
              </div>
              <div>
                <strong>{assignShipment.customer}</strong>
                <span>
                  {assignShipment.origin} <ArrowRight size={12} />{" "}
                  {assignShipment.destination}
                </span>
                <small>
                  {assignShipment.service} · {assignShipment.weight}
                </small>
              </div>
            </div>

            <label className="assign-form-label">Select a carrier</label>

            <div className="carrier-choice-list">
              {carriers.map((carrier) => (
                <button
                  key={carrier}
                  className={`carrier-choice ${
                    selectedCarrier === carrier ? "selected" : ""
                  }`}
                  onClick={() => setSelectedCarrier(carrier)}
                >
                  <div className="carrier-choice-icon">
                    <Truck size={18} />
                  </div>
                  <div>
                    <strong>{carrier}</strong>
                    <span>External delivery partner</span>
                  </div>
                  <span className="carrier-radio">
                    {selectedCarrier === carrier && <span />}
                  </span>
                </button>
              ))}
            </div>

            <div className="assign-info-note">
              <AlertTriangle size={16} />
              <span>
                This is a frontend demonstration. The assignment and tracking
                number are simulated. Actual carrier booking will be handled
                through the backend integration.
              </span>
            </div>
          </div>

          <div className="all-shipment-modal-footer">
            <button
              className="all-shipment-btn secondary"
              onClick={() => setAssignShipment(null)}
            >
              Cancel
            </button>
            <button
              className="all-shipment-btn primary"
              onClick={assignCarrier}
            >
              <Truck size={16} />
              Confirm Assignment
            </button>
          </div>
        </Modal>
      )}

      {cancelShipment && (
        <Modal onClose={() => setCancelShipment(null)}>
          <div className="all-shipment-modal-header">
            <div>
              <span className="modal-eyebrow">CONFIRMATION</span>
              <h2>Cancel Shipment</h2>
            </div>
            <button
              className="modal-close-btn"
              onClick={() => setCancelShipment(null)}
            >
              <X size={19} />
            </button>
          </div>

          <div className="cancel-shipment-content">
            <div className="cancel-warning-icon">
              <AlertTriangle size={25} />
            </div>
            <h3>Are you sure you want to cancel?</h3>
            <p>
              You are about to cancel shipment{" "}
              <strong>{cancelShipment.id}</strong>. This action is simulated
              locally and will change its status to Cancelled.
            </p>
          </div>

          <div className="all-shipment-modal-footer">
            <button
              className="all-shipment-btn secondary"
              onClick={() => setCancelShipment(null)}
            >
              Keep Shipment
            </button>
            <button
              className="all-shipment-btn danger"
              onClick={confirmCancellation}
            >
              <X size={16} />
              Confirm Cancellation
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
