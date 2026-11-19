
import { useMemo, useState } from "react";
import {
  Wallet,
  TrendingUp,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Search,
  Filter,
  RefreshCw,
  Download,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  CalendarDays,
  Building2,
  Package,
  CreditCard,
  Receipt,
  CircleDollarSign,
  Check,
  Banknote,
  FileText,
  MoreHorizontal,
  Percent,
  CalendarCheck,
  Info,
} from "lucide-react";
import "./CarrierPayments.css";

const INITIAL_PAYMENTS = [
  {
    id: "PAY-2026-001",
    shipment: "SHP-2026-001",
    carrier: "iMile",
    customer: "Ahmed Benali",
    origin: "Dubai, UAE",
    destination: "Riyadh, Saudi Arabia",
    service: "Express",
    shipmentAmount: 180,
    commissionType: "Fixed",
    commissionRate: 15,
    commissionAmount: 15,
    amountPaid: 15,
    currency: "MAD",
    invoiceDate: "2026-11-10",
    dueDate: "2026-11-17",
    paidDate: "2026-11-15",
    paymentMethod: "Bank Transfer",
    transactionRef: "IML-TRX-92841",
    status: "Paid",
    notes: "Commission received successfully.",
  },
  {
    id: "PAY-2026-002",
    shipment: "SHP-2026-002",
    carrier: "Aramex",
    customer: "Sara Khalid",
    origin: "Abu Dhabi, UAE",
    destination: "Doha, Qatar",
    service: "Standard",
    shipmentAmount: 250,
    commissionType: "Percentage",
    commissionRate: 8,
    commissionAmount: 20,
    amountPaid: 0,
    currency: "MAD",
    invoiceDate: "2026-11-12",
    dueDate: "2026-11-22",
    paidDate: null,
    paymentMethod: "Bank Transfer",
    transactionRef: "",
    status: "Pending",
    notes: "",
  },
  {
    id: "PAY-2026-003",
    shipment: "SHP-2026-003",
    carrier: "DHL",
    customer: "Omar Abdullah",
    origin: "Sharjah, UAE",
    destination: "Kuwait City, Kuwait",
    service: "Express",
    shipmentAmount: 320,
    commissionType: "Fixed",
    commissionRate: 25,
    commissionAmount: 25,
    amountPaid: 0,
    currency: "MAD",
    invoiceDate: "2026-11-02",
    dueDate: "2026-11-12",
    paidDate: null,
    paymentMethod: "Bank Transfer",
    transactionRef: "",
    status: "Overdue",
    notes: "Awaiting carrier settlement.",
  },
  {
    id: "PAY-2026-004",
    shipment: "SHP-2026-004",
    carrier: "iMile",
    customer: "Noura Ibrahim",
    origin: "Dubai, UAE",
    destination: "Manama, Bahrain",
    service: "Standard",
    shipmentAmount: 210,
    commissionType: "Fixed",
    commissionRate: 15,
    commissionAmount: 15,
    amountPaid: 10,
    currency: "MAD",
    invoiceDate: "2026-11-14",
    dueDate: "2026-11-24",
    paidDate: null,
    paymentMethod: "Bank Transfer",
    transactionRef: "IML-TRX-92915",
    status: "Partially Paid",
    notes: "Partial settlement received.",
  },
  {
    id: "PAY-2026-005",
    shipment: "SHP-2026-005",
    carrier: "Aramex",
    customer: "Khalid Mansour",
    origin: "Ajman, UAE",
    destination: "Muscat, Oman",
    service: "Express",
    shipmentAmount: 290,
    commissionType: "Percentage",
    commissionRate: 7,
    commissionAmount: 20.3,
    amountPaid: 20.3,
    currency: "MAD",
    invoiceDate: "2026-11-05",
    dueDate: "2026-11-15",
    paidDate: "2026-11-14",
    paymentMethod: "Bank Transfer",
    transactionRef: "ARM-TRX-19201",
    status: "Paid",
    notes: "Payment confirmed.",
  },
  {
    id: "PAY-2026-006",
    shipment: "SHP-2026-006",
    carrier: "FedEx",
    customer: "Mariam Saeed",
    origin: "Dubai, UAE",
    destination: "Riyadh, Saudi Arabia",
    service: "Express",
    shipmentAmount: 400,
    commissionType: "Fixed",
    commissionRate: 18,
    commissionAmount: 18,
    amountPaid: 0,
    currency: "MAD",
    invoiceDate: "2026-11-17",
    dueDate: "2026-11-27",
    paidDate: null,
    paymentMethod: "Bank Transfer",
    transactionRef: "",
    status: "Processing",
    notes: "Carrier settlement announced.",
  },
  {
    id: "PAY-2026-007",
    shipment: "SHP-2026-007",
    carrier: "DHL",
    customer: "Youssef Amrani",
    origin: "Casablanca, Morocco",
    destination: "Paris, France",
    service: "Standard",
    shipmentAmount: 350,
    commissionType: "Percentage",
    commissionRate: 6,
    commissionAmount: 21,
    amountPaid: 0,
    currency: "MAD",
    invoiceDate: "2026-11-16",
    dueDate: "2026-11-26",
    paidDate: null,
    paymentMethod: "Bank Transfer",
    transactionRef: "",
    status: "Pending",
    notes: "",
  },
  {
    id: "PAY-2026-008",
    shipment: "SHP-2026-008",
    carrier: "iMile",
    customer: "Fatima Zahra",
    origin: "Dubai, UAE",
    destination: "Doha, Qatar",
    service: "Express",
    shipmentAmount: 190,
    commissionType: "Fixed",
    commissionRate: 15,
    commissionAmount: 15,
    amountPaid: 0,
    currency: "MAD",
    invoiceDate: "2026-10-20",
    dueDate: "2026-10-30",
    paidDate: null,
    paymentMethod: "Bank Transfer",
    transactionRef: "",
    status: "Disputed",
    notes: "Commission amount under review.",
  },
];

