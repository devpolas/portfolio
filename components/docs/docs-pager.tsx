import Link from "next/link";

import { cn } from "@/lib/utils";

import { getDocPager, type DocsNavItem } from "./docs-config";

function PagerLink({
  item,
  direction,
}: {
  item: DocsNavItem;
  direction: "prev" | "next";
}) {
  return (
    <Link
      href={item.href}
      rel={direction}
      className={cn(
        "flex flex-col gap-1 rounded-lg border p-4 transition-colors",
        "border-neutral-200 hover:border-brand dark:border-neutral-800",
        "outline-none focus-visible:ring-2 focus-visible:ring-brand",
        direction === "next" && "items-end text-right sm:col-start-2",
      )}
    >
      <span className="text-xs text-neutral-500 dark:text-neutral-400">
        {direction === "prev" ? "Previous" : "Next"}
      </span>
      <span className="font-medium">{item.title}</span>
    </Link>
  );
}

export function DocsPager({ slug }: { slug: string }) {
  const { prev, next } = getDocPager(`/docs/${slug}`);

  if (!prev && !next) return null;

  return (
    <nav
      aria-label="Previous and next page"
      className="mt-16 grid gap-4 border-t border-neutral-200 pt-8 sm:grid-cols-2 dark:border-neutral-800"
    >
      {prev && <PagerLink item={prev} direction="prev" />}
      {next && <PagerLink item={next} direction="next" />}
    </nav>
  );
}
