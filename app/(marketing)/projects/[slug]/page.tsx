import type { Metadata } from "next";

import { projects } from "@/data/projects";
import { createMetadata } from "@/config/metadata";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return createMetadata({
      title: "Project Not Found",
      description: "The requested project could not be found.",
      path: `/projects/${encodeURIComponent(slug)}`,
      noIndex: true,
    });
  }

  return createMetadata({
    title: project.title,
    description: project.description,
    path: `/projects/${encodeURIComponent(project.slug)}`,
    // Add image: project.image when your data has a suitable image URL.
  });
}
