// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { campaigns, defaultFilters, filterCampaigns } from "../src/components/campaigns/campaign-data";
import { CampaignsList, CampaignDetailPage } from "../src/pages/CampaignsPage";

beforeEach(() => {
  vi.stubGlobal("matchMedia", vi.fn(() => ({ matches: false, addEventListener() {}, removeEventListener() {} })));
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });
const rows = () => screen.queryAllByRole("article");

describe("campaign discovery", () => {
  it("searches title and creator without case or surrounding-space sensitivity", () => {
    expect(filterCampaigns(campaigns, " pUbG ", defaultFilters).map(c => c.id)).toEqual(["pubg-mobile-nepal"]);
    expect(filterCampaigns(campaigns, "EDIFY", defaultFilters).map(c => c.id)).toEqual(["smarter-together"]);
  });
  it("combines category, any selected platform, reward bounds, status and search", () => {
    const records = [...campaigns, { ...campaigns[0], id: "closed", reward: 400, open: false }];
    expect(filterCampaigns(records, "", { ...defaultFilters, category: "Lifestyle", platforms: ["TikTok", "YouTube Shorts"] })).toHaveLength(3);
    expect(filterCampaigns(records, "Krafton", { ...defaultFilters, min: 300, openOnly: false }).map(c => c.id)).toEqual(["closed"]);
    expect(filterCampaigns(records, "Krafton", { ...defaultFilters, min: 300 })).toHaveLength(0);
    expect(filterCampaigns(records, "", { ...defaultFilters, max: 240 })).toHaveLength(0);
  });
  it("applies only on Apply and retains selections after close/reopen", () => {
    render(<CampaignsList />);
    fireEvent.click(screen.getByRole("radio", { name: "Education" }));
    expect(rows()).toHaveLength(5);
    fireEvent.click(screen.getByRole("button", { name: "Apply filters" }));
    expect(rows()).toHaveLength(1);
    fireEvent.click(screen.getByRole("button", { name: "Close filters" }));
    fireEvent.click(screen.getByRole("button", { name: "Filters", exact: true }));
    expect((screen.getByRole("radio", { name: "Education" }) as HTMLInputElement).checked).toBe(true);
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "Krafton" } });
    expect(screen.getByRole("heading", { name: "No campaigns found" })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Reset search and filters" }));
    expect(rows()).toHaveLength(5);
    expect((screen.getByRole("searchbox") as HTMLInputElement).value).toBe("");
  });
  it("supports multiple platforms and keeps range endpoints valid", () => {
    render(<CampaignsList />);
    fireEvent.click(screen.getByRole("checkbox", { name: "TikTok" }));
    fireEvent.click(screen.getByRole("checkbox", { name: "Instagram Reels" }));
    fireEvent.click(screen.getByRole("button", { name: "Apply filters" }));
    expect(rows()).toHaveLength(4);
    fireEvent.change(screen.getByRole("slider", { name: "Minimum reward" }), { target: { value: "400" } });
    fireEvent.change(screen.getByRole("slider", { name: "Maximum reward" }), { target: { value: "200" } });
    expect((screen.getByRole("slider", { name: "Maximum reward" }) as HTMLInputElement).value).toBe("400");
    fireEvent.change(screen.getByRole("slider", { name: "Minimum reward" }), { target: { value: "500" } });
    expect((screen.getByRole("slider", { name: "Minimum reward" }) as HTMLInputElement).value).toBe("400");
    fireEvent.click(screen.getByRole("button", { name: "Apply filters" }));
    expect(rows()).toHaveLength(0);
    fireEvent.click(screen.getByRole("button", { name: "Reset", exact: true }));
    expect(rows()).toHaveLength(5);
  });
  it("shows an empty catalog without pretending filters caused it", () => {
    render(<CampaignsList records={[]} />);
    expect(screen.getByRole("heading", { name: "No campaigns yet" })).toBeTruthy();
    expect(screen.queryByRole("button", { name: "Reset search and filters" })).toBeNull();
  });
  it("provides meaningful details and an unavailable-route recovery", () => {
    const rendered = render(<CampaignDetailPage id="pubg-mobile-nepal" />);
    expect(screen.getByRole("heading", { name: "PUBG Mobile Nepal" })).toBeTruthy();
    expect(screen.getByText("per 1,000 verified views")).toBeTruthy();
    expect(screen.getByText("TikTok, YouTube Shorts")).toBeTruthy();
    rendered.rerender(<CampaignDetailPage id="missing" />);
    expect(screen.getByRole("heading", { name: "Campaign not found" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "All campaigns" }).getAttribute("href")).toBe("/campaigns");
  });
});
