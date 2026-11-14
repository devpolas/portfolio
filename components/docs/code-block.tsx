"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { useHighlightedCode } from "@/hooks/use-highlighted-code";
import { CodeLine } from "./code-line";


export type CodeBlockProps = {
  code: string;
  language?: string;
  /** File name or label shown in the header. Defaults to the language. */
  title?: string;
  showLineNumbers?: boolean;
  /** Lines to highlight, for example "1,3-5". Line numbers start at 1. */
  highlight?: string;
  className?: string;
};

/** "1,3-5" -> Set {1, 3, 4, 5} */
function parseLineRanges(input?: string) {
  const lines = new Set<number>();

  if (!input) return lines;

  for (const part of input.split(",")) {
    const [start, end = start] = part.trim().split("-").map(Number);

    if (!Number.isFinite(start) || !Number.isFinite(end)) continue;

    // Cap the range so a typo like "1-999999" cannot freeze the page.
    for (let line = start; line <= Math.min(end, start + 2000); line++) {
      lines.add(line);
    }
  }

  return lines;
}

function useCopy(text: string) {
  const [copied, setCopied] = React.useState(false);
  const timer = React.useRef<ReturnType<typeof setTimeout>>(undefined);

  React.useEffect(() => () => clearTimeout(timer.current), []);

  const copy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [text]);

  return { copied, copy };
}

export function CodeBlock({
  code,
  language = "text",
  title,
  showLineNumbers = false,
  highlight,
  className,
}: CodeBlockProps) {
  const lines = useHighlightedCode(code, language);
  const highlighted = React.useMemo(
    () => parseLineRanges(highlight),
    [highlight],
  );
  const { copied, copy } = useCopy(code);

  return (
    <figure
      className={cn(
        "my-6 border rounded-lg overflow-hidden text-sm",
        "border-neutral-200 bg-neutral-50",
        "dark:border-neutral-800 dark:bg-neutral-950",
        className,
      )}
    >
      <figcaption
        className={cn(
          "flex justify-between items-center gap-4 px-4 py-2 border-b text-xs",
          "border-neutral-200 text-neutral-500",
          "dark:border-neutral-800 dark:text-neutral-400",
        )}
      >
        <span className='font-mono truncate'>{title ?? language}</span>

        <button
          type='button'
          onClick={copy}
          className={cn(
            "px-2 py-1 rounded transition-colors shrink-0",
            "hover:bg-neutral-200 dark:hover:bg-neutral-800",
            "outline-none focus-visible:ring-2 focus-visible:ring-brand",
          )}
        >
          {copied ? "Copied" : "Copy"}
        </button>

        <span className='sr-only' role='status' aria-live='polite'>
          {copied ? "Code copied to clipboard" : ""}
        </span>
      </figcaption>

      {/* tabIndex lets keyboard users scroll wide code. */}
      <pre
        tabIndex={0}
        className={cn(
          "py-4 overflow-x-auto font-mono leading-relaxed [counter-reset:line]",
          "outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-inset",
        )}
      >
        <code className='block w-fit min-w-full'>
          {lines.map((line, index) => (
            <CodeLine
              key={index}
              numbered={showLineNumbers}
              highlighted={highlighted.has(index + 1)}
            >
              {line}
            </CodeLine>
          ))}
        </code>
      </pre>
    </figure>
  );
}
