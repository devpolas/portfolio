"use client"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getBadge } from "./education-badge"
import { academicData, courseData } from "./data/education-data"

export default function EducationSection() {
  return (
    <section
      id="education"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-background via-background to-muted" />

      <div className="container mx-auto px-6 py-20">
        {/* Header */}

        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="text-4xl font-bold md:text-5xl">
            Education &{" "}
            <span className="bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              Learning
            </span>
          </h2>

          <p className="mt-6 text-sm leading-relaxed text-muted-foreground md:text-lg">
            My academic background and continuous learning journey in software
            engineering, modern web technologies, and full-stack application
            development.
          </p>
        </div>

        <div className="space-y-6">
          {/* Diploma */}

          <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <CardContent className="flex flex-col items-start gap-6 md:flex-row md:items-center">
              <div className="rounded-xl bg-primary/10 p-2">
                <academicData.icon className="h-10 w-10 text-primary" />
              </div>

              <div className="flex-1">
                <div className="mb-2 flex flex-wrap items-center gap-3">
                  <h3 className="text-2xl font-bold">{academicData.title}</h3>

                  {getBadge(academicData.status)}
                </div>

                <p className="font-medium text-muted-foreground">
                  {academicData.institution}
                </p>

                <p className="mt-2 max-w-3xl text-muted-foreground">
                  Completed a Diploma in Mechanical Technology, building a
                  strong engineering foundation in analytical thinking,
                  technical problem solving, teamwork, and project execution.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Courses */}

          <div className="grid gap-4 lg:grid-cols-2">
            {courseData.map((course) => (
              <Card
                key={course.id}
                className="flex h-full flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <CardHeader>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <course.icon className="h-7 w-7 text-primary" />
                    </div>

                    {getBadge(course.status)}
                  </div>

                  <CardTitle className="leading-snug">{course.title}</CardTitle>

                  <CardDescription className="font-medium">
                    {course.institution}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-1 flex-col">
                  <p className="mb-4 text-sm leading-7 text-muted-foreground">
                    {course.description}
                  </p>

                  <h4 className="mb-3 text-sm font-semibold">Core Skills</h4>

                  <div className="flex flex-wrap gap-2">
                    {course.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
