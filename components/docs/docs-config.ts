export type DocsNavItem = {
  title: string;
  /** Must match a file in content/docs, for example /docs/getting-started */
  href: string;
};

export type DocsNavSection = {
  title: string;
  items: DocsNavItem[];
};

// The sidebar, the previous/next links and the /docs redirect all read this
// list. To add a page: create content/docs/<name>.mdx and add it here.
export const docsNav: DocsNavSection[] = [
  {
    title: "Introduction",
    items: [{ title: "Getting started", href: "/docs/getting-started" }],
  },
  {
    title: "Components",
    items: [
      { title: "Code blocks", href: "/docs/code-blocks" },
      { title: "Callouts and tabs", href: "/docs/callouts-and-tabs" },
    ],
  },
];

export const docsPages = docsNav.flatMap((section) => section.items);

export function getDocPager(href: string) {
  const index = docsPages.findIndex((page) => page.href === href);

  return {
    prev: index > 0 ? docsPages[index - 1] : null,
    next:
      index !== -1 && index < docsPages.length - 1
        ? docsPages[index + 1]
        : null,
  };
}
