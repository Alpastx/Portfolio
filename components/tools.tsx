"use client";

import { ToolChip } from "@/components/chip";
import { HtbCertCards } from "@/components/htb-record";
import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/section-header";
import { site, type ToolGroup } from "@/content/site";
import { AppWindow, Cloud, CodeXml, Database, Layers, Server, Shield, Sparkles, type LucideIcon } from "lucide-react";
import { useRef, useState } from "react";

const groups: { id: "all" | ToolGroup; label: string; icon: LucideIcon }[] = [
  { id: "all", label: "All", icon: Layers },
  { id: "languages", label: "Languages", icon: CodeXml },
  { id: "frontend", label: "Frontend", icon: AppWindow },
  { id: "backend", label: "Backend", icon: Server },
  { id: "databases", label: "Databases", icon: Database },
  { id: "security", label: "Security", icon: Shield },
  { id: "devops", label: "DevOps & Cloud", icon: Cloud },
  { id: "ai", label: "AI", icon: Sparkles },
];

export function Tools() {
  const [group, setGroup] = useState<(typeof groups)[number]["id"]>("all");
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const items =
    group === "all" ? site.tools.items : site.tools.items.filter((item) => item.group === group);

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % groups.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + groups.length) % groups.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = groups.length - 1;
    else return;
    event.preventDefault();
    setGroup(groups[next].id);
    tabs.current[next]?.focus();
  };

  return (
    <section id="skills" className="below-fold flex flex-col gap-y-6">
      <Reveal delay={1}>
        <SectionHeader title={site.tools.title} />
      </Reveal>
      <Reveal delay={1}>
        <div role="tablist" aria-label="Tool groups" className="flex flex-wrap gap-1.5">
          {groups.map((item, index) => {
            const selected = group === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                ref={(node) => {
                  tabs.current[index] = node;
                }}
                id={`tools-tab-${item.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="tools-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setGroup(item.id)}
                onKeyDown={(event) => onKeyDown(event, index)}
                className={`inline-flex h-7 touch-manipulation items-center gap-1.5 rounded-md px-2 text-[12px] font-medium leading-[18px] transition-colors [-webkit-tap-highlight-color:transparent] ${
                  selected
                    ? "bg-linear-to-b from-zinc-600 via-zinc-800 to-black text-white ring-1 ring-white/15"
                    : "border border-white/10 text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="size-3.5" strokeWidth={1.75} aria-hidden />
                {item.label}
              </button>
            );
          })}
        </div>
        <div
          id="tools-panel"
          role="tabpanel"
          aria-labelledby={`tools-tab-${group}`}
          className="mt-3 flex flex-wrap gap-x-4 gap-y-2.5"
        >
          {items.map((item) => (
            <ToolChip key={item.name} name={item.name} icon={item.icon} plain />
          ))}
        </div>
        <div className="mt-8">
          <h3 className="font-display text-lg tracking-tight text-muted-foreground italic">Certs</h3>
          <div className="mt-3">
            <HtbCertCards plain />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
