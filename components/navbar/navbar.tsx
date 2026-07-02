"use client"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, House, Code, Book, Baby, Presentation } from "lucide-react"
import { Button } from "../ui/button"
import Logo from "../logo/logo"

export default function Navbar() {
  const menuItems = [
    { name: "Home", href: "/", icon: <House /> },
    { name: "About", href: "/about", icon: <Baby /> },
    { name: "Skills", href: "/#skills", icon: <Code /> },
    { name: "Projects", href: "/projects", icon: <Presentation /> },
    { name: "Blog", href: "/blog", icon: <Book /> },
  ]

  const [show, setShow] = useState(true)
  const lastScrollY = useRef(0)
  const scrollThreshold = 10

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)

  const controlNavbar = () => {
    if (typeof window === "undefined") return

    const currentScrollY = window.scrollY
    const scrollDifference = currentScrollY - lastScrollY.current

    if (scrollDifference > scrollThreshold && currentScrollY > 100) {
      setShow(false)
    } else if (scrollDifference < -scrollThreshold || currentScrollY < 100) {
      setShow(true)
    }

    lastScrollY.current = currentScrollY
  }

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar, { passive: true })
    return () => window.removeEventListener("scroll", controlNavbar)
  }, [])

  return (
    <div className="fixed top-0 left-0 z-999 w-full border-b border-accent shadow-xs backdrop-blur-xs">
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mx-auto max-w-11/12 p-3">
              <div className="flex items-center justify-between text-lg font-semibold">
                <div className="flex flex-row items-center gap-1">
                  <div
                    onClick={() => setMobileMenuOpen((pre) => !pre)}
                    className="md:hidden"
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
                  </div>
                  <Logo />
                </div>

                <AnimatePresence mode="wait">
                  {isMobileMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, x: -100 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -100, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute mt-12 flex flex-col gap-4 rounded-md border border-accent bg-background px-10 py-4 backdrop-blur-md"
                    >
                      {menuItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="transition-colors hover:text-ring"
                        >
                          <span className="flex flex-row items-center gap-3">
                            {item.icon}
                            {item.name}
                          </span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="hidden flex-row gap-4 text-lg md:flex lg:gap-8 xl:gap-10">
                  {menuItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="transition-colors hover:text-ring"
                    >
                      <span className="flex flex-row items-center gap-0.5 lg:gap-1">
                        {item.icon}
                        {item.name}
                      </span>
                    </Link>
                  ))}
                </div>
                <Link href="/#contact">
                  <Button
                    size="default"
                    className="text-sm font-semibold hover:cursor-pointer md:text-lg"
                    variant="outline"
                  >
                    Let&apos;s Talk
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
