import { useId, useState } from "react";
import { DotsThree } from "@phosphor-icons/react";
import { bestDays, performanceData } from "./dashboard-data";

function pointsFor(key: "views" | "earnings") {
  const max = 20000;
  return performanceData
    .map((item, index) => {
      const x = 42 + (index / (performanceData.length - 1)) * 646;
      const y = 146 - (item[key] / max) * 120;
      return `${x},${y}`;
    })
    .join(" ");
}

export function PerformanceChart({ metric }: { metric: "views" | "earnings" }) {
  const [hovered, setHovered] = useState(13);
  const active = performanceData[hovered];
  const x = 42 + (hovered / (performanceData.length - 1)) * 646;
  const key = metric === "views" ? "views" : "earnings";
  const y = 146 - (active[key] / 20000) * 120;
  return (
    <div className="performance-chart-wrap">
      <svg
        className="performance-chart"
        viewBox="0 0 720 180"
        role="img"
        aria-label={`Performance from September 1 through 18. ${metric === "views" ? "Verified views" : "Earnings"} are selected.`}
      >
        {[0, 5000, 10000, 15000, 20000].map((value, index) => {
          const gy = 146 - index * 30;
          return (
            <g key={value}>
              <line className="chart-grid" x1="42" x2="688" y1={gy} y2={gy} />
              <text className="chart-label" x="7" y={gy + 4}>
                {value === 0 ? "0" : `${value / 1000}K`}
              </text>
            </g>
          );
        })}
        {performanceData.map((item, index) => {
          const px = 42 + (index / 17) * 646;
          return (
            <g key={item.day}>
              {index % 2 === 0 && (
                <text className="chart-label chart-date" x={px} y="170">
                  {item.day}
                </text>
              )}
              <rect
                className="chart-hit"
                x={px - 18}
                y="18"
                width="36"
                height="140"
                onPointerEnter={() => setHovered(index)}
                onFocus={() => setHovered(index)}
                tabIndex={0}
                aria-label={`${item.day}: ${item.views.toLocaleString()} verified views, NPR ${Math.round(item.views * 0.012)} earned`}
              />
            </g>
          );
        })}
        <polyline className="chart-compare" points={pointsFor("earnings")} />
        <polyline className="chart-primary" points={pointsFor(key)} />
        <line className="chart-marker" x1={x} x2={x} y1={y} y2="146" />
        <circle className="chart-point" cx={x} cy={y} r="5" />
      </svg>
      <div
        className="chart-tooltip"
        style={{ left: `${Math.min(80, Math.max(16, (x / 720) * 100))}%` }}
        role="status"
      >
        <strong>{active.day}, 2026</strong>
        <span>
          <i /> {active.views.toLocaleString()} verified views
        </span>
        <span>
          <i /> NPR {Math.round(active.views * 0.012)} earned
        </span>
      </div>
    </div>
  );
}

export function BestDayChart({ onMenu }: { onMenu: () => void }) {
  return (
    <section
      className="dashboard-card insight-card"
      aria-labelledby="best-day-title"
    >
      <header className="card-heading-row">
        <div>
          <h2 id="best-day-title">Best day to post</h2>
          <p>Based on verified views from your clips</p>
        </div>
        <button
          className="icon-button"
          aria-label="Best day options"
          onClick={onMenu}
        >
          <DotsThree size={23} weight="bold" />
        </button>
      </header>
      <div className="best-reach">
        <span>Best reach</span>
      </div>
      <div
        className="day-chart"
        role="img"
        aria-label="Saturday has the best reach at 18.2 thousand views"
      >
        {bestDays.map((item) => (
          <div
            className={`day-column ${"best" in item && item.best ? "is-best" : ""}`}
            key={item.day}
          >
            <span className="day-value">{item.value}</span>
            <div className="day-track">
              <i style={{ height: `${item.height}%` }} />
            </div>
            <b />
            <small>{item.day}</small>
          </div>
        ))}
      </div>
    </section>
  );
}

export function VerificationDial({
  onDetails,
  onMenu,
}: {
  onDetails: () => void;
  onMenu: () => void;
}) {
  const maskId = useId();
  return (
    <section
      className="dashboard-card verification-card"
      aria-labelledby="verification-title"
    >
      <header className="card-heading-row">
        <div>
          <h2 id="verification-title">Verification rate</h2>
          <p>Share of submitted clips that get verified</p>
        </div>
        <button
          className="icon-button"
          aria-label="Verification options"
          onClick={onMenu}
        >
          <DotsThree size={23} weight="bold" />
        </button>
      </header>
      <div className="dial-layout">
        <svg
          className="verification-dial"
          viewBox="0 0 230 150"
          role="img"
          aria-label="84 percent verification rate with a 90 percent target"
        >
          <defs>
            <mask id={maskId}>
              <rect width="230" height="150" fill="white" />
            </mask>
          </defs>
          <path
            className="dial-ticks"
            pathLength="1"
            d="M65 123a62 62 0 1 1 103 0"
            mask={`url(#${maskId})`}
          />
          <path
            className="dial-arc"
            pathLength="100"
            d="M65 123a62 62 0 1 1 103 0"
          />
          <text className="dial-number" x="115" y="87">
            84%
          </text>
          <text className="dial-label" x="115" y="107">
            verification rate
          </text>
          <circle className="dial-target" cx="173" cy="54" r="5" />
          <path className="dial-target-line" d="M178 51l30-8" />
          <text className="dial-target-copy" x="211" y="42">
            90%
          </text>
          <text className="dial-target-copy" x="211" y="58">
            target
          </text>
        </svg>
      </div>
      <p className="verification-summary">10 of 12 clips verified</p>
      <button className="details-button" onClick={onDetails}>
        View details
      </button>
    </section>
  );
}
