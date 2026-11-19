
import { useMemo, useState } from "react";
import {
  Search,
  Filter,
  RotateCcw,
  Truck,
  Package,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  MoreHorizontal,
  Eye,
  Send,
  X,
  Building2,
  MapPin,
  CalendarDays,
  Weight,
  DollarSign,
  Timer,
  RefreshCw,
  Check,
  AlertTriangle,
  ClipboardList,
  ArrowUpRight,
  Plane,
  Globe,
} from "lucide-react";
import "./DispatchManagement.css";

const initialDispatches = [
  {
    id: "DSP-2026-001",
    shipmentId: "SHP-2026-003",
    customer: "Omar Abdullah",
    origin: "Sharjah, UAE",
    destination: "Kuwait City, Kuwait",
    service: "Express",
    weight: "5 kg",
    package: "Clothing",
    createdAt: "17 Nov 2026",
    dispatchStatus: "Pending Dispatch",
    carrier: null,
    tracking: null,
    estimatedDelivery: "21 Nov 2026",
    price: null,
    currency: "USD",
    notes: "Ready for carrier assignment.",
    history: [
      {
        title: "Shipment approved",
        description: "Shipment is ready for dispatch.",
        date: "17 Nov 2026 · 14:20",
      },
    ],
  },
  {
    id: "DSP-2026-002",
    shipmentId: "SHP-2026-002",
    customer: "Sara Khalid",
    origin: "Abu Dhabi, UAE",
    destination: "Doha, Qatar",
    service: "Standard",
    weight: "3.5 kg",
    package: "Electronics",
    createdAt: "18 Nov 2026",
    dispatchStatus: "Pending Dispatch",
    carrier: null,
    tracking: null,
    estimatedDelivery: "25 Nov 2026",
    price: null,
    currency: "USD",
    notes: "Standard international shipment.",
    history: [
      {
        title: "Shipment reviewed",
        description: "Shipment approved for dispatch.",
        date: "18 Nov 2026 · 11:00",
      },
    ],
  },
  {
    id: "DSP-2026-003",
    shipmentId: "SHP-2026-004",
    customer: "Noura Ibrahim",
    origin: "Dubai, UAE",
    destination: "Manama, Bahrain",
    service: "Standard",
    weight: "8 kg",
    package: "Personal Items",
    createdAt: "16 Nov 2026",
    dispatchStatus: "Confirmed",
    carrier: "iMile",
    tracking: "IML987654321",
    estimatedDelivery: "23 Nov 2026",
    price: "120.00",
    currency: "USD",
    notes: "Carrier booking confirmed.",
    history: [
      {
        title: "Carrier selected",
        description: "iMile selected for this shipment.",
        date: "16 Nov 2026 · 11:30",
      },
      {
        title: "Booking requested",
        description: "Booking request submitted to iMile.",
        date: "16 Nov 2026 · 12:00",
      },
      {
        title: "Booking confirmed",
        description: "Carrier confirmed the shipment.",
        date: "16 Nov 2026 · 12:30",
      },
    ],
  },
  {
    id: "DSP-2026-004",
    shipmentId: "SHP-2026-008",
    customer: "Hassan Nabil",
    origin: "Abu Dhabi, UAE",
    destination: "Muscat, Oman",
    service: "Express",
    weight: "6 kg",
    package: "Household Items",
    createdAt: "19 Nov 2026",
    dispatchStatus: "Booking Requested",
    carrier: "DHL",
    tracking: null,
    estimatedDelivery: "23 Nov 2026",
    price: "135.00",
    currency: "USD",
    notes: "Waiting for carrier confirmation.",
    history: [
      {
        title: "Carrier selected",
        description: "DHL selected for this shipment.",
        date: "19 Nov 2026 · 08:00",
      },
      {
        title: "Booking requested",
        description: "Waiting for DHL booking confirmation.",
        date: "19 Nov 2026 · 08:30",
      },
    ],
  },
  {
    id: "DSP-2026-005",
    shipmentId: "SHP-2026-009",
    customer: "Layla Hassan",
    origin: "Dubai, UAE",
    destination: "Riyadh, Saudi Arabia",
    service: "Express",
    weight: "2.8 kg",
    package: "Documents",
    createdAt: "19 Nov 2026",
    dispatchStatus: "Rejected",
    carrier: "Aramex",
    tracking: null,
    estimatedDelivery: "22 Nov 2026",
    price: null,
    currency: "USD",
    notes: "Carrier rejected the booking request.",
    history: [
      {
        title: "Carrier selected",
        description: "Aramex selected for this shipment.",
        date: "19 Nov 2026 · 09:00",
      },
      {
        title: "Booking requested",
        description: "Booking request submitted.",
        date: "19 Nov 2026 · 09:15",
      },
      {
        title: "Booking rejected",
        description: "Carrier could not accept the request.",
        date: "19 Nov 2026 · 10:00",
      },
    ],
  },
  {
    id: "DSP-2026-006",
    shipmentId: "SHP-2026-010",
    customer: "Youssef Karim",
    origin: "Sharjah, UAE",
    destination: "Doha, Qatar",
    service: "Standard",
    weight: "4 kg",
    package: "Accessories",
    createdAt: "18 Nov 2026",
    dispatchStatus: "Reassignment Required",
    carrier: "DHL",
    tracking: null,
    estimatedDelivery: "26 Nov 2026",
    price: null,
    currency: "USD",
    notes: "Previous carrier assignment requires review.",
    history: [
      {
        title: "Carrier selected",
        description: "DHL selected for this shipment.",
        date: "18 Nov 2026 · 09:00",
      },
      {
        title: "Reassignment required",
        description: "A new carrier must be selected.",
        date: "18 Nov 2026 · 13:30",
      },
    ],
  },
];

