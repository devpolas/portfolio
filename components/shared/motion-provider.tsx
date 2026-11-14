"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";

/**
 * Wrap your app once (e.g. in app/layout.tsx). With reducedMotion="user",
 * Motion drops transform/layout animations for people who ask for less motion
 * and keeps opacity fades.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion='user'>{children}</MotionConfig>;
}
