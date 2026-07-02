import { motion } from "motion/react"
import { Download } from "lucide-react"
import { Button } from "../ui/button"
import Link from "next/link"

export default function ResumeButton() {
  return (
    <motion.div whileTap={{ scale: 0.95 }}>
      <Button
        asChild
        variant="outline"
        className="group overflow-hidden text-sm font-semibold lg:text-lg"
      >
        <Link href="/resume.pdf" download className="flex items-center gap-2">
          <Download className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-12 group-active:translate-y-0 group-active:rotate-0" />

          <span className="relative">
            <span className="text-sm transition-all duration-300 group-hover:translate-x-1 md:text-base">
              Resume
            </span>

            <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-ring transition-all duration-300 group-hover:w-full" />
          </span>
        </Link>
      </Button>
    </motion.div>
  )
}
