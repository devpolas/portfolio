"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Download, Mail, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { useIsMobile } from "@/hooks/use-mobile"
import ResumeButton from "@/components/buttons/resume-button"

export default function HeroSection() {
  const isMobile = useIsMobile()
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-background via-background to-muted" />

      <div className="container mx-auto px-6 py-5 md:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left  */}
          <div className="mx-auto space-y-8">
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              Available for freelance
            </Badge>

            <div className="space-y-4">
              <h1 className="text-4xl leading-tight font-bold md:text-6xl">
                Hi, I&apos;m
                <span className="bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                  Polas
                </span>
              </h1>

              <h2 className="text-2xl font-semibold text-muted-foreground md:text-4xl">
                Full Stack Developer
              </h2>

              <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
                I build scalable, performant, and user-focused web applications
                using Next.js, TypeScript, Node.js, PostgreSQL and Mongodb.
              </p>
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-4">
              {isMobile ? (
                <ResumeButton />
              ) : (
                <Button
                  variant={"secondary"}
                  size={isMobile ? "sm" : "lg"}
                  asChild
                  className="transition-all duration-300 hover:scale-105 hover:cursor-pointer"
                >
                  <Link download href="/resume.pdf">
                    <Download className="mr-2 h-4 w-4" />
                    Download Resume
                  </Link>
                </Button>
              )}

              <Button
                variant="outline"
                size={isMobile ? "sm" : "lg"}
                asChild
                className="group cursor-pointer transition-all duration-300 hover:scale-105"
              >
                <Link href="#projects">
                  View Projects
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
                </Link>
              </Button>
            </div>

            {/* Social */}
            <div className="flex items-center gap-4">
              <Link
                href="https://github.com/devpolas"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="icon"
                  className="transition-all duration-300 hover:scale-110 hover:cursor-pointer"
                  variant="outline"
                >
                  <FaGithub />
                </Button>
              </Link>

              <Link
                href="https://www.linkedin.com/in/lipcb/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="icon"
                  className="transition-all duration-300 hover:scale-110 hover:cursor-pointer"
                  variant="outline"
                >
                  <FaLinkedin />
                </Button>
              </Link>

              <Link href="mailto:dpi.polas@gmail.com">
                <Button
                  size="icon"
                  className="transition-all duration-300 hover:scale-110 hover:cursor-pointer"
                  variant="outline"
                >
                  <Mail className="h-5 w-5" />
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-4">
              <div>
                <h3 className="text-2xl font-bold">15+</h3>
                <p className="text-sm text-muted-foreground">Projects</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold">3+</h3>
                <p className="text-sm text-muted-foreground">Years Learning</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold">100%</h3>
                <p className="text-sm text-muted-foreground">Dedication</p>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="relative flex justify-center">
            <div className="relative aspect-square w-70 sm:w-87.5 md:w-125">
              <div className="absolute inset-1.5 overflow-hidden rounded-full bg-background">
                <Image
                  src="/hero.webp"
                  alt="Polas"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>{" "}
          </div>
        </div>
      </div>
    </section>
  )
}
