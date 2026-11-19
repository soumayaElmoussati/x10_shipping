
import { useMemo, useState } from "react";
import {
  Search,
  Filter,
  RotateCcw,
  Package,
  Clock,
  CheckCircle2,
  AlertCircle,
  Truck,
  ChevronRight,
  ChevronLeft,
  MoreHorizontal,
  Eye,
  X,
  MapPin,
  CalendarDays,
  User,
  Building2,
  Timer,
  ClipboardList,
  RefreshCw,
  AlertTriangle,
  Phone,
  Navigation,
  Check,
  CalendarClock,
} from "lucide-react";
import "./PickupMonitoring.css";

const initialPickups = [
  {
    id: "PU-2026-001",
    shipmentId: "SHP-2026-004",
    customer: "Noura Ibrahim",
    phone: "+971 50 123 4567",
    carrier: "iMile",
    tracking: "IML987654321",
    origin: "Dubai, UAE",
    address: "Business Bay, Building 12, Dubai",
    service: "Standard",
    package: "Personal Items",
    weight: "8 kg",
    scheduledDate: "19 Nov 2026",
    scheduledTime: "10:00 AM - 12:00 PM",
    actualPickup: null,
    status: "Scheduled",
    lastUpdate: "19 Nov 2026 · 08:30",
    notes: "Pickup scheduled by iMile.",
    history: [
      {
        title: "Pickup requested",
        description: "Pickup request submitted to iMile.",
        date: "18 Nov 2026 · 14:00",
      },
      {
        title: "Pickup scheduled",
        description: "Pickup scheduled for 19 Nov, 10 AM - 12 PM.",
        date: "18 Nov 2026 · 16:30",
      },
    ],
  },
  {
    id: "PU-2026-002",
    shipmentId: "SHP-2026-005",
    customer: "Khalid Mansour",
    phone: "+971 55 987 6543",
    carrier: "iMile",
    tracking: "IML123456789",
    origin: "Ajman, UAE",
    address: "Al Rashidiya 2, Ajman",
    service: "Express",
    package: "Electronics",
    weight: "2 kg",
    scheduledDate: "19 Nov 2026",
    scheduledTime: "09:00 AM - 11:00 AM",
    actualPickup: "10:15 AM",
    status: "Picked Up",
    lastUpdate: "19 Nov 2026 · 10:15",
    notes: "Package collected successfully.",
    history: [
      {
        title: "Pickup requested",
        description: "Pickup request submitted.",
        date: "18 Nov 2026 · 09:00",
      },
      {
        title: "Pickup scheduled",
        description: "Pickup scheduled for 19 Nov.",
        date: "18 Nov 2026 · 10:30",
      },
      {
        title: "Picked up",
        description: "Carrier confirmed successful collection.",
        date: "19 Nov 2026 · 10:15",
      },
    ],
  },
  {
    id: "PU-2026-003",
    shipmentId: "SHP-2026-011",
    customer: "Ahmed Benali",
    phone: "+971 52 111 2222",
    carrier: "DHL",
    tracking: "DHL784512963",
    origin: "Dubai, UAE",
    address: "Downtown Dubai, Boulevard Plaza",
    service: "Express",
    package: "Documents",
    weight: "1.2 kg",
    scheduledDate: "19 Nov 2026",
    scheduledTime: "08:00 AM - 10:00 AM",
    actualPickup: null,
    status: "Delayed",
    lastUpdate: "19 Nov 2026 · 10:30",
    notes: "Carrier reported a pickup delay.",
    history: [
      {
        title: "Pickup requested",
        description: "Pickup request submitted to DHL.",
        date: "18 Nov 2026 · 11:00",
      },
      {
        title: "Pickup scheduled",
        description: "Pickup scheduled for 19 Nov, 08:00 AM.",
        date: "18 Nov 2026 · 12:00",
      },
      {
        title: "Pickup delayed",
        description: "Carrier reported a delay.",
        date: "19 Nov 2026 · 10:30",
      },
    ],
  },
  {
    id: "PU-2026-004",
    shipmentId: "SHP-2026-012",
    customer: "Sara Khalid",
    phone: "+971 50 222 3333",
    carrier: "Aramex",
    tracking: "ARX852741963",
    origin: "Abu Dhabi, UAE",
    address: "Khalifa City, Sector 15",
    service: "Standard",
    package: "Electronics",
    weight: "3.5 kg",
    scheduledDate: "18 Nov 2026",
    scheduledTime: "02:00 PM - 04:00 PM",
    actualPickup: null,
    status: "Failed",
    lastUpdate: "18 Nov 2026 · 16:15",
    notes: "Customer was unavailable at the pickup address.",
    history: [
      {
        title: "Pickup requested",
        description: "Pickup request sent to Aramex.",
        date: "17 Nov 2026 · 09:00",
      },
      {
        title: "Pickup scheduled",
        description: "Pickup scheduled for 18 Nov.",
        date: "17 Nov 2026 · 10:00",
      },
      {
        title: "Pickup failed",
        description: "Customer was unavailable.",
        date: "18 Nov 2026 · 16:15",
      },
    ],
  },
  {
    id: "PU-2026-005",
    shipmentId: "SHP-2026-013",
    customer: "Omar Abdullah",
    phone: "+971 56 444 5555",
    carrier: "DHL",
    tracking: "DHL963258741",
    origin: "Sharjah, UAE",
    address: "Al Majaz 3, Sharjah",
    service: "Express",
    package: "Clothing",
    weight: "5 kg",
    scheduledDate: "20 Nov 2026",
    scheduledTime: "11:00 AM - 01:00 PM",
    actualPickup: null,
    status: "Rescheduled",
    lastUpdate: "19 Nov 2026 · 09:45",
    notes: "Pickup rescheduled following a customer request.",
    history: [
      {
        title: "Pickup requested",
        description: "Pickup request submitted.",
        date: "18 Nov 2026 · 10:00",
      },
      {
        title: "Pickup scheduled",
        description: "Pickup scheduled for 19 Nov.",
        date: "18 Nov 2026 · 11:00",
      },
      {
        title: "Pickup rescheduled",
        description: "New pickup date: 20 Nov 2026.",
        date: "19 Nov 2026 · 09:45",
      },
    ],
  },
  {
    id: "PU-2026-006",
    shipmentId: "SHP-2026-014",
    customer: "Mariam Saeed",
    phone: "+971 54 333 4444",
    carrier: "iMile",
    tracking: "IML654789321",
    origin: "Dubai, UAE",
    address: "Jumeirah Village Circle, Dubai",
    service: "Standard",
    package: "Documents",
    weight: "0.8 kg",
    scheduledDate: "18 Nov 2026",
    scheduledTime: "09:00 AM - 11:00 AM",
    actualPickup: "10:05 AM",
    status: "Picked Up",
    lastUpdate: "18 Nov 2026 · 10:05",
    notes: "Pickup completed successfully.",
    history: [
      {
        title: "Pickup requested",
        description: "Pickup request submitted.",
        date: "17 Nov 2026 · 09:00",
      },
      {
        title: "Pickup scheduled",
        description: "Pickup scheduled for 18 Nov.",
        date: "17 Nov 2026 · 10:00",
      },
      {
        title: "Picked up",
        description: "Carrier confirmed successful collection.",
        date: "18 Nov 2026 · 10:05",
      },
    ],
  },
  {
    id: "PU-2026-007",
    shipmentId: "SHP-2026-015",
    customer: "Youssef Karim",
    phone: "+971 55 777 8888",
    carrier: "Aramex",
    tracking: "ARX741852963",
    origin: "Abu Dhabi, UAE",
    address: "Al Reem Island, Abu Dhabi",
    service: "Express",
    package: "Accessories",
    weight: "4 kg",
    scheduledDate: "19 Nov 2026",
    scheduledTime: "01:00 PM - 03:00 PM",
    actualPickup: null,
    status: "Requested",
    lastUpdate: "19 Nov 2026 · 08:00",
    notes: "Waiting for carrier pickup scheduling.",
    history: [
      {
        title: "Pickup requested",
        description: "Pickup request submitted to Aramex.",
        date: "19 Nov 2026 · 08:00",
      },
    ],
  },
];

