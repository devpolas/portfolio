"use client";
import Link from "next/link";

export default function Logo() {
  return (
    <Link className='hidden md:block' href='/'>
      <span className='bg-muted px-4 py-2 rounded-sm text-foreground text-sm md:text-lg'>
        <span className='opacity-80'>&gt;</span>{" "}
        <span className='animate-ping'>{"_"}</span>
      </span>
    </Link>
  );
}
