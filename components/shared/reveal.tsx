"use client";

import { motion, type HTMLMotionProps, type Variants } from "motion/react";

import { fadeUp, viewportOnce } from "@/lib/motion";

/** Single element that fades up when it enters the viewport. */
export function Reveal(props: HTMLMotionProps<"div">) {
  return (
    <motion.div
      variants={fadeUp}
      initial='hidden'
      whileInView='visible'
      viewport={viewportOnce}
      {...props}
    />
  );
}

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/** Parent that staggers its RevealItem children. */
export function RevealGroup(props: HTMLMotionProps<"div">) {
  return (
    <motion.div
      variants={stagger}
      initial='hidden'
      whileInView='visible'
      viewport={viewportOnce}
      {...props}
    />
  );
}

/** Child of RevealGroup. It inherits initial and whileInView from the group. */
export function RevealItem(props: HTMLMotionProps<"div">) {
  return <motion.div variants={fadeUp} {...props} />;
}
