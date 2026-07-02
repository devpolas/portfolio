"use client";
import { motion } from "motion/react";
export default function Hero() {
  return (
    <motion.div
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      hero
    </motion.div>
  );
}
