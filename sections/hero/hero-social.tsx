import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"
import Link from "next/link"
import { FaGithub, FaLinkedin } from "react-icons/fa"

export default function HeroSocial() {
  return (
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
  )
}
