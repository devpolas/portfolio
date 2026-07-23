"use client"

import Image from "next/image"
import Link from "next/link"
import { ReactNode } from "react"
import { motion } from "motion/react"
import { Clock3, Globe, Layers, Sparkles } from "lucide-react"
import { FaGithub } from "react-icons/fa"

import { Project } from "./data/project-data"

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getStatusBadge } from "./project-badge"

interface ProjectDialogProps {
  children: ReactNode
  project: Project
}

export default function ProjectDialog({
  children,
  project,
}: ProjectDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="h-[90vh] overflow-hidden border-purple-900/40 bg-[#090512] p-0 shadow-2xl shadow-purple-950/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95">
        {/* Glow Background */}

        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(88,28,135,0.45),transparent_45%)]" />

        {/* Cover */}

        <div className="relative aspect-video overflow-hidden rounded-t-lg">
          <Image
            src={project.thumbnail}
            alt={`${project.title} preview`}
            fill
            className="object-cover transition duration-700 hover:scale-105"
          />

          <div className="absolute inset-0 bg-linear-to-t from-[#090512] via-black/40 to-transparent" />

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            className="absolute bottom-5 left-5"
          >
            <Badge className="border-purple-400/30 bg-purple-500/20 text-purple-100 backdrop-blur">
              {project.category}
            </Badge>
          </motion.div>
        </div>

        <div className="custom-scrollbar space-y-10 overflow-y-auto p-6">
          {/* Header */}

          <motion.section
            initial={{
              opacity: 0,
              y: 30,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              delay: 0.15,
              duration: 0.5,
            }}
          >
            <h2 className="bg-linear-to-r from-white via-purple-200 to-purple-500 bg-clip-text text-3xl font-bold text-transparent">
              {project.title}
            </h2>

            <p className="mt-2 text-muted-foreground">{project.subtitle}</p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 rounded-full border border-purple-900/40 bg-purple-950/30 px-3 py-1 text-sm">
                <Clock3 className="h-4 w-4 text-purple-400" />
                {project.duration}
              </div>

              <Badge variant="outline">{project.role}</Badge>

              {getStatusBadge(project.status)}
            </div>
          </motion.section>

          <AnimatedSection title="Gallery">
            <div className="grid gap-5 md:grid-cols-2">
              {project.gallery.map((image, index) => (
                <motion.div
                  key={image}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}

                  animate={{
                    opacity: 1,
                    y: 0,
                  }}

                  transition={{
                    delay: index * 0.08,
                  }}

                  className="group relative aspect-video overflow-hidden rounded-xl border border-purple-900/40"
                >
                  <Image
                    src={image}
                    alt="Project screenshot"
                    fill
                    className="object-cover transition duration-500 group-hover:scale-110"
                  />
                </motion.div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection title="About Project">
            <p className="leading-relaxed text-muted-foreground">
              {project.description}
            </p>
          </AnimatedSection>

          <AnimatedSection title="Technologies">
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="border-purple-900/40 bg-purple-950/40"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </AnimatedSection>

          <ProjectList title="Features" items={project.features} />

          <ProjectList title="Challenges" items={project.challenges} />

          <ProjectList title="Future Plans" items={project.futurePlans} />

          <div className="grid gap-3 sm:grid-cols-2">
            {project.liveUrl && (
              <Button asChild variant={"secondary"} size={"sm"}>
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Globe className="mr-2 h-4 w-4" />
                  Live Demo
                </Link>
              </Button>
            )}

            {project.githubUrl && (
              <Button asChild variant="outline" size={"sm"}>
                <Link
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub className="mr-2 h-4 w-4" />
                  GitHub
                </Link>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function AnimatedSection({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 25,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}

      transition={{
        duration: 0.4,
      }}
    >
      <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold">
        <Sparkles className="h-5 w-5 text-purple-400" />

        {title}
      </h3>

      {children}
    </motion.section>
  )
}

function ProjectList({ title, items }: { title: string; items: string[] }) {
  return (
    <AnimatedSection title={title}>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-muted-foreground">
            <span className="mt-2 h-2 w-2 rounded-full bg-purple-500" />

            {item}
          </li>
        ))}
      </ul>
    </AnimatedSection>
  )
}
