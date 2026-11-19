
import { useMemo, useState } from "react";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Package,
  Truck,
  Wallet,
  CircleDollarSign,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Download,
  CalendarDays,
  ArrowUpRight,
  ArrowDownRight,
  Globe2,
  Activity,
  Target,
  RefreshCw,
  FileText,
  ChevronDown,
  Layers,
  Percent,
  Info,
} from "lucide-react";
import "./ReportsAnalytics.css";

const PERIOD_DATA = {
  "Last 30 days": {
    labels: ["Oct 21", "Oct 26", "Oct 31", "Nov 05", "Nov 10", "Nov 15", "Nov 19"],
    shipments: [32, 45, 38, 57, 49, 68, 76],
    delivered: [25, 36, 31, 46, 40, 57, 64],
    revenue: [420, 580, 510, 730, 650, 890, 1020],
    previousShipments: 285,
    previousRevenue: 3850,
  },
  "Last 90 days": {
    labels: ["Sep 01", "Sep 15", "Oct 01", "Oct 15", "Nov 01", "Nov 10", "Nov 19"],
    shipments: [105, 128, 115, 142, 156, 174, 190],
    delivered: [84, 105, 94, 117, 130, 147, 162],
    revenue: [1420, 1680, 1550, 1920, 2110, 2350, 2580],
    previousShipments: 720,
    previousRevenue: 10900,
  },
  "This Year": {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
    shipments: [120, 145, 168, 155, 190, 215, 238, 260, 245, 285, 320],
    delivered: [96, 118, 139, 128, 158, 181, 203, 221, 209, 245, 278],
    revenue: [1650, 1920, 2250, 2100, 2580, 2910, 3240, 3510, 3320, 3860, 4320],
    previousShipments: 1950,
    previousRevenue: 25600,
  },
};

const CARRIER_DATA = [
  {
    name: "iMile",
    shipments: 428,
    delivered: 394,
    failed: 12,
    delayed: 22,
    rate: 92.1,
    commission: 6420,
    color: "#F15A00",
  },
  {
    name: "Aramex",
    shipments: 356,
    delivered: 320,
    failed: 14,
    delayed: 22,
    rate: 89.9,
    commission: 7120,
    color: "#E5A13A",
  },
  {
    name: "DHL",
    shipments: 291,
    delivered: 270,
    failed: 8,
    delayed: 13,
    rate: 92.8,
    commission: 7275,
    color: "#3E8B69",
  },
  {
    name: "FedEx",
    shipments: 214,
    delivered: 192,
    failed: 9,
    delayed: 13,
    rate: 89.7,
    commission: 3852,
    color: "#6385B8",
  },
];

const DESTINATIONS = [
  { city: "Riyadh, Saudi Arabia", shipments: 286, percentage: 24 },
  { city: "Doha, Qatar", shipments: 218, percentage: 18 },
  { city: "Dubai, UAE", shipments: 194, percentage: 16 },
  { city: "Kuwait City, Kuwait", shipments: 153, percentage: 13 },
  { city: "Muscat, Oman", shipments: 128, percentage: 11 },
];

const STATUS_DATA = [
  { label: "Delivered", value: 78, color: "#15945B", count: 1002 },
  { label: "In Transit", value: 12, color: "#4385C5", count: 154 },
  { label: "Pending", value: 6, color: "#E4A13A", count: 77 },
  { label: "Exceptions", value: 4, color: "#D94B4B", count: 51 },
];

const formatNumber = (value) =>
  Number(value || 0).toLocaleString("en-US");

const formatMoney = (value) =>
  `${Number(value || 0).toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })} MAD`;

function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  trendLabel,
  type = "orange",
  suffix,
}) {
  return (
    <div className="reports-stat-card">
      <div className="reports-stat-heading">
        <span>{label}</span>
        <div className={`reports-stat-icon ${type}`}>
          <Icon size={19} />
        </div>
      </div>

      <div className="reports-stat-value">
        {value}
        {suffix && <small>{suffix}</small>}
      </div>

      <div className="reports-stat-footer">
        <span className={trend >= 0 ? "reports-trend-up" : "reports-trend-down"}>
          {trend >= 0 ? (
            <ArrowUpRight size={14} />
          ) : (
            <ArrowDownRight size={14} />
          )}
          {Math.abs(trend)}%
        </span>
        <span>{trendLabel || "vs previous period"}</span>
      </div>
    </div>
  );
}

