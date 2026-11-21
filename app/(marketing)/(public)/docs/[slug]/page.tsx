import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { readdir } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { DocsToc, DocsTocMobile } from "@/components/docs/docs-toc";

const DOCS_DIR = path.join(process.cwd(), "content/docs");
/** "Edit this page" target. Change to your repository. */
const EDIT_BASE = "https://github.com/OWNER/REPO/edit/main/content/docs";

// Any slug that is not returned by generateStaticParams is a 404.
// export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

/*
 * Each .mdx file can export:
 *   export const metadata = { title: "Getting started", description: "..." };
 *   export const order = 1;   // optional, controls sidebar/pager order
 */

const getSlugs = cache(async () => {
  const files = await readdir(DOCS_DIR);

  return files.filter((f) => f.endsWith(".mdx")).map((f) => f.replace(/\.mdx$/, ""));
});

const loadDoc = cache(async (slug: string) => {
  // Only allow simple file names, never paths.
  if (!/^[\w-]+$/.test(slug)) return null;

  try {
    return await import(`@/content/docs/${slug}.mdx`);
  } catch {
    return null;
  }
});

/** Ordered list of all docs, used for the previous / next links. */
const getDocsList = cache(async () => {
  const slugs = await getSlugs();

  const docs = await Promise.all(
    slugs.map(async (slug) => {
      const doc = await loadDoc(slug);

      return {
        slug,
        title: String(doc?.metadata?.title ?? slug),
        order: typeof doc?.order === "number" ? doc.order : 999,
      };
    }),
  );

  return docs.sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
});

export async function generateStaticParams() {
  return (await getSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doc = await loadDoc(slug);

  if (!doc) return {};

  const meta: Metadata = doc.metadata ?? {};
  const title = typeof meta.title === "string" ? meta.title : undefined;

  return {
    ...meta,
    alternates: { canonical: `/docs/${slug}`, ...meta.alternates },
    openGraph: {
      type: "article",
      title,
      description: meta.description ?? undefined,
      url: `/docs/${slug}`,
      ...meta.openGraph,
    },
  };
}

export default async function DocPage({ params }: Props) {
  const { slug } = await params;
  const doc = await loadDoc(slug);

  if (!doc) notFound();

  const Content = doc.default;
  const meta: Metadata = doc.metadata ?? {};
  const title = typeof meta.title === "string" ? meta.title : slug;
  const description = meta.description;

  const docs = await getDocsList();
  const index = docs.findIndex((d) => d.slug === slug);
  const prev = index > 0 ? docs[index - 1] : undefined;
  const next = index >= 0 && index < docs.length - 1 ? docs[index + 1] : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: title,
    description,
  };

  return (
    <div className='gap-12 xl:grid xl:grid-cols-[minmax(0,1fr)_14rem] mx-auto px-4 py-10 w-full max-w-5xl'>
      <script
        type='application/ld+json'
        // Static, build-time data only.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className='min-w-0'>
        <nav aria-label='Breadcrumb' className='mb-6 text-neutral-500 dark:text-neutral-400 text-sm'>
          <ol className='flex items-center gap-1.5'>
            <li>
              <Link href='/docs' className='hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors'>
                Docs
              </Link>
            </li>
            <li aria-hidden>
              <ChevronRight className='size-3.5' />
            </li>
            <li aria-current='page' className='font-medium text-neutral-900 dark:text-neutral-50 truncate'>
              {title}
            </li>
          </ol>
        </nav>

        <DocsTocMobile className='mb-8' />

        <header className='mb-10 pb-8 border-neutral-200 dark:border-neutral-800 border-b'>
          <h1 className='font-semibold text-3xl sm:text-4xl tracking-tight'>{title}</h1>
          {description && (
            <p className='mt-3 max-w-2xl text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed'>
              {description}
            </p>
          )}
        </header>

        {/* The TOC reads headings from this element. */}
        <article id='docs-content' className='max-w-none min-w-0'>
          <Content />
        </article>

        {(prev || next) && (
          <nav aria-label='Pagination' className='gap-4 grid grid-cols-2 mt-16 pt-8 border-neutral-200 dark:border-neutral-800 border-t'>
            {prev ? (
              <Link
                href={`/docs/${prev.slug}`}
                rel='prev'
                className='group flex flex-col gap-1 p-4 border border-neutral-200 hover:border-brand dark:border-neutral-800 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-brand transition-colors'
              >
                <span className='flex items-center gap-1 text-neutral-500 dark:text-neutral-400 text-xs'>
                  <ChevronLeft className='size-3.5' aria-hidden />
                  Previous
                </span>
                <span className='font-medium group-hover:text-brand transition-colors'>{prev.title}</span>
              </Link>
            ) : (
              <span />
            )}

            {next ? (
              <Link
                href={`/docs/${next.slug}`}
                rel='next'
                className='group flex flex-col items-end gap-1 p-4 border border-neutral-200 hover:border-brand dark:border-neutral-800 rounded-lg text-right outline-none focus-visible:ring-2 focus-visible:ring-brand transition-colors'
              >
                <span className='flex items-center gap-1 text-neutral-500 dark:text-neutral-400 text-xs'>
                  Next
                  <ChevronRight className='size-3.5' aria-hidden />
                </span>
                <span className='font-medium group-hover:text-brand transition-colors'>{next.title}</span>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        )}
      </div>

      <aside className='hidden xl:block top-24 self-start sticky'>
        <DocsToc editUrl={`${EDIT_BASE}/${slug}.mdx`} />
      </aside>
    </div>
  );
}
