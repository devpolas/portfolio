"use client";

import { memo, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { IconType } from "react-icons";
import { cn } from "@/lib/utils";

import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaTelegram,
  FaWhatsapp,
} from "react-icons/fa";
import {
  SiX,
  SiDevdotto,
  SiMedium,
  SiStackoverflow,
  SiDiscord,
  SiHashnode,
} from "react-icons/si";

export const DEFAULT_ICONS: IconType[] = [
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaTelegram,
  FaWhatsapp,
  SiX,
  SiDevdotto,
  SiMedium,
  SiStackoverflow,
  SiDiscord,
  SiHashnode,
];

const EASE = [0.22, 1, 0.36, 1] as const;

export type LoadingProps = {
  className?: string;
  /** Text shown inside the pill */
  username?: string;
  /** Screen-reader announcement */
  label?: string;
  /** Icons to cycle through. Falls back to the default social set */
  icons?: IconType[];
  /** Milliseconds between icon swaps */
  interval?: number;
  /** Shuffle the icon order once on mount */
  shuffle?: boolean;
  /**
   * 0–100 for a determinate bar. Leave undefined for the indeterminate bar.
   */
  progress?: number;
  /**
   * Wait this long (ms) before showing anything, so fast loads never flash
   * a spinner. Set to 0 to show immediately.
   */
  delay?: number;
  /** Render without the background glow and dot grid */
  minimal?: boolean;
};

function shuffled<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/** Cycles an index; pauses when reduced motion is on or the tab is hidden. */
function useCycle(length: number, interval: number, paused: boolean) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (paused || length < 2) return;

    let id: number | undefined;
    const start = () => {
      id = window.setInterval(
        () => setIndex((i) => (i + 1) % length),
        interval,
      );
    };
    const stop = () => {
      if (id !== undefined) window.clearInterval(id);
      id = undefined;
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    if (!document.hidden) start();
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [length, interval, paused]);

  return index;
}

const Backdrop = memo(function Backdrop({ animate }: { animate: boolean }) {
  return (
    <>
      <motion.div
        aria-hidden='true'
        animate={
          animate
            ? { scale: [1, 1.25, 1], opacity: [0.5, 0.9, 0.5] }
            : undefined
        }
        transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
        className='top-1/2 left-1/2 -z-10 absolute bg-brand/15 blur-[100px] rounded-full size-56 -translate-x-1/2 -translate-y-1/2 pointer-events-none'
      />
      <div
        aria-hidden='true'
        className='-z-10 absolute inset-0 bg-[radial-gradient(var(--foreground)_1px,transparent_1px)] opacity-[0.15] bg-size-[22px_22px] pointer-events-none mask-[radial-gradient(ellipse_at_center,black_10%,transparent_65%)]'
      />
    </>
  );
});

function ProgressBar({
  progress,
  animate,
}: {
  progress?: number;
  animate: boolean;
}) {
  const determinate = typeof progress === "number";
  const value = determinate ? Math.min(100, Math.max(0, progress)) : undefined;

  return (
    <motion.div
      role='progressbar'
      aria-label='Loading progress'
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
      initial={{ opacity: 0, scaleX: 0.6 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ delay: 0.25, duration: 0.6, ease: EASE }}
      className='relative bg-foreground/10 rounded-full w-40 sm:w-48 h-0.75 overflow-hidden'
    >
      {determinate ? (
        <motion.div
          className='left-0 absolute inset-y-0 bg-linear-to-r from-brand to-brand-accent rounded-full'
          initial={false}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.4, ease: EASE }}
        />
      ) : (
        // `loading-bar` is your existing CSS keyframe. If reduced motion is on,
        // fall back to a static, partially-filled bar instead of a sweep.
        <div
          className={cn(
            "left-0 absolute inset-y-0 bg-linear-to-r from-transparent via-brand to-brand-accent rounded-full w-2/5",
            animate ? "loading-bar" : "left-[30%]",
          )}
        />
      )}
    </motion.div>
  );
}

export default function Loading({
  className,
  username = "@devpolas",
  label = "Loading portfolio...",
  icons = DEFAULT_ICONS,
  interval = 900,
  shuffle = false,
  progress,
  delay = 150,
  minimal = false,
}: LoadingProps) {
  const reduce = useReducedMotion() ?? false;
  const animate = !reduce;

  // Anti-flash: render nothing for `delay` ms.
  const [visible, setVisible] = useState(delay <= 0);
  useEffect(() => {
    if (delay <= 0) return;
    const id = window.setTimeout(() => setVisible(true), delay);
    return () => window.clearTimeout(id);
  }, [delay]);

  // Shuffle once on the client to avoid hydration mismatches.
  const [order, setOrder] = useState<IconType[]>(icons);
  useEffect(() => {
    setOrder(shuffle ? shuffled(icons) : icons);
  }, [icons, shuffle]);

  const activeIndex = useCycle(order.length, interval, reduce);
  const ActiveIcon = useMemo(
    () => order[activeIndex % Math.max(order.length, 1)],
    [order, activeIndex],
  );

  // Keep the live region mounted so assistive tech reliably announces it.
  return (
    <div
      role='status'
      aria-live='polite'
      aria-busy='true'
      className={cn(
        "isolate relative flex flex-col justify-center items-center gap-8 min-h-[60vh] overflow-hidden",
        className,
      )}
    >
      <span className='sr-only'>{label}</span>

      {visible && (
        <>
          {!minimal && <Backdrop animate={animate} />}

          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: EASE }}
            className='flex items-center gap-4 sm:gap-5 bg-foreground/3 shadow-[0_8px_40px_-12px] shadow-brand/30 backdrop-blur-md py-2.5 sm:py-3 pr-6 sm:pr-8 pl-3 sm:pl-3.5 border border-foreground/10 rounded-full'
          >
            <div
              aria-hidden='true'
              className='relative flex justify-center items-center bg-brand/10 rounded-full ring-1 ring-brand/25 size-12 sm:size-14 shrink-0'
            >
              {ActiveIcon && (
                <AnimatePresence mode='wait' initial={false}>
                  <motion.div
                    key={activeIndex}
                    initial={
                      animate
                        ? { opacity: 0, scale: 0.6, y: 8, filter: "blur(6px)" }
                        : { opacity: 0 }
                    }
                    animate={
                      animate
                        ? { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }
                        : { opacity: 1 }
                    }
                    exit={
                      animate
                        ? {
                            opacity: 0,
                            scale: 1.15,
                            y: -8,
                            filter: "blur(6px)",
                          }
                        : { opacity: 0 }
                    }
                    transition={{ duration: 0.35, ease: EASE }}
                    className='absolute inset-0 flex justify-center items-center'
                  >
                    <ActiveIcon className='size-6 sm:size-7 text-brand' />
                  </motion.div>
                </AnimatePresence>
              )}
            </div>

            <span
              className={cn(
                "font-bold text-xl sm:text-2xl tracking-tight",
                animate && "loading-shimmer",
              )}
            >
              {username}
            </span>
          </motion.div>

          <ProgressBar progress={progress} animate={animate} />
        </>
      )}
    </div>
  );
}
