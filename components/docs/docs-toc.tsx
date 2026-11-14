"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

type Heading = { id: string; text: string; level: 2 | 3 };

/**
 * "On this page": lists the h2 and h3 headings inside the element with id
 * `contentId` and marks the one being read.
 */
export function DocsToc({
  contentId = "docs-content",
}: {
  contentId?: string;
}) {
  const pathname = usePathname();
  const [headings, setHeadings] = React.useState<Heading[]>([]);
  const [active, setActive] = React.useState<string>();

  React.useEffect(() => {
    const root = document.getElementById(contentId);

    if (!root) return;

    const nodes = Array.from(
      root.querySelectorAll<HTMLHeadingElement>("h2[id], h3[id]"),
    );

    setHeadings(
      nodes.map((node) => {
        // The heading also holds the "#" link, so drop it from the text.
        const clone = node.cloneNode(true) as HTMLElement;
        clone.querySelectorAll("a").forEach((link) => link.remove());

        return {
          id: node.id,
          text: clone.textContent?.trim() ?? "",
          level: node.tagName === "H2" ? 2 : 3,
        };
      }),
    );
    setActive(undefined);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);

        if (visible) setActive(visible.target.id);
      },
      // Counts a heading as "current" once it is near the top of the screen.
      { rootMargin: "-96px 0px -66% 0px" },
    );

    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, [pathname, contentId]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label='On this page'>
      <p className='mb-3 font-semibold text-sm'>On this page</p>

      <ul className='space-y-1.5 border-neutral-200 dark:border-neutral-800 border-l'>
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              aria-current={active === heading.id ? "location" : undefined}
              className={cn(
                "block -ml-px py-0.5 border-l text-sm transition-colors",
                "outline-none focus-visible:ring-2 focus-visible:ring-brand",
                heading.level === 3 ? "pl-7" : "pl-4",
                active === heading.id
                  ? "border-brand font-medium text-brand"
                  : "border-transparent text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50",
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
