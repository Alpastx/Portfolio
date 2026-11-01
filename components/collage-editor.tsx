"use client";

import { boardClass, Face } from "@/components/collage-face";
import type { CollageItem } from "@/content/site";
import { useCallback, useEffect, useRef, useState } from "react";

type Placement = Pick<CollageItem, "x" | "y" | "width" | "rotate" | "z">;
type Layout = Record<string, Placement>;
type Mode = "move" | "rotate" | "resize";

const round = (value: number) => Math.round(value * 10) / 10;

function toLayout(items: CollageItem[]): Layout {
  return Object.fromEntries(
    items.map(({ src, x, y, width, rotate, z }) => [src, { x, y, width, rotate, z }]),
  );
}

function label(src: string) {
  return src.split("/").pop()?.replace(/\.\w+$/, "") ?? src;
}

export default function CollageEditor({ items }: { items: CollageItem[] }) {
  const board = useRef<HTMLDivElement>(null);
  const [saved, setSaved] = useState(() => toLayout(items));
  const [layout, setLayout] = useState(saved);
  const [selected, setSelected] = useState<string | null>(null);
  const [status, setStatus] = useState("");

  const dirty = JSON.stringify(layout) !== JSON.stringify(saved);

  const update = useCallback((src: string, change: (current: Placement) => Partial<Placement>) => {
    setLayout((all) => {
      const current = all[src];
      const next = { ...current, ...change(current) };
      return {
        ...all,
        [src]: {
          x: round(next.x),
          y: round(next.y),
          width: round(Math.max(2, next.width)),
          rotate: round(next.rotate),
          z: Math.max(0, Math.round(next.z)),
        },
      };
    });
  }, []);

  const restack = (src: string, direction: "front" | "back") => {
    const zs = Object.values(layout).map((p) => p.z);
    update(src, () => ({ z: direction === "front" ? Math.max(...zs) + 1 : Math.max(0, Math.min(...zs) - 1) }));
  };

  const save = useCallback(async () => {
    setStatus("saving…");
    const response = await fetch("/api/collage-layout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: Object.entries(layout).map(([src, placement]) => ({ src, ...placement })) }),
    });
    if (response.ok) {
      setSaved(layout);
      setStatus("saved to content/site.ts");
    } else {
      setStatus(`save failed: ${(await response.json().catch(() => ({}))).error ?? response.status}`);
    }
  }, [layout]);

  const startGesture = (event: React.PointerEvent, src: string, mode: Mode) => {
    if (event.button !== 0 || !board.current) return;
    event.preventDefault();
    event.stopPropagation();
    setSelected(src);

    const rect = board.current.getBoundingClientRect();
    const target = (event.currentTarget as HTMLElement).closest<HTMLElement>("[data-item]");
    const box = (target ?? (event.currentTarget as HTMLElement)).getBoundingClientRect();
    const centerX = box.left + box.width / 2;
    const centerY = box.top + box.height / 2;
    const start = layout[src];
    const startX = event.clientX;
    const startY = event.clientY;
    const startAngle = Math.atan2(startY - centerY, startX - centerX);
    const startDistance = Math.max(1, Math.hypot(startX - centerX, startY - centerY));

    const onMove = (move: PointerEvent) => {
      if (mode === "move") {
        update(src, () => ({
          x: start.x + ((move.clientX - startX) / rect.width) * 100,
          y: start.y + ((move.clientY - startY) / rect.height) * 100,
        }));
      } else if (mode === "rotate") {
        const angle = Math.atan2(move.clientY - centerY, move.clientX - centerX);
        let rotate = start.rotate + ((angle - startAngle) * 180) / Math.PI;
        rotate = ((((rotate + 180) % 360) + 360) % 360) - 180;
        update(src, () => ({ rotate: move.shiftKey ? Math.round(rotate / 5) * 5 : rotate }));
      } else {
        const scale = Math.hypot(move.clientX - centerX, move.clientY - centerY) / startDistance;
        const width = start.width * scale;
        update(src, () => ({ width, x: start.x - (width - start.width) / 2 }));
      }
    };
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "s") {
        event.preventDefault();
        save();
        return;
      }
      if (!selected) return;
      const step = event.shiftKey ? 2 : 0.5;
      const keys: Record<string, (p: Placement) => Partial<Placement>> = {
        ArrowLeft: (p) => ({ x: p.x - step }),
        ArrowRight: (p) => ({ x: p.x + step }),
        ArrowUp: (p) => ({ y: p.y - step }),
        ArrowDown: (p) => ({ y: p.y + step }),
        "[": (p) => ({ rotate: p.rotate - (event.shiftKey ? 5 : 1) }),
        "]": (p) => ({ rotate: p.rotate + (event.shiftKey ? 5 : 1) }),
        "-": (p) => ({ width: p.width - step }),
        "=": (p) => ({ width: p.width + step }),
      };
      if (event.key === "Escape") setSelected(null);
      const change = keys[event.key];
      if (change) {
        event.preventDefault();
        update(selected, change);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected, save, update]);

  const current = selected ? layout[selected] : null;
  const button = "rounded border border-white/15 px-2 py-0.5 hover:bg-white/10 disabled:opacity-40";

  return (
    <div className="hidden flex-col gap-3 md:flex">
      <div className="flex flex-wrap items-center gap-2 rounded-lg border border-dashed border-sky-400/40 bg-sky-400/5 px-3 py-2 font-mono text-[11px] text-sky-100">
        {current && selected ? (
          <>
            <span className="text-sky-300">{label(selected)}</span>
            <span className="text-white/50">
              x {current.x} · y {current.y} · w {current.width} · tilt {current.rotate}° · z {current.z}
            </span>
            <button type="button" className={button} onClick={() => restack(selected, "back")}>
              send back
            </button>
            <button type="button" className={button} onClick={() => restack(selected, "front")}>
              bring front
            </button>
          </>
        ) : (
          <span className="text-white/50">
            Click an item. Drag to move, top dot to tilt (shift snaps 5°), corner square to resize. Arrows nudge, [ ]
            tilt, - = resize.
          </span>
        )}
        <span className="ml-auto text-white/50">{status}</span>
        <button type="button" className={button} disabled={!dirty} onClick={() => setLayout(saved)}>
          reset
        </button>
        <button type="button" className={`${button} border-sky-400/60 text-sky-200`} disabled={!dirty} onClick={save}>
          save ⌘S
        </button>
      </div>
      <div
        ref={board}
        className={`${boardClass} outline-1 outline-sky-400/30 outline-dashed`}
        onPointerDown={() => setSelected(null)}
      >
        {items.map((item) => {
          const placement = layout[item.src];
          const active = item.src === selected;
          return (
            <div
              key={item.src}
              data-item
              onPointerDown={(event) => startGesture(event, item.src, "move")}
              className={`absolute cursor-move touch-none select-none ${active ? "outline-1 outline-offset-2 outline-sky-400 outline-solid" : "hover:outline-1 hover:outline-sky-400/40 hover:outline-dashed"}`}
              style={{
                left: `${placement.x}%`,
                top: `${placement.y}%`,
                width: `${placement.width}%`,
                zIndex: placement.z,
                transform: `rotate(${placement.rotate}deg)`,
              }}
            >
              <Face item={item} />
              {active ? (
                <>
                  <span className="absolute -top-7 left-1/2 h-5 w-px -translate-x-1/2 bg-sky-400" />
                  <span
                    onPointerDown={(event) => startGesture(event, item.src, "rotate")}
                    className="absolute -top-9 left-1/2 size-3.5 -translate-x-1/2 cursor-grab rounded-full border-2 border-sky-400 bg-black"
                  />
                  <span
                    onPointerDown={(event) => startGesture(event, item.src, "resize")}
                    className="absolute -right-2 -bottom-2 size-3.5 cursor-nwse-resize border-2 border-sky-400 bg-black"
                  />
                </>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
