"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { ArrowUp, ChevronDown, SquarePen } from "lucide-react";

import { cn } from "@/lib/utils";

type Heading = { id: string; text: string; level: 2 | 3 };

/** Distance from the top of the viewport (sticky header + breathing room). */
const OFFSET = 104;

/* -------------------------------------------------------------------------- */
/*  Shared logic                                                              */
/* -------------------------------------------------------------------------- */

function useToc(contentId: string) {
  const pathname = usePathname();
  const [headings, setHeadings] = React.useState<Heading[]>([]);
  const [active, setActive] = React.useState<string>();
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const root = document.getElementById(contentId);

    if (!root) {
      setHeadings([]);
      return;
    }

    const nodes = Array.from(
      root.querySelectorAll<HTMLHeadingElement>("h2[id], h3[id]"),
    );

    setHeadings(
      nodes.map((node) => {
        // The heading also holds the "#" anchor link, so drop it from the text.
        const clone = node.cloneNode(true) as HTMLElement;
        clone.querySelectorAll("a").forEach((link) => link.remove());

        return {
          id: node.id,
          text: clone.textContent?.trim() ?? "",
          level: node.tagName === "H2" ? 2 : 3,
        };
      }),
    );

    let frame = 0;

    // Scroll based (not IntersectionObserver) so the result is deterministic:
    // the current section is the last heading that has passed the offset line.
    const update = () => {
      frame = 0;

      let current: string | undefined;
      for (const node of nodes) {
        if (node.getBoundingClientRect().top <= OFFSET + 1) current = node.id;
        else break;
      }

      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;
      if (atBottom && nodes.length > 0) current = nodes[nodes.length - 1].id;

      setActive(current);

      const rect = root.getBoundingClientRect();
      const scrollable = rect.height - (window.innerHeight - OFFSET);
      setProgress(
        scrollable <= 0
          ? 0
          : Math.min(1, Math.max(0, (OFFSET - rect.top) / scrollable)),
      );
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname, contentId]);

  const goTo = React.useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      const target = document.getElementById(id);
      if (!target) return;

      event.preventDefault();

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      // Headings should carry `scroll-mt-24` so they land below the header.
      target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      history.replaceState(null, "", `#${id}`);
      setActive(id);
    },
    [],
  );

  return { headings, active, progress, goTo };
}

function scrollToTop() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  history.replaceState(null, "", window.location.pathname + window.location.search);
}

/* -------------------------------------------------------------------------- */
/*  List with a sliding active marker                                         */
/* -------------------------------------------------------------------------- */

