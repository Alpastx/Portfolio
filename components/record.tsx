"use client";

import { ContributionsGraph, type ContributionDay } from "@/components/contributions-graph";
import { HtbRecord } from "@/components/htb-record";
import { GithubIcon, HtbIcon } from "@/components/icons";
import { Mark } from "@/components/mark";
import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/section-header";
import { site } from "@/content/site";
import { Award, Flag, HandHelping, type LucideIcon } from "lucide-react";
import { useRef, useState, type ComponentType } from "react";

const sources: { id: "htb" | "github" | "volunteering" | "honors" | "ctfs"; label: string; icon: ComponentType<{ className?: string }> | LucideIcon }[] = [
  { id: "htb", label: "Hack The Box", icon: HtbIcon },
  { id: "github", label: "GitHub", icon: GithubIcon },
  { id: "volunteering", label: "Volunteering", icon: HandHelping },
  { id: "honors", label: "Honors and awards", icon: Award },
  { id: "ctfs", label: "CTF's", icon: Flag },
];

export function Record({ days }: { days: ContributionDay[] | null }) {
  const [source, setSource] = useState(sources[0].id);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const href = source === "github" && site.record.connected && site.record.url ? site.record.url : undefined;

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % sources.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + sources.length) % sources.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = sources.length - 1;
    else return;
    event.preventDefault();
    setSource(sources[next].id);
    tabs.current[next]?.focus();
  };

  return (
    <section id="record" className="below-fold flex w-full flex-col gap-y-6">
      <Reveal delay={1}>
        <SectionHeader title={site.record.title} href={href} external />
      </Reveal>
      <Reveal delay={1}>
        <div role="tablist" aria-label="Record source" className="flex flex-wrap gap-1.5">
          {sources.map((item, index) => {
            const selected = source === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                ref={(node) => {
                  tabs.current[index] = node;
                }}
                id={`record-tab-${item.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="record-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setSource(item.id)}
                onKeyDown={(event) => onKeyDown(event, index)}
                className={`inline-flex h-7 touch-manipulation items-center gap-1.5 rounded-md px-2 text-[12px] font-medium leading-[18px] transition-colors [-webkit-tap-highlight-color:transparent] ${
                  selected
                    ? "bg-linear-to-b from-zinc-600 via-zinc-800 to-black text-white ring-1 ring-white/15"
                    : "border border-white/10 text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="size-3.5" />
                {item.label}
              </button>
            );
          })}
        </div>
        <div id="record-panel" role="tabpanel" aria-labelledby={`record-tab-${source}`} className="mt-5">
          {source === "htb" ? <HtbRecord /> : null}
          {source === "github" ? <ContributionsGraph days={days} /> : null}
          {source === "volunteering" ? <RecordEntries compact items={site.record.volunteering} /> : null}
          {source === "honors" ? <RecordEntries items={site.record.honors} /> : null}
          {source === "ctfs" ? <RecordEntries compact items={site.record.ctfs} /> : null}
        </div>
      </Reveal>
    </section>
  );
}

function RecordEntries({
  items,
  compact = false,
}: {
  compact?: boolean;
  items: readonly {
    title: string;
    org?: string;
    dates?: string;
    meta: string;
    mark: string;
    logo?: string;
    href?: string;
    summary: string;
    photos?: readonly { src: string; alt: string }[];
  }[];
}) {
  return (
    <div className="flex flex-col gap-8">
      {items.map((item) => (
        <article key={item.title} className="flex items-start gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center">
            {item.logo ? (
              <img src={item.logo} alt="" className="max-h-10 max-w-10 object-contain" />
            ) : (
              <Mark>{item.mark}</Mark>
            )}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-3">
              <p className="font-medium">{item.title}</p>
              {item.dates ? (
                <span className="shrink-0 font-mono text-[12px] text-muted-foreground">{item.dates}</span>
              ) : null}
            </div>
            {item.org ? <p className="text-[13.5px] text-muted-foreground">{item.org}</p> : null}
            <p className="text-[13px] text-muted-foreground/80">{item.meta}</p>
            <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
              {item.summary}
              {item.href ? (
                <>
                  {" "}
                  <a href={item.href} className="text-foreground/80 hover:underline" target="_blank" rel="noreferrer">
                    ourtech.community
                  </a>
                </>
              ) : null}
            </p>
            {item.photos && item.photos.length > 0 ? (
              <div className={`mt-3 flex flex-wrap ${compact ? "gap-1.5" : "gap-2"}`}>
                {item.photos.map((photo) => (
                  <a
                    key={photo.src}
                    href={photo.src}
                    target="_blank"
                    rel="noreferrer"
                    className={`block overflow-hidden ring-1 ring-white/10 ${compact ? "rounded-md" : "rounded-lg"}`}
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className={`w-auto max-w-full object-cover ${compact ? "h-16 sm:h-20" : "h-32 sm:h-40"}`}
                    />
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
}
