
import {
  Package, Clock, Truck, CheckCircle2,
  DollarSign, ArrowUpRight, ArrowDownRight,
  Plus, Download, MoreHorizontal, MapPin,
  CalendarDays, ArrowRight, Activity
} from "lucide-react";

const stats = [
  {
    title: "Total Shipments",
    value: "2,846",
    change: "+12.8%",
    positive: true,
    icon: Package,
    color: "orange",
    description: "Compared to last month",
  },
  {
    title: "Pending Requests",
    value: "124",
    change: "+8.2%",
    positive: true,
    icon: Clock,
    color: "blue",
    description: "Awaiting admin review",
  },
  {
    title: "In Transit",
    value: "386",
    change: "+5.4%",
    positive: true,
    icon: Truck,
    color: "purple",
    description: "Currently on the move",
  },
  {
    title: "Delivered",
    value: "2,102",
    change: "+15.6%",
    positive: true,
    icon: CheckCircle2,
    color: "green",
    description: "Successfully delivered",
  },
];

const shipments = [
  {
    id: "X10-2026-00128",
    customer: "Ahmed Mohammed",
    initials: "AM",
    route: "Dubai → Riyadh",
    carrier: "iMile",
    amount: "85.00 AED",
    status: "In Transit",
    date: "19 Nov 2026",
  },
  {
    id: "X10-2026-00127",
    customer: "Sarah Johnson",
    initials: "SJ",
    route: "Abu Dhabi → Doha",
    carrier: "Carrier B",
    amount: "120.00 AED",
    status: "Pending",
    date: "19 Nov 2026",
  },
  {
    id: "X10-2026-00126",
    customer: "Mohammed Ali",
    initials: "MA",
    route: "Sharjah → Muscat",
    carrier: "iMile",
    amount: "65.00 AED",
    status: "Delivered",
    date: "18 Nov 2026",
  },
  {
    id: "X10-2026-00125",
    customer: "Fatima Hassan",
    initials: "FH",
    route: "Dubai → Kuwait City",
    carrier: "Carrier C",
    amount: "145.00 AED",
    status: "Pickup Scheduled",
    date: "18 Nov 2026",
  },
  {
    id: "X10-2026-00124",
    customer: "Omar Abdullah",
    initials: "OA",
    route: "Dubai → Manama",
    carrier: "Carrier B",
    amount: "95.00 AED",
    status: "Delivered",
    date: "17 Nov 2026",
  },
];

const carrierPerformance = [
  { name: "iMile", shipments: 1248, percentage: 85, color: "orange" },
  { name: "Carrier B", shipments: 876, percentage: 65, color: "blue" },
  { name: "Carrier C", shipments: 722, percentage: 48, color: "purple" },
];

function StatCard({ item }) {
  const Icon = item.icon;
  const ChangeIcon = item.positive ? ArrowUpRight : ArrowDownRight;

  return (
    <div className="stat-card">
      <div className="stat-top">
        <div className={`stat-icon ${item.color}`}>
          <Icon size={21} />
        </div>
        <button className="more-btn"><MoreHorizontal size={20}/></button>
      </div>

      <p className="stat-title">{item.title}</p>
      <div className="stat-value-row">
        <h3>{item.value}</h3>
        <span className={`stat-change ${item.positive ? "positive" : "negative"}`}>
          <ChangeIcon size={14} />
          {item.change}
        </span>
      </div>
      <p className="stat-description">{item.description}</p>
    </div>
  );
}

function StatusBadge({ status }) {
  const statusClass = {
    "In Transit": "status-transit",
    "Pending": "status-pending",
    "Delivered": "status-delivered",
    "Pickup Scheduled": "status-pickup",
  };

  return (
    <span className={`status-badge ${statusClass[status] || ""}`}>
      <span />
      {status}
    </span>
  );
}

