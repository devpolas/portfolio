import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const tones = {
  error: "bg-destructive/10 text-destructive",
  neutral: "bg-foreground/5 text-foreground",
  success: "bg-brand-nature/10 text-brand-nature",
} as const;

interface StatusCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  /** Colors the icon circle. Defaults to "error". */
  tone?: keyof typeof tones;
  eyebrow?: ReactNode;
  alert?: boolean;
  /** Heading level. Use "h2" when the page already has an h1. */
  as?: "h1" | "h2";
  className?: string;
  children?: ReactNode;
}

export function StatusCard({
  title,
  description,
  icon,
  tone = "error",
  eyebrow,
  alert,
  as: Heading = "h1",
  className,
  children,
}: StatusCardProps) {
  return (
    <div
      role={alert ? "alert" : undefined}
      className={cn(
        "mx-auto p-6 sm:p-8 w-full max-w-lg text-center glass",
        className,
      )}
    >
      {icon && (
        <div
          aria-hidden='true'
          className={cn(
            "flex justify-center items-center mx-auto mb-6 rounded-full size-14",
            tones[tone],
          )}
        >
          {icon}
        </div>
      )}

      {eyebrow}

      <Heading className='mt-2 font-bold text-2xl sm:text-3xl tracking-tight'>
        {title}
      </Heading>

      <p className='mx-auto mt-3 max-w-md text-muted-foreground text-sm sm:text-base leading-7'>
        {description}
      </p>

      {children}
    </div>
  );
}