const carrierData = [
  {
    name: "iMile",
    delivery: "2–4 days",
    express: true,
    standard: true,
    coverage: ["Saudi Arabia", "Qatar", "Bahrain", "Oman", "Kuwait"],
    rating: "4.8",
  },
  {
    name: "Aramex",
    delivery: "2–5 days",
    express: true,
    standard: true,
    coverage: ["Saudi Arabia", "Qatar", "Bahrain", "Oman", "Kuwait"],
    rating: "4.7",
  },
  {
    name: "DHL",
    delivery: "1–3 days",
    express: true,
    standard: true,
    coverage: ["Saudi Arabia", "Qatar", "Bahrain", "Oman", "Kuwait"],
    rating: "4.9",
  },
  {
    name: "FedEx",
    delivery: "2–4 days",
    express: true,
    standard: true,
    coverage: ["Saudi Arabia", "Qatar", "Bahrain", "Oman", "Kuwait"],
    rating: "4.6",
  },
];

const dispatchStatusOptions = [
  "Pending Dispatch",
  "Carrier Selected",
  "Booking Requested",
  "Confirmed",
  "Rejected",
  "Reassignment Required",
];

const getStatusClass = (status) => {
  const map = {
    "Pending Dispatch": "pending",
    "Carrier Selected": "selected",
    "Booking Requested": "requested",
    Confirmed: "confirmed",
    Rejected: "rejected",
    "Reassignment Required": "reassignment",
  };
  return map[status] || "pending";
};

function DispatchStatus({ status }) {
  return (
    <span className={`dispatch-status ${getStatusClass(status)}`}>
      <span className="dispatch-status-dot" />
      {status}
    </span>
  );
}

