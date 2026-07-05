import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type NavIconProps = {
  icon: LucideIcon
  className?: string
  size?: number
  strokeWidth?: number
}

export default function NavIcon({
  icon: Icon,
  className,
  size = 20,
  strokeWidth = 2,
}: NavIconProps) {
  return (
    <Icon
      size={size}
      strokeWidth={strokeWidth}
      aria-hidden="true"
      className={cn(
        "shrink-0 text-current transition-all duration-200",
        "h-5 w-5",
        className
      )}
    />
  )
}
