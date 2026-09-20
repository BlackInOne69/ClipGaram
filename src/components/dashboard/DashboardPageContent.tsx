import { useMemo, useState } from "react";
import {
  Bell,
  CalendarBlank,
  CaretDown,
  CaretRight,
  ChartDonut,
  ChatCircleDots,
  CheckCircle,
  ClockCountdown,
  Compass,
  CreditCard,
  DotsThree,
  Eye,
  FilmStrip,
  Gear,
  House,
  MagnifyingGlass,
  Question,
  SignOut,
  VideoCamera,
  Wallet,
  X,
} from "@phosphor-icons/react";
import { ClipGaramLogo } from "../brand/ClipGaramLogo";
import { ThemeToggle } from "../auth/ThemeToggle";
import type { ClipGaramThemeName } from "../../theme/clipgaram-theme";
import {
  BestDayChart,
  PerformanceChart,
  VerificationDial,
} from "./DashboardCharts";
import { recentClips } from "./dashboard-data";

const navItems = [
  ["Dashboard", House],
  ["Discover campaigns", Compass],
  ["My clips", VideoCamera],
  ["Earnings", Wallet],
  ["Payouts", CreditCard],
  ["Messages", ChatCircleDots],
] as const;

const mobileNavItems = [
  ["Dashboard", House],
  ["Campaigns", Compass],
  ["My clips", VideoCamera],
  ["Earnings", Wallet],
] as const;

function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  if (!message) return null;
  return (
    <div className="dashboard-toast" role="status">
      <CheckCircle size={20} />
      {message}
      <button aria-label="Dismiss" onClick={onClose}>
        <X size={16} />
      </button>
    </div>
  );
}

