
import { useMemo, useState } from "react";
import {
  Search,
  RefreshCw,
  Filter,
  Truck,
  Package,
  CheckCircle2,
  Clock,
  AlertTriangle,
  MapPin,
  CalendarDays,
  ArrowRight,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  Navigation,
  CircleDot,
  ExternalLink,
  RotateCcw,
  Activity,
  Box,
  Building2,
  UserRound,
  Hash,
  Timer,
} from "lucide-react";
import "./TrackingMonitoring.css";

const initialShipments = [
  {
    id: "TRK-2026-001",
    shipmentId: "SHP-2026-001",
    trackingNumber: "IML987654321",
    customer: "Ahmed Benali",
    email: "ahmed.benali@email.com",
    carrier: "iMile",
    service: "Express",
    origin: "Dubai, UAE",
    destination: "Riyadh, Saudi Arabia",
    currentStatus: "In Transit",
    estimatedDelivery: "2026-11-21",
    lastUpdate: "2026-11-19T10:35:00",
    lastLocation: "Riyadh Distribution Center",
    progress: 65,
    weight: "1.2 kg",
    events: [
      { status: "Label Created", location: "Dubai, UAE", date: "2026-11-17T09:00:00", description: "Shipment information received by carrier", completed: true },
      { status: "Pickup Scheduled", location: "Dubai, UAE", date: "2026-11-17T11:30:00", description: "Pickup scheduled by the carrier", completed: true },
      { status: "Picked Up", location: "Dubai, UAE", date: "2026-11-18T08:20:00", description: "Shipment collected by carrier", completed: true },
      { status: "In Transit", location: "Riyadh Distribution Center", date: "2026-11-19T10:35:00", description: "Shipment is moving through the carrier network", completed: true },
      { status: "Out for Delivery", location: "Riyadh, Saudi Arabia", date: null, description: "Awaiting next carrier update", completed: false },
      { status: "Delivered", location: "Riyadh, Saudi Arabia", date: null, description: "Awaiting delivery confirmation", completed: false },
    ],
  },
  {
    id: "TRK-2026-002",
    shipmentId: "SHP-2026-002",
    trackingNumber: "ARAMX45678912",
    customer: "Sara Khalid",
    email: "sara.khalid@email.com",
    carrier: "Aramex",
    service: "Standard",
    origin: "Abu Dhabi, UAE",
    destination: "Doha, Qatar",
    currentStatus: "Out for Delivery",
    estimatedDelivery: "2026-11-19",
    lastUpdate: "2026-11-19T09:15:00",
    lastLocation: "Doha, Qatar",
    progress: 90,
    weight: "3.5 kg",
    events: [
      { status: "Label Created", location: "Abu Dhabi, UAE", date: "2026-11-16T08:00:00", description: "Shipment registered in carrier system", completed: true },
      { status: "Picked Up", location: "Abu Dhabi, UAE", date: "2026-11-16T14:10:00", description: "Shipment collected by carrier", completed: true },
      { status: "In Transit", location: "GCC Transit Hub", date: "2026-11-17T18:45:00", description: "Shipment departed transit facility", completed: true },
      { status: "Arrived at Facility", location: "Doha, Qatar", date: "2026-11-18T16:30:00", description: "Shipment arrived at destination facility", completed: true },
      { status: "Out for Delivery", location: "Doha, Qatar", date: "2026-11-19T09:15:00", description: "Shipment handed to delivery courier", completed: true },
      { status: "Delivered", location: "Doha, Qatar", date: null, description: "Awaiting delivery confirmation", completed: false },
    ],
  },
  {
    id: "TRK-2026-003",
    shipmentId: "SHP-2026-003",
    trackingNumber: "DHL1234567890",
    customer: "Omar Abdullah",
    email: "omar.abdullah@email.com",
    carrier: "DHL",
    service: "Express",
    origin: "Sharjah, UAE",
    destination: "Kuwait City, Kuwait",
    currentStatus: "Delivered",
    estimatedDelivery: "2026-11-18",
    lastUpdate: "2026-11-18T15:42:00",
    lastLocation: "Kuwait City, Kuwait",
    progress: 100,
    weight: "5 kg",
    events: [
      { status: "Label Created", location: "Sharjah, UAE", date: "2026-11-15T08:00:00", description: "Shipment information received", completed: true },
      { status: "Picked Up", location: "Sharjah, UAE", date: "2026-11-15T12:20:00", description: "Shipment picked up by DHL", completed: true },
      { status: "In Transit", location: "Dubai, UAE", date: "2026-11-16T06:40:00", description: "Shipment departed origin facility", completed: true },
      { status: "Arrived at Facility", location: "Kuwait City, Kuwait", date: "2026-11-17T14:10:00", description: "Shipment arrived at destination facility", completed: true },
      { status: "Out for Delivery", location: "Kuwait City, Kuwait", date: "2026-11-18T09:30:00", description: "Shipment is with the delivery courier", completed: true },
      { status: "Delivered", location: "Kuwait City, Kuwait", date: "2026-11-18T15:42:00", description: "Shipment successfully delivered", completed: true },
    ],
  },
  {
    id: "TRK-2026-004",
    shipmentId: "SHP-2026-004",
    trackingNumber: "IML456123789",
    customer: "Noura Ibrahim",
    email: "noura.ibrahim@email.com",
    carrier: "iMile",
    service: "Standard",
    origin: "Dubai, UAE",
    destination: "Manama, Bahrain",
    currentStatus: "Delayed",
    estimatedDelivery: "2026-11-20",
    lastUpdate: "2026-11-19T07:50:00",
    lastLocation: "Dammam Transit Facility",
    progress: 55,
    weight: "8 kg",
    exception: "Transit delay reported by carrier",
    events: [
      { status: "Label Created", location: "Dubai, UAE", date: "2026-11-16T10:00:00", description: "Shipment information received", completed: true },
      { status: "Picked Up", location: "Dubai, UAE", date: "2026-11-17T08:45:00", description: "Shipment collected by carrier", completed: true },
      { status: "In Transit", location: "Dammam, Saudi Arabia", date: "2026-11-18T13:20:00", description: "Shipment in transit to destination", completed: true },
      { status: "Delayed", location: "Dammam Transit Facility", date: "2026-11-19T07:50:00", description: "Transit delay reported by carrier", completed: true },
    ],
  },
  {
    id: "TRK-2026-005",
    shipmentId: "SHP-2026-005",
    trackingNumber: "ARAMX78945612",
    customer: "Khalid Mansour",
    email: "khalid.mansour@email.com",
    carrier: "Aramex",
    service: "Express",
    origin: "Ajman, UAE",
    destination: "Muscat, Oman",
    currentStatus: "Picked Up",
    estimatedDelivery: "2026-11-22",
    lastUpdate: "2026-11-19T08:25:00",
    lastLocation: "Ajman, UAE",
    progress: 25,
    weight: "2 kg",
    events: [
      { status: "Label Created", location: "Ajman, UAE", date: "2026-11-18T09:00:00", description: "Shipment registered by carrier", completed: true },
      { status: "Pickup Scheduled", location: "Ajman, UAE", date: "2026-11-18T12:00:00", description: "Pickup scheduled by carrier", completed: true },
      { status: "Picked Up", location: "Ajman, UAE", date: "2026-11-19T08:25:00", description: "Shipment collected by carrier", completed: true },
      { status: "In Transit", location: "UAE", date: null, description: "Awaiting next carrier update", completed: false },
    ],
  },
  {
    id: "TRK-2026-006",
    shipmentId: "SHP-2026-006",
    trackingNumber: "DHL9876543210",
    customer: "Mariam Saeed",
    email: "mariam.saeed@email.com",
    carrier: "DHL",
    service: "Express",
    origin: "Dubai, UAE",
    destination: "Riyadh, Saudi Arabia",
    currentStatus: "Exception",
    estimatedDelivery: "2026-11-21",
    lastUpdate: "2026-11-19T06:40:00",
    lastLocation: "Dubai International Facility",
    progress: 40,
    weight: "0.8 kg",
    exception: "Address information requires verification",
    events: [
      { status: "Label Created", location: "Dubai, UAE", date: "2026-11-17T08:00:00", description: "Shipment information received", completed: true },
      { status: "Picked Up", location: "Dubai, UAE", date: "2026-11-17T14:20:00", description: "Shipment picked up by DHL", completed: true },
      { status: "Exception", location: "Dubai International Facility", date: "2026-11-19T06:40:00", description: "Address information requires verification", completed: true },
    ],
  },
  {
    id: "TRK-2026-007",
    shipmentId: "SHP-2026-007",
    trackingNumber: "FDX456789123",
    customer: "Youssef Amrani",
    email: "youssef.amrani@email.com",
    carrier: "FedEx",
    service: "Standard",
    origin: "Abu Dhabi, UAE",
    destination: "Kuwait City, Kuwait",
    currentStatus: "Arrived at Facility",
    estimatedDelivery: "2026-11-21",
    lastUpdate: "2026-11-19T11:10:00",
    lastLocation: "Kuwait City Sorting Facility",
    progress: 75,
    weight: "4.2 kg",
    events: [
      { status: "Label Created", location: "Abu Dhabi, UAE", date: "2026-11-16T08:10:00", description: "Shipment registered", completed: true },
      { status: "Picked Up", location: "Abu Dhabi, UAE", date: "2026-11-16T15:30:00", description: "Shipment collected by FedEx", completed: true },
      { status: "In Transit", location: "UAE Transit Hub", date: "2026-11-17T10:45:00", description: "Shipment departed origin facility", completed: true },
      { status: "Arrived at Facility", location: "Kuwait City Sorting Facility", date: "2026-11-19T11:10:00", description: "Shipment arrived at destination facility", completed: true },
      { status: "Out for Delivery", location: "Kuwait City, Kuwait", date: null, description: "Awaiting next carrier update", completed: false },
    ],
  },
  {
    id: "TRK-2026-008",
    shipmentId: "SHP-2026-008",
    trackingNumber: "IML654321987",
    customer: "Fatima Zahra",
    email: "fatima.zahra@email.com",
    carrier: "iMile",
    service: "Express",
    origin: "Dubai, UAE",
    destination: "Doha, Qatar",
    currentStatus: "Delivery Attempted",
    estimatedDelivery: "2026-11-20",
    lastUpdate: "2026-11-19T12:05:00",
    lastLocation: "Doha, Qatar",
    progress: 90,
    weight: "1.7 kg",
    exception: "Recipient unavailable during delivery attempt",
    events: [
      { status: "Label Created", location: "Dubai, UAE", date: "2026-11-16T09:00:00", description: "Shipment information received", completed: true },
      { status: "Picked Up", location: "Dubai, UAE", date: "2026-11-16T13:30:00", description: "Shipment picked up by carrier", completed: true },
      { status: "In Transit", location: "Doha, Qatar", date: "2026-11-18T16:10:00", description: "Shipment arrived in destination country", completed: true },
      { status: "Out for Delivery", location: "Doha, Qatar", date: "2026-11-19T08:30:00", description: "Shipment assigned for delivery", completed: true },
      { status: "Delivery Attempted", location: "Doha, Qatar", date: "2026-11-19T12:05:00", description: "Recipient unavailable during delivery attempt", completed: true },
    ],
  },
];

