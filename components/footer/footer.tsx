"use client"
import Link from "next/link"
import { ArrowUp, ArrowUpRight, Mail } from "lucide-react"
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
  { name: "Projects", href: "#projects" },
  { name: "Education", href: "#education" },
]

const socials = [
  { href: "https://github.com/devpolas", icon: FaGithub, label: "GitHub" },
  {
    href: "https://www.linkedin.com/in/lipcb/",
    icon: FaLinkedin,
    label: "LinkedIn",
  },
  { href: "mailto:dpi.polas@gmail.com", icon: Mail, label: "Email" },
  { href: "https://wa.me/8801732333951", icon: FaWhatsapp, label: "WhatsApp" },
  { href: "https://t.me/devpolas", icon: FaTelegramPlane, label: "Telegram" },
]

export default function Footer() {
  const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="w-full border-t bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <div className="container mx-auto px-6">
        {/* Main Content Grid */}
        <div className="flex flex-col justify-between gap-10 pt-16 xl:flex-row xl:gap-12">
          {/* Brand Column */}
          <div className="flex-1">
            <div className="flex max-w-xs flex-col items-start space-y-4">
              <Logo />
              <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                Building modern, scalable, and user-focused digital experiences
                with React, Next.js, TypeScript, and Node.js.
              </p>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="flex flex-1 flex-col gap-10 sm:flex-row sm:justify-between xl:flex-2">
            <div>
              <h3 className="mb-8 text-xs font-semibold tracking-widest text-muted-foreground/80 uppercase">
                Navigation
              </h3>
              <nav className="flex flex-col space-y-3 lg:flex-row lg:gap-10 lg:space-y-0">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="group relative w-fit text-sm text-muted-foreground transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-300 hover:text-primary hover:after:w-full"
                  >
                    <span className="inline-flex items-center">
                      {item.name}
                      <ArrowUpRight className="ml-0.5 h-3.5 w-3.5 opacity-60 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                    </span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Connect Column */}
            <div className="flex flex-col space-y-4">
              <h3 className="text-xs font-semibold tracking-widest text-muted-foreground/80 uppercase">
                Connect
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {socials.map((social) => {
                  const Icon = social.icon
                  return (
                    <Button
                      key={social.label}
                      variant="outline"
                      size="icon"
                      asChild
                      className="h-10 w-10 rounded-xl border-muted/60 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-transparent hover:text-primary"
                    >
                      <Link
                        href={social.href}
                        target={
                          social.href.startsWith("mailto")
                            ? undefined
                            : "_blank"
                        }
                        rel="noopener noreferrer"
                        aria-label={social.label}
                      >
                        <Icon className="h-4.5 w-4.5" />
                      </Link>
                    </Button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Optimization: Dedicated clean line for Back to Top right above the separator */}
        <div className="flex justify-start pb-6 sm:justify-end">
          <Button
            variant="link"
            className="group px-0 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-primary"
            asChild
          >
            <a href="#home" onClick={handleScrollToTop}>
              Back to top
              <ArrowUp className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1" />
            </a>
          </Button>
        </div>

        <Separator className="bg-border/60" />

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 py-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Polas. All rights reserved.</p>
          <p className="hidden text-muted-foreground/60 sm:block">
            Dhaka, Bangladesh
          </p>
        </div>
      </div>
    </footer>
  )
}
