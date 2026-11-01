import { type ContributionDay } from "@/components/contributions-graph";
import { Record } from "@/components/record";
import { site } from "@/content/site";

const REVALIDATE_SECONDS = 60 * 60 * 6;

async function loadContributions(username: string): Promise<ContributionDay[] | null> {
  try {
    const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`, {
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!response.ok) return null;
    const data = (await response.json()) as { contributions?: ContributionDay[] };
    if (!data.contributions?.length) return null;
    return data.contributions.map((day) => ({
      date: day.date,
      count: day.count,
      level: day.level,
    }));
  } catch {
    return null;
  }
}

export async function Contributions() {
  if (!site.record.connected) return null;
  const days = await loadContributions(site.record.username);
  return <Record days={days} />;
}
