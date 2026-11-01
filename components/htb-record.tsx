"use client";

import { site } from "@/content/site";
import { useMemo, useState } from "react";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const countFormat = new Intl.NumberFormat("en-US");
const weekFormat = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" });

function utc(date: string) {
  return new Date(`${date}T00:00:00Z`);
}

const HTB_FILLS = ["#3c4658", "#5a6234", "#7d9328", "#a4c42a", "#c6f54d"] as const;

function xpLevel(xp: number) {
  if (xp <= 0) return 0;
  if (xp < 500) return 1;
  if (xp < 1500) return 2;
  if (xp < 3500) return 3;
  return 4;
}

const card =
  "rounded-2xl border border-white/[0.06] bg-[#1b2433] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]";
const well = "rounded-xl bg-[#242e3f]";

function buildWeeks(start: string, weeks: number[]) {
  let previous = "";
  return weeks.map((xp, index) => {
    const weekStart = utc(start);
    weekStart.setUTCDate(weekStart.getUTCDate() + index * 7);
    const weekEnd = new Date(weekStart);
    weekEnd.setUTCDate(weekEnd.getUTCDate() + 6);
    const monthKey = `${weekEnd.getUTCFullYear()}-${weekEnd.getUTCMonth()}`;
    const month = monthKey === previous ? "" : MONTHS[weekEnd.getUTCMonth()];
    previous = monthKey;
    return {
      key: weekStart.toISOString().slice(0, 10),
      xp,
      month,
      label: `${xp === 0 ? "0 XP" : `${countFormat.format(xp)} XP`} · ${weekFormat.format(weekStart)} – ${weekFormat.format(weekEnd)}`,
    };
  });
}

