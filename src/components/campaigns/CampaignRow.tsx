import { ArrowRight } from "@phosphor-icons/react";
import { formatDeadline, type Campaign } from "./campaign-data";

export function CampaignRow({ campaign }: { campaign: Campaign }) {
  return (
    <article className="campaign-row">
      <img src={campaign.image} alt="" width="209" height="118" />
      <div className="campaign-identity">
        <h2>{campaign.title}</h2>
        <p>by {campaign.creator}</p>
      </div>
      <div className="campaign-reward">
        <span>NPR per 1,000 verified views</span>
        <strong>NPR {campaign.reward}</strong>
      </div>
      <div className="campaign-deadline">
        <span>Deadline</span>
        <time dateTime={campaign.deadline}>
          {formatDeadline(campaign.deadline)}
        </time>
        <a
          href={`/campaigns/${campaign.id}`}
          aria-label={`View campaign: ${campaign.title}`}
        >
          View campaign <ArrowRight size={15} />
        </a>
      </div>
    </article>
  );
}