function BarChartA({ labels, firstValues, secondValues, firstLabel, secondLabel }) {
  const maxValue = Math.max(...firstValues, ...secondValues, 1);

  return (
    <div className="reports-chart">
      <div className="reports-chart-legend">
        <span>
          <i className="legend-orange" />
          {firstLabel}
        </span>
        {secondValues && (
          <span>
            <i className="legend-light" />
            {secondLabel}
          </span>
        )}
      </div>

      <div className="reports-bar-chart">
        <div className="reports-chart-y-axis">
          {[100, 75, 50, 25, 0].map((value) => (
            <span key={value}>{Math.round((maxValue * value) / 100)}</span>
          ))}
        </div>

        <div className="reports-chart-content">
          <div className="reports-chart-grid">
            {[0, 1, 2, 3].map((item) => (
              <i key={item} />
            ))}
          </div>

          <div className="reports-bars">
            {labels.map((label, index) => (
              <div className="reports-bar-group" key={`${label}-${index}`}>
                <div className="reports-bar-pair">
                  <div
                    className="reports-bar reports-bar-primary"
                    style={{
                      height: `${(firstValues[index] / maxValue) * 100}%`,
                    }}
                    title={`${firstLabel}: ${firstValues[index]}`}
                  />
                  {secondValues && (
                    <div
                      className="reports-bar reports-bar-secondary"
                      style={{
                        height: `${(secondValues[index] / maxValue) * 100}%`,
                      }}
                      title={`${secondLabel}: ${secondValues[index]}`}
                    />
                  )}
                </div>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const BarChart = ({ data = [], height = 220 }) => {
  const safeData = Array.isArray(data) ? data : [];

  const maxValue = Math.max(
    1,
    ...safeData.map((item) =>
      Math.max(
        Number(item?.current) || 0,
        Number(item?.previous) || 0
      )
    )
  );

  return (
    <div className="reports-bar-chart" style={{ height }}>
      {safeData.length === 0 ? (
        <div className="reports-empty-chart">
          No data available
        </div>
      ) : (
        safeData.map((item, index) => (
          <div className="reports-bar-group" key={item?.label || index}>
            <div className="reports-bar-pair">
              <div
                className="reports-bar reports-bar-current"
                style={{
                  height: `${((Number(item?.current) || 0) / maxValue) * 100}%`,
                }}
                title={`Current: ${item?.current ?? 0}`}
              />
              <div
                className="reports-bar reports-bar-previous"
                style={{
                  height: `${((Number(item?.previous) || 0) / maxValue) * 100}%`,
                }}
                title={`Previous: ${item?.previous ?? 0}`}
              />
            </div>

            <span className="reports-bar-label">
              {item?.label ?? ""}
            </span>
          </div>
        ))
      )}
    </div>
  );
};

function HorizontalBar({ label, value, max, color, detail }) {
  return (
    <div className="reports-horizontal-bar">
      <div className="reports-horizontal-top">
        <span>{label}</span>
        <strong>{detail || formatNumber(value)}</strong>
      </div>
      <div className="reports-horizontal-track">
        <div
          className="reports-horizontal-fill"
          style={{
            width: `${Math.min(100, (value / max) * 100)}%`,
            background: color || "#F15A00",
          }}
        />
      </div>
    </div>
  );
}

export default function ReportsAnalytics() {
  const [period, setPeriod] = useState("Last 30 days");
  const [activeTab, setActiveTab] = useState("Overview");
  const [exportType, setExportType] = useState("Summary");

  const selectedData = PERIOD_DATA[period];

  const totals = useMemo(() => {
    const shipments = selectedData.shipments.reduce((sum, value) => sum + value, 0);
    const delivered = selectedData.delivered.reduce((sum, value) => sum + value, 0);
    const revenue = selectedData.revenue.reduce((sum, value) => sum + value, 0);

    const previousShipments = selectedData.previousShipments;
    const previousRevenue = selectedData.previousRevenue;

    const shipmentTrend = previousShipments
      ? Math.round(((shipments - previousShipments) / previousShipments) * 100)
      : 0;

    const revenueTrend = previousRevenue
      ? Math.round(((revenue - previousRevenue) / previousRevenue) * 100)
      : 0;

    return {
      shipments,
      delivered,
      revenue,
      shipmentTrend,
      revenueTrend,
      deliveryRate: shipments
        ? ((delivered / shipments) * 100).toFixed(1)
        : "0.0",
    };
  }, [selectedData]);

  const totalCarrierShipments = CARRIER_DATA.reduce(
    (sum, carrier) => sum + carrier.shipments,
    0
  );

  const totalCarrierCommissions = CARRIER_DATA.reduce(
    (sum, carrier) => sum + carrier.commission,
    0
  );

  const totalDelivered = CARRIER_DATA.reduce(
    (sum, carrier) => sum + carrier.delivered,
    0
  );

  const averageCarrierRate =
    totalCarrierShipments > 0
      ? (
          (totalDelivered / totalCarrierShipments) *
          100
        ).toFixed(1)
      : "0.0";

  const exportReport = () => {
    let headers = [];
    let rows = [];

    if (exportType === "Carrier Performance") {
      headers = [
        "Carrier",
        "Shipments",
        "Delivered",
        "Failed",
        "Delayed",
        "Delivery Rate",
        "Commission MAD",
      ];

      rows = CARRIER_DATA.map((carrier) => [
        carrier.name,
        carrier.shipments,
        carrier.delivered,
        carrier.failed,
        carrier.delayed,
        `${carrier.rate}%`,
        carrier.commission,
      ]);
    } else if (exportType === "Destinations") {
      headers = ["Destination", "Shipments", "Share"];
      rows = DESTINATIONS.map((destination) => [
        destination.city,
        destination.shipments,
        `${destination.percentage}%`,
      ]);
    } else {
      headers = [
        "Period",
        "Metric",
        "Value",
      ];

      rows = [
        [period, "Shipments", totals.shipments],
        [period, "Delivered", totals.delivered],
        [period, "Delivery Rate", `${totals.deliveryRate}%`],
        [period, "Commission Revenue", totals.revenue],
        [period, "Carrier Commission Total", totalCarrierCommissions],
      ];
    }

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
    link.download = `x10-${exportType.toLowerCase().replaceAll(" ", "-")}-report.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const tabs = [
    "Overview",
    "Shipment Analytics",
    "Carrier Performance",
    "Financial Reports",
  ];

  const renderOverview = () => (
    <>
      <div className="reports-stats-grid">
        <StatCard
          label="Total Shipments"
          value={formatNumber(totals.shipments)}
          icon={Package}
          trend={totals.shipmentTrend}
          type="orange"
        />
        <StatCard
          label="Delivered Shipments"
          value={formatNumber(totals.delivered)}
          icon={CheckCircle2}
          trend={8.4}
          type="green"
        />
        <StatCard
          label="Delivery Success Rate"
          value={totals.deliveryRate}
          suffix="%"
          icon={Target}
          trend={2.6}
          type="blue"
        />
        <StatCard
          label="Commission Revenue"
          value={formatMoney(totals.revenue)}
          icon={Wallet}
          trend={totals.revenueTrend}
          type="purple"
        />
      </div>

      <div className="reports-main-grid">
        <div className="reports-panel reports-performance-panel">
          <div className="reports-panel-header">
            <div>
              <h3>Shipment Performance</h3>
              <p>Shipment volume compared with successful deliveries</p>
            </div>
            <span className="reports-panel-tag">
              <Activity size={13} /> Activity
            </span>
          </div>

          <BarChart
            labels={selectedData.labels}
            firstValues={selectedData.shipments}
            secondValues={selectedData.delivered}
            firstLabel="Shipments"
            secondLabel="Delivered"
          />
        </div>

        <div className="reports-panel reports-status-panel">
          <div className="reports-panel-header">
            <div>
              <h3>Shipment Status</h3>
              <p>Overall shipment distribution</p>
            </div>
          </div>

          <div className="reports-donut-layout">
            <div
              className="reports-donut"
              style={{
                background: `conic-gradient(
                  #15945B 0% 78%,
                  #4385C5 78% 90%,
                  #E4A13A 90% 96%,
                  #D94B4B 96% 100%
                )`,
              }}
            >
              <div>
                <strong>1,284</strong>
                <span>Shipments</span>
              </div>
            </div>

            <div className="reports-status-legend">
              {STATUS_DATA.map((status) => (
                <div key={status.label}>
                  <span>
                    <i style={{ background: status.color }} />
                    {status.label}
                  </span>
                  <strong>{status.value}%</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="reports-bottom-grid">
        <div className="reports-panel">
          <div className="reports-panel-header">
            <div>
              <h3>Top Delivery Carriers</h3>
              <p>Based on completed shipment volume</p>
            </div>
            <button
              className="reports-text-button"
              onClick={() => setActiveTab("Carrier Performance")}
            >
              View details
            </button>
          </div>

          <div className="reports-carrier-list">
            {CARRIER_DATA.map((carrier) => (
              <div className="reports-carrier-row" key={carrier.name}>
                <div className="reports-carrier-avatar">
                  {carrier.name.charAt(0)}
                </div>
                <div className="reports-carrier-info">
                  <div>
                    <strong>{carrier.name}</strong>
                    <span>{formatNumber(carrier.shipments)} shipments</span>
                  </div>
                  <div className="reports-carrier-progress">
                    <i
                      style={{
                        width: `${(carrier.delivered / carrier.shipments) * 100}%`,
                        background: carrier.color,
                      }}
                    />
                  </div>
                </div>
                <strong className="reports-carrier-rate">
                  {carrier.rate}%
                </strong>
              </div>
            ))}
          </div>
        </div>

        <div className="reports-panel">
          <div className="reports-panel-header">
            <div>
              <h3>Top Destinations</h3>
              <p>Most active shipping destinations</p>
            </div>
            <Globe2 size={18} className="reports-header-icon" />
          </div>

          <div className="reports-destination-list">
            {DESTINATIONS.map((destination, index) => (
              <div className="reports-destination-row" key={destination.city}>
                <div className="reports-destination-rank">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="reports-destination-content">
                  <div>
                    <strong>{destination.city}</strong>
                    <span>{destination.shipments} shipments</span>
                  </div>
                  <div className="reports-destination-track">
                    <i style={{ width: `${destination.percentage}%` }} />
                  </div>
                </div>
                <strong>{destination.percentage}%</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  const renderShipmentAnalytics = () => (
    <>
      <div className="reports-stats-grid">
        <StatCard
          label="Total Shipments"
          value={formatNumber(totals.shipments)}
          icon={Package}
          trend={totals.shipmentTrend}
          type="orange"
        />
        <StatCard
          label="Delivered"
          value={formatNumber(totals.delivered)}
          icon={CheckCircle2}
          trend={8.4}
          type="green"
        />
        <StatCard
          label="In Transit"
          value="154"
          icon={Truck}
          trend={4.2}
          type="blue"
        />
        <StatCard
          label="Exceptions"
          value="51"
          icon={AlertTriangle}
          trend={-6.5}
          type="red"
        />
      </div>

      <div className="reports-panel">
        <div className="reports-panel-header">
          <div>
            <h3>Shipment Volume & Deliveries</h3>
            <p>Compare total requests with successfully delivered shipments</p>
          </div>
        </div>
        <BarChart
          labels={selectedData.labels}
          firstValues={selectedData.shipments}
          secondValues={selectedData.delivered}
          firstLabel="All Shipments"
          secondLabel="Delivered"
        />
      </div>

      <div className="reports-bottom-grid">
        <div className="reports-panel">
          <div className="reports-panel-header">
            <div>
              <h3>Shipment Status Breakdown</h3>
              <p>Current distribution by shipment status</p>
            </div>
          </div>

          <div className="reports-status-breakdown">
            {STATUS_DATA.map((status) => (
              <div key={status.label} className="reports-status-breakdown-row">
                <div className="reports-status-breakdown-top">
                  <span>
                    <i style={{ background: status.color }} />
                    {status.label}
                  </span>
                  <strong>{formatNumber(status.count)}</strong>
                </div>
                <div className="reports-horizontal-track">
                  <i
                    className="reports-horizontal-fill"
                    style={{
                      width: `${status.value}%`,
                      background: status.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="reports-panel">
          <div className="reports-panel-header">
            <div>
              <h3>Destination Analysis</h3>
              <p>Shipment distribution by destination</p>
            </div>
          </div>
          <div className="reports-destination-list">
            {DESTINATIONS.map((destination, index) => (
              <div className="reports-destination-row" key={destination.city}>
                <div className="reports-destination-rank">
                  {index + 1}
                </div>
                <div className="reports-destination-content">
                  <div>
                    <strong>{destination.city}</strong>
                    <span>{destination.shipments} shipments</span>
                  </div>
                  <div className="reports-destination-track">
                    <i style={{ width: `${destination.percentage}%` }} />
                  </div>
                </div>
                <strong>{destination.percentage}%</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  const renderCarrierPerformance = () => (
    <>
      <div className="reports-stats-grid">
        <StatCard
          label="Active Carriers"
          value="4"
          icon={Truck}
          trend={0}
          type="orange"
        />
        <StatCard
          label="Total Assigned Shipments"
          value={formatNumber(totalCarrierShipments)}
          icon={Package}
          trend={12.4}
          type="blue"
        />
        <StatCard
          label="Average Delivery Rate"
          value={averageCarrierRate}
          suffix="%"
          icon={Target}
          trend={2.1}
          type="green"
        />
        <StatCard
          label="Carrier Commissions"
          value={formatMoney(totalCarrierCommissions)}
          icon={Wallet}
          trend={9.3}
          type="purple"
        />
      </div>

      <div className="reports-panel">
        <div className="reports-panel-header">
          <div>
            <h3>Carrier Performance Comparison</h3>
            <p>Delivery success rate by delivery partner</p>
          </div>
          <span className="reports-panel-tag">
            <Target size={13} /> Performance
          </span>
        </div>

        <div className="reports-carrier-comparison">
          {CARRIER_DATA.map((carrier) => (
            <div className="reports-comparison-row" key={carrier.name}>
              <div className="reports-comparison-name">
                <div
                  className="reports-carrier-avatar"
                  style={{
                    background: `${carrier.color}18`,
                    color: carrier.color,
                  }}
                >
                  {carrier.name.charAt(0)}
                </div>
                <strong>{carrier.name}</strong>
              </div>
              <div className="reports-comparison-track">
                <i
                  style={{
                    width: `${carrier.rate}%`,
                    background: carrier.color,
                  }}
                />
              </div>
              <strong className="reports-comparison-rate">
                {carrier.rate}%
              </strong>
            </div>
          ))}
        </div>
      </div>

      <div className="reports-panel reports-carrier-table-panel">
        <div className="reports-panel-header">
          <div>
            <h3>Carrier Performance Details</h3>
            <p>Operational performance and commission overview</p>
          </div>
        </div>

        <div className="reports-table-scroll">
          <table className="reports-table">
            <thead>
              <tr>
                <th>CARRIER</th>
                <th>SHIPMENTS</th>
                <th>DELIVERED</th>
                <th>DELAYED</th>
                <th>FAILED</th>
                <th>DELIVERY RATE</th>
                <th>COMMISSIONS</th>
              </tr>
            </thead>
            <tbody>
              {CARRIER_DATA.map((carrier) => (
                <tr key={carrier.name}>
                  <td>
                    <div className="reports-table-carrier">
                      <span>{carrier.name.charAt(0)}</span>
                      <strong>{carrier.name}</strong>
                    </div>
                  </td>
                  <td>{formatNumber(carrier.shipments)}</td>
                  <td className="reports-table-green">
                    {formatNumber(carrier.delivered)}
                  </td>
                  <td>{carrier.delayed}</td>
                  <td className="reports-table-red">{carrier.failed}</td>
                  <td>
                    <span className="reports-rate-pill">
                      {carrier.rate}%
                    </span>
                  </td>
                  <td>
                    <strong>{formatMoney(carrier.commission)}</strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  const renderFinancialReports = () => (
    <>
      <div className="reports-stats-grid">
        <StatCard
          label="Commission Revenue"
          value={formatMoney(totals.revenue)}
          icon={CircleDollarSign}
          trend={totals.revenueTrend}
          type="orange"
        />
        <StatCard
          label="Total Carrier Commissions"
          value={formatMoney(totalCarrierCommissions)}
          icon={Wallet}
          trend={9.3}
          type="green"
        />
        <StatCard
          label="Received Payments"
          value={formatMoney(19840)}
          icon={CheckCircle2}
          trend={11.8}
          type="blue"
        />
        <StatCard
          label="Pending Settlements"
          value={formatMoney(4827)}
          icon={Clock}
          trend={-3.4}
          type="purple"
        />
      </div>

      <div className="reports-panel">
        <div className="reports-panel-header">
          <div>
            <h3>Commission Revenue Trend</h3>
            <p>Revenue generated through delivery partner commissions</p>
          </div>
        </div>

        <BarChart
          labels={selectedData.labels}
          firstValues={selectedData.revenue}
          firstLabel="Commission Revenue (MAD)"
        />
      </div>

      <div className="reports-bottom-grid">
        <div className="reports-panel">
          <div className="reports-panel-header">
            <div>
              <h3>Commission by Carrier</h3>
              <p>Commission contribution per delivery partner</p>
            </div>
          </div>

          <div className="reports-carrier-list reports-financial-carriers">
            {CARRIER_DATA.map((carrier) => (
              <div className="reports-carrier-row" key={carrier.name}>
                <div className="reports-carrier-avatar">
                  {carrier.name.charAt(0)}
                </div>
                <div className="reports-carrier-info">
                  <div>
                    <strong>{carrier.name}</strong>
                    <span>{formatMoney(carrier.commission)}</span>
                  </div>
                  <div className="reports-carrier-progress">
                    <i
                      style={{
                        width: `${(carrier.commission / totalCarrierCommissions) * 100}%`,
                        background: carrier.color,
                      }}
                    />
                  </div>
                </div>
                <strong className="reports-carrier-rate">
                  {((carrier.commission / totalCarrierCommissions) * 100).toFixed(1)}%
                </strong>
              </div>
            ))}
          </div>
        </div>

        <div className="reports-panel">
          <div className="reports-panel-header">
            <div>
              <h3>Settlement Summary</h3>
              <p>Carrier payment collection status</p>
            </div>
          </div>

          <div className="reports-settlement-summary">
            <div>
              <span>Expected commissions</span>
              <strong>{formatMoney(24667)}</strong>
            </div>
            <div>
              <span>Received</span>
              <strong className="reports-table-green">
                {formatMoney(19840)}
              </strong>
            </div>
            <div>
              <span>Pending</span>
              <strong className="reports-financial-pending">
                {formatMoney(4827)}
              </strong>
            </div>
            <div className="reports-settlement-progress">
              <div>
                <span>Collection progress</span>
                <strong>80.4%</strong>
              </div>
              <div className="reports-horizontal-track">
                <i
                  className="reports-horizontal-fill"
                  style={{ width: "80.4%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="reports-page">
      <div className="reports-breadcrumb">
        <span>Management</span>
        <span>/</span>
        <strong>Reports & Analytics</strong>
      </div>

      <div className="reports-page-header">
        <div>
          <h1>Reports & Analytics</h1>
          <p>
            Monitor shipment activity, carrier performance and financial
            results across X10 Shipping.
          </p>
        </div>

        <div className="reports-header-actions">
          <div className="reports-period-select">
            <CalendarDays size={16} />
            <select
              value={period}
              onChange={(event) => setPeriod(event.target.value)}
            >
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>This Year</option>
            </select>
            <ChevronDown size={14} />
          </div>

          <button className="reports-export-btn" onClick={exportReport}>
            <Download size={16} />
            Export CSV
          </button>
        </div>
      </div>

      <div className="reports-toolbar-info">
        <div>
          <span className="reports-live-dot" />
          <span>Analytics overview</span>
          <span className="reports-info-divider">|</span>
          <span>{period}</span>
        </div>
        <div className="reports-export-select">
          <FileText size={14} />
          <select
            value={exportType}
            onChange={(event) => setExportType(event.target.value)}
          >
            <option>Summary</option>
            <option>Carrier Performance</option>
            <option>Destinations</option>
          </select>
        </div>
      </div>

      <div className="reports-tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "Overview" && <BarChart3 size={15} />}
            {tab === "Shipment Analytics" && <Package size={15} />}
            {tab === "Carrier Performance" && <Truck size={15} />}
            {tab === "Financial Reports" && <Wallet size={15} />}
            {tab}
          </button>
        ))}
      </div>

      <div className="reports-content">
        {activeTab === "Overview" && renderOverview()}
        {activeTab === "Shipment Analytics" && renderShipmentAnalytics()}
        {activeTab === "Carrier Performance" && renderCarrierPerformance()}
        {activeTab === "Financial Reports" && renderFinancialReports()}
      </div>

      <div className="reports-footer-note">
        <Info size={15} />
        <span>
          Report figures are demonstration data for the frontend prototype.
          Actual analytics will be calculated from shipment, carrier and
          settlement records once the backend is connected.
        </span>
      </div>
    </div>
  );
}
