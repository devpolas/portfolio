"use client"
import Link from "next/link"
import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  Menu,
  X,
  House,
  Code,
  User,
  FolderGit2,
  Mail,
  GraduationCap,
  BriefcaseBusiness,
} from "lucide-react"
import { Button } from "../ui/button"
import Logo from "../logo/logo"
import NavIcon from "./nav-icon"
import scrollToSection from "@/utils/scroll-to-section"
import useActiveSection from "@/hooks/use-active-section-id"
import { ThemeSwitcher } from "../theme/theme-switcher"
import ResumeButton from "../buttons/resume-button"

const menuItems = [
  { name: "Home", href: "/#home", icon: House },
  { name: "About", href: "/#about", icon: User },
  { name: "Skills", href: "/#skills", icon: Code },
  { name: "Education", href: "/#education", icon: GraduationCap },
  { name: "Experience", href: "/#experience", icon: BriefcaseBusiness },
  { name: "Projects", href: "/#projects", icon: FolderGit2 },
  { name: "Contact", href: "/#contact", icon: Mail },
]

export default function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)
  const activeId = useActiveSection()

  return (
    <div className="fixed top-0 left-0 z-50 w-full border-b border-accent bg-background/80 shadow-xs backdrop-blur-md">
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        exit={{ y: -100 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mx-auto max-w-11/12 p-2">
          <div className="flex items-center justify-between font-semibold">
            <div className="flex flex-row items-center gap-1">
              <Button
                aria-label="Toggle navigation menu"
                onClick={() => setMobileMenuOpen((pre) => !pre)}
                className="lg:hidden"
                variant="ghost"
                size="icon-lg"
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.1 }}
                    >
                      <X />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.1 }}
                    >
                      <Menu />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
              <Logo />
            </div>

            <AnimatePresence mode="wait">
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -100, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-16 left-3 flex flex-col gap-4 rounded-md border border-accent bg-background px-10 py-4 backdrop-blur-md"
                >
                  {menuItems.map((item) => {
                    const isActive = activeId === item.href.replace("/#", "")

                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault()
                          scrollToSection(item.href)
                          setMobileMenuOpen(false)
                        }}
                        className={`text-base transition-colors ${
                          isActive ? "font-bold text-ring" : "hover:text-ring"
                        }`}
                      >
                        <span className="flex flex-row items-center gap-3">
                          <NavIcon icon={item.icon} />
                          {item.name}
                        </span>
                      </Link>
                    )
                  })}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="hidden flex-row gap-4 lg:flex lg:gap-6 xl:gap-10 2xl:gap-12">
              {menuItems.map((item) => {
                const isActive = activeId === item.href.replace("/#", "")

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-sm transition-colors xl:text-base ${
                      isActive ? "font-bold text-ring" : "hover:text-ring"
                    }`}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection(item.href)
                    }}
                  >
                    <span className="flex flex-row items-center gap-0.5 lg:gap-1">
                      <NavIcon icon={item.icon} />
                      {item.name}
                    </span>
                  </Link>
                )
              })}
            </div>

            <div className="flex items-center gap-2">
              <ResumeButton />
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
