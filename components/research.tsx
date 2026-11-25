import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Mark } from "@/components/mark";
import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/section-header";
import type { ResearchGroup, ResearchItem } from "@/content/site";
import { site } from "@/content/site";

function isCve(item: ResearchItem) {
  return item.title.startsWith("CVE-");
}

function ItemTitle({ item }: { item: ResearchItem }) {
  const cve = isCve(item);
  const className = cve
    ? "font-display text-[1.25rem] leading-tight tracking-[-0.01em] italic"
    : "font-medium";
  const label = cve ? (
    <>
      {item.detail}
      <span className="mx-2 text-muted-foreground/50" aria-hidden>
        /
      </span>
      <span className="sr-only"> </span>
      {item.title}
    </>
  ) : (
    item.title
  );

  if (!item.href) {
    return <p className={className}>{label}</p>;
  }

  return (
    <a href={item.href} className={`${className} hover:underline`} target="_blank" rel="noopener noreferrer">
      {label}
    </a>
  );
}

function formatStars(count: number) {
  if (count < 1000) return String(count);
  return `${(count / 1000).toFixed(1).replace(/\.0$/, "")}k`;
}

function StarCount({ count }: { count: number }) {
  return (
    <span className="flex shrink-0 items-center gap-1 font-mono text-[12px] text-muted-foreground">
      <svg viewBox="0 0 16 16" className="size-3" aria-hidden>
        <path
          fill="currentColor"
          d="M8 1.2 9.8 4.9l4.1.6-3 2.9.7 4.1L8 10.6 4.4 12.5l.7-4.1-3-2.9 4.1-.6L8 1.2Z"
        />
      </svg>
      {formatStars(count)}
    </span>
  );
}

const advisoryCounts: Record<string, string> = {
  One: "1",
  Two: "2",
  Three: "3",
  Four: "4",
  Five: "5",
  Six: "6",
  Seven: "7",
  Eight: "8",
  Nine: "9",
};

function advisoryCount(detail: string) {
  const [word, ...rest] = detail.split(" ");
  const digit = advisoryCounts[word];
  return digit ? `${digit} ${rest.join(" ")}` : detail;
}

function RowMeta({ item }: { item: ResearchItem }) {
  if (item.rating) {
    return (
      <span className={`font-mono text-[12px] ${item.rating === "High" || item.rating === "Critical" ? "text-critical" : "text-muted-foreground"}`}>
        {item.score ? `${item.score} ${item.rating}` : item.rating}
      </span>
    );
  }

  return <span className="font-mono text-[12px] text-muted-foreground">{item.dates}</span>;
}

function cveCount(item: ResearchItem) {
  const entries = site.research.flatMap((group) => group.entries ?? []);
  return entries.filter((entry) => entry.detail === item.title && entry.cve).length;
}

function Slash() {
  return (
    <>
      <span className="mx-1.5 text-muted-foreground/50" aria-hidden>
        /
      </span>
      <span className="sr-only"> </span>
    </>
  );
}

function AdvisoryCount({ item }: { item: ResearchItem }) {
  const severe = item.rating === "High" || item.rating === "Critical";
  const cves = cveCount(item);

  return (
    <p className="font-mono text-[12px]">
      <span className={severe ? "text-critical" : "text-muted-foreground"}>
        {item.score ? `${item.score} ` : ""}
        {item.rating?.toUpperCase()}
      </span>
      <Slash />
      <span className="text-muted-foreground">{advisoryCount(item.detail)}</span>
      {cves > 0 ? (
        <>
          <Slash />
          <span className="text-foreground">
            {cves} {cves === 1 ? "CVE" : "CVEs"}
          </span>
        </>
      ) : null}
    </p>
  );
}

function ResearchRow({ item, stacked }: { item: ResearchItem; stacked?: boolean }) {
  const star = item.stars != null ? <StarCount count={item.stars} /> : null;

  return (
    <article className="flex w-full min-w-0 items-center gap-3">
      <Mark logo={item.logo}>{item.mark}</Mark>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-3">
          <ItemTitle item={item} />
          <span className="flex shrink-0 items-center gap-3">
            {stacked ? null : <RowMeta item={item} />}
            {star}
          </span>
        </div>
        {stacked ? <AdvisoryCount item={item} /> : null}
        {isCve(item) || stacked ? null : (
          <p className="text-[13.5px] text-muted-foreground">
            {item.detail}
            {item.cve ? (
              <>
                <Slash />
                <a
                  href={`https://www.cve.org/CVERecord?id=${item.cve}`}
                  className="font-mono text-[12px] text-foreground hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.cve}
                </a>
              </>
            ) : null}
          </p>
        )}
        {item.note ? <p className="mt-1 text-[14px] leading-relaxed text-muted-foreground">{item.note}</p> : null}
      </div>
    </article>
  );
}

const severityRank: Record<string, number> = { Critical: 0, High: 1, Medium: 2, Low: 3 };

function bySeverityThenStars(items: ResearchItem[]) {
  return [...items].sort((a, b) => {
    const severity = (severityRank[a.rating ?? ""] ?? 4) - (severityRank[b.rating ?? ""] ?? 4);
    if (severity !== 0) return severity;
    const stars = (b.stars ?? 0) - (a.stars ?? 0);
    if (stars !== 0) return stars;
    return Number(b.score ?? 0) - Number(a.score ?? 0);
  });
}

function rankedItems(group: ResearchGroup) {
  return bySeverityThenStars(group.items);
}

export function ResearchList({ cardLimit, start = 0 }: { cardLimit?: number; start?: number }) {
  const groups = site.research.reduce<
    { group: ResearchGroup; compact: boolean; visible: ResearchItem[]; hidden: number; first: number }[]
  >((acc, group) => {
    const compact = group.layout === "cards" && cardLimit !== undefined;
    const ranked = !compact && group.entries ? bySeverityThenStars(group.entries) : rankedItems(group);
    const visible = compact ? ranked.slice(0, cardLimit) : ranked;
    const hidden = ranked.length - visible.length;
    const prev = acc.at(-1);
    const first = prev ? prev.first + (prev.group.title ? 1 : 0) + prev.visible.length : 0;
    acc.push({ group, compact, visible, hidden, first });
    return acc;
  }, []);
  const at = (step: number) => start + step * 0.1;

  return (
    <div className="flex flex-col gap-10">
      {groups.map(({ group, compact, visible, hidden, first }) => {
        const offset = first + (group.title ? 1 : 0);

        return (
          <div key={group.title} className="flex flex-col gap-y-4">
            <Reveal delay={at(first)}>
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-lg tracking-tight text-muted-foreground italic">{group.title}</h3>
                {hidden > 0 ? (
                  <Link
                    href="/research"
                    className="inline-flex shrink-0 items-center gap-1 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    +{hidden} more
                    <ArrowUpRight className="size-3.5" strokeWidth={1.75} aria-hidden />
                  </Link>
                ) : null}
              </div>
            </Reveal>
            <div className={compact ? "grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2" : "flex flex-col gap-y-5"}>
              {visible.map((item, index) => (
                <Reveal key={item.title} delay={at(offset + index)} className="min-w-0">
                  <ResearchRow item={item} stacked={compact} />
                </Reveal>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function Research() {
  return (
    <section id="field" className="flex flex-col gap-y-6">
      <Reveal delay={0.2}>
        <SectionHeader title={site.researchTitle} href="/research" />
      </Reveal>
      <ResearchList cardLimit={4} start={0.3} />
    </section>
  );
}
