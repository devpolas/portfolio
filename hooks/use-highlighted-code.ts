import * as React from "react";

import {
  getLoadedHighlighter,
  loadHighlighter,
  type CodeHighlighter,
} from "@/components/docs/highlighter";
import type { GrammarState } from "shiki/core";

/**
 * Returns the highlighter for a language, or null while it loads (or if the
 * language is not supported). Languages that were loaded before are returned
 * on the very first render, so there is no plain-text flash.
 */
function useHighlighter(language: string) {
  const [, rerender] = React.useReducer((n: number) => n + 1, 0);

  React.useEffect(() => {
    if (getLoadedHighlighter(language)) return;

    let cancelled = false;

    loadHighlighter(language)
      .then(() => {
        if (!cancelled) rerender();
      })
      .catch((error) => {
        if (process.env.NODE_ENV !== "production") {
          console.warn(`Could not load highlighter for "${language}"`, error);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [language]);

  return getLoadedHighlighter(language);
}

type Cache = {
  highlighter: CodeHighlighter | null;
  /** The text that `lines` covers. Always ends with "\n" (or is empty). */
  text: string;
  lines: React.ReactNode[];
  state: GrammarState | undefined;
};

const emptyCache: Cache = {
  highlighter: null,
  text: "",
  lines: [],
  state: undefined,
};

/**
 * Highlights code line by line. While the code streams in, finished lines are
 * tokenized once (continuing from the previous grammar state) and only the
 * line still being written is tokenized again on each update.
 *
 * Returns one React node per line. Without a highlighter it returns plain
 * strings, so the layout stays the same.
 */
export function useHighlightedCode(value: string, language: string) {
  // Skip intermediate updates when the stream is faster than React can render.
  const deferred = React.useDeferredValue(value);

  // A trailing newline would render as an extra empty line.
  const code = deferred.endsWith("\n") ? deferred.slice(0, -1) : deferred;

  const highlighter = useHighlighter(language);
  const cache = React.useRef<Cache>(emptyCache);

  return React.useMemo<React.ReactNode[]>(() => {
    if (!highlighter) return code.split("\n");

    let current = cache.current;

    // Reset when the highlighter changed or the code was edited, not appended.
    if (current.highlighter !== highlighter || !code.startsWith(current.text)) {
      current = { highlighter, text: "", lines: [], state: undefined };
    }

    // Index right after the last "\n": everything before it is complete.
    const end = code.lastIndexOf("\n") + 1;

    if (end > current.text.length) {
      const result = highlighter.highlight(
        code.slice(current.text.length, end - 1),
        current.state,
      );

      current = {
        highlighter,
        text: code.slice(0, end),
        lines: [...current.lines, ...result.lines],
        state: result.state,
      };
    }

    // Safe to write: the same input always produces the same cache.
    cache.current = current;

    // The last line is still being written, so it is never cached.
    const tail = highlighter.highlight(code.slice(end), current.state).lines[0];

    return [...current.lines, tail];
  }, [code, highlighter]);
}
