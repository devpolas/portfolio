"use client";

import { useRef } from "react";

import { HeroContent } from "./hero-content";
import { HeroPortrait } from "./hero-portrait";
import { useHeroAnimations } from "./hero-animations";

export default function Hero() {
  const container = useRef<HTMLElement>(null);

  useHeroAnimations(container);

  return (
    <section
      ref={container}
      id='home'
      aria-labelledby='hero-heading'
      className='isolate relative flex items-center py-16 sm:py-20 lg:py-16 min-h-[calc(100svh-5rem)] overflow-hidden'
    >
      {/* Background atmosphere */}
      <div
        aria-hidden='true'
        className='-z-10 absolute inset-0 pointer-events-none brand-glow-bg'
      />

      {/* Decorative circles */}
      <div
        aria-hidden='true'
        className='-top-40 -right-32 -z-10 absolute border border-brand/10 rounded-full size-80 sm:size-112 pointer-events-none'
      />

      <div
        aria-hidden='true'
        className='-bottom-40 -left-40 -z-10 absolute border border-brand/10 rounded-full size-80 sm:size-112 pointer-events-none'
      />

      <div className='mx-auto px-5 sm:px-8 container'>
        <div className='items-center gap-14 lg:gap-10 xl:gap-16 grid lg:grid-cols-[1.1fr_0.9fr]'>
          <HeroContent />

          <div className='relative mx-auto lg:ml-auto w-full max-w-136'>
            <HeroPortrait />
          </div>
        </div>
      </div>
    </section>
  );
}
