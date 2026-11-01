"use client";

import { boardClass, Face } from "@/components/collage-face";
import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/section-header";
import { site, type CollageItem } from "@/content/site";
import { motion, useReducedMotion } from "motion/react";
import dynamic from "next/dynamic";
import { useRef, useState, useSyncExternalStore } from "react";

const CollageEditor =
  process.env.NODE_ENV === "development" ? dynamic(() => import("@/components/collage-editor"), { ssr: false }) : null;

const lift = {
  scale: 1.04,
  rotate: 0,
  zIndex: 50,
  transition: { type: "spring" as const, stiffness: 460, damping: 28 },
};

const finePointer = "(pointer: fine)";

function subscribePointer(onChange: () => void) {
  const query = window.matchMedia(finePointer);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function useFinePointer() {
  return useSyncExternalStore(
    subscribePointer,
    () => window.matchMedia(finePointer).matches,
    () => false,
  );
}

const desktopBoard = "(min-width: 768px)";

function subscribeDesktop(onChange: () => void) {
  const query = window.matchMedia(desktopBoard);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function useDesktopBoard() {
  return useSyncExternalStore(
    subscribeDesktop,
    () => window.matchMedia(desktopBoard).matches,
    () => false,
  );
}

function BoardItem({
  item,
  reduce,
  draggable,
  bounds,
}: {
  item: CollageItem;
  reduce: boolean;
  draggable: boolean;
  bounds: React.RefObject<HTMLDivElement | null>;
}) {
  const interactive = draggable && !reduce;

  return (
    <motion.div
      className={`absolute select-none ${interactive ? "cursor-grab active:cursor-grabbing" : ""}`}
      style={{ left: `${item.x}%`, top: `${item.y}%`, width: `${item.width}%`, zIndex: item.z, rotate: item.rotate }}
      whileHover={interactive ? lift : undefined}
      whileDrag={interactive ? lift : undefined}
      drag={interactive}
      dragConstraints={bounds}
      dragElastic={0.12}
      dragMomentum={false}
      tabIndex={-1}
    >
      <Face item={item} />
    </motion.div>
  );
}

export function Collage() {
  const reduce = useReducedMotion() === true;
  const fine = useFinePointer();
  const desktop = useDesktopBoard();
  const bounds = useRef<HTMLDivElement>(null);
  const [editing, setEditing] = useState(false);

  const hint =
    fine && !reduce ? <span className="hidden text-[13px] text-muted-foreground md:inline">{site.collageHint}</span> : null;

  return (
    <section id="collage" className="flex w-full min-w-0 flex-col gap-y-6 overflow-visible">
      <Reveal>
        <SectionHeader
          title={site.collageTitle}
          aside={
            CollageEditor ? (
              <button
                type="button"
                onClick={() => setEditing((on) => !on)}
                className="hidden rounded-md border border-dashed border-sky-400/50 px-2 py-1 font-mono text-[11px] text-sky-300 md:inline"
              >
                {editing ? "exit layout editor" : "edit layout (dev)"}
              </button>
            ) : (
              hint
            )
          }
        />
      </Reveal>
      <Reveal>
        <p className="text-[13px] text-muted-foreground md:hidden">canvas isn't available on mobile</p>
        <div className="relative w-full md:left-1/2 md:w-[min(96vw,88rem)] md:-translate-x-1/2">
          {desktop ? (
            CollageEditor && editing ? (
              <CollageEditor items={site.collage} />
            ) : (
              <div ref={bounds} className={`${boardClass} overflow-hidden`}>
                {site.collage.map((item) => (
                  <BoardItem key={item.src} item={item} reduce={reduce} draggable={fine} bounds={bounds} />
                ))}
              </div>
            )
          ) : (
            <div className={`${boardClass} hidden md:block`} />
          )}
        </div>
      </Reveal>
    </section>
  );
}
