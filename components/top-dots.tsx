"use client";

import { useEffect, useRef } from "react";

const SQUARE = 2;
const GAP = 2;
const FLICKER = 0.3;
const MAX_OPACITY = 0.3;
const SHADES = Array.from({ length: 24 }, (_, index) => {
  const alpha = ((index / 23) * MAX_OPACITY).toFixed(4);
  return `rgba(137, 180, 250, ${alpha})`;
});

export function TopDots() {
  const frameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const canvas = canvasRef.current;
    if (!frame || !canvas) return;
    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    let opacities = new Float32Array(0);
    let columns = 0;
    let frameId = 0;
    let last = 0;
    let visible = true;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const metrics = () => {
      const width = frame.clientWidth;
      const ratio = width ? canvas.width / width : 1;
      return { pitch: (SQUARE + GAP) * ratio, size: SQUARE * ratio };
    };

    const paintCell = (index: number, pitch: number, size: number) => {
      const column = index % columns;
      const row = (index / columns) | 0;
      const x = column * pitch;
      const y = row * pitch;
      context.clearRect(x, y, pitch, pitch);
      const shade = Math.min(23, (opacities[index] * 23) | 0);
      context.fillStyle = SHADES[shade];
      context.fillRect(x, y, size, size);
    };

    const draw = () => {
      const width = frame.clientWidth;
      const height = frame.clientHeight;
      if (!width || !height || !columns) return;
      const { pitch, size } = metrics();
      context.clearRect(0, 0, canvas.width, canvas.height);
      for (let index = 0; index < opacities.length; index += 1) {
        const shade = Math.min(23, (opacities[index] * 23) | 0);
        if (shade === 0) continue;
        context.fillStyle = SHADES[shade];
        const column = index % columns;
        const row = (index / columns) | 0;
        context.fillRect(column * pitch, row * pitch, size, size);
      }
    };

    const resize = () => {
      const width = frame.clientWidth;
      const height = frame.clientHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(width * ratio));
      canvas.height = Math.max(1, Math.floor(height * ratio));
      columns = Math.max(Math.floor(width / (SQUARE + GAP)), 0);
      const rows = Math.max(Math.floor(height / (SQUARE + GAP)), 0);
      opacities = new Float32Array(columns * rows);
      for (let index = 0; index < opacities.length; index += 1) {
        opacities[index] = Math.random();
      }
      draw();
    };

    const tick = (now: number) => {
      frameId = requestAnimationFrame(tick);
      if (!visible || now - last < 80) return;
      const delta = last ? Math.min((now - last) / 1000, 0.1) : 0;
      last = now;
      if (!columns) return;
      const { pitch, size } = metrics();
      const updates = Math.round(opacities.length * FLICKER * delta);
      for (let step = 0; step < updates; step += 1) {
        const index = (Math.random() * opacities.length) | 0;
        opacities[index] = Math.random();
        paintCell(index, pitch, size);
      }
    };

    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    const boot = () => {
      resize();
      resizeObserver.observe(frame);
      intersectionObserver.observe(frame);
      if (!reduce) frameId = requestAnimationFrame(tick);
    };
    const idleId = window.requestIdleCallback?.(boot, { timeout: 1200 });
    const timeoutId = idleId == null ? window.setTimeout(boot, 200) : 0;

    return () => {
      if (idleId != null) window.cancelIdleCallback(idleId);
      window.clearTimeout(timeoutId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div
      ref={frameRef}
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[220px] overflow-hidden"
      style={{
        maskImage: "linear-gradient(to bottom, black, transparent)",
        WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
      }}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
