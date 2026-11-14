import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import type { RefObject } from "react";

export function useHeroAnimations(container: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const select = gsap.utils.selector(container);

        const timeline = gsap.timeline({
          defaults: {
            ease: "power3.out",
          },
        });

        timeline
          .from(select(".hero-eyebrow"), {
            autoAlpha: 0,
            y: 16,
            duration: 0.6,
          })
          .from(
            select(".hero-heading-line"),
            {
              autoAlpha: 0,
              y: 35,
              duration: 0.8,
              stagger: 0.12,
            },
            "-=0.3",
          )
          .from(
            select(".hero-description"),
            {
              autoAlpha: 0,
              y: 18,
              duration: 0.65,
            },
            "-=0.4",
          )
          .from(
            select(".hero-actions"),
            {
              autoAlpha: 0,
              y: 16,
              duration: 0.5,
            },
            "-=0.3",
          )
          .from(
            select(".hero-social"),
            {
              autoAlpha: 0,
              y: 14,
              duration: 0.5,
            },
            "-=0.25",
          )
          .from(
            select(".hero-portrait"),
            {
              autoAlpha: 0,
              scale: 0.94,
              y: 20,
              duration: 0.9,
            },
            "-=0.8",
          )
          .from(
            select(".hero-floating-card"),
            {
              autoAlpha: 0,
              y: 15,
              scale: 0.95,
              duration: 0.55,
            },
            "-=0.45",
          );

        // Subtle portrait movement
        gsap.to(select(".hero-portrait-inner"), {
          y: -8,
          duration: 3.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        // Slow decorative orbit
        gsap.to(select(".hero-orbit"), {
          rotation: 360,
          duration: 55,
          repeat: -1,
          ease: "none",
        });
      });

      return () => media.revert();
    },
    {
      scope: container,
    },
  );
}
