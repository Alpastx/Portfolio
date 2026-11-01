"use client";

import { useEffect, useRef } from "react";

const COUNT = 180;

type Star = {
  x: number;
  y: number;
  r: number;
  alpha: number;
  speed: number;
  phase: number;
};

function makeStars(): Star[] {
  const stars: Star[] = [];
  for (let i = 0; i < COUNT; i++) {
    const n = Math.sin(i * 12.9898) * 43758.5453;
    const a = n - Math.floor(n);
    const b = Math.sin(i * 78.233) * 43758.5453;
    const c = b - Math.floor(b);
    stars.push({
      x: a,
      y: c,
      r: 0.4 + (i % 5) * 0.22,
      alpha: 0.18 + (i % 7) * 0.06,
      speed: 0.35 + (i % 4) * 0.2,
      phase: a * Math.PI * 2,
    });
  }
  return stars;
}

export function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const stars = makeStars();
    const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduce = reduceQuery.matches;
    let running = false;
    let raf = 0;

    let width = 0;
    let height = 0;

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#fff";
      for (const star of stars) {
        const flicker = reduce ? 1 : 0.55 + 0.45 * Math.sin(time * 0.001 * star.speed + star.phase);
        ctx.globalAlpha = star.alpha * flicker;
        ctx.beginPath();
        ctx.arc(star.x * width, star.y * height, star.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(performance.now());
    };

    const loop = (time: number) => {
      if (!running) return;
      draw(time);
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const sync = () => {
      reduce = reduceQuery.matches;
      if (reduce || document.hidden) {
        stop();
        draw(0);
        return;
      }
      start();
    };

    const observer = new ResizeObserver(resize);
    const boot = () => {
      resize();
      observer.observe(canvas);
      sync();
    };
    const idleId = window.requestIdleCallback?.(boot, { timeout: 1200 });
    const timeoutId = idleId == null ? window.setTimeout(boot, 200) : 0;
    document.addEventListener("visibilitychange", sync);
    reduceQuery.addEventListener("change", sync);

    return () => {
      if (idleId != null) window.cancelIdleCallback(idleId);
      window.clearTimeout(timeoutId);
      stop();
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      reduceQuery.removeEventListener("change", sync);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-0 h-dvh w-full" />;
}
