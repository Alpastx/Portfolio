"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { site } from "@/content/site";

export function Loader({ mark }: { mark: string }) {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (reduce) setVisible(false);
  }, [reduce]);

  if (!visible) return null;

  return (
    <div
      className="preloader fixed inset-0 z-[200] flex flex-col items-center justify-center gap-7 bg-background"
      onAnimationEnd={() => setVisible(false)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={mark}
        alt=""
        width={768}
        height={512}
        fetchPriority="high"
        decoding="sync"
        className="h-auto w-[min(72vw,18rem)]"
      />
      <p className="font-display text-lg tracking-tight text-muted-foreground italic">{site.loader.line}</p>
    </div>
  );
}
