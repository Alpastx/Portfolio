"use client";

import {
  LayoutGroup,
  motion,
  useReducedMotion,
  type Transition,
} from "motion/react";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type FocusEvent,
  type MouseEvent,
  type ReactNode,
} from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type ExpandableActionBarSize = "sm" | "md";

export type ExpandableActionBarItem = {
  id: string;
  label: ReactNode;
  icon: ReactNode;
  href?: string;
  external?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  active?: boolean;
  badge?: ReactNode;
  shortcut?: ReactNode;
};

export type ExpandableActionBarClassNames = {
  root?: string;
  track?: string;
  item?: string;
  activeItem?: string;
  icon?: string;
  label?: string;
  badge?: string;
  shortcut?: string;
};

export interface ExpandableActionBarProps {
  items: ExpandableActionBarItem[];
  expanded?: boolean;
  defaultExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  activeId?: string;
  onAction?: (item: ExpandableActionBarItem) => void;
  size?: ExpandableActionBarSize;
  expandOnHover?: boolean;
  expandOnFocus?: boolean;
  collapseDelay?: number;
  className?: string;
  classNames?: ExpandableActionBarClassNames;
  renderItem?: (
    item: ExpandableActionBarItem,
    state: { expanded: boolean; active: boolean },
  ) => ReactNode;
}

const ITEM_TRANSITION: Transition = {
  type: "tween",
  duration: 0.32,
  ease: [0.22, 1, 0.36, 1],
};

const LABEL_TRANSITION: Transition = {
  type: "tween",
  duration: 0.28,
  ease: [0.22, 1, 0.36, 1],
};

function useCanExpand() {
  const query = "(hover: hover) and (pointer: fine) and (min-width: 640px)";
  return useSyncExternalStore(
    (onChange) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => true,
  );
}

const SIZE_CLASS: Record<ExpandableActionBarSize, string> = {
  sm: "min-h-9 gap-1 p-1 text-xs",
  md: "min-h-11 gap-1.5 p-1.5 text-sm",
};

const ITEM_SIZE_CLASS: Record<ExpandableActionBarSize, string> = {
  sm: "h-7 min-w-7 px-1.5",
  md: "h-8 min-w-8 px-2",
};

const ICON_SIZE_CLASS: Record<ExpandableActionBarSize, string> = {
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
};

const MotionLink = motion.create(Link);

function useControllableExpanded({
  expanded,
  defaultExpanded,
  onExpandedChange,
}: {
  expanded?: boolean;
  defaultExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
}) {
  const [internalExpanded, setInternalExpanded] = useState(
    defaultExpanded ?? false,
  );

  const isControlled = expanded !== undefined;
  const value = expanded ?? internalExpanded;

  const setValue = useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalExpanded(next);
      onExpandedChange?.(next);
    },
    [isControlled, onExpandedChange],
  );

  return [value, setValue] as const;
}

