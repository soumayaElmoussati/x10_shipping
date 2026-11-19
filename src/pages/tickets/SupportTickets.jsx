
import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  RefreshCw,
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertTriangle,
  X,
  ChevronRight,
  ChevronLeft,
  Eye,
  Send,
  UserRound,
  Package,
  Filter,
  RotateCcw,
  Paperclip,
  MessageCircle,
  Headphones,
  CircleDot,
  CalendarDays,
  Tag,
  ArrowUpRight,
  StickyNote,
  ShieldCheck,
} from "lucide-react";
import "./SupportTickets.css";

const agents = [
  "Unassigned",
  "Sarah Ahmed",
  "Mohammed Ali",
  "Fatima Zahra",
  "Youssef Karim",
];

const categories = [
  "Shipment Issue",
  "Tracking",
  "Pickup",
  "Delivery",
  "Billing",
  "Carrier Issue",
  "Account",
  "General Inquiry",
];

const initialTickets = [
  {
    id: "TKT-2026-001",
    subject: "Shipment has not moved for 48 hours",
    customer: "Ahmed Benali",
    email: "ahmed.benali@email.com",
    category: "Tracking",
    priority: "High",
    status: "Open",
    assignedTo: "Sarah Ahmed",
    shipmentId: "SHP-2026-001",
    trackingNumber: "IML987654321",
    carrier: "iMile",
    createdAt: "2026-11-19T08:30:00",
    updatedAt: "2026-11-19T10:15:00",
    description:
      "My shipment has been showing the same tracking status for more than 48 hours. Could you please check with the carrier and provide an update?",
    messages: [
      {
        id: 1,
        sender: "Ahmed Benali",
        role: "Customer",
        date: "2026-11-19T08:30:00",
        text: "Hello, my shipment has not moved for more than 48 hours. The tracking page still shows the same location. Can you please check?",
        internal: false,
      },
      {
        id: 2,
        sender: "Sarah Ahmed",
        role: "Support Agent",
        date: "2026-11-19T09:10:00",
        text: "Hello Ahmed, thank you for contacting us. We are checking the latest information with the carrier and will update you as soon as we receive a response.",
        internal: false,
      },
      {
        id: 3,
        sender: "Sarah Ahmed",
        role: "Internal Note",
        date: "2026-11-19T10:15:00",
        text: "Carrier follow-up required. Waiting for iMile tracking confirmation.",
        internal: true,
      },
    ],
  },
  {
    id: "TKT-2026-002",
    subject: "Request for delivery address correction",
    customer: "Sara Khalid",
    email: "sara.khalid@email.com",
    category: "Delivery",
    priority: "Urgent",
    status: "Waiting for Carrier",
    assignedTo: "Mohammed Ali",
    shipmentId: "SHP-2026-002",
    trackingNumber: "ARAMX45678912",
    carrier: "Aramex",
    createdAt: "2026-11-19T07:45:00",
    updatedAt: "2026-11-19T11:20:00",
    description:
      "The delivery address needs to be corrected before the parcel is delivered.",
    messages: [
      {
        id: 1,
        sender: "Sara Khalid",
        role: "Customer",
        date: "2026-11-19T07:45:00",
        text: "I entered the wrong building number. Please update the delivery address before the parcel is delivered.",
        internal: false,
      },
      {
        id: 2,
        sender: "Mohammed Ali",
        role: "Support Agent",
        date: "2026-11-19T09:00:00",
        text: "We have forwarded your correction request to Aramex. We are waiting for confirmation from the carrier.",
        internal: false,
      },
      {
        id: 3,
        sender: "Mohammed Ali",
        role: "Internal Note",
        date: "2026-11-19T11:20:00",
        text: "Urgent: confirm address change with Aramex before final delivery attempt.",
        internal: true,
      },
    ],
  },
  {
    id: "TKT-2026-003",
    subject: "Invoice amount does not match quotation",
    customer: "Omar Abdullah",
    email: "omar.abdullah@email.com",
    category: "Billing",
    priority: "Medium",
    status: "In Progress",
    assignedTo: "Fatima Zahra",
    shipmentId: "SHP-2026-003",
    trackingNumber: "DHL1234567890",
    carrier: "DHL",
    createdAt: "2026-11-18T14:20:00",
    updatedAt: "2026-11-19T09:45:00",
    description:
      "The amount on my invoice is different from the price displayed when I created the shipment request.",
    messages: [
      {
        id: 1,
        sender: "Omar Abdullah",
        role: "Customer",
        date: "2026-11-18T14:20:00",
        text: "I received my invoice, but the amount is higher than the quotation. Please explain the difference.",
        internal: false,
      },
      {
        id: 2,
        sender: "Fatima Zahra",
        role: "Support Agent",
        date: "2026-11-19T09:45:00",
        text: "We are reviewing the quotation and invoice details. We will get back to you shortly.",
        internal: false,
      },
    ],
  },
  {
    id: "TKT-2026-004",
    subject: "Pickup was not completed as scheduled",
    customer: "Noura Ibrahim",
    email: "noura.ibrahim@email.com",
    category: "Pickup",
    priority: "High",
    status: "Waiting for Carrier",
    assignedTo: "Youssef Karim",
    shipmentId: "SHP-2026-004",
    trackingNumber: "IML456123789",
    carrier: "iMile",
    createdAt: "2026-11-18T11:10:00",
    updatedAt: "2026-11-19T08:30:00",
    description:
      "The carrier did not complete the scheduled pickup. I would like to know when it will be rescheduled.",
    messages: [
      {
        id: 1,
        sender: "Noura Ibrahim",
        role: "Customer",
        date: "2026-11-18T11:10:00",
        text: "The pickup was scheduled for today, but nobody came to collect my parcel.",
        internal: false,
      },
      {
        id: 2,
        sender: "Youssef Karim",
        role: "Internal Note",
        date: "2026-11-19T08:30:00",
        text: "Follow-up sent to iMile. Waiting for a new pickup schedule.",
        internal: true,
      },
    ],
  },
  {
    id: "TKT-2026-005",
    subject: "Shipment successfully delivered",
    customer: "Khalid Mansour",
    email: "khalid.mansour@email.com",
    category: "General Inquiry",
    priority: "Low",
    status: "Resolved",
    assignedTo: "Sarah Ahmed",
    shipmentId: "SHP-2026-005",
    trackingNumber: "ARAMX78945612",
    carrier: "Aramex",
    createdAt: "2026-11-17T10:00:00",
    updatedAt: "2026-11-18T15:30:00",
    description: "Customer requested confirmation of successful delivery.",
    messages: [
      {
        id: 1,
        sender: "Khalid Mansour",
        role: "Customer",
        date: "2026-11-17T10:00:00",
        text: "Could you confirm whether my shipment has been delivered?",
        internal: false,
      },
      {
        id: 2,
        sender: "Sarah Ahmed",
        role: "Support Agent",
        date: "2026-11-18T15:30:00",
        text: "We confirm that the carrier has reported this shipment as successfully delivered.",
        internal: false,
      },
    ],
  },
  {
    id: "TKT-2026-006",
    subject: "Unable to access customer account",
    customer: "Mariam Saeed",
    email: "mariam.saeed@email.com",
    category: "Account",
    priority: "Medium",
    status: "Closed",
    assignedTo: "Mohammed Ali",
    shipmentId: "—",
    trackingNumber: "—",
    carrier: "—",
    createdAt: "2026-11-16T09:15:00",
    updatedAt: "2026-11-17T12:00:00",
    description: "Customer reported an issue signing in to the platform.",
    messages: [
      {
        id: 1,
        sender: "Mariam Saeed",
        role: "Customer",
        date: "2026-11-16T09:15:00",
        text: "I cannot access my account after resetting my password.",
        internal: false,
      },
      {
        id: 2,
        sender: "Mohammed Ali",
        role: "Support Agent",
        date: "2026-11-17T12:00:00",
        text: "The account access issue has been resolved. Please try signing in again.",
        internal: false,
      },
    ],
  },
  {
    id: "TKT-2026-007",
    subject: "Delivery attempt failed",
    customer: "Fatima Zahra",
    email: "fatima.zahra@email.com",
    category: "Delivery",
    priority: "High",
    status: "Open",
    assignedTo: "Unassigned",
    shipmentId: "SHP-2026-008",
    trackingNumber: "IML654321987",
    carrier: "iMile",
    createdAt: "2026-11-19T12:30:00",
    updatedAt: "2026-11-19T12:30:00",
    description:
      "The tracking page shows a failed delivery attempt. The customer wants to arrange another attempt.",
    messages: [
      {
        id: 1,
        sender: "Fatima Zahra",
        role: "Customer",
        date: "2026-11-19T12:30:00",
        text: "I saw that the delivery attempt failed. I was available at the address. Please help me arrange another attempt.",
        internal: false,
      },
    ],
  },
];

