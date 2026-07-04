"use client"

import Link from "next/link"
import { BookOpen, GraduationCap, Rocket, ExternalLink } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { educationData } from "./data/education-data"

const statusStyles: Record<string, string> = {
  completed: "bg-green-500/10 text-green-500",
  certified: "bg-blue-500/10 text-blue-500",
  "in-progress": "bg-yellow-500/10 text-yellow-500",
}

export default function Education() {
  return (
    <section
      id="education"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* background */}
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-background via-background to-muted" />

      <div className="container mx-auto px-6 py-20">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="text-4xl font-bold md:text-5xl">
            My{" "}
            <span className="bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              Education
            </span>
          </h2>

          <p className="mt-6 text-sm leading-relaxed text-muted-foreground md:text-lg">
            My academic background and continuous learning journey in
            engineering and modern full-stack web development.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {educationData.map((item) => {
            const Icon = item.icon

            return (
              <Card
                key={item.title}
                className="group h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Header */}
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="rounded-lg bg-primary/10 p-3">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[item.status]}`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <CardTitle className="mt-4 text-lg leading-snug">
                    {item.title}
                  </CardTitle>

                  <p className="text-sm text-muted-foreground">
                    {item.institution}
                  </p>
                </CardHeader>

                {/* Content */}
                <CardContent className="space-y-5">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>

                  {/* Highlights */}
                  {"highlights" in item && item.highlights && (
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-muted-foreground">
                        Key Learnings
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {item.highlights.map((h: string) => (
                          <Badge
                            key={h}
                            variant="secondary"
                            className="text-xs"
                          >
                            {h}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Learning outcome */}
                  {"learningOutcome" in item && item.learningOutcome && (
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      <span className="font-medium text-foreground">
                        Outcome:
                      </span>{" "}
                      {item.learningOutcome}
                    </p>
                  )}

                  {/* Certificate */}
                  {"certificate" in item && item.certificate && (
                    <Link
                      href={item.certificate}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                    >
                      View Certificate
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
