import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { readdir } from "node:fs/promises";
import path from "node:path";

const DOCS_DIR = path.join(process.cwd(), "content/docs");

type Props = { params: Promise<{ slug: string }> };

// One static page per file in content/docs.
export async function generateStaticParams() {
  const files = await readdir(DOCS_DIR);

  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => ({ slug: file.replace(/\.mdx$/, "") }));
}

async function loadDoc(slug: string) {
  // Only allow simple file names, never paths.
  if (!/^[\w-]+$/.test(slug)) return null;

  try {
    return await import(`@/content/docs/${slug}.mdx`);
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doc = await loadDoc(slug);

  return doc?.metadata ?? {};
}

export default async function DocPage({ params }: Props) {
  const { slug } = await params;
  const doc = await loadDoc(slug);

  if (!doc) notFound();

  const Content = doc.default;

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-12">
      <Content />
    </article>
  );
}
