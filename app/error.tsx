"use client"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { useEffect } from "react"
import { Variants } from "motion/react"

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[70vh] items-center justify-center p-4">
      <Card className="glass-morphism w-full max-w-md text-center sm:text-left">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(40,10,60,1)_0%,rgba(10,5,20,1)_100%)] to-muted" />
        <CardHeader className="space-y-1.5 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight text-destructive">
            Something Went Wrong
          </CardTitle>
          {/* FIXED: Removed the nested <p> tag to prevent hydration errors */}
          <CardDescription className="text-sm text-destructive">
            {error
              ? error.message
              : "Checking the network cables, modem, and routers"}
          </CardDescription>
        </CardHeader>

        <CardFooter className="mx-auto">
          {/* Wrapped in a button to match your modern UI theme */}
          <Button
            onClick={() => unstable_retry()}
            variant="destructive"
            className="hover:cursor-pointer"
          >
            Try again
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
