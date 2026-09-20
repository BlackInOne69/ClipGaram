import { useEffect, useRef } from "react";
import {
  Funnel,
  InstagramLogo,
  TiktokLogo,
  YoutubeLogo,
  X,
} from "@phosphor-icons/react";
import {
  categories,
  platforms,
  type CampaignFiltersState,
} from "./campaign-data";

interface Props {
  draft: CampaignFiltersState;
  onChange: (draft: CampaignFiltersState) => void;
  onReset: () => void;
  onApply: () => void;
  onClose: () => void;
}
const platformIcons = [TiktokLogo, InstagramLogo, YoutubeLogo];

export function CampaignFilters({
  draft,
  onChange,
  onReset,
  onApply,
  onClose,
}: Props) {
  return (
    <section className="campaign-filters" aria-labelledby="filters-heading">
      <header>
        <Funnel size={28} />
        <h2 id="filters-heading" tabIndex={-1}>
          Filters
        </h2>
        <button
          className="icon-button"
          onClick={onClose}
          aria-label="Close filters"
        >
          <X size={21} />
        </button>
      </header>
      <div className="campaign-filter-fields">
        <fieldset>
          <legend>Category</legend>
          <div className="category-options">
            {categories.map((category) => (
              <label
                key={category}
                className={draft.category === category ? "selected" : ""}
              >
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={draft.category === category}
                  onChange={() => onChange({ ...draft, category })}
                />
                <span>{category}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend>Platform</legend>
          <div className="platform-options">
            {platforms.map((platform, index) => {
              const Icon = platformIcons[index];
              return (
                <label
                  key={platform}
                  className={
                    draft.platforms.includes(platform) ? "selected" : ""
                  }
                >
                  <input
                    type="checkbox"
                    checked={draft.platforms.includes(platform)}
                    onChange={() =>
                      onChange({
                        ...draft,
                        platforms: draft.platforms.includes(platform)
                          ? draft.platforms.filter(
                              (value) => value !== platform,
                            )
                          : [...draft.platforms, platform],
                      })
                    }
                  />
                  <Icon
                    className={`platform-icon platform-${index}`}
                    size={27}
                    weight={index === 1 ? "regular" : "fill"}
                  />
                  <span>{platform}</span>
                </label>
              );
            })}
          </div>
        </fieldset>
        <fieldset className="reward-range">
          <legend>
            Reward range <span>(NPR per 1,000 verified views)</span>
          </legend>
        <div className="range-controls">
          <div className="range-track" aria-hidden="true"><span style={{ left: `${((draft.min - 50) / 450) * 100}%`, right: `${((500 - draft.max) / 450) * 100}%` }} /></div>
            <label>
              <span className="sr-only">Minimum reward</span>
              <input
                type="range"
                min="50"
                max="500"
                step="10"
                value={draft.min}
                aria-valuetext={`NPR ${draft.min} per 1,000 verified views`}
                onChange={(e) =>
                  onChange({
                    ...draft,
                    min: Math.min(Number(e.target.value), draft.max),
                  })
                }
              />
            </label>
            <label>
              <span className="sr-only">Maximum reward</span>
              <input
                type="range"
                min="50"
                max="500"
                step="10"
                value={draft.max}
                aria-valuetext={`NPR ${draft.max} per 1,000 verified views`}
                onChange={(e) =>
                  onChange({
                    ...draft,
                    max: Math.max(Number(e.target.value), draft.min),
                  })
                }
              />
            </label>
          </div>
          <div className="range-values">
            <output>NPR {draft.min}</output>
            <output>NPR {draft.max}</output>
          </div>
        </fieldset>
        <fieldset>
          <legend>Status</legend>
          <label className="open-only">
            <input
              type="checkbox"
              checked={draft.openOnly}
              onChange={(e) =>
                onChange({ ...draft, openOnly: e.target.checked })
              }
            />
            Open only
          </label>
        </fieldset>
      </div>
      <footer>
        <button className="control-button" onClick={onReset}>
          Reset
        </button>
        <button className="control-button apply-filters" onClick={onApply}>
          Apply filters
        </button>
      </footer>
    </section>
  );
}

export function MobileFilterDrawer({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = dialog.current;
    if (!open || !element) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = "hidden";
    element.querySelector<HTMLElement>("h2")?.focus();
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [open]);
  return (
    <dialog
      ref={dialog}
      className="campaign-filter-drawer"
      aria-labelledby="filters-heading"
      aria-modal="true"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      {children}
    </dialog>
  );
}
