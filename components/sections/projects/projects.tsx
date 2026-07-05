"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ProjectCard } from "./project-card"
import { projectData } from "./data/project-data"

export default function ProjectSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      id="projects"
      className="relative min-h-screen overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(40,10,60,1)_0%,rgba(10,5,20,1)_100%)] to-muted" />

      <div className="container mx-auto px-4 py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <h2 className="text-2xl leading-tight font-bold md:text-3xl lg:text-5xl">
            Featured{" "}
            <span className="bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>

          <p className="mt-6 text-sm leading-relaxed text-muted-foreground md:text-lg">
            A collection of projects showcasing my experience building modern,
            scalable and production-ready web applications using the latest web
            technologies.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {projectData.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </AnimatePresence>
      </div>
    </motion.section>
  )
}
