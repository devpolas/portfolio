"use client"

import Link from "next/link"
import { ArrowUpRight, Heart, Mail } from "lucide-react"
import {
  FaGithub,
  FaLinkedin,
  FaTelegramPlane,
  FaWhatsapp,
} from "react-icons/fa"

import Logo from "../logo/logo"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const navigation = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Education", href: "#education" },
  { name: "Projects", href: "#projects" },
]

const socials = [
  {
    href: "https://github.com/devpolas",
    icon: FaGithub,
    label: "GitHub",
  },
  {
    href: "https://www.linkedin.com/in/lipcb/",
    icon: FaLinkedin,
    label: "LinkedIn",
  },
  {
    href: "mailto:dpi.polas@gmail.com",
    icon: Mail,
    label: "Email",
  },
  {
    href: "https://wa.me/8801732333951",
    icon: FaWhatsapp,
    label: "WhatsApp",
  },
  {
    href: "https://t.me/devpolas",
    icon: FaTelegramPlane,
    label: "Telegram",
  },
]

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 py-14 md:grid-cols-[1.2fr_0.8fr_1fr]">
          {/* Brand */}
          <div className="space-y-4">
            <Logo />

            <p className="max-w-sm leading-relaxed text-muted-foreground">
              Building modern, scalable, and user-focused digital experiences
              with React, Next.js, TypeScript, and Node.js.
            </p>

            <Button variant="ghost" className="px-0" asChild>
              <Link href="#home">
                Back to top
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-5 text-sm font-semibold tracking-wider text-foreground uppercase">
              Navigation
            </h3>

            <nav className="flex flex-col gap-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground transition-all duration-300 hover:translate-x-1 hover:text-primary"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-sm font-semibold tracking-wider text-foreground uppercase">
              Connect
            </h3>

            <div className="flex flex-wrap gap-3">
              {socials.map((social) => {
                const Icon = social.icon

                return (
                  <Button
                    key={social.label}
                    variant="outline"
                    size="icon"
                    asChild
                    className="group h-11 w-11 rounded-full transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <Link
                      href={social.href}
                      target={
                        social.href.startsWith("mailto") ? undefined : "_blank"
                      }
                      rel="noopener noreferrer"
                      aria-label={social.label}
                    >
                      <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                    </Link>
                  </Button>
                )
              })}
            </div>

            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Available for freelance projects, collaborations, and full-time
              opportunities.
            </p>
          </div>
        </div>

        <Separator />

        <div className="flex flex-col items-center justify-between gap-4 py-6 text-sm text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Polas. All rights reserved.</p>

          <p className="flex items-center gap-2">
            Designed & Built with
            <Heart className="h-4 w-4 fill-red-500 text-red-500" />
            using Next.js & Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  )
}
