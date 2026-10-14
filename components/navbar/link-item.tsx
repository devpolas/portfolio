import Link from "next/link";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

type LinkItemProps = {
  href: string;
  label: string;
  active: boolean;
};

export function LinkItem({ href, label, active }: LinkItemProps) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "inline-flex relative justify-center items-center px-2 rounded-md min-h-8",
        "xl:text-lg lg:text-base text-sm font-medium transition-colors duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
        active
          ? "text-brand font-bold"
          : "text-muted-foreground hover:text-brand",
      )}
    >
      {label}

      {active && (
        <motion.span
          layoutId='navbar-active-indicator'
          aria-hidden='true'
          className='-bottom-px absolute inset-x-2 bg-brand rounded-full h-0.5'
          transition={{
            type: "spring",
            stiffness: 380,
            damping: 30,
          }}
        />
      )}
    </Link>
  );
}
