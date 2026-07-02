"use client"
import { ArrowRight, Download } from "lucide-react"
import ResumeButton from "@/components/buttons/resume-button"
import { useIsMobile } from "@/hooks/use-mobile"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HeroCTA() {
  const isMobile = useIsMobile()
  return (
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
  )
}
