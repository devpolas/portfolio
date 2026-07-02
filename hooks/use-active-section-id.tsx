"use client"

import { useEffect, useState } from "react"

export default function useActiveSection() {
  const [activeId, setActiveId] = useState("home")

  useEffect(() => {
    if (typeof window === "undefined") return

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("section[id]")
    )

    const observer = new IntersectionObserver(
      (entries) => {
        let closestSection = ""
        let smallestDistance = Infinity

        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          const distanceFromTop = Math.abs(entry.boundingClientRect.top)

          if (distanceFromTop < smallestDistance) {
            smallestDistance = distanceFromTop
            closestSection = entry.target.id
          }
        })

        if (closestSection) {
          setActiveId(closestSection)
        }
      },
      {
        root: null,
        rootMargin: "-30% 0px -60% 0px",
        threshold: [0.1, 0.2, 0.3, 0.5],
      }
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  return activeId
}
