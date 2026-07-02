"use client"

import Link from "next/link"

export default function Logo() {
  return (
    <Link
      href="/"
      className="text-sm font-bold tracking-tight transition hover:opacity-80 md:text-base"
    >
      <span className="text-purple-500">{`</>`}</span>
      <span className="ml-1">POLAS</span>
    </Link>
  )
}