export function ExpandableActionBar({
  items,
  expanded,
  defaultExpanded = false,
  onExpandedChange,
  activeId,
  onAction,
  size = "md",
  expandOnHover = true,
  expandOnFocus = true,
  collapseDelay = 90,
  className,
  classNames,
  renderItem,
}: ExpandableActionBarProps) {
  const reduce = useReducedMotion();
  const layoutId = useId();
  const canExpand = useCanExpand() && !reduce;

  const [isExpanded, setIsExpanded] = useControllableExpanded({
    expanded,
    defaultExpanded,
    onExpandedChange,
  });

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const collapseTimer = useRef<number | null>(null);

  const clearCollapseTimer = useCallback(() => {
    if (collapseTimer.current) window.clearTimeout(collapseTimer.current);
    collapseTimer.current = null;
  }, []);

  const open = useCallback(() => {
    clearCollapseTimer();
    setIsExpanded(true);
  }, [clearCollapseTimer, setIsExpanded]);

  const close = useCallback(() => {
    clearCollapseTimer();

    const timer = window.setTimeout(() => {
      setIsExpanded(false);
      setHoveredId(null);
    }, collapseDelay);

    collapseTimer.current = timer;
  }, [clearCollapseTimer, collapseDelay, setIsExpanded]);

  useEffect(() => clearCollapseTimer, [clearCollapseTimer]);

  const onRootMouseEnter = () => {
    if (expandOnHover && canExpand) open();
  };

  const onRootMouseLeave = () => {
    setHoveredId(null);
    if (expandOnHover && canExpand) close();
  };

  const onRootFocus = () => {
    if (expandOnFocus && canExpand) open();
  };

  const onRootBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (event.currentTarget.matches(":hover")) return;
    if (
      !event.currentTarget.contains(event.relatedTarget as Node) &&
      expandOnFocus
    ) {
      close();
    }
  };

  const activeItemId = activeId ?? items.find((item) => item.active)?.id;
  const highlightId = hoveredId ?? activeItemId;
  const showLabels = isExpanded && canExpand;

  return (
    <LayoutGroup id={layoutId}>
      <motion.div
        onMouseEnter={onRootMouseEnter}
        onMouseLeave={onRootMouseLeave}
        onFocus={onRootFocus}
        onBlur={onRootBlur}
        className={cn("inline-flex max-w-full", classNames?.root, className)}
      >
        <motion.div
          className={cn(
            "relative inline-flex max-w-full items-center overflow-hidden rounded-full border border-border bg-card/90 shadow-2xl backdrop-blur-xl",
            SIZE_CLASS[size],
            classNames?.track,
          )}
        >
          {items.map((item) => {
            const isActive = item.active || activeId === item.id;
            const isHighlighted = highlightId === item.id;
            const label = typeof item.label === "string" ? item.label : undefined;
            const href = item.disabled ? undefined : item.href;
            const openBlank = Boolean(href && (item.external || href.startsWith("http")));
            const className = cn(
              "relative isolate inline-flex touch-manipulation items-center justify-center overflow-hidden rounded-full font-medium text-muted-foreground transition-[color,background-color] duration-200 ease-out [-webkit-tap-highlight-color:transparent]",
              "focus-visible:text-foreground focus-visible:shadow-[inset_0_0_0_2px_var(--signal)] disabled:pointer-events-none disabled:opacity-40",
              isHighlighted && "text-foreground",
              ITEM_SIZE_CLASS[size],
              classNames?.item,
              isActive && classNames?.activeItem,
            );
            const onMouseEnter = () => {
              if (!canExpand) return;
              clearCollapseTimer();
              setHoveredId(item.id);
            };
            const onClick = (event: MouseEvent<HTMLElement>) => {
              if (event.detail !== 0) event.currentTarget.blur();
              item.onClick?.();
              onAction?.(item);
            };
            const body = (
              <>
                {isHighlighted ? (
                  <motion.span
                    layoutId="action-bar-highlight"
                    transition={ITEM_TRANSITION}
                    className="absolute inset-0 -z-10 rounded-full bg-white/10"
                  />
                ) : null}

                {renderItem ? (
                  renderItem(item, {
                    expanded: isExpanded,
                    active: isActive,
                  })
                ) : (
                  <>
                    <span
                      className={cn(
                        "inline-flex shrink-0 items-center justify-center",
                        ICON_SIZE_CLASS[size],
                        classNames?.icon,
                      )}
                    >
                      {item.icon}
                    </span>

                    <motion.span
                      aria-hidden={!showLabels}
                      animate={{
                        width: showLabels ? "auto" : 0,
                        opacity: showLabels ? 1 : 0,
                        marginLeft: showLabels ? 8 : 0,
                      }}
                      transition={reduce ? { duration: 0 } : LABEL_TRANSITION}
                      className={cn(
                        "inline-block overflow-hidden whitespace-nowrap",
                        classNames?.label,
                      )}
                    >
                      {item.label}
                    </motion.span>

                    {item.shortcut ? (
                      <motion.span
                        aria-hidden={!isExpanded}
                        animate={{
                          width: isExpanded ? "auto" : 0,
                          opacity: isExpanded ? 1 : 0,
                          marginLeft: isExpanded ? 4 : 0,
                        }}
                        transition={LABEL_TRANSITION}
                        className={cn(
                          "hidden overflow-hidden whitespace-nowrap text-[10px] text-muted-foreground sm:inline-block",
                          classNames?.shortcut,
                        )}
                      >
                        {item.shortcut}
                      </motion.span>
                    ) : null}

                    {item.badge ? (
                      <span
                        className={cn(
                          "ml-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] leading-none text-primary-foreground",
                          !isExpanded && "absolute right-0.5 top-0.5",
                          classNames?.badge,
                        )}
                      >
                        {item.badge}
                      </span>
                    ) : null}
                  </>
                )}
              </>
            );

            if (href && !openBlank && !href.startsWith("mailto:")) {
              return (
                <MotionLink
                  key={item.id}
                  href={href}
                  title={label}
                  aria-label={label}
                  aria-current={isActive ? "page" : undefined}
                  onMouseEnter={onMouseEnter}
                  onClick={onClick}
                  transition={ITEM_TRANSITION}
                  className={className}
                >
                  {body}
                </MotionLink>
              );
            }

            if (href) {
              return (
                <motion.a
                  key={item.id}
                  href={href}
                  target={openBlank ? "_blank" : undefined}
                  rel={openBlank ? "noopener noreferrer" : undefined}
                  title={label}
                  aria-label={label}
                  onMouseEnter={onMouseEnter}
                  onClick={onClick}
                  transition={ITEM_TRANSITION}
                  className={className}
                >
                  {body}
                </motion.a>
              );
            }

            return (
              <motion.button
                key={item.id}
                type="button"
                disabled={item.disabled}
                title={label}
                aria-label={label}
                onMouseEnter={onMouseEnter}
                onClick={onClick}
                transition={ITEM_TRANSITION}
                className={className}
              >
                {body}
              </motion.button>
            );
          })}
        </motion.div>
      </motion.div>
    </LayoutGroup>
  );
}

export function useExpandableActionBar(items: ExpandableActionBarItem[]) {
  const [expanded, setExpanded] = useState(false);
  const [activeId, setActiveId] = useState(items[0]?.id);

  const activeItem = useMemo(
    () => items.find((item) => item.id === activeId),
    [activeId, items],
  );

  return useMemo(
    () => ({
      expanded,
      setExpanded,
      activeId,
      setActiveId,
      activeItem,
    }),
    [activeId, activeItem, expanded],
  );
}
