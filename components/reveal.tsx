"use client";

import { useEffect, useRef } from "react";

let observer: IntersectionObserver | null = null;

function watch(el: HTMLElement) {
  observer ??= new IntersectionObserver(
    (entries) => {
      entries
        .filter((entry) => entry.isIntersecting)
        .forEach((entry, index) => {
          const target = entry.target as HTMLElement;
          target.style.setProperty("--reveal-stagger", `${Math.min(index * 0.1, 0.5)}s`);
          observer?.unobserve(target);
          const revealAt = (window as Window & { __revealAt?: number }).__revealAt ?? 0;
          const wait = revealAt - performance.now();
          const start = () => {
            target.dataset.reveal = "in";
          };
          if (wait > 0) window.setTimeout(start, wait);
          else start();
        });
    },
    { rootMargin: "0px 0px -8% 0px" },
  );
  observer.observe(el);
  return () => observer?.unobserve(el);
}

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || el.dataset.reveal === "boot") return;
    if (el.getBoundingClientRect().top < window.innerHeight) {
      delete el.dataset.reveal;
      return;
    }
    el.dataset.reveal = "wait";
    return watch(el);
  }, []);

  return (
    <div
      ref={ref}
      suppressHydrationWarning
      className={className ? `reveal ${className}` : "reveal"}
      style={delay ? ({ "--reveal-delay": `${Math.min(delay, 1)}s` } as React.CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}
