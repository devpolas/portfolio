"use client"
import Link from "next/link"

export default function Logo() {
  return (
    <Link href="/">
      <span className="rounded-sm bg-muted px-3 py-2 font-mono text-sm md:text-lg">
        polas@dev:~$
        <span className="animate-pulse">_</span>
      </span>
    </Link>
  )
}
