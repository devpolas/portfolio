import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SectionIdProvider } from "./section-context";

interface SectionProps {
  id: string;
  glow?: "left" | "right";
  className?: string;
  /**
   * Use when the section has no <SectionHeading>. Without a heading,
   * aria-labelledby would point at nothing, so aria-label is used instead.
   */
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
      className={cn(
        "isolate relative overflow-hidden section-space",
        className,
      )}
    >
      {/* Ambient brand lighting (the section already clips overflow) */}
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

      <div className='section-container'>
        <SectionIdProvider id={id}>{children}</SectionIdProvider>
      </div>
    </section>
  );
}
