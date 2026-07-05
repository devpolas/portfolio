import Link from "next/link"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center p-4">
      <Card className="w-full max-w-md text-center sm:text-left">
        <CardHeader className="space-y-1.5 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight text-destructive">
            404 - Not Found
          </CardTitle>
          {/* FIXED: Removed the nested <p> tag to prevent hydration errors */}
          <CardDescription className="text-sm text-muted-foreground">
            Could not find the requested resource. Please check the URL or
            return home.
          </CardDescription>
        </CardHeader>

        <CardFooter className="mx-auto">
          {/* Wrapped in a button to match your modern UI theme */}
          <Button asChild variant="default">
            <Link href="/">Return Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
