"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, Variants } from "motion/react"
import { ArrowUpRight, Eye, Globe, Clock3 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Project } from "./data/project-data"
import ProjectDialog from "./project-dialog"
import { FaGithub } from "react-icons/fa"

interface ProjectCardProps {
  project: Project
  index?: number
}

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.12,
      duration: 0.45,
      ease: [0.25, 0.1, 0.25, 1], // cubic-bezier
    },
  }),
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <Card className="group flex h-full flex-col overflow-hidden py-0 transition-all duration-300 hover:shadow-2xl">
        {/* Image */}

        <div className="relative aspect-video overflow-hidden">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            priority={index === 0}
            className="object-cover transition duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

          <div className="absolute top-4 left-4 flex gap-2">
            <Badge>{project.category}</Badge>

            <Badge
              variant={project.status === "completed" ? "secondary" : "default"}
            >
              {project.status === "completed" ? "Completed" : "In Progress"}
            </Badge>
          </div>
        </div>

        {/* Header */}

        <CardHeader>
          <CardTitle className="line-clamp-1 text-xl">
            {project.title}
          </CardTitle>

          <p className="text-sm text-muted-foreground">{project.subtitle}</p>
        </CardHeader>

        {/* Content */}

        <CardContent className="flex-1">
          <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
            {project.description}
          </p>

          {/* Tech Stack */}

          <div className="mb-4 flex flex-wrap gap-2">
            {project.technologies.slice(0, 5).map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}

            {project.technologies.length > 5 && (
              <Badge variant="outline">
                +{project.technologies.length - 5}
              </Badge>
            )}
          </div>

          {/* Meta */}

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock3 className="h-4 w-4" />
              {project.duration}
            </div>

            <Badge variant="outline">{project.role}</Badge>
          </div>
        </CardContent>

        {/* Footer */}

        <CardFooter className="grid grid-cols-3 gap-3">
          <Button asChild size="sm" className="group/button">
            <Link href={project.liveUrl} target="_blank">
              <Globe className="mr-2 h-4 w-4" />
              Live
            </Link>
          </Button>

          <Button asChild variant="outline" size="sm">
            <Link href={project.githubUrl} target="_blank">
              <FaGithub className="mr-2 h-4 w-4" />
              GitHub
            </Link>
          </Button>

          <ProjectDialog project={project}>
            <Button
              variant="secondary"
              size="sm"
              className="group/dialog w-full"
            >
              <Eye className="mr-2 h-4 w-4" />
              Details
              <ArrowUpRight className="ml-auto h-4 w-4 transition-transform duration-300 group-hover/dialog:translate-x-0.5 group-hover/dialog:-translate-y-0.5" />
            </Button>
          </ProjectDialog>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