function DispatchModal({ children, onClose, wide = false }) {
  return (
    <div className="dispatch-overlay" onMouseDown={onClose}>
      <div
        className={`dispatch-modal ${wide ? "wide" : ""}`}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default function DispatchManagement() {
  const [dispatches, setDispatches] = useState(initialDispatches);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [carrierFilter, setCarrierFilter] = useState("All Carriers");
  const [serviceFilter, setServiceFilter] = useState("All Services");
  const [page, setPage] = useState(1);
  const [selectedDispatch, setSelectedDispatch] = useState(null);
  const [assignDispatch, setAssignDispatch] = useState(null);
  const [selectedCarrier, setSelectedCarrier] = useState("DHL");
  const [confirmDispatch, setConfirmDispatch] = useState(null);
  const [rejectDispatch, setRejectDispatch] = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const [openMenu, setOpenMenu] = useState(null);

  const pageSize = 6;

  const filteredDispatches = useMemo(() => {
    return dispatches.filter((item) => {
      const term = search.toLowerCase();

      const matchesSearch =
        item.id.toLowerCase().includes(term) ||
        item.shipmentId.toLowerCase().includes(term) ||
        item.customer.toLowerCase().includes(term) ||
        item.origin.toLowerCase().includes(term) ||
        item.destination.toLowerCase().includes(term) ||
        (item.carrier || "").toLowerCase().includes(term);

      const matchesStatus =
        statusFilter === "All Statuses" ||
        item.dispatchStatus === statusFilter;

      const matchesCarrier =
        carrierFilter === "All Carriers" || item.carrier === carrierFilter;

      const matchesService =
        serviceFilter === "All Services" || item.service === serviceFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCarrier &&
        matchesService
      );
    });
  }, [dispatches, search, statusFilter, carrierFilter, serviceFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredDispatches.length / pageSize)
  );

  const currentItems = filteredDispatches.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const stats = [
    {
      label: "Pending Dispatch",
      value: dispatches.filter((d) =>
        ["Pending Dispatch", "Reassignment Required"].includes(d.dispatchStatus)
      ).length,
      icon: Clock,
      color: "orange",
      description: "Awaiting carrier allocation",
    },
    {
      label: "Booking Requested",
      value: dispatches.filter(
        (d) => d.dispatchStatus === "Booking Requested"
      ).length,
      icon: Send,
      color: "blue",
      description: "Waiting for carrier response",
    },
    {
      label: "Confirmed",
      value: dispatches.filter((d) => d.dispatchStatus === "Confirmed").length,
      icon: CheckCircle2,
      color: "green",
      description: "Carrier bookings confirmed",
    },
    {
      label: "Needs Attention",
      value: dispatches.filter((d) =>
        ["Rejected", "Reassignment Required"].includes(d.dispatchStatus)
      ).length,
      icon: AlertCircle,
      color: "red",
      description: "Requires an action",
    },
  ];

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("All Statuses");
    setCarrierFilter("All Carriers");
    setServiceFilter("All Services");
    setPage(1);
  };

  const eligibleCarriers = useMemo(() => {
    if (!assignDispatch) return carrierData;

    return carrierData.filter((carrier) => {
      const serviceAvailable =
        assignDispatch.service === "Express"
          ? carrier.express
          : carrier.standard;

      const destinationCountry =
        assignDispatch.destination.split(",").pop()?.trim();

      const coverageAvailable = carrier.coverage.includes(destinationCountry);

      return serviceAvailable && coverageAvailable;
    });
  }, [assignDispatch]);

  const startAssignment = (item) => {
    setAssignDispatch(item);
    setSelectedCarrier(
      eligibleCarriers[0]?.name || carrierData[0].name
    );
    setOpenMenu(null);
  };

  const submitBookingRequest = () => {
    if (!assignDispatch || !selectedCarrier) return;

    setDispatches((previous) =>
      previous.map((item) =>
        item.id === assignDispatch.id
          ? {
              ...item,
              carrier: selectedCarrier,
              tracking: null,
              price: null,
              dispatchStatus: "Booking Requested",
              history: [
                ...item.history,
                {
                  title: "Carrier selected",
                  description: `${selectedCarrier} selected for this shipment.`,
                  date: new Date().toLocaleString(),
                },
                {
                  title: "Booking requested",
                  description: `Booking request submitted to ${selectedCarrier}.`,
                  date: new Date().toLocaleString(),
                },
              ],
            }
          : item
      )
    );

    setAssignDispatch(null);
  };

  const confirmBooking = () => {
    if (!confirmDispatch) return;

    setDispatches((previous) =>
      previous.map((item) =>
        item.id === confirmDispatch.id
          ? {
              ...item,
              dispatchStatus: "Confirmed",
              tracking: `${item.carrier
                ?.replace(/\s/g, "")
                .toUpperCase()}${Math.floor(100000000 + Math.random() * 900000000)}`,
              price: item.service === "Express" ? "95.00" : "75.00",
              history: [
                ...item.history,
                {
                  title: "Booking confirmed",
                  description: `${item.carrier} confirmed the booking.`,
                  date: new Date().toLocaleString(),
                },
              ],
            }
          : item
      )
    );

    setConfirmDispatch(null);
  };

  const submitRejection = () => {
    if (!rejectDispatch || !rejectReason.trim()) return;

    setDispatches((previous) =>
      previous.map((item) =>
        item.id === rejectDispatch.id
          ? {
              ...item,
              dispatchStatus: "Reassignment Required",
              history: [
                ...item.history,
                {
                  title: "Booking rejected",
                  description: rejectReason,
                  date: new Date().toLocaleString(),
                },
              ],
              notes: rejectReason,
            }
          : item
      )
    );

    setRejectDispatch(null);
    setRejectReason("");
  };

  const canAssign = (item) =>
    [
      "Pending Dispatch",
      "Rejected",
      "Reassignment Required",
    ].includes(item.dispatchStatus);

  const canConfirm = (item) =>
    item.dispatchStatus === "Booking Requested";

  return (
    <div className="dispatch-page">
      <div className="dispatch-breadcrumb">
        <span>Operations</span>
        <ChevronRight size={14} />
        <strong>Dispatch Management</strong>
      </div>

      <div className="dispatch-page-header">
        <div>
          <h1>Dispatch Management</h1>
          <p>
            Coordinate shipment assignments and manage external carrier
            booking requests.
          </p>
        </div>

        <button className="dispatch-btn secondary" onClick={resetFilters}>
          <RotateCcw size={15} />
          Reset filters
        </button>
      </div>

      <div className="dispatch-stats">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div className="dispatch-stat-card" key={stat.label}>
              <div className={`dispatch-stat-icon ${stat.color}`}>
                <Icon size={21} />
              </div>
              <div className="dispatch-stat-content">
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
                <small>{stat.description}</small>
              </div>
              <ArrowUpRight size={17} className="dispatch-stat-decoration" />
            </div>
          );
        })}
      </div>

      <div className="dispatch-workflow-card">
        <div className="dispatch-workflow-heading">
          <div>
            <h2>Dispatch Workflow</h2>
            <p>Overview of the carrier assignment process.</p>
          </div>
          <span className="dispatch-live-label">
            <span /> Operational overview
          </span>
        </div>

        <div className="dispatch-workflow-steps">
          <div className="dispatch-workflow-step">
            <div className="workflow-icon orange">
              <Package size={19} />
            </div>
            <div>
              <strong>Ready for Dispatch</strong>
              <span>Approved shipments</span>
            </div>
          </div>

          <ArrowRight className="workflow-arrow" size={17} />

          <div className="dispatch-workflow-step">
            <div className="workflow-icon blue">
              <Truck size={19} />
            </div>
            <div>
              <strong>Carrier Selection</strong>
              <span>Choose delivery partner</span>
            </div>
          </div>

          <ArrowRight className="workflow-arrow" size={17} />

          <div className="dispatch-workflow-step">
            <div className="workflow-icon yellow">
              <Send size={19} />
            </div>
            <div>
              <strong>Booking Request</strong>
              <span>Await carrier response</span>
            </div>
          </div>

          <ArrowRight className="workflow-arrow" size={17} />

          <div className="dispatch-workflow-step">
            <div className="workflow-icon green">
              <CheckCircle2 size={19} />
            </div>
            <div>
              <strong>Confirmed</strong>
              <span>Ready for tracking</span>
            </div>
          </div>
        </div>
      </div>

      <div className="dispatch-table-card">
        <div className="dispatch-table-heading">
          <div>
            <div className="dispatch-heading-title">
              <h2>Dispatch Queue</h2>
              <span>{filteredDispatches.length} records</span>
            </div>
            <p>Review and manage carrier assignments.</p>
          </div>
        </div>

        <div className="dispatch-toolbar">
          <div className="dispatch-search">
            <Search size={16} />
            <input
              placeholder="Search dispatch, shipment, customer..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
            {search && (
              <button onClick={() => setSearch("")}>
                <X size={14} />
              </button>
            )}
          </div>

          <div className="dispatch-filters">
            <div className="dispatch-filter-select">
              <Filter size={14} />
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
              >
                <option>All Statuses</option>
                {dispatchStatusOptions.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            </div>

            <select
              className="dispatch-select"
              value={carrierFilter}
              onChange={(e) => {
                setCarrierFilter(e.target.value);
                setPage(1);
              }}
            >
              <option>All Carriers</option>
              {carrierData.map((carrier) => (
                <option key={carrier.name}>{carrier.name}</option>
              ))}
            </select>

            <select
              className="dispatch-select"
              value={serviceFilter}
              onChange={(e) => {
                setServiceFilter(e.target.value);
                setPage(1);
              }}
            >
              <option>All Services</option>
              <option>Express</option>
              <option>Standard</option>
            </select>
          </div>
        </div>

        <div className="dispatch-table-wrap">
          <table className="dispatch-table">
            <thead>
              <tr>
                <th>DISPATCH ID</th>
                <th>SHIPMENT / CUSTOMER</th>
                <th>ROUTE</th>
                <th>SERVICE</th>
                <th>CARRIER</th>
                <th>DISPATCH STATUS</th>
                <th>CREATED</th>
                <th />
              </tr>
            </thead>

            <tbody>
              {currentItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="dispatch-id-cell">
                      <div className="dispatch-package-icon">
                        <ClipboardList size={17} />
                      </div>
                      <div>
                        <strong>{item.id}</strong>
                        <span>{item.shipmentId}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="dispatch-customer-cell">
                      <strong>{item.customer}</strong>
                      <span>{item.package} · {item.weight}</span>
                    </div>
                  </td>

                  <td>
                    <div className="dispatch-route-cell">
                      <span>{item.origin}</span>
                      <ArrowRight size={13} />
                      <span>{item.destination}</span>
                    </div>
                  </td>

                  <td>
                    <span className={`dispatch-service ${item.service.toLowerCase()}`}>
                      {item.service}
                    </span>
                  </td>

                  <td>
                    {item.carrier ? (
                      <div className="dispatch-carrier-cell">
                        <Building2 size={15} />
                        {item.carrier}
                      </div>
                    ) : (
                      <span className="dispatch-unassigned">
                        Not selected
                      </span>
                    )}
                  </td>

                  <td>
                    <DispatchStatus status={item.dispatchStatus} />
                  </td>

                  <td>
                    <span className="dispatch-date">{item.createdAt}</span>
                  </td>

                  <td>
                    <div className="dispatch-actions">
                      <button
                        className="dispatch-icon-btn"
                        title="View details"
                        onClick={() => setSelectedDispatch(item)}
                      >
                        <Eye size={16} />
                      </button>

                      <div className="dispatch-menu-wrapper">
                        <button
                          className="dispatch-icon-btn"
                          onClick={() =>
                            setOpenMenu(openMenu === item.id ? null : item.id)
                          }
                        >
                          <MoreHorizontal size={17} />
                        </button>

                        {openMenu === item.id && (
                          <div className="dispatch-action-menu">
                            <button
                              onClick={() => {
                                setSelectedDispatch(item);
                                setOpenMenu(null);
                              }}
                            >
                              <Eye size={15} />
                              View details
                            </button>

                            {canAssign(item) && (
                              <button onClick={() => startAssignment(item)}>
                                <Truck size={15} />
                                Select carrier
                              </button>
                            )}

                            {canConfirm(item) && (
                              <>
                                <button
                                  onClick={() => {
                                    setConfirmDispatch(item);
                                    setOpenMenu(null);
                                  }}
                                >
                                  <Check size={15} />
                                  Confirm booking
                                </button>
                                <button
                                  className="danger"
                                  onClick={() => {
                                    setRejectDispatch(item);
                                    setOpenMenu(null);
                                  }}
                                >
                                  <X size={15} />
                                  Reject booking
                                </button>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}

              {currentItems.length === 0 && (
                <tr>
                  <td colSpan="8">
                    <div className="dispatch-empty">
                      <Package size={27} />
                      <strong>No dispatch records found</strong>
                      <span>Try another search or adjust your filters.</span>
                      <button onClick={resetFilters}>Clear filters</button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="dispatch-pagination">
          <span>
            Showing{" "}
            <strong>
              {filteredDispatches.length === 0
                ? 0
                : (page - 1) * pageSize + 1}
              –{Math.min(page * pageSize, filteredDispatches.length)}
            </strong>{" "}
            of <strong>{filteredDispatches.length}</strong> records
          </span>

          <div>
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              <ChevronLeft size={16} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <button
                key={number}
                className={page === number ? "active" : ""}
                onClick={() => setPage(number)}
              >
                {number}
              </button>
            ))}

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {assignDispatch && (
        <DispatchModal onClose={() => setAssignDispatch(null)}>
          <div className="dispatch-modal-header">
            <div>
              <span className="dispatch-eyebrow">CARRIER ALLOCATION</span>
              <h2>Select a Carrier</h2>
              <p>{assignDispatch.id} · {assignDispatch.shipmentId}</p>
            </div>
            <button
              className="dispatch-close"
              onClick={() => setAssignDispatch(null)}
            >
              <X size={19} />
            </button>
          </div>

          <div className="dispatch-modal-content">
            <div className="dispatch-shipment-summary">
              <div className="dispatch-summary-icon">
                <Package size={20} />
              </div>
              <div>
                <strong>{assignDispatch.customer}</strong>
                <span>
                  {assignDispatch.origin} <ArrowRight size={12} />{" "}
                  {assignDispatch.destination}
                </span>
                <small>
                  {assignDispatch.service} · {assignDispatch.weight} ·{" "}
                  {assignDispatch.package}
                </small>
              </div>
            </div>

            <div className="dispatch-section-label">
              Available delivery partners
            </div>

            <div className="dispatch-carrier-options">
              {eligibleCarriers.map((carrier) => (
                <button
                  key={carrier.name}
                  className={`dispatch-carrier-option ${
                    selectedCarrier === carrier.name ? "selected" : ""
                  }`}
                  onClick={() => setSelectedCarrier(carrier.name)}
                >
                  <div className="dispatch-carrier-logo">
                    <Truck size={20} />
                  </div>

                  <div className="dispatch-carrier-info">
                    <strong>{carrier.name}</strong>
                    <span>
                      <Timer size={12} />
                      {carrier.delivery}
                    </span>
                  </div>

                  <div className="dispatch-carrier-rating">
                    <span>★ {carrier.rating}</span>
                    <small>Partner rating</small>
                  </div>

                  <div className="dispatch-radio">
                    {selectedCarrier === carrier.name && <span />}
                  </div>
                </button>
              ))}

              {eligibleCarriers.length === 0 && (
                <p>No compatible carriers were found for this shipment.</p>
              )}
            </div>

            <div className="dispatch-info-note">
              <AlertTriangle size={16} />
              <span>
                Selecting a carrier will create a simulated booking request.
                The shipment will only be confirmed after the carrier accepts
                the booking.
              </span>
            </div>
          </div>

          <div className="dispatch-modal-footer">
            <button
              className="dispatch-btn secondary"
              onClick={() => setAssignDispatch(null)}
            >
              Cancel
            </button>
            <button
              className="dispatch-btn primary"
              disabled={!selectedCarrier || eligibleCarriers.length === 0}
              onClick={submitBookingRequest}
            >
              <Send size={15} />
              Submit Booking Request
            </button>
          </div>
        </DispatchModal>
      )}

      {confirmDispatch && (
        <DispatchModal onClose={() => setConfirmDispatch(null)}>
          <div className="dispatch-modal-header">
            <div>
              <span className="dispatch-eyebrow">BOOKING CONFIRMATION</span>
              <h2>Confirm Carrier Booking</h2>
            </div>
            <button
              className="dispatch-close"
              onClick={() => setConfirmDispatch(null)}
            >
              <X size={19} />
            </button>
          </div>

          <div className="dispatch-confirm-content">
            <div className="dispatch-confirm-icon">
              <CheckCircle2 size={25} />
            </div>
            <h3>Confirm this booking?</h3>
            <p>
              This simulates a positive response from{" "}
              <strong>{confirmDispatch.carrier}</strong> for shipment{" "}
              <strong>{confirmDispatch.shipmentId}</strong>.
            </p>
            <div className="dispatch-simulation-note">
              <AlertTriangle size={15} />
              This action is for frontend demonstration only.
            </div>
          </div>

          <div className="dispatch-modal-footer">
            <button
              className="dispatch-btn secondary"
              onClick={() => setConfirmDispatch(null)}
            >
              Cancel
            </button>
            <button className="dispatch-btn primary" onClick={confirmBooking}>
              <Check size={15} />
              Confirm Booking
            </button>
          </div>
        </DispatchModal>
      )}

      {rejectDispatch && (
        <DispatchModal onClose={() => setRejectDispatch(null)}>
          <div className="dispatch-modal-header">
            <div>
              <span className="dispatch-eyebrow">BOOKING RESPONSE</span>
              <h2>Reject Booking</h2>
              <p>{rejectDispatch.shipmentId}</p>
            </div>
            <button
              className="dispatch-close"
              onClick={() => setRejectDispatch(null)}
            >
              <X size={19} />
            </button>
          </div>

          <div className="dispatch-reject-content">
            <label htmlFor="dispatch-reject-reason">
              Reason for rejection
            </label>
            <textarea
              id="dispatch-reject-reason"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Enter the reason for the carrier rejection..."
              rows={4}
            />
            <span>
              The dispatch will be marked as Reassignment Required.
            </span>
          </div>

          <div className="dispatch-modal-footer">
            <button
              className="dispatch-btn secondary"
              onClick={() => setRejectDispatch(null)}
            >
              Cancel
            </button>
            <button
              className="dispatch-btn danger"
              disabled={!rejectReason.trim()}
              onClick={submitRejection}
            >
              <X size={15} />
              Confirm Rejection
            </button>
          </div>
        </DispatchModal>
      )}

      {selectedDispatch && (
        <DispatchModal
          onClose={() => setSelectedDispatch(null)}
          wide
        >
          <div className="dispatch-modal-header">
            <div>
              <span className="dispatch-eyebrow">DISPATCH DETAILS</span>
              <h2>{selectedDispatch.id}</h2>
              <p>{selectedDispatch.shipmentId}</p>
              <div className="dispatch-detail-status">
                <DispatchStatus status={selectedDispatch.dispatchStatus} />
              </div>
            </div>
            <button
              className="dispatch-close"
              onClick={() => setSelectedDispatch(null)}
            >
              <X size={19} />
            </button>
          </div>

          <div className="dispatch-detail-body">
            <div className="dispatch-detail-left">
              <section className="dispatch-detail-section">
                <div className="dispatch-detail-title">
                  <Package size={17} />
                  <h3>Shipment Information</h3>
                </div>

                <div className="dispatch-detail-grid">
                  <div>
                    <span>Customer</span>
                    <strong>{selectedDispatch.customer}</strong>
                  </div>
                  <div>
                    <span>Shipment ID</span>
                    <strong>{selectedDispatch.shipmentId}</strong>
                  </div>
                  <div>
                    <span>Service</span>
                    <strong>{selectedDispatch.service}</strong>
                  </div>
                  <div>
                    <span>Package</span>
                    <strong>{selectedDispatch.package}</strong>
                  </div>
                  <div>
                    <span>Weight</span>
                    <strong>{selectedDispatch.weight}</strong>
                  </div>
                  <div>
                    <span>Created At</span>
                    <strong>{selectedDispatch.createdAt}</strong>
                  </div>
                </div>
              </section>

              <section className="dispatch-detail-section">
                <div className="dispatch-detail-title">
                  <MapPin size={17} />
                  <h3>Shipping Route</h3>
                </div>

                <div className="dispatch-route-detail">
                  <div>
                    <span className="dispatch-route-dot origin" />
                    <div>
                      <small>ORIGIN</small>
                      <strong>{selectedDispatch.origin}</strong>
                    </div>
                  </div>
                  <div className="dispatch-route-line" />
                  <div>
                    <span className="dispatch-route-dot destination" />
                    <div>
                      <small>DESTINATION</small>
                      <strong>{selectedDispatch.destination}</strong>
                    </div>
                  </div>
                </div>
              </section>

              <section className="dispatch-detail-section">
                <div className="dispatch-detail-title">
                  <Truck size={17} />
                  <h3>Carrier Assignment</h3>
                </div>

                <div className="dispatch-detail-grid">
                  <div>
                    <span>Selected Carrier</span>
                    <strong>{selectedDispatch.carrier || "Not selected"}</strong>
                  </div>
                  <div>
                    <span>Tracking Number</span>
                    <strong>{selectedDispatch.tracking || "Not available"}</strong>
                  </div>
                  <div>
                    <span>Estimated Delivery</span>
                    <strong>{selectedDispatch.estimatedDelivery}</strong>
                  </div>
                  <div>
                    <span>Carrier Price</span>
                    <strong>
                      {selectedDispatch.price
                        ? `${selectedDispatch.price} ${selectedDispatch.currency}`
                        : "Pending confirmation"}
                    </strong>
                  </div>
                </div>
              </section>
            </div>

            <div className="dispatch-detail-right">
              <section className="dispatch-detail-section">
                <div className="dispatch-detail-title">
                  <ClipboardList size={17} />
                  <h3>Dispatch History</h3>
                </div>

                <div className="dispatch-history">
                  {selectedDispatch.history.map((event, index) => (
                    <div className="dispatch-history-item" key={index}>
                      <span className="dispatch-history-marker">
                        <CheckCircle2 size={15} />
                      </span>
                      <div>
                        <strong>{event.title}</strong>
                        <p>{event.description}</p>
                        <small>{event.date}</small>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="dispatch-detail-section">
                <div className="dispatch-detail-title">
                  <AlertCircle size={17} />
                  <h3>Internal Notes</h3>
                </div>
                <p className="dispatch-internal-note">
                  {selectedDispatch.notes || "No additional notes."}
                </p>
              </section>
            </div>
          </div>

          <div className="dispatch-modal-footer">
            {canAssign(selectedDispatch) && (
              <button
                className="dispatch-btn primary"
                onClick={() => {
                  startAssignment(selectedDispatch);
                  setSelectedDispatch(null);
                }}
              >
                <Truck size={15} />
                Select Carrier
              </button>
            )}

            {canConfirm(selectedDispatch) && (
              <button
                className="dispatch-btn primary"
                onClick={() => {
                  setConfirmDispatch(selectedDispatch);
                  setSelectedDispatch(null);
                }}
              >
                <Check size={15} />
                Confirm Booking
              </button>
            )}

            <button
              className="dispatch-btn secondary"
              onClick={() => setSelectedDispatch(null)}
            >
              Close
            </button>
          </div>
        </DispatchModal>
      )}
    </div>
  );
}