const statusOptions = [
  "Label Created",
  "Pickup Scheduled",
  "Picked Up",
  "In Transit",
  "Arrived at Facility",
  "Out for Delivery",
  "Delivery Attempted",
  "Delivered",
  "Delayed",
  "Exception",
  "Returned",
];

const statusClass = (status) => {
  const classes = {
    "Label Created": "label-created",
    "Pickup Scheduled": "pickup-scheduled",
    "Picked Up": "picked-up",
    "In Transit": "in-transit",
    "Arrived at Facility": "arrived",
    "Out for Delivery": "out-delivery",
    "Delivery Attempted": "attempted",
    Delivered: "delivered",
    Delayed: "delayed",
    Exception: "exception",
    Returned: "returned",
  };
  return classes[status] || "default";
};

const formatDate = (value) => {
  if (!value) return "Pending";
  return new Date(value).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatDateTime = (value) => {
  if (!value) return "Awaiting carrier update";
  return new Date(value).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

function StatusBadge({ status }) {
  return (
    <span className={`tracking-status tracking-status-${statusClass(status)}`}>
      <span className="tracking-status-dot" />
      {status}
    </span>
  );
}

function TrackingDetailsModal({ shipment, onClose }) {
  if (!shipment) return null;

  return (
    <div className="tracking-modal-overlay" onMouseDown={onClose}>
      <div
        className="tracking-modal tracking-details-modal"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="tracking-modal-header">
          <div>
            <div className="tracking-modal-eyebrow">Shipment tracking details</div>
            <h2>{shipment.trackingNumber}</h2>
            <p>Shipment reference: {shipment.shipmentId}</p>
          </div>
          <button className="tracking-icon-btn" onClick={onClose} aria-label="Close">
            <X size={19} />
          </button>
        </div>

        <div className="tracking-detail-status">
          <div>
            <span className="tracking-detail-label">Current status</span>
            <StatusBadge status={shipment.currentStatus} />
          </div>
          <div className="tracking-detail-progress">
            <div className="tracking-progress-heading">
              <span>Shipment progress</span>
              <strong>{shipment.progress}%</strong>
            </div>
            <div className="tracking-progress-track">
              <div style={{ width: `${shipment.progress}%` }} />
            </div>
          </div>
        </div>

        {shipment.exception && (
          <div className="tracking-exception-banner">
            <AlertTriangle size={18} />
            <div>
              <strong>Carrier alert</strong>
              <p>{shipment.exception}</p>
            </div>
          </div>
        )}

        <div className="tracking-route-card">
          <div className="tracking-route-point">
            <span className="tracking-route-icon origin"><MapPin size={17} /></span>
            <div>
              <small>Origin</small>
              <strong>{shipment.origin}</strong>
            </div>
          </div>
          <div className="tracking-route-line"><ArrowRight size={17} /></div>
          <div className="tracking-route-point">
            <span className="tracking-route-icon destination"><MapPin size={17} /></span>
            <div>
              <small>Destination</small>
              <strong>{shipment.destination}</strong>
            </div>
          </div>
        </div>

        <div className="tracking-detail-grid">
          <div className="tracking-info-item">
            <span><UserRound size={15} /> Customer</span>
            <strong>{shipment.customer}</strong>
          </div>
          <div className="tracking-info-item">
            <span><Truck size={15} /> Carrier</span>
            <strong>{shipment.carrier}</strong>
          </div>
          <div className="tracking-info-item">
            <span><Box size={15} /> Service / Weight</span>
            <strong>{shipment.service} · {shipment.weight}</strong>
          </div>
          <div className="tracking-info-item">
            <span><CalendarDays size={15} /> Estimated delivery</span>
            <strong>{formatDate(shipment.estimatedDelivery)}</strong>
          </div>
          <div className="tracking-info-item">
            <span><MapPin size={15} /> Last known location</span>
            <strong>{shipment.lastLocation}</strong>
          </div>
          <div className="tracking-info-item">
            <span><Clock size={15} /> Last update</span>
            <strong>{formatDateTime(shipment.lastUpdate)}</strong>
          </div>
        </div>

        <div className="tracking-timeline-section">
          <div className="tracking-section-heading">
            <div>
              <h3>Tracking history</h3>
              <p>Events reported by {shipment.carrier}</p>
            </div>
            <span className="tracking-event-count">{shipment.events.length} events</span>
          </div>

          <div className="tracking-timeline">
            {shipment.events.map((event, index) => (
              <div
                className={`tracking-timeline-item ${event.completed ? "is-completed" : "is-pending"}`}
                key={`${event.status}-${index}`}
              >
                <div className="tracking-timeline-marker">
                  {event.completed ? <CheckCircle2 size={17} /> : <CircleDot size={17} />}
                </div>
                <div className="tracking-timeline-content">
                  <div className="tracking-timeline-top">
                    <strong>{event.status}</strong>
                    <time>{formatDateTime(event.date)}</time>
                  </div>
                  <p>{event.description}</p>
                  <span><MapPin size={13} /> {event.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="tracking-modal-footer">
          <span><Activity size={15} /> Tracking data is for demonstration purposes</span>
          <button className="tracking-btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default function TrackingMonitoring() {
  const [shipments, setShipments] = useState(initialShipments);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [carrierFilter, setCarrierFilter] = useState("All Carriers");
  const [serviceFilter, setServiceFilter] = useState("All Services");
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastSynced, setLastSynced] = useState(new Date());
  const itemsPerPage = 6;

  const stats = useMemo(() => ({
    total: shipments.length,
    inTransit: shipments.filter((item) =>
      ["In Transit", "Arrived at Facility", "Out for Delivery", "Picked Up"].includes(item.currentStatus)
    ).length,
    delivered: shipments.filter((item) => item.currentStatus === "Delivered").length,
    exceptions: shipments.filter((item) =>
      ["Delayed", "Exception", "Delivery Attempted"].includes(item.currentStatus)
    ).length,
  }), [shipments]);

  const filteredShipments = useMemo(() => {
    const query = search.toLowerCase().trim();

    return shipments.filter((item) => {
      const matchesSearch =
        !query ||
        item.trackingNumber.toLowerCase().includes(query) ||
        item.shipmentId.toLowerCase().includes(query) ||
        item.customer.toLowerCase().includes(query) ||
        item.destination.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All Statuses" || item.currentStatus === statusFilter;

      const matchesCarrier =
        carrierFilter === "All Carriers" || item.carrier === carrierFilter;

      const matchesService =
        serviceFilter === "All Services" || item.service === serviceFilter;

      return matchesSearch && matchesStatus && matchesCarrier && matchesService;
    });
  }, [shipments, search, statusFilter, carrierFilter, serviceFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredShipments.length / itemsPerPage));
  const paginatedShipments = filteredShipments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("All Statuses");
    setCarrierFilter("All Carriers");
    setServiceFilter("All Services");
    setCurrentPage(1);
  };

  const handleRefresh = () => {
    setLastSynced(new Date());
  };

  const hasActiveFilters =
    search || statusFilter !== "All Statuses" ||
    carrierFilter !== "All Carriers" ||
    serviceFilter !== "All Services";

  return (
    <div className="tracking-page">
      <div className="tracking-page-header">
        <div>
          <div className="tracking-breadcrumb">
            <span>Operations</span>
            <ChevronRight size={14} />
            <strong>Tracking & Monitoring</strong>
          </div>
          <h1>Tracking & Monitoring</h1>
          <p>Monitor shipment progress and carrier-reported tracking events in one place.</p>
        </div>

        <div className="tracking-header-actions">
          <div className="tracking-sync-info">
            <span className="tracking-sync-dot" />
            <span>Last updated: {lastSynced.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}</span>
          </div>
          <button className="tracking-btn-primary" onClick={handleRefresh}>
            <RefreshCw size={16} />
            Refresh data
          </button>
        </div>
      </div>

      <div className="tracking-stats-grid">
        <div className="tracking-stat-card">
          <div className="tracking-stat-top">
            <span className="tracking-stat-icon orange"><Package size={19} /></span>
            <span className="tracking-stat-caption">All tracked shipments</span>
          </div>
          <div className="tracking-stat-value">{stats.total}</div>
          <div className="tracking-stat-bottom">Shipments with tracking numbers</div>
        </div>

        <div className="tracking-stat-card">
          <div className="tracking-stat-top">
            <span className="tracking-stat-icon blue"><Truck size={19} /></span>
            <span className="tracking-stat-caption">In progress</span>
          </div>
          <div className="tracking-stat-value">{stats.inTransit}</div>
          <div className="tracking-stat-bottom">Currently moving through carrier networks</div>
        </div>

        <div className="tracking-stat-card">
          <div className="tracking-stat-top">
            <span className="tracking-stat-icon green"><CheckCircle2 size={19} /></span>
            <span className="tracking-stat-caption">Delivered</span>
          </div>
          <div className="tracking-stat-value">{stats.delivered}</div>
          <div className="tracking-stat-bottom">Successfully completed shipments</div>
        </div>

        <div className="tracking-stat-card">
          <div className="tracking-stat-top">
            <span className="tracking-stat-icon red"><AlertTriangle size={19} /></span>
            <span className="tracking-stat-caption">Needs attention</span>
          </div>
          <div className="tracking-stat-value">{stats.exceptions}</div>
          <div className="tracking-stat-bottom">Delays, exceptions or failed attempts</div>
        </div>
      </div>

      <div className="tracking-alert-summary">
        <div className="tracking-alert-icon"><AlertTriangle size={19} /></div>
        <div className="tracking-alert-copy">
          <strong>{stats.exceptions} shipments require attention</strong>
          <p>Review carrier-reported delays, delivery attempts and shipment exceptions.</p>
        </div>
        <button
          onClick={() => {
            setStatusFilter("All Statuses");
            setSearch("");
            setCarrierFilter("All Carriers");
            setServiceFilter("All Services");
            setCurrentPage(1);
            // Filter by exception-related statuses using the status selector below.
          }}
          className="tracking-alert-action"
        >
          View tracking list <ArrowRight size={15} />
        </button>
      </div>

      <div className="tracking-table-card">
        <div className="tracking-table-heading">
          <div>
            <div className="tracking-table-title-row">
              <h2>Shipment tracking</h2>
              <span className="tracking-count-pill">{filteredShipments.length} shipments</span>
            </div>
            <p>Search and monitor shipments using their carrier tracking information.</p>
          </div>
        </div>

        <div className="tracking-toolbar">
          <div className="tracking-search-box">
            <Search size={17} />
            <input
              type="text"
              placeholder="Search tracking number, customer, destination..."
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setCurrentPage(1);
              }}
            />
            {search && (
              <button onClick={() => setSearch("")} aria-label="Clear search">
                <X size={15} />
              </button>
            )}
          </div>

          <div className="tracking-filters">
            <div className="tracking-select-wrap">
              <Filter size={15} />
              <select value={statusFilter} onChange={(event) => { setStatusFilter(event.target.value); setCurrentPage(1); }}>
                <option>All Statuses</option>
                {statusOptions.map((status) => <option key={status}>{status}</option>)}
              </select>
            </div>
            <select
              className="tracking-filter-select"
              value={carrierFilter}
              onChange={(event) => { setCarrierFilter(event.target.value); setCurrentPage(1); }}
            >
              <option>All Carriers</option>
              <option>iMile</option>
              <option>Aramex</option>
              <option>DHL</option>
              <option>FedEx</option>
            </select>
            <select
              className="tracking-filter-select"
              value={serviceFilter}
              onChange={(event) => { setServiceFilter(event.target.value); setCurrentPage(1); }}
            >
              <option>All Services</option>
              <option>Express</option>
              <option>Standard</option>
            </select>
            {hasActiveFilters && (
              <button className="tracking-reset-btn" onClick={resetFilters}>
                <RotateCcw size={14} /> Reset
              </button>
            )}
          </div>
        </div>

        <div className="tracking-table-wrap">
          <table className="tracking-table">
            <thead>
              <tr>
                <th>TRACKING / SHIPMENT</th>
                <th>CUSTOMER</th>
                <th>ROUTE</th>
                <th>CARRIER</th>
                <th>CURRENT STATUS</th>
                <th>EST. DELIVERY</th>
                <th>LAST UPDATE</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {paginatedShipments.map((shipment) => (
                <tr key={shipment.id}>
                  <td>
                    <div className="tracking-id-cell">
                      <strong>{shipment.trackingNumber}</strong>
                      <span>{shipment.shipmentId}</span>
                    </div>
                  </td>
                  <td>
                    <div className="tracking-customer-cell">
                      <strong>{shipment.customer}</strong>
                      <span>{shipment.service} · {shipment.weight}</span>
                    </div>
                  </td>
                  <td>
                    <div className="tracking-route-cell">
                      <span>{shipment.origin}</span>
                      <ArrowRight size={13} />
                      <strong>{shipment.destination}</strong>
                    </div>
                  </td>
                  <td>
                    <span className={`tracking-carrier-name carrier-${shipment.carrier.toLowerCase()}`}>
                      {shipment.carrier}
                    </span>
                  </td>
                  <td>
                    <StatusBadge status={shipment.currentStatus} />
                    {shipment.exception && <span className="tracking-row-alert"><AlertTriangle size={12} /> Attention</span>}
                  </td>
                  <td>
                    <div className="tracking-date-cell">
                      <CalendarDays size={14} />
                      {formatDate(shipment.estimatedDelivery)}
                    </div>
                  </td>
                  <td>
                    <div className="tracking-last-update">
                      <strong>{formatDate(shipment.lastUpdate)}</strong>
                      <span>{new Date(shipment.lastUpdate).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}</span>
                    </div>
                  </td>
                  <td>
                    <button
                      className="tracking-view-btn"
                      onClick={() => setSelectedShipment(shipment)}
                      title="View tracking details"
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {paginatedShipments.length === 0 && (
                <tr>
                  <td colSpan="8">
                    <div className="tracking-empty-state">
                      <div><Search size={24} /></div>
                      <strong>No shipments found</strong>
                      <p>Try changing your search or filters.</p>
                      <button onClick={resetFilters}>Clear filters</button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="tracking-pagination">
          <span>
            Showing <strong>{filteredShipments.length ? (currentPage - 1) * itemsPerPage + 1 : 0}</strong> to{" "}
            <strong>{Math.min(currentPage * itemsPerPage, filteredShipments.length)}</strong> of{" "}
            <strong>{filteredShipments.length}</strong> shipments
          </span>
          <div className="tracking-pagination-actions">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              aria-label="Previous page"
            >
              <ChevronLeft size={17} />
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
              aria-label="Next page"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      </div>

      <div className="tracking-footnote">
        <Activity size={15} />
        <span>Tracking events shown here are sample carrier updates. Live synchronization will be connected during backend integration.</span>
      </div>

      <TrackingDetailsModal
        shipment={selectedShipment}
        onClose={() => setSelectedShipment(null)}
      />
    </div>
  );
}