export function HtbRecord() {
  const htb = site.record.htb;
  const weeks = useMemo(() => buildWeeks(htb.weekStart, htb.weeks), [htb.weekStart, htb.weeks]);
  const months = useMemo(() => {
    const groups: { key: string; label: string; cells: typeof weeks }[] = [];
    for (const week of weeks) {
      if (week.month || groups.length === 0) groups.push({ key: week.key, label: week.month, cells: [] });
      groups[groups.length - 1].cells.push(week);
    }
    return groups;
  }, [weeks]);
  const rows = Math.max(...months.map((month) => month.cells.length));
  const progress = Math.min(100, (htb.levelXp / htb.levelGoal) * 100);
  const [tip, setTip] = useState<{ label: string; left: number; top: number } | null>(null);

  const showTip = (label: string, cell: HTMLElement) => {
    const grid = cell.closest("[data-htb-grid]");
    if (!(grid instanceof HTMLElement)) return;
    const cellBox = cell.getBoundingClientRect();
    const gridBox = grid.getBoundingClientRect();
    setTip({
      label,
      left: cellBox.left - gridBox.left + cellBox.width / 2,
      top: cellBox.top - gridBox.top,
    });
  };

  return (
    <div className="flex flex-col gap-4 font-sans">
      <div
        className={`${card} relative overflow-hidden px-4 py-4 sm:px-5 sm:py-5`}
        style={{
          backgroundImage:
            "radial-gradient(ellipse 280px 220px at 10% 46%, rgba(255,48,88,0.42), transparent 68%), linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "auto, 24px 24px, 24px 24px",
        }}
      >
        <div className="flex items-center gap-5 sm:gap-10">
          <img
            src="/htb-rank-master.svg"
            alt=""
            className="size-[5.25rem] shrink-0 sm:size-[6.75rem]"
            style={{ filter: "drop-shadow(0 0 22px rgba(254,62,93,0.7))" }}
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-3">
              <p className="flex shrink-0 items-baseline gap-2 leading-none">
                <span className="text-[15px] text-[#9aa6b8]">Lvl</span>
                <span className="text-[2.15rem] font-semibold tracking-tight text-white">{htb.level}</span>
              </p>
              <span className="inline-flex shrink-0 items-center gap-1 rounded-md bg-[#2c3648] px-1.5 py-1 text-[11px] text-[#d5deea]">
                Level
                <span className="rounded-[3px] bg-[#7b5cff] px-1 py-px text-[10px] leading-none font-semibold text-white">
                  XP
                </span>
              </span>
              <div
                className="h-1 min-w-[4.5rem] flex-1 overflow-hidden rounded-full bg-[#121820]"
                role="meter"
                aria-valuenow={htb.levelXp}
                aria-valuemin={0}
                aria-valuemax={htb.levelGoal}
                aria-label={`Level ${htb.level}, ${htb.levelXp} of ${htb.levelGoal} XP`}
              >
                <div className="h-full rounded-full bg-[#9fef00]" style={{ width: `${progress}%` }} />
              </div>
              <p className="shrink-0 text-[13px] text-[#9aa6b8]">
                {htb.levelXp}/{htb.levelGoal}
              </p>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className={`${well} px-4 py-3`}>
                <p className="text-[17px] font-semibold text-white">{htb.rank}</p>
                <p className="text-[12px] text-[#8b98ab]">HTB Rank</p>
              </div>
              <div className={`${well} flex flex-col items-center justify-center px-4 py-3`}>
                <p className="flex gap-2 text-white" aria-label={`Grade ${htb.grade} out of 3`}>
                  {Array.from({ length: 3 }, (_, index) => (
                    <svg key={index} viewBox="0 0 12 12" className="size-3.5" aria-hidden>
                      <path
                        d="M6 1.1 10.7 6 6 10.9 1.3 6 6 1.1Z"
                        fill={index < htb.grade ? "currentColor" : "none"}
                        stroke="currentColor"
                        strokeWidth="1.15"
                      />
                    </svg>
                  ))}
                </p>
                <p className="mt-1.5 text-[12px] text-[#8b98ab]">Grade</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${card} px-4 py-4 sm:px-5 sm:py-5`}>
        <p className="text-[15px] text-white">
          <span className="font-semibold text-[#9fef00]">{htb.yearXp} XP</span> gained on Hack The Box in the last year
        </p>
        <div className="mt-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div
            data-htb-grid
            role="img"
            aria-label={`${htb.yearXp} XP gained on Hack The Box in the last year`}
            className="relative min-w-[520px]"
            onMouseLeave={() => setTip(null)}
          >
            <div
              className="grid gap-x-2.5 gap-y-2"
              style={{ gridTemplateColumns: `repeat(${months.length}, minmax(0, 1fr))` }}
            >
              {months.map((month) => (
                <span key={month.key} className="text-center text-[11px] text-[#8b98ab]">
                  {month.label}
                </span>
              ))}
              {Array.from({ length: rows }, (_, row) =>
                months.map((month) => {
                  const cell = month.cells[row];
                  if (!cell) return <span key={`${month.key}-${row}`} className="h-3.5" />;
                  return (
                    <span
                      key={cell.key}
                      className="block h-3.5 w-full rounded-[5px]"
                      style={{ backgroundColor: HTB_FILLS[xpLevel(cell.xp)] }}
                      title={cell.label}
                      onMouseEnter={(event) => showTip(cell.label, event.currentTarget)}
                    />
                  );
                }),
              )}
            </div>
            {tip ? (
              <div
                className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+8px)] rounded-md border border-white/10 bg-[#111] px-2 py-1 text-[11px] whitespace-nowrap text-white/80"
                style={{ left: tip.left, top: tip.top }}
              >
                {tip.label}
              </div>
            ) : null}
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3">
          <div className={`${well} px-4 py-3`}>
            <p className="text-[12px] text-[#8b98ab]">Weekly Average</p>
            <p className="mt-1 text-[18px] font-semibold text-white">{htb.weeklyAverage} XP</p>
          </div>
          <div className={`${well} px-4 py-3`}>
            <p className="text-[12px] text-[#8b98ab]">Total XP</p>
            <p className="mt-1 text-[18px] font-semibold text-white">{htb.totalXp}</p>
          </div>
          <div className={`${well} px-4 py-3`}>
            <p className="text-[12px] text-[#8b98ab]">Weeks Active</p>
            <p className="mt-1 text-[18px] font-semibold text-white">{htb.weeksActive} weeks</p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-6">
        <div>
          <h3 className="font-display text-lg tracking-tight text-muted-foreground italic">Certifications</h3>
          <div className="mt-3">
            <HtbCertCards items={site.certs.filter((item) => item.issuer === "Hack The Box")} />
          </div>
        </div>
        <CredentialList title="Events / CTF's" items={htb.events} />
      </div>
    </div>
  );
}

export function HtbCertCards({
  items = site.certs,
  plain = false,
}: {
  items?: readonly (typeof site.certs)[number][];
  plain?: boolean;
}) {
  return (
    <div className={plain ? "grid grid-cols-2 gap-x-8 gap-y-6" : "flex flex-col gap-3"}>
      {items.map((item) => {
        const className = plain
          ? "flex min-w-0 items-start gap-3"
          : `${card} flex items-center gap-4 px-4 py-3.5${item.href ? " transition-colors hover:bg-[#222c3d]" : ""}`;
        const body = (
          <>
            <img src={item.badge} alt="" className={`shrink-0 rounded-xl object-contain ${plain ? "size-11 sm:size-14" : "size-14"}`} />
            <div className="min-w-0">
              <p className="flex flex-wrap items-center gap-2 text-[15px] font-semibold text-white">
                {item.name}
                {plain ? null : (
                  <span className="rounded-md border border-white/15 bg-[#2a3446] px-1.5 py-0.5 text-[11px] font-medium tracking-wide text-[#c5d0e0]">
                    {item.code}
                  </span>
                )}
              </p>
              <p className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[13px] text-[#8b98ab]">
                {plain ? (
                  <>
                    <span className="font-medium tracking-wide">{item.code}</span>
                    <span aria-hidden>·</span>
                  </>
                ) : null}
                <span>{item.issuer}</span>
                <span aria-hidden>·</span>
                <span>{item.date}</span>
                <span aria-hidden>·</span>
                <span className="inline-flex items-center gap-1 text-[#9fef00]">
                  <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden>
                    <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.4" />
                    <path
                      d="M4.8 8.1 7 10.2 11.3 5.8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Verified
                </span>
              </p>
            </div>
          </>
        );
        return item.href ? (
          <a key={item.code} href={item.href} target="_blank" rel="noreferrer" className={className}>
            {body}
          </a>
        ) : (
          <article key={item.code} className={className}>
            {body}
          </article>
        );
      })}
    </div>
  );
}

function CredentialList({
  title,
  items,
  source,
  verified = false,
}: {
  title: string;
  items: readonly { name: string; date: string; code?: string; badge?: string; detail?: string }[];
  source?: string;
  verified?: boolean;
}) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-display text-lg tracking-tight text-muted-foreground italic">{title}</h3>
      {items.map((item) => (
        <article key={item.name} className="flex items-baseline justify-between gap-3">
          <div className="min-w-0">
            <p className="font-medium">
              {item.name}
              {item.code ? <span className="ml-2 font-mono text-[12px] font-normal text-muted-foreground">{item.code}</span> : null}
            </p>
            {source || verified ? (
              <p className="text-[13.5px] text-muted-foreground">
                {source}
                {verified ? <span className="text-success"> · Verified</span> : null}
              </p>
            ) : null}
            {item.detail ? <p className="mt-0.5 text-[13px] leading-relaxed text-muted-foreground/80">{item.detail}</p> : null}
          </div>
          <span className="shrink-0 font-mono text-[12px] text-muted-foreground">{item.date}</span>
        </article>
      ))}
    </div>
  );
}
