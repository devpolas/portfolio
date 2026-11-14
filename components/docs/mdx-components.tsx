import * as React from "react";
import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { CodeBlock } from "./code-block";
import { Tab, Tabs } from "./tabs";
import { Callout } from "./callout";

const headingStyles = {
  h1: "mt-0 mb-6 text-4xl font-black tracking-tight",
  h2: "mt-12 mb-4 border-b border-neutral-200 pb-2 text-2xl font-bold tracking-tight dark:border-neutral-800",
  h3: "mt-8 mb-3 text-xl font-semibold tracking-tight",
  h4: "mt-6 mb-2 text-base font-semibold",
} as const;

function createHeading(tag: keyof typeof headingStyles) {
  return function Heading({
    id,
    className,
    children,
    ...props
  }: React.ComponentProps<"h2">) {
    return React.createElement(
      tag,
      {
        id,
        className: cn("group scroll-mt-24", headingStyles[tag], className),
        ...props,
      },
      children,
      id && tag !== "h1" ? (
        <a
          href={`#${id}`}
          aria-label='Link to this section'
          className={cn(
            "opacity-0 ml-2 text-neutral-400 no-underline transition-opacity",
            "group-hover:opacity-100 focus-visible:opacity-100",
            "outline-none focus-visible:ring-2 focus-visible:ring-brand rounded",
          )}
        >
          #
        </a>
      ) : null,
    );
  };
}

const linkClass =
  "font-medium text-brand underline underline-offset-4 decoration-brand/40 hover:decoration-brand";

function Anchor({
  href = "",
  className,
  children,
  ...props
}: React.ComponentProps<"a">) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={cn(linkClass, className)} {...props}>
        {children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return (
      <a href={href} className={cn(linkClass, className)} {...props}>
        {children}
      </a>
    );
  }

  return (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      className={cn(linkClass, className)}
      {...props}
    >
      {children}
    </a>
  );
}

// ---------------------------------------------------------------------------
// Code: fenced blocks arrive as <pre><code className="language-x">.
// Optional meta (title, line highlights, line numbers) comes from
// rehype-code-meta.ts as data-* attributes on <pre>.
// ---------------------------------------------------------------------------
type PreProps = React.ComponentProps<"pre"> & {
  "data-title"?: string;
  "data-highlight"?: string;
  "data-line-numbers"?: string;
};

function Pre({ children, ...props }: PreProps) {
  const child = React.Children.toArray(children)[0];

  if (
    !React.isValidElement<{ className?: string; children?: React.ReactNode }>(
      child,
    ) ||
    typeof child.props.children !== "string"
  ) {
    return <pre {...props}>{children}</pre>;
  }

  const language = /language-([\w-]+)/.exec(child.props.className ?? "")?.[1];

  return (
    <CodeBlock
      code={child.props.children}
      language={language}
      title={props["data-title"]}
      highlight={props["data-highlight"]}
      showLineNumbers={props["data-line-numbers"] !== undefined}
    />
  );
}

function InlineCode({ className, ...props }: React.ComponentProps<"code">) {
  return (
    <code
      className={cn(
        "bg-neutral-100 px-1.5 py-0.5 rounded font-mono text-[0.875em]",
        "dark:bg-neutral-900",
        className,
      )}
      {...props}
    />
  );
}

export const mdxComponents: MDXComponents = {
  h1: createHeading("h1"),
  h2: createHeading("h2"),
  h3: createHeading("h3"),
  h4: createHeading("h4"),

  p: ({ className, ...props }) => (
    <p className={cn("my-4 leading-7", className)} {...props} />
  ),
  a: Anchor,
  strong: ({ className, ...props }) => (
    <strong className={cn("font-semibold", className)} {...props} />
  ),

  ul: ({ className, ...props }) => (
    <ul className={cn("space-y-2 my-4 pl-6 list-disc", className)} {...props} />
  ),
  ol: ({ className, ...props }) => (
    <ol
      className={cn("space-y-2 my-4 pl-6 list-decimal", className)}
      {...props}
    />
  ),
  li: ({ className, ...props }) => (
    <li
      className={cn("marker:text-neutral-400 leading-7", className)}
      {...props}
    />
  ),

  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        "my-6 pl-4 border-neutral-300 border-l-2 text-neutral-600 italic",
        "dark:border-neutral-700 dark:text-neutral-400",
        className,
      )}
      {...props}
    />
  ),
  hr: (props) => (
    <hr
      className='my-10 border-neutral-200 dark:border-neutral-800'
      {...props}
    />
  ),

  // Wide tables scroll inside their own box instead of the whole page.
  table: ({ className, ...props }) => (
    <div className='my-6 overflow-x-auto'>
      <table
        className={cn("w-full text-sm border-collapse", className)}
        {...props}
      />
    </div>
  ),
  th: ({ className, ...props }) => (
    <th
      className={cn(
        "px-3 py-2 border-neutral-300 border-b font-semibold text-left",
        "dark:border-neutral-700",
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }) => (
    <td
      className={cn(
        "px-3 py-2 border-neutral-200 border-b align-top",
        "dark:border-neutral-800",
        className,
      )}
      {...props}
    />
  ),

  img: ({ className, alt = "", ...props }) => (
    // Docs images have unknown sizes, so a plain <img> is used on purpose.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={alt}
      loading='lazy'
      className={cn("my-6 border rounded-lg max-w-full h-auto", className)}
      {...props}
    />
  ),

  pre: Pre,
  code: InlineCode,

  // Available in .mdx files without importing.
  Callout,
  CodeBlock,
  Tabs,
  Tab,
};

// Required by @next/mdx. Re-export this file from the project root
// (mdx-components.tsx) if Next.js cannot find it in docs/.
export function useMDXComponents(
  components: MDXComponents = {},
): MDXComponents {
  return { ...mdxComponents, ...components };
}
