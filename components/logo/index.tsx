import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

const BRAND_NAME = "devpolas";
const LOGO_IMAGE = "/logo.webp";

type LogoProps = Omit<
  React.ComponentProps<typeof Link>,
  "href" | "children"
> & {
  href?: string;
  showName?: boolean;
  priority?: boolean;
  imageClassName?: string;
  nameClassName?: string;
};

export default function Logo({
  href = "/",
  showName = true,
  priority = false,
  className,
  imageClassName,
  nameClassName,
  ...props
}: LogoProps) {
  return (
    <Link
      href={href}
      {...props}
      className={cn(
        "group inline-flex items-center gap-2 xl:gap-2.5 w-fit shrink-0",
        "rounded-md outline-none",
        "focus-visible:ring-2 focus-visible:ring-brand",
        "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      <Image
        src={LOGO_IMAGE}
        // The name next to it already labels the link, so the image is decorative.
        // Without the visible name, the sr-only text below provides the label.
        alt=''
        width={64}
        height={64}
        priority={priority}
        // Must match the rendered size (size-6 = 24px, xl:size-8 = 32px).
        sizes='(min-width: 1280px) 32px, 24px'
        className={cn(
          "size-6 xl:size-8 object-contain shrink-0",
          "transition-transform duration-200 ease-out",
          "motion-safe:group-hover:scale-105",
          imageClassName,
        )}
      />

      {showName ? (
        <span
          className={cn(
            "font-black text-2xl xl:text-3xl",
            // leading-none would clip the descender of "p" with bg-clip-text.
            "leading-[1.1] tracking-[0.06em] brand-text-gradient",
            "select-none",
            nameClassName,
          )}
        >
          {BRAND_NAME}
        </span>
      ) : (
        <span className='sr-only'>{BRAND_NAME} home</span>
      )}
    </Link>
  );
}
