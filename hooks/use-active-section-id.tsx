"use client"

import { useEffect, useState } from "react"

export default function useActiveSection() {
  const [activeId, setActiveId] = useState("home")

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("section[id]")
    )

    if (!sections.length) return

    const updateActive = () => {
      const scroll = window.scrollY + window.innerHeight * 0.35

      let current = sections[0].id

      for (const section of sections) {
        if (scroll >= section.offsetTop) {
          current = section.id
        } else {
          break
        }
      }

      setActiveId(current)
    }

    updateActive()

    window.addEventListener("scroll", updateActive, { passive: true })
    window.addEventListener("resize", updateActive)

    return () => {
      window.removeEventListener("scroll", updateActive)
      window.removeEventListener("resize", updateActive)
    }
  }, [])

  return activeId
}
