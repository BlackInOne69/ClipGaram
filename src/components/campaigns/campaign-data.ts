import gaming from "../../assets/campaigns/gaming.png";
import food from "../../assets/campaigns/food.png";
import fitness from "../../assets/campaigns/fitness.png";
import education from "../../assets/campaigns/education.png";
import travel from "../../assets/campaigns/travel.png";

export const platforms = [
  "TikTok",
  "Instagram Reels",
  "YouTube Shorts",
] as const;
export type Platform = (typeof platforms)[number];
export const categories = ["All", "Gaming", "Lifestyle", "Education"] as const;
export type Category = (typeof categories)[number];
export interface Campaign {
  id: string;
  title: string;
  creator: string;
  image: string;
  category: Exclude<Category, "All">;
  platforms: Platform[];
  reward: number;
  deadline: string;
  open: boolean;
  brief: string;
}

// Local prototype records. Rates are NPR per 1,000 verified views, never total earnings.
// Replace this module's records with the future campaign API response.
export const campaigns: Campaign[] = [
  {
    id: "pubg-mobile-nepal",
    title: "PUBG Mobile Nepal",
    creator: "Krafton Nepal",
    image: gaming,
    category: "Gaming",
    platforms: ["TikTok", "YouTube Shorts"],
    reward: 250,
    deadline: "2026-09-25",
    open: true,
    brief:
      "Create a short highlight featuring memorable PUBG Mobile gameplay, teamwork, or a match-winning moment for a Nepali audience.",
  },
  {
    id: "local-flavors-of-nepal",
    title: "Local Flavors of Nepal",
    creator: "Taste Nepal",
    image: food,
    category: "Lifestyle",
    platforms: ["TikTok", "Instagram Reels"],
    reward: 250,
    deadline: "2026-09-22",
    open: true,
    brief:
      "Share a short food story celebrating Nepali dishes, local ingredients, and the people who bring them to the table.",
  },
  {
    id: "move-better-everyday",
    title: "Move Better Everyday",
    creator: "FitLife Nepal",
    image: fitness,
    category: "Lifestyle",
    platforms: ["Instagram Reels", "YouTube Shorts"],
    reward: 250,
    deadline: "2026-09-28",
    open: true,
    brief:
      "Highlight an approachable everyday movement routine. Keep the demonstration clear and avoid medical or guaranteed fitness claims.",
  },
  {
    id: "smarter-together",
    title: "Smarter Together",
    creator: "Edify Nepal",
    image: education,
    category: "Education",
    platforms: ["YouTube Shorts"],
    reward: 250,
    deadline: "2026-10-05",
    open: true,
    brief:
      "Turn a useful learning tip or study technique into a concise, easy-to-follow educational clip.",
  },
  {
    id: "explore-nepal",
    title: "Explore Nepal",
    creator: "Visit Nepal",
    image: travel,
    category: "Lifestyle",
    platforms: ["TikTok", "Instagram Reels", "YouTube Shorts"],
    reward: 250,
    deadline: "2026-09-30",
    open: true,
    brief:
      "Introduce a destination in Nepal through a short travel story that highlights the landscape and respects local communities.",
  },
];

export interface CampaignFiltersState {
  category: Category;
  platforms: Platform[];
  min: number;
  max: number;
  openOnly: boolean;
}
export const defaultFilters: CampaignFiltersState = {
  category: "All",
  platforms: [],
  min: 50,
  max: 500,
  openOnly: true,
};

export function filterCampaigns(
  records: Campaign[],
  search: string,
  filters: CampaignFiltersState,
) {
  const query = search.trim().toLocaleLowerCase();
  return records.filter(
    (campaign) =>
      `${campaign.title} ${campaign.creator}`
        .toLocaleLowerCase()
        .includes(query) &&
      (filters.category === "All" || campaign.category === filters.category) &&
      (!filters.platforms.length ||
        filters.platforms.some((platform) =>
          campaign.platforms.includes(platform),
        )) &&
      campaign.reward >= filters.min &&
      campaign.reward <= filters.max &&
      (!filters.openOnly || campaign.open),
  );
}

export function formatDeadline(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
