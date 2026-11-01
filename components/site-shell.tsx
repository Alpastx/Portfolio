"use client";

import { Dock } from "@/components/dock";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div aria-hidden className="pointer-events-none fixed inset-x-0 bottom-0 z-40 h-20">
        <div
          className="absolute inset-0 md:hidden"
          style={{
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            maskImage: "linear-gradient(to top, #000 25%, transparent)",
            WebkitMaskImage: "linear-gradient(to top, #000 25%, transparent)",
          }}
        />
        <ProgressiveBlur direction="bottom" blurLayers={4} blurIntensity={1.15} className="hidden size-full md:block" />
      </div>
      <Dock />
      {children}
    </>
  );
}
