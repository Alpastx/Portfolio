"use client";

import { useMemo, useState } from "react";
export type ContributionDay = { date: string; count: number; level?: number };

export const RECORD_FILLS = ["#161616", "#1c2a44", "#2c4a78", "#5b87d4", "#89b4fa"] as const;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const WEEKDAYS = ["", "Mon", "", "Wed", "", "Fri", ""];

const dayFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});
const rangeFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

function utc(date: string) {
  return new Date(`${date}T00:00:00Z`);
}

function buildWeeks(days: ContributionDay[]) {
  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date));
  if (!sorted.length) return [];

  const byDate = new Map(sorted.map((day) => [day.date, day]));
  const start = utc(sorted[0].date);
  const end = utc(sorted[sorted.length - 1].date);
  start.setUTCDate(start.getUTCDate() - start.getUTCDay());

  const weeks: ContributionDay[][] = [];
  let week: ContributionDay[] = [];
  for (let time = start.getTime(); time <= end.getTime(); time += 86_400_000) {
    const date = new Date(time).toISOString().slice(0, 10);
    const found = byDate.get(date);
    week.push({ date, count: found?.count ?? 0, level: found?.level ?? 0 });
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length) weeks.push(week);
  return weeks;
}

function monthLabels(weeks: ContributionDay[][]) {
  const placed: { index: number; month: number }[] = [];
  let previous = -1;
  weeks.forEach((week, index) => {
    const month = utc(week[0].date).getUTCMonth();
    if (month === previous) return;
    previous = month;
    const last = placed[placed.length - 1];
    if (last && index - last.index < 2) placed.pop();
    placed.push({ index, month });
  });
  const labels = weeks.map(() => "");
  for (const item of placed) labels[item.index] = MONTHS[item.month];
  return labels;
}

function contributionLabel(count: number) {
  if (count === 0) return "No contributions";
  if (count === 1) return "1 contribution";
  return `${count} contributions`;
}

export function ContributionsGraph({ days }: { days: ContributionDay[] | null }) {
  const [tip, setTip] = useState<{ label: string; left: number; top: number } | null>(null);
  const weeks = useMemo(() => buildWeeks(days ?? []), [days]);
  const labels = useMemo(() => monthLabels(weeks), [weeks]);
  const total = useMemo(() => (days ?? []).reduce((sum, day) => sum + day.count, 0), [days]);
  const range =
    days && days.length > 0
      ? `${rangeFormat.format(utc(days[0].date))} — ${rangeFormat.format(utc(days[days.length - 1].date))}`
      : "";

  const showTip = (day: ContributionDay, cell: HTMLElement) => {
    const grid = cell.closest("[data-contribution-grid]");
    if (!(grid instanceof HTMLElement)) return;
    const cellBox = cell.getBoundingClientRect();
    const gridBox = grid.getBoundingClientRect();
    setTip({
      label: `${contributionLabel(day.count)} · ${dayFormat.format(utc(day.date))}`,
      left: cellBox.left - gridBox.left + cellBox.width / 2,
      top: cellBox.top - gridBox.top,
    });
  };

  if (!weeks.length) {
    return <p className="min-h-44 text-[14px] text-muted-foreground">GitHub contributions are unavailable right now.</p>;
  }

  return (
    <div className="min-h-44">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <p className="text-[13px] text-muted-foreground">
                <span className="font-display text-[1.35rem] tracking-tight text-foreground">{total}</span> in the last year
              </p>
              <p className="text-[12px] text-white/35">{range}</p>
            </div>
            <div className="mt-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div
                data-contribution-grid
                role="img"
                aria-label={`${total} GitHub contributions in the last year`}
                className="relative w-full min-w-[680px]"
                onMouseLeave={() => setTip(null)}
              >
                <div
                  className="grid w-full gap-[3px]"
                  style={{ gridTemplateColumns: `1.75rem repeat(${weeks.length}, minmax(0, 1fr))` }}
                >
                  {labels.map((label, index) => (
                    <span
                      key={`month-${index}`}
                      className="h-3.5 text-[10px] leading-[14px] whitespace-nowrap text-white/35"
                      style={{ gridColumn: index + 2, gridRow: 1 }}
                    >
                      {label}
                    </span>
                  ))}
                  {WEEKDAYS.map((label, index) => (
                    <span
                      key={`weekday-${index}`}
                      className="flex items-center text-[10px] text-white/30"
                      style={{ gridColumn: 1, gridRow: index + 2 }}
                    >
                      {label}
                    </span>
                  ))}
                  {weeks.flatMap((week, column) =>
                    week.map((day, row) => (
                      <span
                        key={day.date}
                        className="relative block"
                        style={{ gridColumn: column + 2, gridRow: row + 2 }}
                        onMouseEnter={(event) => showTip(day, event.currentTarget)}
                      >
                        <span
                          className="block w-full rounded-[2px] pb-[100%]"
                          style={{ backgroundColor: RECORD_FILLS[Math.min(day.level ?? 0, 4)] }}
                        />
                      </span>
                    )),
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
            <div className="mt-3 flex items-center justify-end gap-1 text-[10px] text-white/35">
              Less
              {RECORD_FILLS.map((fill) => (
                <span key={fill} aria-hidden className="size-[10px] rounded-[2px]" style={{ backgroundColor: fill }} />
              ))}
              More
            </div>
    </div>
  );
}
