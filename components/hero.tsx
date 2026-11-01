"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { PinIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { site } from "@/content/site";

export function Hero() {
  const reduce = useReducedMotion();
  const titles = site.profile.titles;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce || titles.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % titles.length);
    }, 2400);
    return () => window.clearInterval(id);
  }, [reduce, titles.length]);

  return (
    <section id="hero">
      <Reveal>
        <div className="flex items-center gap-4 sm:gap-5">
          <div className="relative size-14 shrink-0 overflow-hidden rounded-full border border-white/10 shadow-lg ring-4 ring-muted sm:size-[4.5rem]">
            <Image
              src={site.profile.photo}
              alt=""
              fill
              sizes="72px"
              loading="eager"
              fetchPriority="high"
              className="object-cover object-center"
            />
          </div>
          <div className="flex min-w-0 flex-col gap-2">
            <h1 className="font-display text-[2.25rem] leading-none font-normal tracking-[-0.03em] italic sm:text-[3rem]">
              {site.profile.name}
            </h1>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13.5px] leading-6 text-muted-foreground sm:text-sm">
              <span className="whitespace-nowrap">{site.profile.aka}</span>
              <span aria-hidden className="text-muted-foreground/40">·</span>
              <span className="inline-flex items-center gap-1 whitespace-nowrap">
                <PinIcon className="size-3.5 text-muted-foreground/70" />
                {site.profile.location}
              </span>
              <span aria-hidden className="text-muted-foreground/40">·</span>
              <span className="inline-flex h-6 items-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={titles[index]}
                    initial={reduce ? false : { opacity: 0, y: 8, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={reduce ? undefined : { opacity: 0, y: -8, filter: "blur(4px)" }}
                    transition={{ duration: 0.35 }}
                    className="whitespace-nowrap text-foreground/85"
                  >
                    {titles[index]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
