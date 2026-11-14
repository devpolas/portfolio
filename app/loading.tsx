"use client";

import { useEffect, useState } from "react";
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

const socialIcons: IconType[] = [
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

type LoadingProps = {
  className?: string;
  username?: string;
  label?: string;
};

export default function Loading({
  className,
  username = "@devpolas",
  label = "Loading portfolio...",
}: LoadingProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(
      () => setActiveIndex((i) => (i + 1) % socialIcons.length),
      900,
    );
    return () => window.clearInterval(id);
  }, [reduce]);

  const ActiveIcon = socialIcons[activeIndex];

  return (
    <div
      role='status'
      aria-busy='true'
      className={cn(
        "isolate relative flex flex-col justify-center items-center gap-8 min-h-[60vh] overflow-hidden",
        className,
      )}
    >
      <span className='sr-only'>{label}</span>

      {/* Breathing ambient glow */}
      <motion.div
        aria-hidden='true'
        animate={
          reduce ? undefined : { scale: [1, 1.25, 1], opacity: [0.5, 0.9, 0.5] }
        }
        transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
        className='top-1/2 left-1/2 -z-10 absolute bg-brand/15 blur-[100px] rounded-full size-56 -translate-x-1/2 -translate-y-1/2 pointer-events-none'
      />

      {/* Subtle dot-grid backdrop, masked to fade at the edges */}
      <div
        aria-hidden='true'
        className='-z-10 absolute inset-0 bg-[radial-gradient(var(--foreground)_1px,transparent_1px)] opacity-[0.15] bg-size-[22px_22px] pointer-events-none mask-[radial-gradient(ellipse_at_center,black_10%,transparent_65%)]'
      />

      {/* Identity pill */}
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: EASE }}
        className='flex items-center gap-4 sm:gap-5 bg-foreground/3 shadow-[0_8px_40px_-12px] shadow-brand/30 backdrop-blur-md py-2.5 sm:py-3 pr-6 sm:pr-8 pl-3 sm:pl-3.5 border border-foreground/10 rounded-full'
      >
        {/* Icon chip */}
        <div
          aria-hidden='true'
          className='relative flex justify-center items-center bg-brand/10 rounded-full ring-1 ring-brand/25 size-12 sm:size-14 shrink-0'
        >
          <AnimatePresence mode='wait' initial={false}>
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.6, y: 8, filter: "blur(6px)" }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.15, y: -8, filter: "blur(6px)" }}
              transition={{ duration: 0.35, ease: EASE }}
              className='absolute inset-0 flex justify-center items-center'
            >
              <ActiveIcon className='size-6 sm:size-7 text-brand' />
            </motion.div>
          </AnimatePresence>
        </div>

        <span className='font-bold text-xl sm:text-2xl tracking-tight loading-shimmer'>
          {username}
        </span>
      </motion.div>

      {/* Indeterminate progress bar */}
      <motion.div
        aria-hidden='true'
        initial={{ opacity: 0, scaleX: 0.6 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 0.25, duration: 0.6, ease: EASE }}
        className='relative bg-foreground/10 rounded-full w-40 sm:w-48 h-0.75 overflow-hidden'
      >
        <div className='left-0 absolute inset-y-0 bg-linear-to-r from-transparent via-brand to-brand-accent rounded-full w-2/5 loading-bar' />
      </motion.div>
    </div>
  );
}