const ticketStatuses = [
  "Open",
  "In Progress",
  "Waiting for Customer",
  "Waiting for Carrier",
  "Resolved",
  "Closed",
];

const statusClass = (status) => {
  const map = {
    Open: "open",
    "In Progress": "progress",
    "Waiting for Customer": "waiting-customer",
    "Waiting for Carrier": "waiting-carrier",
    Resolved: "resolved",
    Closed: "closed",
  };
  return map[status] || "open";
};

const priorityClass = (priority) => priority.toLowerCase();

const formatDate = (value) => {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatDateTime = (value) => {
  if (!value) return "—";
  return new Date(value).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getInitials = (name = "") =>
  name.split(" ").map((part) => part[0]).slice(0, 2).join("").toUpperCase();

function StatusBadge({ status }) {
  return (
    <span className={`support-status support-status-${statusClass(status)}`}>
      <span className="support-status-dot" />
      {status}
    </span>
  );
}

function PriorityBadge({ priority }) {
  return (
    <span className={`support-priority support-priority-${priorityClass(priority)}`}>
      <span className="support-priority-dot" />
      {priority}
    </span>
  );
}

function CreateTicketModal({ onClose, onCreate }) {
  const [form, setForm] = useState({
    subject: "",
    customer: "",
    email: "",
    category: "Shipment Issue",
    priority: "Medium",
    assignedTo: "Unassigned",
    shipmentId: "",
    trackingNumber: "",
    carrier: "",
    description: "",
  });

  const update = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.subject.trim() || !form.customer.trim() || !form.email.trim() || !form.description.trim()) return;
    onCreate(form);
  };

  return (
    <div className="support-modal-overlay" onMouseDown={onClose}>
      <div className="support-modal support-create-modal" onMouseDown={(event) => event.stopPropagation()}>
        <div className="support-modal-header">
          <div>
            <span className="support-modal-eyebrow">Support center</span>
            <h2>Create new ticket</h2>
            <p>Register a customer request or shipment-related issue.</p>
          </div>
          <button className="support-icon-btn" onClick={onClose} aria-label="Close">
            <X size={19} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="support-form-grid">
            <label className="support-form-field support-form-full">
              <span>Ticket subject <b>*</b></span>
              <input
                value={form.subject}
                onChange={(event) => update("subject", event.target.value)}
                placeholder="Enter a short description of the issue"
                required
              />
            </label>

            <label className="support-form-field">
              <span>Customer name <b>*</b></span>
              <input
                value={form.customer}
                onChange={(event) => update("customer", event.target.value)}
                placeholder="Customer full name"
                required
              />
            </label>

            <label className="support-form-field">
              <span>Email address <b>*</b></span>
              <input
                type="email"
                value={form.email}
                onChange={(event) => update("email", event.target.value)}
                placeholder="customer@email.com"
                required
              />
            </label>

            <label className="support-form-field">
              <span>Category</span>
              <select value={form.category} onChange={(event) => update("category", event.target.value)}>
                {categories.map((category) => <option key={category}>{category}</option>)}
              </select>
            </label>

            <label className="support-form-field">
              <span>Priority</span>
              <select value={form.priority} onChange={(event) => update("priority", event.target.value)}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Urgent</option>
              </select>
            </label>

            <label className="support-form-field">
              <span>Assign to</span>
              <select value={form.assignedTo} onChange={(event) => update("assignedTo", event.target.value)}>
                {agents.map((agent) => <option key={agent}>{agent}</option>)}
              </select>
            </label>

            <label className="support-form-field">
              <span>Shipment reference</span>
              <input
                value={form.shipmentId}
                onChange={(event) => update("shipmentId", event.target.value)}
                placeholder="SHP-2026-001 (optional)"
              />
            </label>

            <label className="support-form-field">
              <span>Tracking number</span>
              <input
                value={form.trackingNumber}
                onChange={(event) => update("trackingNumber", event.target.value)}
                placeholder="Carrier tracking number"
              />
            </label>

            <label className="support-form-field">
              <span>Carrier</span>
              <select value={form.carrier} onChange={(event) => update("carrier", event.target.value)}>
                <option value="">Select carrier</option>
                <option>iMile</option>
                <option>Aramex</option>
                <option>DHL</option>
                <option>FedEx</option>
              </select>
            </label>

            <label className="support-form-field support-form-full">
              <span>Description <b>*</b></span>
              <textarea
                rows="4"
                value={form.description}
                onChange={(event) => update("description", event.target.value)}
                placeholder="Describe the request or issue..."
                required
              />
            </label>
          </div>

          <div className="support-modal-footer">
            <button type="button" className="support-btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="support-btn-primary">
              <Plus size={16} /> Create ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function TicketDetailsModal({ ticket, onClose, onUpdate }) {
  const [reply, setReply] = useState("");
  const [internalNote, setInternalNote] = useState(false);
  const [status, setStatus] = useState(ticket.status);
  const [priority, setPriority] = useState(ticket.priority);
  const [assignedTo, setAssignedTo] = useState(ticket.assignedTo);

  const addMessage = () => {
    if (!reply.trim()) return;

    onUpdate(ticket.id, {
      status,
      priority,
      assignedTo,
      message: {
        id: Date.now(),
        sender: "Current Agent",
        role: internalNote ? "Internal Note" : "Support Agent",
        date: new Date().toISOString(),
        text: reply.trim(),
        internal: internalNote,
      },
    });

    setReply("");
    setInternalNote(false);
  };

  const saveTicketChanges = () => {
    onUpdate(ticket.id, { status, priority, assignedTo });
  };

  return (
    <div className="support-modal-overlay" onMouseDown={onClose}>
      <div className="support-modal support-detail-modal" onMouseDown={(event) => event.stopPropagation()}>
        <div className="support-modal-header">
          <div>
            <span className="support-modal-eyebrow">{ticket.id}</span>
            <h2>{ticket.subject}</h2>
            <p>Created on {formatDateTime(ticket.createdAt)}</p>
          </div>
          <button className="support-icon-btn" onClick={onClose} aria-label="Close">
            <X size={19} />
          </button>
        </div>

        <div className="support-detail-body">
          <div className="support-conversation-column">
            <div className="support-conversation-heading">
              <div>
                <h3><MessageCircle size={16} /> Conversation</h3>
                <p>Customer messages and internal activity</p>
              </div>
              <span>{ticket.messages.length} messages</span>
            </div>

            <div className="support-conversation">
              <div className="support-ticket-description">
                <span>Initial request</span>
                <p>{ticket.description}</p>
              </div>

              {ticket.messages.map((message) => (
                <div className={`support-message ${message.internal ? "support-message-internal" : ""}`} key={message.id}>
                  <div className="support-message-avatar">
                    {message.internal ? <StickyNote size={15} /> : getInitials(message.sender)}
                  </div>
                  <div className="support-message-content">
                    <div className="support-message-meta">
                      <strong>{message.sender}</strong>
                      <span>{message.internal ? "Internal note" : message.role}</span>
                      <time>{formatDateTime(message.date)}</time>
                    </div>
                    <p>{message.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="support-reply-box">
              <div className="support-reply-toolbar">
                <button
                  type="button"
                  className={internalNote ? "active" : ""}
                  onClick={() => setInternalNote((value) => !value)}
                >
                  <StickyNote size={14} />
                  {internalNote ? "Internal note enabled" : "Add internal note"}
                </button>
                <span>{internalNote ? "Visible to support agents only" : "Reply to customer"}</span>
              </div>
              <textarea
                value={reply}
                onChange={(event) => setReply(event.target.value)}
                placeholder={internalNote ? "Write an internal note..." : "Write your reply to the customer..."}
                rows="3"
              />
              <div className="support-reply-footer">
                <span><ShieldCheck size={14} /> {internalNote ? "Private internal message" : "Customer-visible response"}</span>
                <button className="support-btn-primary" onClick={addMessage} disabled={!reply.trim()}>
                  <Send size={14} /> Send
                </button>
              </div>
            </div>
          </div>

          <aside className="support-ticket-sidebar">
            <div className="support-sidebar-section">
              <h3>Ticket properties</h3>

              <label className="support-property-field">
                <span>Status</span>
                <select value={status} onChange={(event) => setStatus(event.target.value)}>
                  {ticketStatuses.map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>

              <label className="support-property-field">
                <span>Priority</span>
                <select value={priority} onChange={(event) => setPriority(event.target.value)}>
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Urgent</option>
                </select>
              </label>

              <label className="support-property-field">
                <span>Assigned agent</span>
                <select value={assignedTo} onChange={(event) => setAssignedTo(event.target.value)}>
                  {agents.map((agent) => <option key={agent}>{agent}</option>)}
                </select>
              </label>

              <button className="support-save-properties" onClick={saveTicketChanges}>
                Save changes
              </button>
            </div>

            <div className="support-sidebar-section">
              <h3>Customer information</h3>
              <div className="support-customer-profile">
                <div className="support-customer-avatar">{getInitials(ticket.customer)}</div>
                <div>
                  <strong>{ticket.customer}</strong>
                  <span>{ticket.email}</span>
                </div>
              </div>
            </div>

            <div className="support-sidebar-section">
              <h3>Related shipment</h3>
              {ticket.shipmentId !== "—" && ticket.shipmentId ? (
                <div className="support-related-shipment">
                  <div><Package size={16} /><strong>{ticket.shipmentId}</strong></div>
                  <span>Tracking: {ticket.trackingNumber || "—"}</span>
                  <span>Carrier: {ticket.carrier || "—"}</span>
                </div>
              ) : (
                <p className="support-no-shipment">No shipment linked to this ticket.</p>
              )}
            </div>

            <div className="support-sidebar-section support-sidebar-meta">
              <div><span>Category</span><strong>{ticket.category}</strong></div>
              <div><span>Last updated</span><strong>{formatDate(ticket.updatedAt)}</strong></div>
            </div>
          </aside>
        </div>

        <div className="support-modal-footer">
          <span><Clock size={14} /> Last updated {formatDateTime(ticket.updatedAt)}</span>
          <button className="support-btn-secondary" onClick={onClose}>Close ticket view</button>
        </div>
      </div>
    </div>
  );
}

export default function SupportTickets() {
  const [tickets, setTickets] = useState(initialTickets);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [priorityFilter, setPriorityFilter] = useState("All Priorities");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [assigneeFilter, setAssigneeFilter] = useState("All Agents");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const itemsPerPage = 6;

  const stats = useMemo(() => ({
    total: tickets.length,
    open: tickets.filter((ticket) => ["Open", "In Progress"].includes(ticket.status)).length,
    waiting: tickets.filter((ticket) => ["Waiting for Customer", "Waiting for Carrier"].includes(ticket.status)).length,
    urgent: tickets.filter((ticket) => ticket.priority === "Urgent" && !["Resolved", "Closed"].includes(ticket.status)).length,
    resolved: tickets.filter((ticket) => ["Resolved", "Closed"].includes(ticket.status)).length,
  }), [tickets]);

  const filteredTickets = useMemo(() => {
    const query = search.toLowerCase().trim();

    return tickets.filter((ticket) => {
      const matchesSearch =
        !query ||
        ticket.id.toLowerCase().includes(query) ||
        ticket.subject.toLowerCase().includes(query) ||
        ticket.customer.toLowerCase().includes(query) ||
        (ticket.trackingNumber || "").toLowerCase().includes(query) ||
        (ticket.shipmentId || "").toLowerCase().includes(query);

      return (
        matchesSearch &&
        (statusFilter === "All Statuses" || ticket.status === statusFilter) &&
        (priorityFilter === "All Priorities" || ticket.priority === priorityFilter) &&
        (categoryFilter === "All Categories" || ticket.category === categoryFilter) &&
        (assigneeFilter === "All Agents" || ticket.assignedTo === assigneeFilter)
      );
    });
  }, [tickets, search, statusFilter, priorityFilter, categoryFilter, assigneeFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredTickets.length / itemsPerPage));
  const paginatedTickets = filteredTickets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("All Statuses");
    setPriorityFilter("All Priorities");
    setCategoryFilter("All Categories");
    setAssigneeFilter("All Agents");
    setCurrentPage(1);
  };

  const handleCreateTicket = (form) => {
    const now = new Date().toISOString();
    const newTicket = {
      ...form,
      id: `TKT-2026-${String(tickets.length + 1).padStart(3, "0")}`,
      status: "Open",
      createdAt: now,
      updatedAt: now,
      shipmentId: form.shipmentId || "—",
      trackingNumber: form.trackingNumber || "—",
      carrier: form.carrier || "—",
      messages: [
        {
          id: Date.now(),
          sender: form.customer,
          role: "Customer",
          date: now,
          text: form.description,
          internal: false,
        },
      ],
    };

    setTickets((current) => [newTicket, ...current]);
    setShowCreateModal(false);
    setCurrentPage(1);
    resetFilters();
  };

  const handleUpdateTicket = (ticketId, changes) => {
    setTickets((current) =>
      current.map((ticket) => {
        if (ticket.id !== ticketId) return ticket;
        return {
          ...ticket,
          status: changes.status ?? ticket.status,
          priority: changes.priority ?? ticket.priority,
          assignedTo: changes.assignedTo ?? ticket.assignedTo,
          updatedAt: new Date().toISOString(),
          messages: changes.message
            ? [...ticket.messages, changes.message]
            : ticket.messages,
        };
      })
    );

    setSelectedTicket((current) => {
      if (!current || current.id !== ticketId) return current;
      return {
        ...current,
        status: changes.status ?? current.status,
        priority: changes.priority ?? current.priority,
        assignedTo: changes.assignedTo ?? current.assignedTo,
        updatedAt: new Date().toISOString(),
        messages: changes.message
          ? [...current.messages, changes.message]
          : current.messages,
      };
    });
  };

  const hasActiveFilters =
    search ||
    statusFilter !== "All Statuses" ||
    priorityFilter !== "All Priorities" ||
    categoryFilter !== "All Categories" ||
    assigneeFilter !== "All Agents";

  return (
    <div className="support-page">
      <div className="support-page-header">
        <div>
          <div className="support-breadcrumb">
            <span>Management</span>
            <ChevronRight size={14} />
            <strong>Support & Ticketing</strong>
          </div>
          <h1>Support & Ticketing</h1>
          <p>Manage customer inquiries, shipment issues and carrier-related support requests.</p>
        </div>

        <div className="support-header-actions">
          <div className="support-updated-info">
            <span className="support-live-dot" />
            Updated {lastUpdated.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
          </div>
          <button className="support-btn-secondary" onClick={() => setLastUpdated(new Date())}>
            <RefreshCw size={15} /> Refresh
          </button>
          <button className="support-btn-primary" onClick={() => setShowCreateModal(true)}>
            <Plus size={16} /> Create ticket
          </button>
        </div>
      </div>

      <div className="support-stats-grid">
        <div className="support-stat-card">
          <div className="support-stat-top">
            <span className="support-stat-icon orange"><MessageSquare size={19} /></span>
            <span className="support-stat-label">Total tickets</span>
          </div>
          <strong className="support-stat-value">{stats.total}</strong>
          <span className="support-stat-caption">All registered support requests</span>
        </div>

        <div className="support-stat-card">
          <div className="support-stat-top">
            <span className="support-stat-icon blue"><Headphones size={19} /></span>
            <span className="support-stat-label">Active tickets</span>
          </div>
          <strong className="support-stat-value">{stats.open}</strong>
          <span className="support-stat-caption">Open and in progress</span>
        </div>

        <div className="support-stat-card">
          <div className="support-stat-top">
            <span className="support-stat-icon amber"><Clock size={19} /></span>
            <span className="support-stat-label">Waiting response</span>
          </div>
          <strong className="support-stat-value">{stats.waiting}</strong>
          <span className="support-stat-caption">Waiting for customer or carrier</span>
        </div>

        <div className="support-stat-card">
          <div className="support-stat-top">
            <span className="support-stat-icon red"><AlertTriangle size={19} /></span>
            <span className="support-stat-label">Urgent tickets</span>
          </div>
          <strong className="support-stat-value">{stats.urgent}</strong>
          <span className="support-stat-caption">Urgent tickets not yet resolved</span>
        </div>
      </div>

      <div className="support-secondary-stats">
        <div>
          <span className="support-secondary-icon green"><CheckCircle2 size={17} /></span>
          <span><strong>{stats.resolved}</strong> Resolved / closed tickets</span>
        </div>
        <div>
          <span className="support-secondary-icon orange"><UserRound size={17} /></span>
          <span><strong>{agents.length - 1}</strong> Support agents</span>
        </div>
        <div>
          <span className="support-secondary-icon blue"><ShieldCheck size={17} /></span>
          <span>Internal notes are private to support staff</span>
        </div>
      </div>

      <div className="support-table-card">
        <div className="support-table-heading">
          <div>
            <div className="support-table-title-row">
              <h2>All support tickets</h2>
              <span className="support-count-pill">{filteredTickets.length} tickets</span>
            </div>
            <p>Review, assign and respond to customer and carrier support requests.</p>
          </div>
        </div>

        <div className="support-toolbar">
          <div className="support-search-box">
            <Search size={17} />
            <input
              placeholder="Search ticket ID, subject, customer, tracking..."
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setCurrentPage(1);
              }}
            />
            {search && <button onClick={() => setSearch("")}><X size={14} /></button>}
          </div>

          <div className="support-filters">
            <div className="support-filter-select-wrap">
              <Filter size={14} />
              <select value={statusFilter} onChange={(event) => { setStatusFilter(event.target.value); setCurrentPage(1); }}>
                <option>All Statuses</option>
                {ticketStatuses.map((status) => <option key={status}>{status}</option>)}
              </select>
            </div>

            <select className="support-filter-select" value={priorityFilter} onChange={(event) => { setPriorityFilter(event.target.value); setCurrentPage(1); }}>
              <option>All Priorities</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Urgent</option>
            </select>

            <select className="support-filter-select" value={categoryFilter} onChange={(event) => { setCategoryFilter(event.target.value); setCurrentPage(1); }}>
              <option>All Categories</option>
              {categories.map((category) => <option key={category}>{category}</option>)}
            </select>

            <select className="support-filter-select" value={assigneeFilter} onChange={(event) => { setAssigneeFilter(event.target.value); setCurrentPage(1); }}>
              <option>All Agents</option>
              {agents.map((agent) => <option key={agent}>{agent}</option>)}
            </select>

            {hasActiveFilters && (
              <button className="support-reset-btn" onClick={resetFilters}>
                <RotateCcw size={14} /> Reset
              </button>
            )}
          </div>
        </div>

        <div className="support-table-wrap">
          <table className="support-table">
            <thead>
              <tr>
                <th>TICKET</th>
                <th>CUSTOMER</th>
                <th>CATEGORY</th>
                <th>PRIORITY</th>
                <th>STATUS</th>
                <th>ASSIGNED TO</th>
                <th>LAST UPDATE</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {paginatedTickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td>
                    <div className="support-ticket-id-cell">
                      <strong>{ticket.id}</strong>
                      <span>{ticket.subject}</span>
                      {ticket.shipmentId !== "—" && <small>{ticket.shipmentId}</small>}
                    </div>
                  </td>
                  <td>
                    <div className="support-customer-cell">
                      <strong>{ticket.customer}</strong>
                      <span>{ticket.email}</span>
                    </div>
                  </td>
                  <td><span className="support-category-label"><Tag size={13} /> {ticket.category}</span></td>
                  <td><PriorityBadge priority={ticket.priority} /></td>
                  <td><StatusBadge status={ticket.status} /></td>
                  <td>
                    <div className="support-assignee-cell">
                      <span className="support-assignee-avatar">{ticket.assignedTo === "Unassigned" ? "—" : getInitials(ticket.assignedTo)}</span>
                      <span>{ticket.assignedTo}</span>
                    </div>
                  </td>
                  <td>
                    <div className="support-date-cell">
                      <strong>{formatDate(ticket.updatedAt)}</strong>
                      <span>{new Date(ticket.updatedAt).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}</span>
                    </div>
                  </td>
                  <td>
                    <button className="support-view-btn" onClick={() => setSelectedTicket(ticket)} title="View ticket">
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}

              {paginatedTickets.length === 0 && (
                <tr>
                  <td colSpan="8">
                    <div className="support-empty-state">
                      <div><MessageSquare size={24} /></div>
                      <strong>No tickets found</strong>
                      <p>Try changing your search or filters.</p>
                      <button onClick={resetFilters}>Clear filters</button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="support-pagination">
          <span>
            Showing <strong>{filteredTickets.length ? (currentPage - 1) * itemsPerPage + 1 : 0}</strong> to{" "}
            <strong>{Math.min(currentPage * itemsPerPage, filteredTickets.length)}</strong> of{" "}
            <strong>{filteredTickets.length}</strong> tickets
          </span>
          <div className="support-pagination-actions">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}>
              <ChevronLeft size={17} />
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button disabled={currentPage >= totalPages} onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}>
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      </div>

      <div className="support-footnote">
        <ShieldCheck size={15} />
        <span>Support conversations and ticket updates are currently stored in local demo data. Backend messaging and notifications will be connected later.</span>
      </div>

      {showCreateModal && (
        <CreateTicketModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateTicket}
        />
      )}

      {selectedTicket && (
        <TicketDetailsModal
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
          onUpdate={handleUpdateTicket}
        />
      )}
    </div>
  );
}
