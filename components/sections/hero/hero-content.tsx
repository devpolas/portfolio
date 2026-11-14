import Link from "next/link";
import { ArrowUpRight, Download, MapPin } from "lucide-react";

import { profile } from "@/data/profile";

import HeroSocialLinks from "./hero-social-links";

export function HeroContent() {
  return (
    <div className='z-10 relative mx-auto w-full min-w-0 max-w-2xl'>
      {/* Eyebrow */}
      <div className='flex flex-wrap items-center gap-3 mb-7 hero-eyebrow'>
        <div className='inline-flex items-center gap-2 bg-brand/5 px-4 py-2 border border-brand/20 rounded-full'>
          <span className='relative flex size-2'>
            <span className='inline-flex absolute bg-brand-nature/60 rounded-full size-full animate-ping motion-reduce:animate-none' />
            <span className='inline-flex relative bg-brand-nature rounded-full size-2' />
          </span>

          <span className='font-medium text-brand text-xs tracking-wide'>
            {profile.role}
          </span>
        </div>

        <span className='flex items-center gap-1.5 text-muted-foreground text-xs'>
          <MapPin className='size-3.5' />
          {profile.location.city}, {profile.location.country}
        </span>
      </div>

      {/* Heading */}
      <h1
        id='hero-heading'
        className='mb-6 font-heading font-bold text-[clamp(2.8rem,6.5vw,5.8rem)] leading-[0.98] tracking-[-0.065em]'
      >
        <span className='block hero-heading-line'>I build</span>

        <span className='block hero-heading-line'>scalable</span>

        <span className='block text-brand-text-gradient hero-heading-line'>
          digital products.
        </span>
      </h1>

      {/* Introduction */}
      <div className='max-w-xl hero-description'>
        <p className='font-medium text-lg sm:text-xl leading-relaxed'>
          {profile.headline}
        </p>

        <p className='mt-3 text-muted-foreground text-base sm:text-lg leading-8'>
          {profile.description}
        </p>
      </div>

      {/* Actions */}
      <div className='flex flex-wrap items-center gap-3 mt-8 sm:mt-9 hero-actions'>
        <Link
          href='/projects'
          className='group inline-flex justify-center items-center gap-2 bg-brand shadow-brand/15 shadow-lg hover:shadow-brand/25 hover:shadow-xl px-6 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 h-12 font-semibold text-brand-foreground text-sm transition-all hover:-translate-y-1 duration-300'
        >
          Explore my work
          <ArrowUpRight className='size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 duration-300' />
        </Link>

        <a
          href='/resume.pdf'
          download
          className='inline-flex justify-center items-center gap-2 bg-background/70 hover:bg-brand/5 px-6 border border-border hover:border-brand rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 h-12 font-semibold text-sm transition-all hover:-translate-y-1 duration-300'
        >
          <Download className='size-4' />
          Download CV
        </a>
      </div>

      {/* Social links */}
      <div className='flex flex-wrap items-center gap-4 sm:gap-5 mt-9 hero-social'>
        <span className='font-medium text-muted-foreground text-xs uppercase tracking-[0.18em]'>
          Find me on
        </span>

        <HeroSocialLinks />
      </div>
    </div>
  );
}
