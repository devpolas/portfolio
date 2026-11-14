import * as React from "react";
import { Info, Lightbulb, OctagonAlert, TriangleAlert } from "lucide-react";

import { cn } from "@/lib/utils";

const types = {
  note: {
    label: "Note",
    icon: Info,
    box: "border-sky-200 bg-sky-50 dark:border-sky-900 dark:bg-sky-950/40",
    accent: "text-sky-700 dark:text-sky-300",
  },
  tip: {
    label: "Tip",
    icon: Lightbulb,
    box: "border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/40",
    accent: "text-emerald-700 dark:text-emerald-300",
  },
  warning: {
    label: "Warning",
    icon: TriangleAlert,
    box: "border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/40",
    accent: "text-amber-700 dark:text-amber-300",
  },
  danger: {
    label: "Danger",
    icon: OctagonAlert,
    box: "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/40",
    accent: "text-red-700 dark:text-red-300",
  },
} as const;

export type CalloutType = keyof typeof types;

type CalloutProps = {
  type?: CalloutType;
  /** Defaults to the type name, for example "Warning". */
  title?: string;
  className?: string;
  children: React.ReactNode;
};

export function Callout({
  type = "note",
  title,
  className,
  children,
}: CalloutProps) {
  const config = types[type] ?? types.note;
  const Icon = config.icon;
  const heading = title ?? config.label;

  return (
    <aside
      aria-label={heading}
      className={cn(
        "flex gap-3 my-6 p-4 border rounded-lg text-sm leading-relaxed",
        config.box,
        className,
      )}
    >
      {/* Meaning comes from the title text, not from the icon or color. */}
      <Icon
        aria-hidden
        className={cn("mt-0.5 size-4 shrink-0", config.accent)}
      />

      <div className='flex-1 *:first:mt-0 *:last:mb-0 min-w-0'>
        <p className={cn("mb-1 font-semibold", config.accent)}>{heading}</p>
        {children}
      </div>
    </aside>
  );
}