function TocList({
  headings,
  active,
  onNavigate,
}: {
  headings: Heading[];
  active?: string;
  onNavigate: (event: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
}) {
  const scrollerRef = React.useRef<HTMLDivElement>(null);
  const itemRefs = React.useRef(new Map<string, HTMLLIElement>());
  const [marker, setMarker] = React.useState<{ top: number; height: number } | null>(null);

  React.useLayoutEffect(() => {
    const item = active ? itemRefs.current.get(active) : undefined;
    const scroller = scrollerRef.current;

    if (!item || !scroller) {
      setMarker(null);
      return;
    }

    setMarker({ top: item.offsetTop, height: item.offsetHeight });

    // Keep the current item visible when the list itself scrolls.
    const top = item.offsetTop;
    const bottom = top + item.offsetHeight;
    if (top < scroller.scrollTop) scroller.scrollTop = top - 8;
    else if (bottom > scroller.scrollTop + scroller.clientHeight)
      scroller.scrollTop = bottom - scroller.clientHeight + 8;
  }, [active, headings]);

  return (
    <div ref={scrollerRef} className='relative max-h-[calc(100vh-18rem)] overflow-y-auto'>
      <ul className='relative space-y-0.5 border-neutral-200 dark:border-neutral-800 border-l'>
        {marker && (
          <span
            aria-hidden
            className='-left-px absolute bg-brand w-0.5 rounded-full transition-[top,height] duration-200 ease-out motion-reduce:transition-none'
            style={{ top: marker.top, height: marker.height }}
          />
        )}

        {headings.map((heading) => {
          const isActive = active === heading.id;

          return (
            <li
              key={heading.id}
              ref={(el) => {
                if (el) itemRefs.current.set(heading.id, el);
                else itemRefs.current.delete(heading.id);
              }}
            >
              <a
                href={`#${heading.id}`}
                onClick={(event) => onNavigate(event, heading.id)}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "block py-1 pr-2 text-[13px] leading-snug transition-colors",
                  "rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-brand",
                  heading.level === 3 ? "pl-7" : "pl-4",
                  isActive
                    ? "font-medium text-brand"
                    : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50",
                )}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Desktop: right sidebar                                                    */
/* -------------------------------------------------------------------------- */

export function DocsToc({
  contentId = "docs-content",
  editUrl,
}: {
  contentId?: string;
  /** Optional "Edit this page" link (e.g. the file on GitHub). */
  editUrl?: string;
}) {
  const { headings, active, progress, goTo } = useToc(contentId);

  if (headings.length === 0) return null;

  const percent = Math.round(progress * 100);

  return (
    <nav aria-label='On this page' className='text-sm'>
      <p className='mb-3 font-semibold text-sm'>On this page</p>

      <TocList headings={headings} active={active} onNavigate={goTo} />

      <div className='space-y-2 mt-6 pt-4 border-neutral-200 dark:border-neutral-800 border-t'>
        <div className='flex items-center gap-2 text-neutral-500 dark:text-neutral-400 text-xs'>
          <div
            role='progressbar'
            aria-label='Reading progress'
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={percent}
            className='flex-1 bg-neutral-200 dark:bg-neutral-800 rounded-full h-1 overflow-hidden'
          >
            <div
              className='bg-brand h-full transition-[width] duration-150 motion-reduce:transition-none'
              style={{ width: `${percent}%` }}
            />
          </div>
          <span className='tabular-nums'>{percent}%</span>
        </div>

        {editUrl && (
          <a
            href={editUrl}
            target='_blank'
            rel='noreferrer'
            className='flex items-center gap-1.5 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-50 dark:text-neutral-400 text-xs transition-colors'
          >
            <SquarePen className='size-3.5' aria-hidden />
            Edit this page
          </a>
        )}

        <button
          type='button'
          onClick={scrollToTop}
          className='flex items-center gap-1.5 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-50 dark:text-neutral-400 text-xs transition-colors'
        >
          <ArrowUp className='size-3.5' aria-hidden />
          Back to top
        </button>
      </div>
    </nav>
  );
}

/* -------------------------------------------------------------------------- */
/*  Mobile / tablet: collapsible bar above the content                        */
/* -------------------------------------------------------------------------- */

/** Place above the article and hide it from `xl` up, where DocsToc is visible. */
export function DocsTocMobile({
  contentId = "docs-content",
  className,
}: {
  contentId?: string;
  className?: string;
}) {
  const { headings, active, goTo } = useToc(contentId);
  const [open, setOpen] = React.useState(false);
  const panelId = React.useId();

  if (headings.length === 0) return null;

  const current = headings.find((h) => h.id === active)?.text ?? "On this page";

  return (
    <div
      className={cn(
        "xl:hidden top-16 z-20 sticky bg-background/90 backdrop-blur border border-neutral-200 dark:border-neutral-800 rounded-lg",
        className,
      )}
    >
      <button
        type='button'
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className='flex justify-between items-center gap-3 px-3 py-2.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-brand w-full text-left text-sm'
      >
        <span className='truncate'>
          <span className='text-neutral-500 dark:text-neutral-400'>On this page: </span>
          <span className='font-medium'>{current}</span>
        </span>
        <ChevronDown
          aria-hidden
          className={cn("size-4 shrink-0 transition-transform motion-reduce:transition-none", open && "rotate-180")}
        />
      </button>

      {open && (
        <div id={panelId} className='px-3 pt-1 pb-3 border-neutral-200 dark:border-neutral-800 border-t'>
          <TocList
            headings={headings}
            active={active}
            onNavigate={(event, id) => {
              goTo(event, id);
              setOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