const CARRIERS = ["All Carriers", "iMile", "Aramex", "DHL", "FedEx"];

const formatMoney = (value) =>
  `${Number(value || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} MAD`;

const formatDate = (date) => {
  if (!date) return "—";
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getRemaining = (payment) =>
  Math.max(0, payment.commissionAmount - payment.amountPaid);

const getStatusClass = (status) => {
  const classes = {
    Paid: "paid",
    Pending: "pending",
    Processing: "processing",
    "Partially Paid": "partial",
    Overdue: "overdue",
    Disputed: "disputed",
  };

  return classes[status] || "pending";
};

export default function CarrierPayments() {
  const [payments, setPayments] = useState(INITIAL_PAYMENTS);
  const [search, setSearch] = useState("");
  const [carrierFilter, setCarrierFilter] = useState("All Carriers");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [dateFilter, setDateFilter] = useState("All Dates");
  const [activeTab, setActiveTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [paymentModal, setPaymentModal] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Bank Transfer");
  const [transactionRef, setTransactionRef] = useState("");
  const [paymentDate, setPaymentDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [paymentNote, setPaymentNote] = useState("");
  const [toast, setToast] = useState("");

  const notify = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 3000);
  };

  const totals = useMemo(() => {
    const total = payments.reduce(
      (sum, payment) => sum + payment.commissionAmount,
      0
    );

    const received = payments.reduce(
      (sum, payment) => sum + payment.amountPaid,
      0
    );

    const pending = payments.reduce(
      (sum, payment) => sum + getRemaining(payment),
      0
    );

    const overdue = payments
      .filter((payment) => payment.status === "Overdue")
      .reduce((sum, payment) => sum + getRemaining(payment), 0);

    return {
      total,
      received,
      pending,
      overdue,
      count: payments.length,
    };
  }, [payments]);

  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      const query = search.toLowerCase();

      const matchesSearch =
        payment.id.toLowerCase().includes(query) ||
        payment.shipment.toLowerCase().includes(query) ||
        payment.carrier.toLowerCase().includes(query) ||
        payment.customer.toLowerCase().includes(query) ||
        (payment.transactionRef || "").toLowerCase().includes(query);

      const matchesCarrier =
        carrierFilter === "All Carriers" ||
        payment.carrier === carrierFilter;

      const matchesStatus =
        statusFilter === "All Statuses" ||
        payment.status === statusFilter;

      const matchesTab =
        activeTab === "All" ||
        (activeTab === "Received" && payment.status === "Paid") ||
        (activeTab === "Pending" &&
          ["Pending", "Processing", "Partially Paid"].includes(
            payment.status
          )) ||
        (activeTab === "Overdue" && payment.status === "Overdue");

      const paymentDateValue = new Date(
        `${payment.invoiceDate}T00:00:00`
      );
      const now = new Date();
      const matchesDate =
        dateFilter === "All Dates" ||
        (dateFilter === "This Month" &&
          paymentDateValue.getMonth() === now.getMonth() &&
          paymentDateValue.getFullYear() === now.getFullYear()) ||
        (dateFilter === "Last 30 Days" &&
          paymentDateValue >= new Date(now.getTime() - 30 * 86400000));

      return (
        matchesSearch &&
        matchesCarrier &&
        matchesStatus &&
        matchesTab &&
        matchesDate
      );
    });
  }, [payments, search, carrierFilter, statusFilter, dateFilter, activeTab]);

  const pageSize = 6;
  const totalPages = Math.max(1, Math.ceil(filteredPayments.length / pageSize));
  const paginatedPayments = filteredPayments.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const resetFilters = () => {
    setSearch("");
    setCarrierFilter("All Carriers");
    setStatusFilter("All Statuses");
    setDateFilter("All Dates");
    setActiveTab("All");
    setCurrentPage(1);
  };

  const openPaymentModal = (payment) => {
    setPaymentModal(payment);
    setPaymentAmount(getRemaining(payment).toFixed(2));
    setPaymentMethod("Bank Transfer");
    setTransactionRef("");
    setPaymentDate(new Date().toISOString().slice(0, 10));
    setPaymentNote("");
    setSelectedPayment(null);
  };

  const confirmPayment = (event) => {
    event.preventDefault();

    const amount = Number(paymentAmount);
    const remaining = getRemaining(paymentModal);

    if (!Number.isFinite(amount) || amount <= 0) {
      notify("Please enter a valid payment amount.");
      return;
    }

    if (amount > remaining + 0.001) {
      notify("Payment amount cannot exceed the remaining balance.");
      return;
    }

    if (!paymentDate) {
      notify("Please select the payment date.");
      return;
    }

    const newPaidAmount = paymentModal.amountPaid + amount;
    const isFullyPaid =
      newPaidAmount >= paymentModal.commissionAmount - 0.001;

    const updatedPayment = {
      ...paymentModal,
      amountPaid: Number(newPaidAmount.toFixed(2)),
      status: isFullyPaid ? "Paid" : "Partially Paid",
      paidDate: isFullyPaid ? paymentDate : paymentModal.paidDate,
      paymentMethod,
      transactionRef: transactionRef.trim(),
      notes: paymentNote.trim() || paymentModal.notes,
    };

    setPayments((previous) =>
      previous.map((payment) =>
        payment.id === paymentModal.id ? updatedPayment : payment
      )
    );

    setPaymentModal(null);
    notify(
      isFullyPaid
        ? "Payment received and confirmed."
        : "Partial payment recorded successfully."
    );
  };

  const exportCSV = () => {
    const headers = [
      "Payment Reference",
      "Shipment",
      "Carrier",
      "Customer",
      "Commission Amount",
      "Amount Paid",
      "Remaining",
      "Due Date",
      "Status",
      "Transaction Reference",
    ];

    const rows = filteredPayments.map((payment) => [
      payment.id,
      payment.shipment,
      payment.carrier,
      payment.customer,
      payment.commissionAmount,
      payment.amountPaid,
      getRemaining(payment),
      payment.dueDate,
      payment.status,
      payment.transactionRef,
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
    link.download = "x10-carrier-payments.csv";
    link.click();
    URL.revokeObjectURL(url);
    notify("Payment report exported.");
  };

  const closeDetails = () => setSelectedPayment(null);

  return (
    <div className="payments-page">
      <div className="payments-breadcrumb">
        <span>Finance</span>
        <span>/</span>
        <strong>Carrier Payments</strong>
      </div>

      <div className="payments-page-header">
        <div>
          <h1>Carrier Payments</h1>
          <p>
            Monitor commissions and payments received from delivery partners.
          </p>
        </div>

        <div className="payments-header-actions">
          <button
            className="payments-btn payments-btn-secondary"
            onClick={exportCSV}
          >
            <Download size={16} />
            Export Report
          </button>
          <button
            className="payments-btn payments-btn-secondary"
            onClick={resetFilters}
          >
            <RefreshCw size={16} />
            Reset Filters
          </button>
        </div>
      </div>

      <div className="payments-info-banner">
        <Info size={17} />
        <span>
          X10 receives commissions from delivery carriers. This module tracks
          carrier settlements only, not customer payments.
        </span>
      </div>

      <div className="payments-stats-grid">
        <div className="payments-stat-card">
          <div className="payments-stat-top">
            <span>Total Commissions</span>
            <div className="payments-stat-icon orange">
              <CircleDollarSign size={20} />
            </div>
          </div>
          <h2>{formatMoney(totals.total)}</h2>
          <div className="payments-stat-foot">
            <span className="payments-stat-neutral">
              <Receipt size={13} /> {totals.count} commission records
            </span>
          </div>
        </div>

        <div className="payments-stat-card">
          <div className="payments-stat-top">
            <span>Received Payments</span>
            <div className="payments-stat-icon green">
              <Wallet size={20} />
            </div>
          </div>
          <h2>{formatMoney(totals.received)}</h2>
          <div className="payments-stat-foot">
            <span className="payments-stat-positive">
              <ArrowUpRight size={14} /> Confirmed receipts
            </span>
          </div>
        </div>

        <div className="payments-stat-card">
          <div className="payments-stat-top">
            <span>Pending Balance</span>
            <div className="payments-stat-icon blue">
              <Clock size={20} />
            </div>
          </div>
          <h2>{formatMoney(totals.pending)}</h2>
          <div className="payments-stat-foot">
            <span className="payments-stat-neutral">
              <CalendarDays size={13} /> Awaiting settlement
            </span>
          </div>
        </div>

        <div className="payments-stat-card">
          <div className="payments-stat-top">
            <span>Overdue Balance</span>
            <div className="payments-stat-icon red">
              <AlertTriangle size={20} />
            </div>
          </div>
          <h2>{formatMoney(totals.overdue)}</h2>
          <div className="payments-stat-foot">
            <span className="payments-stat-danger">
              <AlertTriangle size={13} /> Requires follow-up
            </span>
          </div>
        </div>
      </div>

      <div className="payments-secondary-grid">
        <div className="payments-secondary-card">
          <div className="payments-secondary-icon">
            <TrendingUp size={18} />
          </div>
          <div>
            <span>Collection Rate</span>
            <strong>
              {totals.total
                ? `${((totals.received / totals.total) * 100).toFixed(1)}%`
                : "0%"}
            </strong>
          </div>
        </div>

        <div className="payments-secondary-card">
          <div className="payments-secondary-icon">
            <CalendarCheck size={18} />
          </div>
          <div>
            <span>Fully Settled</span>
            <strong>
              {payments.filter((payment) => payment.status === "Paid").length}
            </strong>
          </div>
        </div>

        <div className="payments-secondary-card">
          <div className="payments-secondary-icon">
            <Building2 size={18} />
          </div>
          <div>
            <span>Active Carriers</span>
            <strong>{new Set(payments.map((p) => p.carrier)).size}</strong>
          </div>
        </div>

        <div className="payments-secondary-card">
          <div className="payments-secondary-icon">
            <Receipt size={18} />
          </div>
          <div>
            <span>Payment Records</span>
            <strong>{payments.length}</strong>
          </div>
        </div>
      </div>

      <div className="payments-table-card">
        <div className="payments-table-header">
          <div>
            <h3>Carrier Commission Records</h3>
            <p>Track amounts earned and settlements from delivery partners.</p>
          </div>
          <span className="payments-count">
            {filteredPayments.length} records
          </span>
        </div>

        <div className="payments-tabs">
          {["All", "Received", "Pending", "Overdue"].map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? "active" : ""}
              onClick={() => {
                setActiveTab(tab);
                setCurrentPage(1);
              }}
            >
              {tab}
              {tab === "All" && (
                <span>{payments.length}</span>
              )}
              {tab === "Received" && (
                <span>
                  {payments.filter((p) => p.status === "Paid").length}
                </span>
              )}
              {tab === "Pending" && (
                <span>
                  {
                    payments.filter((p) =>
                      ["Pending", "Processing", "Partially Paid"].includes(
                        p.status
                      )
                    ).length
                  }
                </span>
              )}
              {tab === "Overdue" && (
                <span>
                  {payments.filter((p) => p.status === "Overdue").length}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="payments-toolbar">
          <div className="payments-search">
            <Search size={17} />
            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search payment, shipment, carrier..."
            />
          </div>

          <div className="payments-filters">
            <div className="payments-select-wrap">
              <Filter size={15} />
              <select
                value={carrierFilter}
                onChange={(event) => {
                  setCarrierFilter(event.target.value);
                  setCurrentPage(1);
                }}
              >
                {CARRIERS.map((carrier) => (
                  <option key={carrier} value={carrier}>
                    {carrier}
                  </option>
                ))}
              </select>
            </div>

            <select
              value={statusFilter}
              onChange={(event) => {
                setStatusFilter(event.target.value);
                setCurrentPage(1);
              }}
            >
              <option>All Statuses</option>
              <option>Paid</option>
              <option>Pending</option>
              <option>Processing</option>
              <option>Partially Paid</option>
              <option>Overdue</option>
              <option>Disputed</option>
            </select>

            <select
              value={dateFilter}
              onChange={(event) => {
                setDateFilter(event.target.value);
                setCurrentPage(1);
              }}
            >
              <option>All Dates</option>
              <option>This Month</option>
              <option>Last 30 Days</option>
            </select>
          </div>
        </div>

        <div className="payments-table-scroll">
          <table className="payments-table">
            <thead>
              <tr>
                <th>PAYMENT / SHIPMENT</th>
                <th>CARRIER</th>
                <th>COMMISSION</th>
                <th>RECEIVED</th>
                <th>REMAINING</th>
                <th>DUE DATE</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {paginatedPayments.map((payment) => (
                <tr key={payment.id}>
                  <td>
                    <div className="payments-reference">
                      <strong>{payment.id}</strong>
                      <span>{payment.shipment}</span>
                    </div>
                  </td>

                  <td>
                    <div className="payments-carrier">
                      <div className="payments-carrier-avatar">
                        {payment.carrier.charAt(0)}
                      </div>
                      <div>
                        <strong>{payment.carrier}</strong>
                        <span>{payment.service}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <strong className="payments-amount">
                      {formatMoney(payment.commissionAmount)}
                    </strong>
                    <span className="payments-subtext">
                      {payment.commissionType === "Fixed"
                        ? "Fixed commission"
                        : `${payment.commissionRate}% commission`}
                    </span>
                  </td>

                  <td>
                    <strong className="payments-amount">
                      {formatMoney(payment.amountPaid)}
                    </strong>
                  </td>

                  <td>
                    <strong
                      className={
                        getRemaining(payment) > 0
                          ? "payments-remaining"
                          : "payments-complete"
                      }
                    >
                      {formatMoney(getRemaining(payment))}
                    </strong>
                  </td>

                  <td>
                    <span className="payments-date">
                      {formatDate(payment.dueDate)}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`payments-status ${getStatusClass(
                        payment.status
                      )}`}
                    >
                      <i />
                      {payment.status}
                    </span>
                  </td>

                  <td>
                    <div className="payments-row-actions">
                      <button
                        title="View details"
                        onClick={() => setSelectedPayment(payment)}
                      >
                        <Eye size={16} />
                      </button>
                      {payment.status !== "Paid" &&
                        payment.status !== "Disputed" && (
                          <button
                            className="payments-action-receive"
                            title="Record payment"
                            onClick={() => openPaymentModal(payment)}
                          >
                            <Wallet size={16} />
                          </button>
                        )}
                    </div>
                  </td>
                </tr>
              ))}

              {paginatedPayments.length === 0 && (
                <tr>
                  <td colSpan="8">
                    <div className="payments-empty">
                      <Receipt size={34} />
                      <strong>No payment records found</strong>
                      <span>
                        Try changing your search or filter criteria.
                      </span>
                      <button onClick={resetFilters}>Clear filters</button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="payments-pagination">
          <span>
            Showing{" "}
            {filteredPayments.length
              ? (currentPage - 1) * pageSize + 1
              : 0}
            {" - "}
            {Math.min(currentPage * pageSize, filteredPayments.length)} of{" "}
            {filteredPayments.length} records
          </span>

          <div>
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => page - 1)}
            >
              <ChevronLeft size={17} />
            </button>
            <span>
              {currentPage} / {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((page) => page + 1)}
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      </div>

      {/* Payment details modal */}
      {selectedPayment && (
        <div
          className="payments-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeDetails();
          }}
        >
          <div className="payments-modal payments-details-modal">
            <div className="payments-modal-header">
              <div>
                <span className="payments-modal-eyebrow">PAYMENT DETAILS</span>
                <h2>{selectedPayment.id}</h2>
                <p>Commission settlement information</p>
              </div>
              <button onClick={closeDetails}>
                <X size={19} />
              </button>
            </div>

            <div className="payments-detail-amount">
              <span>Total commission</span>
              <strong>{formatMoney(selectedPayment.commissionAmount)}</strong>
              <span
                className={`payments-status ${getStatusClass(
                  selectedPayment.status
                )}`}
              >
                <i />
                {selectedPayment.status}
              </span>
            </div>

            <div className="payments-detail-grid">
              <div>
                <span>Shipment reference</span>
                <strong>{selectedPayment.shipment}</strong>
              </div>
              <div>
                <span>Carrier</span>
                <strong>{selectedPayment.carrier}</strong>
              </div>
              <div>
                <span>Customer</span>
                <strong>{selectedPayment.customer}</strong>
              </div>
              <div>
                <span>Service</span>
                <strong>{selectedPayment.service}</strong>
              </div>
              <div>
                <span>Origin</span>
                <strong>{selectedPayment.origin}</strong>
              </div>
              <div>
                <span>Destination</span>
                <strong>{selectedPayment.destination}</strong>
              </div>
              <div>
                <span>Invoice date</span>
                <strong>{formatDate(selectedPayment.invoiceDate)}</strong>
              </div>
              <div>
                <span>Due date</span>
                <strong>{formatDate(selectedPayment.dueDate)}</strong>
              </div>
              <div>
                <span>Commission model</span>
                <strong>
                  {selectedPayment.commissionType === "Fixed"
                    ? `Fixed: ${formatMoney(selectedPayment.commissionRate)}`
                    : `${selectedPayment.commissionRate}%`}
                </strong>
              </div>
              <div>
                <span>Amount received</span>
                <strong className="payments-complete">
                  {formatMoney(selectedPayment.amountPaid)}
                </strong>
              </div>
              <div>
                <span>Outstanding balance</span>
                <strong className="payments-remaining">
                  {formatMoney(getRemaining(selectedPayment))}
                </strong>
              </div>
              <div>
                <span>Payment method</span>
                <strong>{selectedPayment.paymentMethod || "—"}</strong>
              </div>
              <div>
                <span>Transaction reference</span>
                <strong>{selectedPayment.transactionRef || "—"}</strong>
              </div>
              <div>
                <span>Last payment date</span>
                <strong>{formatDate(selectedPayment.paidDate)}</strong>
              </div>
            </div>

            {selectedPayment.notes && (
              <div className="payments-detail-note">
                <span>Notes</span>
                <p>{selectedPayment.notes}</p>
              </div>
            )}

            <div className="payments-modal-footer">
              <button
                className="payments-btn payments-btn-secondary"
                onClick={closeDetails}
              >
                Close
              </button>
              {selectedPayment.status !== "Paid" &&
                selectedPayment.status !== "Disputed" && (
                  <button
                    className="payments-btn payments-btn-primary"
                    onClick={() => openPaymentModal(selectedPayment)}
                  >
                    <Wallet size={16} />
                    Record Payment
                  </button>
                )}
            </div>
          </div>
        </div>
      )}

      {/* Record payment modal */}
      {paymentModal && (
        <div
          className="payments-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setPaymentModal(null);
          }}
        >
          <div className="payments-modal payments-record-modal">
            <div className="payments-modal-header">
              <div>
                <span className="payments-modal-eyebrow">
                  CARRIER SETTLEMENT
                </span>
                <h2>Record Received Payment</h2>
                <p>
                  Record a payment received from {paymentModal.carrier}.
                </p>
              </div>
              <button onClick={() => setPaymentModal(null)}>
                <X size={19} />
              </button>
            </div>

            <form onSubmit={confirmPayment}>
              <div className="payments-record-summary">
                <div>
                  <span>Payment reference</span>
                  <strong>{paymentModal.id}</strong>
                </div>
                <div>
                  <span>Shipment</span>
                  <strong>{paymentModal.shipment}</strong>
                </div>
                <div>
                  <span>Total commission</span>
                  <strong>
                    {formatMoney(paymentModal.commissionAmount)}
                  </strong>
                </div>
                <div>
                  <span>Already received</span>
                  <strong>{formatMoney(paymentModal.amountPaid)}</strong>
                </div>
                <div className="outstanding">
                  <span>Remaining balance</span>
                  <strong>{formatMoney(getRemaining(paymentModal))}</strong>
                </div>
              </div>

              <div className="payments-form-group">
                <label>Received Amount (MAD) *</label>
                <input
                  type="number"
                  min="0.01"
                  max={getRemaining(paymentModal)}
                  step="0.01"
                  required
                  value={paymentAmount}
                  onChange={(event) => setPaymentAmount(event.target.value)}
                  placeholder="Enter amount received"
                />
                <small>
                  Maximum receivable amount:{" "}
                  {formatMoney(getRemaining(paymentModal))}
                </small>
              </div>

              <div className="payments-form-row">
                <div className="payments-form-group">
                  <label>Payment Method *</label>
                  <select
                    value={paymentMethod}
                    onChange={(event) => setPaymentMethod(event.target.value)}
                    required
                  >
                    <option>Bank Transfer</option>
                    <option>Cash</option>
                    <option>Cheque</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="payments-form-group">
                  <label>Payment Date *</label>
                  <input
                    type="date"
                    value={paymentDate}
                    onChange={(event) => setPaymentDate(event.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="payments-form-group">
                <label>Transaction Reference</label>
                <input
                  value={transactionRef}
                  onChange={(event) => setTransactionRef(event.target.value)}
                  placeholder="e.g. TRX-92841"
                />
              </div>

              <div className="payments-form-group">
                <label>Notes</label>
                <textarea
                  rows="3"
                  value={paymentNote}
                  onChange={(event) => setPaymentNote(event.target.value)}
                  placeholder="Add payment details or remarks..."
                />
              </div>

              <div className="payments-form-warning">
                <Info size={16} />
                <span>
                  Only confirm this record after verifying that the funds have
                  actually been received by X10.
                </span>
              </div>

              <div className="payments-modal-footer">
                <button
                  type="button"
                  className="payments-btn payments-btn-secondary"
                  onClick={() => setPaymentModal(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="payments-btn payments-btn-primary"
                >
                  <Check size={16} />
                  Confirm Receipt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {toast && (
        <div className="payments-toast">
          <CheckCircle2 size={18} />
          {toast}
        </div>
      )}
    </div>
  );
}
