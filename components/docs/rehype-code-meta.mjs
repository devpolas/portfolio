import { visit } from "unist-util-visit";

/**
 * Turns the text after the language in a fenced code block into props:
 *
 *   ```tsx title="app/page.tsx" {2,4-6} showLineNumbers
 *
 * becomes data-title, data-highlight and data-line-numbers on <pre>, which
 * `Pre` in mdx-components.tsx passes to <CodeBlock>.
 *
 * Plain .mjs on purpose: MDX plugins named by string in next.config are
 * loaded by Node, which cannot run TypeScript files.
 *
 * @type {import("unified").Plugin<[], import("hast").Root>}
 */
export default function rehypeCodeMeta() {
  return (tree) => {
    visit(tree, "element", (node) => {
      if (node.tagName !== "pre") return;

      const code = node.children[0];

      if (code?.type !== "element" || code.tagName !== "code") return;

      const meta = code.data?.meta;

      if (typeof meta !== "string") return;

      const title = /title="([^"]+)"/.exec(meta)?.[1];
      const highlight = /\{([\d,\-\s]+)\}/.exec(meta)?.[1];

      node.properties ??= {};

      if (title) node.properties["data-title"] = title;
      if (highlight) node.properties["data-highlight"] = highlight.replace(/\s/g, "");
      if (/\bshowLineNumbers\b/.test(meta)) node.properties["data-line-numbers"] = "";
    });
  };
}
