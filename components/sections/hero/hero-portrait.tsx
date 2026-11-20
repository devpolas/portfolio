import Image from "next/image";
import { Code2 } from "lucide-react";

import { profile } from "@/data/profile";

export function HeroPortrait() {
  return (
    <div className='relative w-full max-w-lg hero-portrait'>
      {/* Ambient lighting */}
      <div
        aria-hidden='true'
        className='-z-10 absolute -inset-5 sm:-inset-10 bg-brand-glow opacity-80 blur-[65px] sm:blur-[85px] rounded-full pointer-events-none'
      />

      <div className='relative aspect-square hero-portrait-inner'>
        {/* Decorative rings */}
        <div
          aria-hidden='true'
          className='absolute inset-[3%] border border-brand/15 rounded-full'
        />

        <div
          aria-hidden='true'
          className='absolute inset-[7%] border border-brand/25 border-dashed rounded-full hero-orbit'
        />

        {/* Accent decorations */}
        <div
          aria-hidden='true'
          className='top-[15%] right-[10%] z-20 absolute bg-brand-accent shadow-[0_0_30px_var(--brand-accent)] rounded-full size-4 sm:size-5'
        />

        <div
          aria-hidden='true'
          className='bottom-[13%] left-[8%] z-20 absolute bg-brand-nature shadow-[0_0_24px_var(--brand-nature)] rounded-full size-3'
        />

        {/* Main portrait */}
        <div className='absolute inset-[12%] bg-brand-surface shadow-2xl shadow-brand/10 border-4 border-background sm:border-[6px] rounded-full overflow-hidden'>
          <Image
            src='/hero.webp'
            alt={`Portrait of ${profile.name}`}
            fill
            priority
            sizes='
              (max-width: 640px) 75vw,
              (max-width: 1024px) 55vw,
              440px
            '
            className='object-center object-cover'
          />

          <div
            aria-hidden='true'
            className='absolute inset-0 bg-linear-to-t from-brand/15 via-transparent to-transparent'
          />
        </div>

        {/* Developer identity */}
        <div className='top-[24%] left-0 sm:-left-4 z-30 absolute p-3 sm:p-4 rounded-2xl hero-floating-card glass glass-hover'>
          <div className='flex items-center gap-3'>
            <div className='flex justify-center items-center bg-brand/10 rounded-xl size-10 text-brand shrink-0'>
              <Code2 className='size-5' />
            </div>

            <div className='hidden md:flex flex-col'>
              <p className='font-semibold text-xs'>Full-Stack Developer</p>
              <p className='text-[11px] text-muted-foreground'>
                Building for the web
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
