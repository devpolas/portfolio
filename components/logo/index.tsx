import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

type LogoProps = {
  href?: string;
  showName?: boolean;
  className?: string;
  imageClassName?: string;
  nameClassName?: string;
  priority?: boolean;
};

const LOGO_IMAGE = "/logo.webp";

export default function Logo({
  href = "/",
  showName = true,
  className,
  imageClassName,
  nameClassName,
  priority = false,
}: LogoProps) {
  return (
    <Link
      href={href}
      aria-label='POLAS home'
      className={cn(
        "group inline-flex items-center w-fit shrink-0",
        "rounded-md outline-none",
        "focus-visible:ring-2 focus-visible:ring-brand",
        "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      <Image
        src={LOGO_IMAGE}
        alt='logo'
        width={40}
        height={40}
        priority={priority}
        sizes='(min-width: 1024px) 36px, 40px'
        className={cn(
          "size-10 lg:size-8.5 object-contain shrink-0",
          "transition-transform duration-200 ease-out",
          "motion-safe:group-hover:scale-105",
          imageClassName,
        )}
      />

      {showName && (
        <span
          className={cn(
            "hidden lg:flex -ml-1 font-extrabold text-3xl leading-none",
            "tracking-[0.06em] text-foreground",
            "transition-colors duration-200 text-brand/85 group-hover:text-brand",
            nameClassName,
          )}
        >
          OLAS
        </span>
      )}
    </Link>
  );
}
