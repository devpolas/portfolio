"use client"

import Link from "next/link"

export default function Logo() {
  return (
    <Link
      href="/"
      className="font-bold tracking-tight transition hover:opacity-80 md:text-base"
    >
      <span className="text-2xl text-purple-500">{`</>`}</span>
      <span className="ml-1 bg-linear-to-r from-primary to-purple-500 bg-clip-text text-xl text-transparent">
        POLAS
      </span>
    </Link>
  )
}