export default function Dashboard() {
  return (
    <div className="dashboard-page">

      <div className="dashboard-welcome">
        <div>
          <span className="eyebrow">OVERVIEW / NOVEMBER 2026</span>
          <h1>Good morning, Admin <span>👋</span></h1>
          <p>Here's what's happening with your shipping operations today.</p>
        </div>

        <div className="dashboard-actions">
          <button className="btn-secondary">
            <Download size={17} />
            Export Report
          </button>
          <button className="btn-primary">
            <Plus size={18} />
            New Shipment
          </button>
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((item) => (
          <StatCard key={item.title} item={item} />
        ))}
      </div>

      <div className="revenue-grid">
        <div className="revenue-card">
          <div className="section-heading">
            <div>
              <span className="eyebrow">FINANCIAL OVERVIEW</span>
              <h3>Revenue Overview</h3>
              <p>Track your business performance</p>
            </div>
            <select defaultValue="7">
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
            </select>
          </div>

          <div className="revenue-summary">
            <h2>248,650 <small>AED</small></h2>
            <span className="revenue-growth">
              <ArrowUpRight size={15}/> 18.6%
            </span>
          </div>

          <p className="stat-description">Total revenue this period</p>

          <div className="chart-container">
            <div className="chart-y-axis">
              <span>80k</span>
              <span>60k</span>
              <span>40k</span>
              <span>20k</span>
              <span>0</span>
            </div>

            <div className="chart-area">
              <div className="chart-grid-lines">
                {[1, 2, 3, 4, 5].map(n => <span key={n}/>)}
              </div>

              <svg
                viewBox="0 0 700 190"
                preserveAspectRatio="none"
                className="revenue-svg"
              >
                <defs>
                  <linearGradient id="revenueFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#F15A00" stopOpacity=".25"/>
                    <stop offset="100%" stopColor="#F15A00" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                <path
                  d="M0 150 C45 140 60 115 105 125 S175 150 210 100 S280 115 315 82 S390 105 420 68 S490 88 525 42 S610 70 650 25 L700 35 L700 190 L0 190 Z"
                  fill="url(#revenueFill)"
                />
                <path
                  d="M0 150 C45 140 60 115 105 125 S175 150 210 100 S280 115 315 82 S390 105 420 68 S490 88 525 42 S610 70 650 25 L700 35"
                  fill="none"
                  stroke="#F15A00"
                  strokeWidth="3"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              <div className="chart-x-axis">
                {["13 Nov", "14 Nov", "15 Nov", "16 Nov", "17 Nov", "18 Nov", "19 Nov"].map(d => (
                  <span key={d}>{d}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="carrier-card">
          <div className="section-heading">
            <div>
              <span className="eyebrow">PARTNERS</span>
              <h3>Carrier Performance</h3>
              <p>Shipments by carrier</p>
            </div>
            <button className="more-btn"><MoreHorizontal/></button>
          </div>

          <div className="carrier-total">
            <h2>2,846</h2>
            <span>Total shipments</span>
          </div>

          <div className="carrier-list">
            {carrierPerformance.map(carrier => (
              <div className="carrier-item" key={carrier.name}>
                <div className="carrier-info">
                  <strong>{carrier.name}</strong>
                  <span>{carrier.shipments.toLocaleString()} shipments</span>
                </div>
                <strong>{carrier.percentage}%</strong>
                <div className="carrier-progress">
                  <span
                    className={carrier.color}
                    style={{ width: `${carrier.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <button className="text-link">
            View carrier details <ArrowRight size={16}/>
          </button>
        </div>
      </div>

      <div className="shipments-card">
        <div className="section-heading">
          <div>
            <span className="eyebrow">LATEST OPERATIONS</span>
            <h3>Recent Shipments</h3>
            <p>Monitor your latest shipment activities</p>
          </div>
          <button className="btn-secondary">
            View all shipments <ArrowRight size={16}/>
          </button>
        </div>

        <div className="table-responsive">
          <table className="shipments-table">
            <thead>
              <tr>
                <th>SHIPMENT ID</th>
                <th>CUSTOMER</th>
                <th>ROUTE</th>
                <th>CARRIER</th>
                <th>AMOUNT</th>
                <th>STATUS</th>
                <th>DATE</th>
              </tr>
            </thead>
            <tbody>
              {shipments.map(shipment => (
                <tr key={shipment.id}>
                  <td><strong className="shipment-id">{shipment.id}</strong></td>
                  <td>
                    <div className="customer-cell">
                      <span className="customer-avatar">{shipment.initials}</span>
                      <strong>{shipment.customer}</strong>
                    </div>
                  </td>
                  <td>
                    <span className="route-cell">
                      <MapPin size={14}/>
                      {shipment.route}
                    </span>
                  </td>
                  <td><span className="carrier-name">{shipment.carrier}</span></td>
                  <td><strong>{shipment.amount}</strong></td>
                  <td><StatusBadge status={shipment.status}/></td>
                  <td className="date-cell">{shipment.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="table-bottom">
          <span>Showing 5 of 2,846 shipments</span>
          <button className="text-link">View all <ArrowRight size={15}/></button>
        </div>
      </div>

      <div className="dashboard-bottom-grid">
        <div className="quick-action-card">
          <div className="section-heading">
            <div>
              <h3>Quick Actions</h3>
              <p>Manage your operations faster</p>
            </div>
            <Activity size={20}/>
          </div>
          <div className="quick-actions">
            <button><Plus/> Create shipment</button>
            <button><Truck/> Assign carrier</button>
            <button><CalendarDays/> Schedule pickup</button>
            <button><Download/> Export data</button>
          </div>
        </div>

        <div className="operations-card">
          <div className="section-heading">
            <div>
              <h3>Operations Snapshot</h3>
              <p>Today's activity</p>
            </div>
          </div>
          <div className="operation-row">
            <span>New requests</span><strong>24</strong>
          </div>
          <div className="operation-row">
            <span>Pickups scheduled</span><strong>18</strong>
          </div>
          <div className="operation-row">
            <span>Out for delivery</span><strong>56</strong>
          </div>
          <div className="operation-row">
            <span>Delivery exceptions</span><strong className="exception-value">3</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
