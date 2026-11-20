import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { SectionIdProvider } from "./section-context";

interface SectionProps {
  id: string;
  glow?: "left" | "right";
  className?: string;
  ariaLabel?: string;
  children: ReactNode;
}

export function Section({
  id,
  glow = "right",
  className,
  ariaLabel,
  children,
}: SectionProps) {
  const isRight = glow === "right";

  return (
    <section
      id={id}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabel ? undefined : `${id}-heading`}
      tabIndex={-1}
      className={cn(
        "isolate relative overflow-hidden section-space",
        "scroll-mt-[calc(var(--header-h)+1rem)]",
        "focus:outline-none",
        className,
      )}
    >
      {/* Ambient brand lighting */}
      <div
        aria-hidden='true'
        className='-z-10 absolute inset-0 pointer-events-none'
      >
        <div
          className={cn(
            "top-16 absolute bg-brand/5 blur-[110px] rounded-full size-80 sm:size-96",
            isRight ? "-right-40" : "-left-40",
          )}
        />

        <div
          className={cn(
            "bottom-0 absolute bg-brand-nature/5 blur-[110px] rounded-full size-72",
            isRight ? "-left-40" : "-right-40",
          )}
        />
      </div>

      <div className='mx-auto w-11/12 lg:w-10/12'>
        <div
          aria-hidden='true'
          className='-z-10 absolute inset-0 pointer-events-none brand-glow-bg'
        />

        <div
          aria-hidden='true'
          className='-top-40 -right-32 -z-10 absolute border border-brand/10 rounded-full size-80 sm:size-112 pointer-events-none'
        />

        <div
          aria-hidden='true'
          className='-bottom-40 -left-40 -z-10 absolute border border-brand/10 rounded-full size-80 sm:size-112 pointer-events-none'
        />

        <SectionIdProvider id={id}>{children}</SectionIdProvider>
      </div>
    </section>
  );
}
