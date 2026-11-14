"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Remembers the selected tab per `groupId` (for example "package-manager"),
// so every tab group with the same id switches together and the choice
// survives reloads.
// ---------------------------------------------------------------------------
const CHANGE_EVENT = "docs-tabs-change";
const storageKey = (groupId: string) => `docs-tabs:${groupId}`;

function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function readStored(groupId: string) {
  try {
    return localStorage.getItem(storageKey(groupId));
  } catch {
    return null;
  }
}

function writeStored(groupId: string, value: string) {
  try {
    localStorage.setItem(storageKey(groupId), value);
  } catch {
    // Private mode or blocked storage: the tab still switches on this page.
  }

  window.dispatchEvent(new Event(CHANGE_EVENT));
}

type TabsProps = {
  /** Tab labels. The nth <Tab> child belongs to the nth label. */
  items: string[];
  defaultValue?: string;
  /** Tab groups with the same id stay in sync. */
  groupId?: string;
  className?: string;
  children: React.ReactNode;
};

export function Tabs({
  items,
  defaultValue,
  groupId,
  className,
  children,
}: TabsProps) {
  const uid = React.useId();
  const buttons = React.useRef<(HTMLButtonElement | null)[]>([]);
  const [local, setLocal] = React.useState(defaultValue ?? items[0]);

  const stored = React.useSyncExternalStore(
    subscribe,
    () => (groupId ? readStored(groupId) : null),
    () => null,
  );

  const selected = groupId && stored && items.includes(stored) ? stored : local;

  const panels = React.Children.toArray(children).filter(React.isValidElement);

  function select(value: string) {
    setLocal(value);

    if (groupId) writeStored(groupId, value);
  }

  function onKeyDown(event: React.KeyboardEvent, index: number) {
    const last = items.length - 1;
    let next: number;

    switch (event.key) {
      case "ArrowRight":
        next = index === last ? 0 : index + 1;
        break;
      case "ArrowLeft":
        next = index === 0 ? last : index - 1;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = last;
        break;
      default:
        return;
    }

    event.preventDefault();
    select(items[next]);
    buttons.current[next]?.focus();
  }

  return (
    <div className={cn("my-6", className)}>
      <div
        role='tablist'
        className={cn(
          "flex gap-1 border-b overflow-x-auto",
          "border-neutral-200 dark:border-neutral-800",
        )}
      >
        {items.map((item, index) => {
          const active = item === selected;

          return (
            <button
              key={item}
              ref={(node) => {
                buttons.current[index] = node;
              }}
              type='button'
              role='tab'
              id={`${uid}-tab-${index}`}
              aria-selected={active}
              aria-controls={`${uid}-panel-${index}`}
              // Only the active tab is in the tab order; arrows move between tabs.
              tabIndex={active ? 0 : -1}
              onClick={() => select(item)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={cn(
                "-mb-px px-3 py-2 border-b-2 font-medium text-sm transition-colors shrink-0",
                "outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-inset",
                active
                  ? "border-brand text-neutral-900 dark:text-neutral-50"
                  : "border-transparent text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50",
              )}
            >
              {item}
            </button>
          );
        })}
      </div>

      {/* Every panel is rendered (and `hidden` when inactive) so the content
          is in the HTML for search engines and find-in-page. */}
      {items.map((item, index) => (
        <div
          key={item}
          role='tabpanel'
          id={`${uid}-panel-${index}`}
          aria-labelledby={`${uid}-tab-${index}`}
          hidden={item !== selected}
          className='*:first:mt-4'
        >
          {panels[index]}
        </div>
      ))}
    </div>
  );
}

type TabProps = {
  children: React.ReactNode;
  className?: string;
};

/** The content of one tab. Its label comes from `items` on <Tabs>. */
export function Tab({ children, className }: TabProps) {
  return <div className={className}>{children}</div>;
}