export function DashboardPageContent({
  theme,
  onThemeChange,
  children,
}: {
  theme: ClipGaramThemeName;
  onThemeChange: (theme: ClipGaramThemeName) => void;
  children?: React.ReactNode;
}) {
  const active = children ? "Discover campaigns" : "Dashboard";
  const [metric, setMetric] = useState<"views" | "earnings">("views");
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");
  const [period, setPeriod] = useState("Last 18 days");
  const [periodOpen, setPeriodOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [rowMenu, setRowMenu] = useState<number | null>(null);
  const filtered = useMemo(
    () =>
      recentClips.filter((clip) =>
        `${clip.title} ${clip.campaign}`
          .toLowerCase()
          .includes(search.toLowerCase()),
      ),
    [search],
  );
  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  };
  const selectDestination = (label: string) => {
    setMoreOpen(false);
    if (label === "Discover campaigns") window.location.assign("/campaigns");
    else if (label === "Dashboard") window.location.assign("/dashboard");
    else notify(`${label} selected`);
  };
  return (
    <div className={`dashboard-app${children ? " campaigns-app" : ""}`}>
      <aside className="dashboard-sidebar">
        <div className="sidebar-brand">
          <a href="/" aria-label="ClipGaram home">
            <ClipGaramLogo />
          </a>
        </div>
        <nav aria-label="Dashboard navigation">
          {navItems.map(([label, Icon]) => (
            <button
              key={label}
              className={active === label ? "is-active" : ""}
              aria-current={active === label ? "page" : undefined}
              onClick={() => selectDestination(label)}
            >
              <Icon size={25} />
              <span>{label}</span>
              {label === "Messages" && (
                <>
                  <i />
                  <b>3</b>
                </>
              )}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <button
            onClick={() => notify("Settings are ready for the next milestone.")}
          >
            <Gear size={25} />
            <span>Settings</span>
          </button>
          <button
            onClick={() =>
              notify("Support is available at hello@clipgaram.com.")
            }
          >
            <Question size={25} />
            <span>Help &amp; Support</span>
          </button>
          <div className="profile-block">
            <div className="profile-avatar" aria-hidden="true">
              AT
            </div>
            <div>
              <strong>Aarav Thapa</strong>
              <span>Clipper</span>
            </div>
            <CaretRight size={22} />
          </div>
        </div>
      </aside>
      <div className="dashboard-shell">
        <header className="dashboard-topbar">
          <a
            className="mobile-dashboard-brand"
            href="/"
            aria-label="ClipGaram home"
          >
            <ClipGaramLogo />
          </a>
          <label className="dashboard-search">
            <MagnifyingGlass size={22} />
            <input
              aria-label="Search campaigns, clips, creators"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search campaigns, clips, creators..."
            />
            <kbd>⌘ K</kbd>
          </label>
          <div className="topbar-actions">
            <ThemeToggle theme={theme} onChange={onThemeChange} />
            <div className="popover-anchor">
              <button
                className="notification-button"
                aria-label="Notifications"
                aria-expanded={notificationOpen}
                onClick={() => setNotificationOpen(!notificationOpen)}
              >
                <Bell size={23} />
                <i />
              </button>
              {notificationOpen && (
                <div className="dashboard-popover notification-popover">
                  <strong>You’re all caught up</strong>
                  <span>No new clip updates.</span>
                </div>
              )}
            </div>
            <div className="mobile-profile-anchor">
              <button
                className="mobile-profile-trigger"
                type="button"
                aria-label="Open profile menu"
                aria-expanded={profileOpen}
                onClick={() => {
                  setProfileOpen(!profileOpen);
                  setMoreOpen(false);
                }}
              >
                <span aria-hidden="true">AT</span>
              </button>
              {profileOpen && (
                <div className="dashboard-popover mobile-profile-menu">
                  <strong>Aarav Thapa</strong>
                  <span>Clipper</span>
                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(false);
                      notify("Settings are ready for the next milestone.");
                    }}
                  >
                    <Gear size={18} />
                    Settings
                  </button>
                  <a href="/">
                    <SignOut size={18} />
                    Sign out
                  </a>
                </div>
              )}
            </div>
          </div>
        </header>
        {children ?? (
          <main className="dashboard-main">
            <header className="dashboard-heading">
              <h1>Dashboard</h1>
              <div className="dashboard-controls">
                <div className="popover-anchor">
                  <button
                    className="control-button"
                    onClick={() => setDateOpen(!dateOpen)}
                    aria-expanded={dateOpen}
                  >
                    <CalendarBlank size={19} />
                    Sep 1–18, 2026
                  </button>
                  {dateOpen && (
                    <div className="dashboard-popover">
                      <strong>Reporting range</strong>
                      <span>September 1–18, 2026</span>
                    </div>
                  )}
                </div>
                <div className="popover-anchor">
                  <button
                    className="control-button"
                    onClick={() => setPeriodOpen(!periodOpen)}
                    aria-expanded={periodOpen}
                  >
                    {period}
                    <CaretDown size={16} />
                  </button>
                  {periodOpen && (
                    <div className="dashboard-popover period-menu">
                      {["Last 7 days", "Last 18 days", "Last 30 days"].map(
                        (option) => (
                          <button
                            key={option}
                            onClick={() => {
                              setPeriod(option);
                              setPeriodOpen(false);
                            }}
                          >
                            {option}
                          </button>
                        ),
                      )}
                    </div>
                  )}
                </div>
              </div>
            </header>
            <section className="metric-grid" aria-label="Clipper summary">
              <MetricCard
                icon={<Eye />}
                label="Verified views"
                value="69,500"
                badge="↑ 18.4%"
                note="vs. previous period"
              />
              <MetricCard
                icon={<FilmStrip />}
                label="Clips submitted"
                value="12"
                badge="↑ +2"
                note="this period"
              />
              <MetricCard
                icon={<Wallet />}
                label="Available earnings"
                value="NPR 1,250"
                badge="↑ +NPR 430"
                note="vs. previous period"
              />
              <MetricCard
                icon={<ClockCountdown />}
                label="Pending review"
                value="NPR 640"
                note="3 clips"
              />
            </section>
            <div className="dashboard-grid">
              <section
                className="dashboard-card performance-card"
                aria-labelledby="performance-title"
              >
                <header className="performance-heading">
                  <div>
                    <h2 id="performance-title">Performance</h2>
                    <p>Your clip performance over time</p>
                  </div>
                  <div
                    className="metric-tabs"
                    role="group"
                    aria-label="Performance metric"
                  >
                    <button
                      className={metric === "views" ? "is-active" : ""}
                      onClick={() => setMetric("views")}
                    >
                      Verified views
                    </button>
                    <button
                      className={metric === "earnings" ? "is-active" : ""}
                      onClick={() => setMetric("earnings")}
                    >
                      Earnings
                    </button>
                  </div>
                </header>
                <PerformanceChart metric={metric} />
                <div className="status-bars">
                  <h3>Clips by status</h3>
                  {[
                    ["Paid", 6, 60],
                    ["Verifying", 3, 40],
                    ["Submitted", 3, 40],
                  ].map(([label, count, width]) => (
                    <div className="status-row" key={label}>
                      <span>{label}</span>
                      <div>
                        <i
                          className={label === "Verifying" ? "is-clay" : ""}
                          style={{ width: `${width}%` }}
                        />
                      </div>
                      <strong>{count}</strong>
                    </div>
                  ))}
                </div>
              </section>
              <div className="insights-column">
                <BestDayChart
                  onMenu={() => notify("Best-day options opened.")}
                />
                <VerificationDial
                  onMenu={() => notify("Verification options opened.")}
                  onDetails={() => notify("10 of 12 clips have been verified.")}
                />
              </div>
            </div>
            <section
              className="dashboard-card recent-card"
              aria-labelledby="recent-title"
            >
              <header className="card-heading-row">
                <h2 id="recent-title">Recent clips</h2>
                <button
                  className="icon-button"
                  aria-label="Recent clips options"
                  onClick={() => notify("Recent clip options opened.")}
                >
                  <DotsThree size={23} weight="bold" />
                </button>
              </header>
              <div className="table-scroll">
                <table>
                  <thead>
                    <tr>
                      <th>Clip</th>
                      <th>Campaign</th>
                      <th>Status</th>
                      <th>Verified views</th>
                      <th>Earnings</th>
                      <th>
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((clip, index) => (
                      <tr key={clip.title}>
                        <td>
                          <div className="clip-cell">
                            <div
                              className={`clip-thumbnail thumb-${clip.thumbnail}`}
                            >
                              <VideoCamera size={20} />
                              <span>{clip.duration}</span>
                            </div>
                            <div>
                              <strong>{clip.title}</strong>
                              <small>{clip.date}</small>
                            </div>
                          </div>
                        </td>
                        <td>{clip.campaign}</td>
                        <td>
                          <span
                            className={`status-badge status-${clip.status.toLowerCase()}`}
                          >
                            {clip.status}
                          </span>
                        </td>
                        <td>{clip.views}</td>
                        <td>{clip.earnings}</td>
                        <td className="row-actions">
                          <button
                            aria-label={`Actions for ${clip.title}`}
                            onClick={() =>
                              setRowMenu(rowMenu === index ? null : index)
                            }
                          >
                            <DotsThree size={20} weight="bold" />
                          </button>
                          {rowMenu === index && (
                            <div className="dashboard-popover row-menu">
                              <button
                                onClick={() => notify(`Opening ${clip.title}`)}
                              >
                                View clip
                              </button>
                              <button
                                onClick={() => notify("Share link copied.")}
                              >
                                Copy share link
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filtered.length === 0 && (
                  <p className="empty-table">No clips match “{search}”.</p>
                )}
              </div>
            </section>
          </main>
        )}
      </div>
      <nav
        className="mobile-bottom-nav"
        aria-label="Mobile dashboard navigation"
      >
        {mobileNavItems.map(([label, Icon]) => {
          const destination =
            label === "Campaigns" ? "Discover campaigns" : label;
          return (
            <button
              key={label}
              type="button"
              className={active === destination ? "is-active" : ""}
              aria-current={active === destination ? "page" : undefined}
              onClick={() => selectDestination(destination)}
            >
              <Icon size={23} />
              <span>{label}</span>
            </button>
          );
        })}
        <button
          type="button"
          className={moreOpen ? "is-active" : ""}
          aria-expanded={moreOpen}
          aria-controls="mobile-more-menu"
          onClick={() => {
            setMoreOpen(!moreOpen);
            setProfileOpen(false);
          }}
        >
          <DotsThree size={24} weight="bold" />
          <span>More</span>
        </button>
      </nav>
      {moreOpen && (
        <div className="mobile-more-menu" id="mobile-more-menu">
          <button type="button" onClick={() => selectDestination("Payouts")}>
            <CreditCard size={21} />
            Payouts
          </button>
          <button type="button" onClick={() => selectDestination("Messages")}>
            <ChatCircleDots size={21} />
            Messages
            <b>3</b>
          </button>
          <button
            type="button"
            onClick={() => {
              setMoreOpen(false);
              notify("Settings are ready for the next milestone.");
            }}
          >
            <Gear size={21} />
            Settings
          </button>
          <button
            type="button"
            onClick={() => {
              setMoreOpen(false);
              notify("Support is available at hello@clipgaram.com.");
            }}
          >
            <Question size={21} />
            Help &amp; Support
          </button>
          <ThemeToggle
            theme={theme}
            onChange={onThemeChange}
            className="mobile-menu-theme"
          />
        </div>
      )}
      <Toast message={toast} onClose={() => setToast("")} />
    </div>
  );
}

function MetricCard({
  icon,
  label,
  value,
  badge,
  note,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  badge?: string;
  note: string;
}) {
  return (
    <article className="dashboard-card metric-card">
      <div className="metric-icon">{icon}</div>
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
        <p>
          {badge && <b>{badge}</b>} {note}
        </p>
      </div>
    </article>
  );
}
