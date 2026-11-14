import * as React from "react";
import {
  createHighlighterCore,
  type GrammarState,
  type HighlighterCore,
} from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";

const languages = {
  bash: () => import("shiki/langs/shellscript.mjs"),
  css: () => import("shiki/langs/css.mjs"),
  diff: () => import("shiki/langs/diff.mjs"),
  html: () => import("shiki/langs/html.mjs"),
  javascript: () => import("shiki/langs/javascript.mjs"),
  json: () => import("shiki/langs/json.mjs"),
  jsx: () => import("shiki/langs/jsx.mjs"),
  markdown: () => import("shiki/langs/markdown.mjs"),
  python: () => import("shiki/langs/python.mjs"),
  sql: () => import("shiki/langs/sql.mjs"),
  tsx: () => import("shiki/langs/tsx.mjs"),
  typescript: () => import("shiki/langs/typescript.mjs"),
  yaml: () => import("shiki/langs/yaml.mjs"),
};

const aliases: Record<string, keyof typeof languages> = {
  js: "javascript",
  md: "markdown",
  py: "python",
  sh: "bash",
  shell: "bash",
  shellscript: "bash",
  ts: "typescript",
  yml: "yaml",
  zsh: "bash",
};

// Change the themes in one place.
const THEMES = { light: "github-light", dark: "github-dark" } as const;

type LanguageName = keyof typeof languages | "ansi";

export type HighlightResult = {
  /** One React node per line. */
  lines: React.ReactNode[];
  /** Grammar state after the last line. Pass it back to continue. */
  state: GrammarState | undefined;
};

export type CodeHighlighter = {
  highlight(code: string, state?: GrammarState): HighlightResult;
};

let core: Promise<HighlighterCore> | undefined;

function getCore() {
  core ??= createHighlighterCore({
    themes: [
      import("shiki/themes/github-light.mjs"),
      import("shiki/themes/github-dark.mjs"),
    ],
    langs: [],
    engine: createJavaScriptRegexEngine({ forgiving: true }),
  });

  // If creation fails, allow a retry on the next call.
  core.catch(() => {
    core = undefined;
  });

  return core;
}

export function resolveLanguage(language: string): LanguageName | null {
  const name = language.trim().toLowerCase();

  if (name === "ansi") return "ansi";
  if (name in languages) return name as keyof typeof languages;

  return aliases[name] ?? null;
}

const pending = new Map<LanguageName, Promise<CodeHighlighter>>();
const ready = new Map<LanguageName, CodeHighlighter>();

function createHighlighter(shiki: HighlighterCore, lang: LanguageName) {
  const tokenize = (text: string, state?: GrammarState) =>
    shiki.codeToTokens(text, {
      lang,
      themes: THEMES,
      defaultColor: false,
      grammarState: state,
    }).tokens;

  const render = (tokens: ReturnType<typeof tokenize>) =>
    tokens.map((line) =>
      line.map((token, index) => (
        <span
          key={index}
          style={token.htmlStyle as React.CSSProperties}
          className='text-(--shiki-light) dark:text-(--shiki-dark)'
        >
          {token.content}
        </span>
      )),
    );

  const highlighter: CodeHighlighter = {
    highlight(code, state) {
      // ANSI has no grammar state, so every line is tokenized on its own and
      // looks the same whether it arrives in one piece or streams in.
      if (lang === "ansi") {
        const tokens = code.split("\n").flatMap((line) => tokenize(line));
        return { lines: render(tokens), state: undefined };
      }

      const tokens = tokenize(code, state);

      return {
        lines: render(tokens),
        state: shiki.getLastGrammarState(tokens),
      };
    },
  };

  return highlighter;
}

/** Returns the highlighter only if it is already loaded (no waiting). */
export function getLoadedHighlighter(language: string) {
  const lang = resolveLanguage(language);

  return lang ? (ready.get(lang) ?? null) : null;
}

/** Loads a language. Resolves to null for a language that is not listed. */
export async function loadHighlighter(
  language: string,
): Promise<CodeHighlighter | null> {
  const lang = resolveLanguage(language);

  if (!lang) return null;

  let promise = pending.get(lang);

  if (!promise) {
    promise = (async () => {
      const shiki = await getCore();

      if (lang !== "ansi" && !shiki.getLoadedLanguages().includes(lang)) {
        await shiki.loadLanguage(languages[lang]);
      }

      const highlighter = createHighlighter(shiki, lang);
      ready.set(lang, highlighter);

      return highlighter;
    })();

    // A failed load can be retried later.
    promise.catch(() => pending.delete(lang));
    pending.set(lang, promise);
  }

  return promise;
}

/** One-shot helper for non-streaming use. */
export async function highlightCode(code: string, language: string) {
  const highlighter = await loadHighlighter(language);

  return highlighter ? highlighter.highlight(code).lines : null;
}
