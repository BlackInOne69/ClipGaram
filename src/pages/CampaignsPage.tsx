import { useRef, useState } from "react";
import {
  ArrowLeft,
  MagnifyingGlass,
  SlidersHorizontal,
  X,
} from "@phosphor-icons/react";
import { useMediaQuery } from "../components/auth/useMediaQuery";
import {
  CampaignFilters,
  MobileFilterDrawer,
} from "../components/campaigns/CampaignFilters";
import { CampaignRow } from "../components/campaigns/CampaignRow";
import {
  campaigns,
  defaultFilters,
  filterCampaigns,
  formatDeadline,
  type Campaign,
} from "../components/campaigns/campaign-data";

export function CampaignsList({
  records = campaigns,
}: {
  records?: Campaign[];
}) {
  const [search, setSearch] = useState("");
  const [draft, setDraft] = useState(defaultFilters);
  const [applied, setApplied] = useState(defaultFilters);
  const [desktopOpen, setDesktopOpen] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const compact = useMediaQuery("(max-width: 1180px)");
  const filterButton = useRef<HTMLButtonElement>(null);
  const results = filterCampaigns(records, search, applied);
  const reset = () => {
    setDraft(defaultFilters);
    setApplied(defaultFilters);
    setSearch("");
  };
  const close = () => {
    setDesktopOpen(false);
    setDrawerOpen(false);
    filterButton.current?.focus();
  };
  const panel = (
    <CampaignFilters
      draft={draft}
      onChange={setDraft}
      onReset={reset}
      onApply={() => {
        setApplied({ ...draft, platforms: [...draft.platforms] });
        if (compact) setDrawerOpen(false);
      }}
      onClose={close}
    />
  );
  return (
    <main className={`campaigns-main ${desktopOpen ? "filters-visible" : ""}`}>
      <div className="campaign-list-column">
        <h1>Campaigns</h1>
        <div className="campaign-search-row">
          <label className="campaign-search">
            <MagnifyingGlass size={23} />
            <input
              type="search"
              aria-label="Search campaigns"
              placeholder="Search campaigns..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            {search && (
              <button
                aria-label="Clear campaign search"
                onClick={() => setSearch("")}
              >
                <X size={18} />
              </button>
            )}
          </label>
          <button
            ref={filterButton}
            className="control-button filters-trigger"
            aria-expanded={compact ? drawerOpen : desktopOpen}
            aria-controls="campaign-filter-panel"
            onClick={() => {
              if (compact) setDrawerOpen(true);
              else {
                setDesktopOpen(true);
                requestAnimationFrame(() =>
                  document.getElementById("filters-heading")?.focus(),
                );
              }
            }}
          >
            <SlidersHorizontal size={23} />
            Filters
          </button>
        </div>
        <div className="campaign-results" aria-live="polite" aria-atomic="true">
          <span className="sr-only">{results.length} campaigns found</span>
          {results.map((campaign) => (
            <CampaignRow key={campaign.id} campaign={campaign} />
          ))}
          {!results.length && (
            <section className="campaign-empty">
              <MagnifyingGlass size={32} />
              <h2>
                {records.length ? "No campaigns found" : "No campaigns yet"}
              </h2>
              <p>
                {records.length
                  ? "Try another title or creator, or reset your search and filters."
                  : "New campaigns will appear here when they become available."}
              </p>
              {!!records.length && (
                <button className="control-button" onClick={reset}>
                  Reset search and filters
                </button>
              )}
            </section>
          )}
        </div>
      </div>
      {compact ? (
        <MobileFilterDrawer open={drawerOpen} onClose={close}>
          <div id="campaign-filter-panel">{panel}</div>
        </MobileFilterDrawer>
      ) : (
        desktopOpen && <aside id="campaign-filter-panel">{panel}</aside>
      )}
    </main>
  );
}

export function CampaignDetailPage({ id }: { id: string }) {
  const campaign = campaigns.find((item) => item.id === id);
  return (
    <main className="campaign-detail">
      <a className="campaign-back" href="/campaigns">
        <ArrowLeft size={20} />
        All campaigns
      </a>
      {campaign ? (
        <article>
          <img src={campaign.image} alt="" />
          <div className="campaign-detail-content">
            <h1>{campaign.title}</h1>
            <p className="campaign-byline">by {campaign.creator}</p>
            <dl>
              <div>
                <dt>Reward rate</dt>
                <dd>
                  <strong>NPR {campaign.reward}</strong>
                  <span>per 1,000 verified views</span>
                </dd>
              </div>
              <div>
                <dt>Deadline</dt>
                <dd>
                  <time dateTime={campaign.deadline}>
                    {formatDeadline(campaign.deadline)}
                  </time>
                </dd>
              </div>
              <div>
                <dt>Platforms</dt>
                <dd>{campaign.platforms.join(", ")}</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>{campaign.open ? "Open" : "Closed"}</dd>
              </div>
            </dl>
            <h2>Campaign brief</h2>
            <p>{campaign.brief}</p>
            <p className="campaign-mock-note">
              Preview campaign with a sample brief. The reward rate is not a
              guaranteed earning amount.
            </p>
          </div>
        </article>
      ) : (
        <section className="campaign-empty">
          <h1>Campaign not found</h1>
          <p>
            This campaign is unavailable. Browse all campaigns to find another.
          </p>
        </section>
      )}
    </main>
  );
}

export default function CampaignsPage() {
  const parts = window.location.pathname.split("/").filter(Boolean);
  const id = parts[parts.indexOf("campaigns") + 1];
  return id ? <CampaignDetailPage id={id} /> : <CampaignsList />;
}