const pickupStatuses = [
  "Requested",
  "Scheduled",
  "Rescheduled",
  "Picked Up",
  "Delayed",
  "Failed",
];

const pickupCarriers = ["iMile", "Aramex", "DHL", "FedEx"];

function PickupStatus({ status }) {
  const classes = {
    Requested: "requested",
    Scheduled: "scheduled",
    Rescheduled: "rescheduled",
    "Picked Up": "picked",
    Delayed: "delayed",
    Failed: "failed",
  };

  return (
    <span className={`pickup-status ${classes[status] || "requested"}`}>
      <span className="pickup-status-dot" />
      {status}
    </span>
  );
}

function PickupModal({ children, onClose, wide = false }) {
  return (
    <div className="pickup-overlay" onMouseDown={onClose}>
      <div
        className={`pickup-modal ${wide ? "wide" : ""}`}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default function PickupMonitoring() {
  const [pickups, setPickups] = useState(initialPickups);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [carrierFilter, setCarrierFilter] = useState("All Carriers");
  const [serviceFilter, setServiceFilter] = useState("All Services");
  const [page, setPage] = useState(1);
  const [selectedPickup, setSelectedPickup] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const [statusModal, setStatusModal] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [statusNote, setStatusNote] = useState("");

  const pageSize = 6;

  const filteredPickups = useMemo(() => {
    return pickups.filter((item) => {
      const term = search.toLowerCase();

      const matchesSearch =
        item.id.toLowerCase().includes(term) ||
        item.shipmentId.toLowerCase().includes(term) ||
        item.customer.toLowerCase().includes(term) ||
        item.carrier.toLowerCase().includes(term) ||
        item.tracking.toLowerCase().includes(term) ||
        item.origin.toLowerCase().includes(term);

      const matchesStatus =
        statusFilter === "All Statuses" || item.status === statusFilter;

      const matchesCarrier =
        carrierFilter === "All Carriers" || item.carrier === carrierFilter;

      const matchesService =
        serviceFilter === "All Services" || item.service === serviceFilter;

      return matchesSearch && matchesStatus && matchesCarrier && matchesService;
    });
  }, [pickups, search, statusFilter, carrierFilter, serviceFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredPickups.length / pageSize));

  const currentItems = filteredPickups.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const stats = [
    {
      label: "Scheduled Pickups",
      value: pickups.filter((p) =>
        ["Scheduled", "Rescheduled"].includes(p.status)
      ).length,
      icon: CalendarClock,
      color: "orange",
      description: "Upcoming carrier collections",
    },
    {
      label: "Picked Up",
      value: pickups.filter((p) => p.status === "Picked Up").length,
      icon: CheckCircle2,
      color: "green",
      description: "Successfully collected",
    },
    {
      label: "Delayed Pickups",
      value: pickups.filter((p) => p.status === "Delayed").length,
      icon: Clock,
      color: "blue",
      description: "Awaiting carrier update",
    },
    {
      label: "Failed Pickups",
      value: pickups.filter((p) => p.status === "Failed").length,
      icon: AlertCircle,
      color: "red",
      description: "Require follow-up",
    },
  ];

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("All Statuses");
    setCarrierFilter("All Carriers");
    setServiceFilter("All Services");
    setPage(1);
  };

  const openStatusEditor = (item) => {
    setStatusModal(item);
    setNewStatus(item.status);
    setStatusNote("");
    setOpenMenu(null);
  };

  const updatePickupStatus = () => {
    if (!statusModal || !newStatus) return;

    const statusDescriptions = {
      Requested: "Pickup request registered.",
      Scheduled: "Carrier scheduled the pickup.",
      Rescheduled: "Carrier rescheduled the pickup.",
      "Picked Up": "Carrier confirmed successful pickup.",
      Delayed: "Carrier reported a pickup delay.",
      Failed: "Carrier reported a failed pickup.",
    };

    setPickups((previous) =>
      previous.map((item) =>
        item.id === statusModal.id
          ? {
              ...item,
              status: newStatus,
              actualPickup:
                newStatus === "Picked Up"
                  ? new Date().toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : item.actualPickup,
              lastUpdate: new Date().toLocaleString(),
              notes: statusNote || statusDescriptions[newStatus],
              history: [
                ...item.history,
                {
                  title: `Pickup status: ${newStatus}`,
                  description:
                    statusNote || statusDescriptions[newStatus],
                  date: new Date().toLocaleString(),
                },
              ],
            }
          : item
      )
    );

    setStatusModal(null);
    setStatusNote("");
  };

  const isUpcoming = (item) =>
    ["Requested", "Scheduled", "Rescheduled", "Delayed"].includes(item.status);

  return (
    <div className="pickup-page">
      <div className="pickup-breadcrumb">
        <span>Operations</span>
        <ChevronRight size={14} />
        <strong>Pickup Monitoring</strong>
      </div>

      <div className="pickup-page-header">
        <div>
          <h1>Pickup Monitoring</h1>
          <p>
            Monitor carrier collection schedules, pickup progress and
            collection exceptions.
          </p>
        </div>

        <button className="pickup-btn secondary" onClick={resetFilters}>
          <RotateCcw size={15} />
          Reset filters
        </button>
      </div>

      <div className="pickup-stats">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div className="pickup-stat-card" key={stat.label}>
              <div className={`pickup-stat-icon ${stat.color}`}>
                <Icon size={21} />
              </div>
              <div className="pickup-stat-content">
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
                <small>{stat.description}</small>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pickup-overview">
        <div className="pickup-overview-heading">
          <div>
            <h2>Pickup Overview</h2>
            <p>Current status of carrier collections.</p>
          </div>
          <span className="pickup-overview-label">
            <span />
            Carrier-reported activity
          </span>
        </div>

        <div className="pickup-overview-grid">
          <div className="pickup-overview-item">
            <div className="pickup-overview-icon orange">
              <CalendarDays size={18} />
            </div>
            <div>
              <strong>
                {pickups.filter((p) =>
                  ["Scheduled", "Rescheduled"].includes(p.status)
                ).length}
              </strong>
              <span>Scheduled</span>
            </div>
          </div>

          <div className="pickup-overview-item">
            <div className="pickup-overview-icon green">
              <CheckCircle2 size={18} />
            </div>
            <div>
              <strong>
                {pickups.filter((p) => p.status === "Picked Up").length}
              </strong>
              <span>Completed</span>
            </div>
          </div>

          <div className="pickup-overview-item">
            <div className="pickup-overview-icon blue">
              <Clock size={18} />
            </div>
            <div>
              <strong>
                {pickups.filter((p) => p.status === "Delayed").length}
              </strong>
              <span>Delayed</span>
            </div>
          </div>

          <div className="pickup-overview-item">
            <div className="pickup-overview-icon red">
              <AlertTriangle size={18} />
            </div>
            <div>
              <strong>
                {pickups.filter((p) => p.status === "Failed").length}
              </strong>
              <span>Failed</span>
            </div>
          </div>
        </div>
      </div>

      <div className="pickup-table-card">
        <div className="pickup-table-heading">
          <div>
            <div className="pickup-heading-title">
              <h2>Pickup List</h2>
              <span>{filteredPickups.length} records</span>
            </div>
            <p>Monitor collection activities reported by delivery partners.</p>
          </div>
        </div>

        <div className="pickup-toolbar">
          <div className="pickup-search">
            <Search size={16} />
            <input
              placeholder="Search pickup, shipment, customer..."
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

          <div className="pickup-filters">
            <div className="pickup-filter-select">
              <Filter size={14} />
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
              >
                <option>All Statuses</option>
                {pickupStatuses.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            </div>

            <select
              className="pickup-select"
              value={carrierFilter}
              onChange={(e) => {
                setCarrierFilter(e.target.value);
                setPage(1);
              }}
            >
              <option>All Carriers</option>
              {pickupCarriers.map((carrier) => (
                <option key={carrier}>{carrier}</option>
              ))}
            </select>

            <select
              className="pickup-select"
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

        <div className="pickup-table-wrap">
          <table className="pickup-table">
            <thead>
              <tr>
                <th>PICKUP ID</th>
                <th>SHIPMENT / CUSTOMER</th>
                <th>CARRIER</th>
                <th>PICKUP LOCATION</th>
                <th>SCHEDULE</th>
                <th>STATUS</th>
                <th>LAST UPDATE</th>
                <th />
              </tr>
            </thead>

            <tbody>
              {currentItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="pickup-id-cell">
                      <div className="pickup-package-icon">
                        <Package size={17} />
                      </div>
                      <div>
                        <strong>{item.id}</strong>
                        <span>{item.tracking}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="pickup-customer-cell">
                      <strong>{item.customer}</strong>
                      <span>{item.shipmentId} · {item.weight}</span>
                    </div>
                  </td>

                  <td>
                    <div className="pickup-carrier-cell">
                      <Truck size={15} />
                      {item.carrier}
                    </div>
                  </td>

                  <td>
                    <div className="pickup-location-cell">
                      <MapPin size={14} />
                      <span>{item.origin}</span>
                    </div>
                  </td>

                  <td>
                    <div className="pickup-schedule-cell">
                      <strong>{item.scheduledDate}</strong>
                      <span>{item.scheduledTime}</span>
                    </div>
                  </td>

                  <td>
                    <PickupStatus status={item.status} />
                  </td>

                  <td>
                    <span className="pickup-last-update">{item.lastUpdate}</span>
                  </td>

                  <td>
                    <div className="pickup-actions">
                      <button
                        className="pickup-icon-btn"
                        title="View details"
                        onClick={() => setSelectedPickup(item)}
                      >
                        <Eye size={16} />
                      </button>

                      <div className="pickup-menu-wrapper">
                        <button
                          className="pickup-icon-btn"
                          onClick={() =>
                            setOpenMenu(
                              openMenu === item.id ? null : item.id
                            )
                          }
                        >
                          <MoreHorizontal size={17} />
                        </button>

                        {openMenu === item.id && (
                          <div className="pickup-action-menu">
                            <button
                              onClick={() => {
                                setSelectedPickup(item);
                                setOpenMenu(null);
                              }}
                            >
                              <Eye size={15} />
                              View details
                            </button>

                            <button onClick={() => openStatusEditor(item)}>
                              <RefreshCw size={15} />
                              Update status
                            </button>
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
                    <div className="pickup-empty">
                      <Package size={28} />
                      <strong>No pickup records found</strong>
                      <span>Try adjusting your filters or search.</span>
                      <button onClick={resetFilters}>Clear filters</button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="pickup-pagination">
          <span>
            Showing{" "}
            <strong>
              {filteredPickups.length === 0
                ? 0
                : (page - 1) * pageSize + 1}
              –{Math.min(page * pageSize, filteredPickups.length)}
            </strong>{" "}
            of <strong>{filteredPickups.length}</strong> records
          </span>

          <div>
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              <ChevronLeft size={16} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
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
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {selectedPickup && (
        <PickupModal
          wide
          onClose={() => setSelectedPickup(null)}
        >
          <div className="pickup-modal-header">
            <div>
              <span className="pickup-eyebrow">PICKUP DETAILS</span>
              <h2>{selectedPickup.id}</h2>
              <p>{selectedPickup.shipmentId}</p>
              <div className="pickup-detail-status">
                <PickupStatus status={selectedPickup.status} />
              </div>
            </div>

            <button
              className="pickup-close"
              onClick={() => setSelectedPickup(null)}
            >
              <X size={19} />
            </button>
          </div>

          <div className="pickup-detail-body">
            <div className="pickup-detail-left">
              <section className="pickup-detail-section">
                <div className="pickup-detail-title">
                  <Package size={17} />
                  <h3>Shipment Information</h3>
                </div>

                <div className="pickup-detail-grid">
                  <div>
                    <span>Customer</span>
                    <strong>{selectedPickup.customer}</strong>
                  </div>
                  <div>
                    <span>Phone</span>
                    <strong>{selectedPickup.phone}</strong>
                  </div>
                  <div>
                    <span>Shipment ID</span>
                    <strong>{selectedPickup.shipmentId}</strong>
                  </div>
                  <div>
                    <span>Tracking Number</span>
                    <strong>{selectedPickup.tracking}</strong>
                  </div>
                  <div>
                    <span>Package Type</span>
                    <strong>{selectedPickup.package}</strong>
                  </div>
                  <div>
                    <span>Weight</span>
                    <strong>{selectedPickup.weight}</strong>
                  </div>
                  <div>
                    <span>Service</span>
                    <strong>{selectedPickup.service}</strong>
                  </div>
                  <div>
                    <span>Carrier</span>
                    <strong>{selectedPickup.carrier}</strong>
                  </div>
                </div>
              </section>

              <section className="pickup-detail-section">
                <div className="pickup-detail-title">
                  <MapPin size={17} />
                  <h3>Pickup Location</h3>
                </div>

                <div className="pickup-address">
                  <div className="pickup-address-icon">
                    <Navigation size={19} />
                  </div>
                  <div>
                    <strong>{selectedPickup.origin}</strong>
                    <p>{selectedPickup.address}</p>
                    <span>
                      <Phone size={12} />
                      {selectedPickup.phone}
                    </span>
                  </div>
                </div>
              </section>

              <section className="pickup-detail-section">
                <div className="pickup-detail-title">
                  <CalendarDays size={17} />
                  <h3>Pickup Schedule</h3>
                </div>

                <div className="pickup-detail-grid">
                  <div>
                    <span>Scheduled Date</span>
                    <strong>{selectedPickup.scheduledDate}</strong>
                  </div>
                  <div>
                    <span>Time Window</span>
                    <strong>{selectedPickup.scheduledTime}</strong>
                  </div>
                  <div>
                    <span>Actual Pickup Time</span>
                    <strong>
                      {selectedPickup.actualPickup || "Not collected"}
                    </strong>
                  </div>
                </div>
              </section>
            </div>

            <div className="pickup-detail-right">
              <section className="pickup-detail-section">
                <div className="pickup-detail-title">
                  <ClipboardList size={17} />
                  <h3>Pickup Timeline</h3>
                </div>

                <div className="pickup-history">
                  {selectedPickup.history.map((event, index) => (
                    <div className="pickup-history-item" key={index}>
                      <span className="pickup-history-marker">
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

              <section className="pickup-detail-section">
                <div className="pickup-detail-title">
                  <AlertCircle size={17} />
                  <h3>Pickup Notes</h3>
                </div>
                <p className="pickup-note">{selectedPickup.notes}</p>
              </section>
            </div>
          </div>

          <div className="pickup-modal-footer">
            <button
              className="pickup-btn secondary"
              onClick={() => {
                openStatusEditor(selectedPickup);
                setSelectedPickup(null);
              }}
            >
              <RefreshCw size={15} />
              Update Status
            </button>

            <button
              className="pickup-btn secondary"
              onClick={() => setSelectedPickup(null)}
            >
              Close
            </button>
          </div>
        </PickupModal>
      )}

      {statusModal && (
        <PickupModal onClose={() => setStatusModal(null)}>
          <div className="pickup-modal-header">
            <div>
              <span className="pickup-eyebrow">PICKUP MONITORING</span>
              <h2>Update Pickup Status</h2>
              <p>{statusModal.id} · {statusModal.shipmentId}</p>
            </div>
            <button
              className="pickup-close"
              onClick={() => setStatusModal(null)}
            >
              <X size={19} />
            </button>
          </div>

          <div className="pickup-status-form">
            <div className="pickup-form-group">
              <label>Pickup status</label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
              >
                {pickupStatuses.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            </div>

            <div className="pickup-form-group">
              <label>Update notes</label>
              <textarea
                rows={4}
                value={statusNote}
                onChange={(e) => setStatusNote(e.target.value)}
                placeholder="Enter the carrier-reported update or exception details..."
              />
            </div>

            <div className="pickup-info-note">
              <AlertTriangle size={16} />
              <span>
                This is a frontend demonstration. In production, pickup
                status updates should be synchronized from the carrier API.
              </span>
            </div>
          </div>

          <div className="pickup-modal-footer">
            <button
              className="pickup-btn secondary"
              onClick={() => setStatusModal(null)}
            >
              Cancel
            </button>
            <button
              className="pickup-btn primary"
              onClick={updatePickupStatus}
            >
              <Check size={15} />
              Save Update
            </button>
          </div>
        </PickupModal>
      )}
    </div>
  );
}
