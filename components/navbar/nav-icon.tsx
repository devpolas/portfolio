import { LucideIcon } from "lucide-react"

type NavIconProps = {
  icon: LucideIcon
  className?: string
}

export default function NavIcon({ icon: Icon, className }: NavIconProps) {
  return <Icon className={`h-4 w-4 lg:h-5 lg:w-5 ${className}`} />
}
