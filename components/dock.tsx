"use client";

import { GithubIcon, LinkedinIcon } from "@/components/icons";
import {
  ExpandableActionBar,
  type ExpandableActionBarItem,
} from "@/components/ui/be-ui-expanable-action-bar";
import { site } from "@/content/site";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Home, Mail, Notebook, Play, Volume2, VolumeX } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const ISLAND_EASE = [0.22, 1, 0.36, 1] as const;

function NowPlaying({ onToggle }: { onToggle: () => void }) {
  const track = site.nowPlaying;

  return (
    <button
      type="button"
      aria-label={`Pause ${track.title}`}
      onClick={onToggle}
      className="flex w-full flex-col text-left"
    >
      <span className="relative aspect-[16/10] w-full overflow-hidden">
        <Image src={track.art} alt="" fill sizes="280px" className="object-cover" />
        <span className="absolute right-2.5 bottom-2.5 grid size-8 place-items-center rounded-full bg-white text-black shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
          <Play className="size-3.5 translate-x-px fill-current" />
        </span>
      </span>
      <span className="px-3.5 pt-2.5 pb-1.5">
        <span className="block truncate text-[15px] font-medium leading-tight text-white">{track.title}</span>
        <span className="mt-0.5 block truncate text-[12px] text-white/45">{track.artist}</span>
      </span>
    </button>
  );
}

export function Dock() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [soundOn, setSoundOn] = useState(false);
  const [islandOpen, setIslandOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearHideTimer = useCallback(() => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
  }, []);

  const revealIsland = useCallback(() => {
    setIslandOpen(true);
    clearHideTimer();
    hideTimer.current = setTimeout(() => setIslandOpen(false), 3000);
  }, [clearHideTimer]);

  const ensureAudio = useCallback(() => {
    const existing = audioRef.current;
    if (existing) return existing;
    const audio = new Audio();
    audio.preload = "none";
    audio.src = site.soundSrc;
    const restart = () => {
      audio.currentTime = site.soundStart;
      void audio.play();
    };
    audio.addEventListener("ended", restart);
    audioRef.current = audio;
    return audio;
  }, []);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
      clearHideTimer();
    };
  }, [clearHideTimer]);

  const toggleSound = useCallback(() => {
    if (soundOn) {
      audioRef.current?.pause();
      setSoundOn(false);
      setIslandOpen(false);
      clearHideTimer();
      return;
    }
    const audio = ensureAudio();
    const cue = () => {
      audio.currentTime = site.soundStart;
    };
    if (audio.readyState >= HTMLMediaElement.HAVE_METADATA) cue();
    else audio.addEventListener("loadedmetadata", cue, { once: true });
    void audio.play().then(() => {
      setSoundOn(true);
      revealIsland();
    }).catch(() => {
      setSoundOn(false);
    });
  }, [clearHideTimer, ensureAudio, revealIsland, soundOn]);

  const activeId = pathname.startsWith("/blog") ? "notes" : pathname === "/" ? "home" : undefined;

  const items = useMemo<ExpandableActionBarItem[]>(
    () => [
      {
        id: "home",
        label: "Home",
        icon: <Home className="size-full" />,
        href: "/",
        active: pathname === "/",
      },
      {
        id: "notes",
        label: "Notes",
        icon: <Notebook className="size-full" />,
        href: "/blog",
        active: pathname.startsWith("/blog"),
      },
      {
        id: "github",
        label: "GitHub",
        icon: <GithubIcon className="size-full" />,
        href: site.profile.github,
        external: true,
        disabled: !site.profile.github,
      },
      {
        id: "linkedin",
        label: "LinkedIn",
        icon: <LinkedinIcon className="size-full" />,
        href: site.profile.linkedin,
        external: true,
        disabled: !site.profile.linkedin,
      },
      {
        id: "email",
        label: "Email",
        icon: <Mail className="size-full" />,
        href: `mailto:${site.profile.email}`,
      },
      {
        id: "sound",
        label: soundOn ? "Sound on" : "Sound off",
        icon: soundOn ? (
          <Volume2 className="size-full" />
        ) : (
          <VolumeX className="size-full text-critical" />
        ),
        onClick: toggleSound,
      },
    ],
    [pathname, soundOn, toggleSound],
  );

  return (
    <div className="fixed inset-x-0 z-50 flex items-end justify-center px-3 bottom-[max(1rem,env(safe-area-inset-bottom))]">
      <motion.div
        initial={false}
        animate={{
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          borderBottomLeftRadius: islandOpen ? 14 : 24,
          borderBottomRightRadius: islandOpen ? 14 : 24,
        }}
        transition={reduce ? { duration: 0.01 } : { duration: 0.18, ease: ISLAND_EASE }}
        className="flex w-max flex-col items-center overflow-hidden border border-white/10 bg-black/92 shadow-[0_18px_50px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)]"
      >
        <AnimatePresence initial={false}>
          {islandOpen ? (
            <motion.div
              key="now-playing"
              initial={reduce ? false : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{
                height: 0,
                opacity: 0,
                transition: {
                  height: { duration: 0.5, ease: ISLAND_EASE },
                  opacity: { duration: 0.22, ease: ISLAND_EASE },
                },
              }}
              transition={
                reduce
                  ? { duration: 0.01 }
                  : {
                      height: { duration: 0.55, ease: ISLAND_EASE },
                      opacity: { duration: 0.4, delay: 0.06, ease: ISLAND_EASE },
                    }
              }
              className="w-full overflow-hidden"
            >
              <NowPlaying onToggle={toggleSound} />
            </motion.div>
          ) : null}
        </AnimatePresence>
        <ExpandableActionBar
          items={items}
          size="sm"
          activeId={activeId}
          collapseDelay={180}
          className="max-w-full shrink-0"
          classNames={{
            track: "max-w-full border-0 bg-transparent !px-2.5 shadow-none backdrop-blur-none max-sm:min-h-8 max-sm:gap-0.5 max-sm:!px-1.5",
            item: "max-sm:h-7 max-sm:min-w-7 max-sm:px-0",
            icon: "max-sm:h-3.5 max-sm:w-3.5",
          }}
        />
      </motion.div>
    </div>
  );
}
