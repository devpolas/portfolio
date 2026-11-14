"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

import type { DocsNavSection } from "./docs-config";

export function DocsSidebar({ nav }: { nav: DocsNavSection[] }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Documentation">
      {nav.map((section) => (
        <div key={section.title} className="mb-6 last:mb-0">
          <p className="mb-2 px-3 text-sm font-semibold">{section.title}</p>

          <ul className="space-y-0.5">
            {section.items.map((item) => {
              const active = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "block rounded-md px-3 py-1.5 text-sm transition-colors",
                      "outline-none focus-visible:ring-2 focus-visible:ring-brand",
                      active
                        ? "bg-brand/10 font-medium text-brand"
                        : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-neutral-50",
                    )}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

/**
 * Small screens: the same navigation inside a native <details>, which needs
 * no extra JavaScript to open. It closes itself after you pick a page.
 */
export function DocsMobileNav({ nav }: { nav: DocsNavSection[] }) {
  const pathname = usePathname();
  const ref = React.useRef<HTMLDetailsElement>(null);

  React.useEffect(() => {
    if (ref.current) ref.current.open = false;
  }, [pathname]);

  return (
    <details
      ref={ref}
      className={cn(
        "group mb-8 rounded-lg border lg:hidden",
        "border-neutral-200 dark:border-neutral-800",
      )}
    >
      <summary
        className={cn(
          "flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-medium",
          "outline-none focus-visible:ring-2 focus-visible:ring-brand [&::-webkit-details-marker]:hidden",
        )}
      >
        Documentation menu
        <ChevronDown
          aria-hidden
          className="size-4 transition-transform group-open:rotate-180"
        />
      </summary>

      <div className="border-t border-neutral-200 p-2 dark:border-neutral-800">
        <DocsSidebar nav={nav} />
      </div>
    </details>
  );
}
