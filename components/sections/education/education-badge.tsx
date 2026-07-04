import { CheckCircle2, Clock3 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export const getBadge = (status: string) => {
  switch (status) {
    case "completed":
      return (
        <Badge variant="secondary">
          <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
          Completed
        </Badge>
      )

    case "certified":
      return (
        <Badge variant={"secondary"}>
          <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
          Certified
        </Badge>
      )

    case "in-progress":
      return (
        <Badge className="bg-emerald-500 hover:bg-emerald-600">
          <Clock3 className="mr-1 h-3.5 w-3.5" />
          In Progress
        </Badge>
      )

    default:
      return null
  }
}
