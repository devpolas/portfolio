import * as React from "react";

import { cn } from "@/lib/utils";

type CodeLineProps = {
  children: React.ReactNode;
  /** Show a line number (uses the `line` CSS counter set on the parent). */
  numbered?: boolean;
  /** Mark the line as highlighted. */
  highlighted?: boolean;
};

/**
 * One line of code. Finished lines keep the same `children` reference while
 * code streams in, so `memo` skips them and only the last line re-renders.
 */
export const CodeLine = React.memo(function CodeLine({
  children,
  numbered = false,
  highlighted = false,
}: CodeLineProps) {
  return (
    <span
      data-highlighted={highlighted || undefined}
      className={cn(
        // min-h keeps empty lines from collapsing.
        "block min-h-lh border-l-2 border-transparent px-3.5",
        highlighted && "border-brand bg-brand/10",
        numbered &&
          cn(
            "[counter-increment:line]",
            "before:mr-4 before:inline-block before:w-6 before:text-right",
            "before:text-neutral-400 before:select-none before:content-[counter(line)]",
            "dark:before:text-neutral-600",
          ),
      )}
    >
      {children}
    </span>
  );
});
