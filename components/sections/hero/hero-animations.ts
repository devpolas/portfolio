import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import type { RefObject } from "react";

const hidden = { autoAlpha: 0 };
const shown = { autoAlpha: 1 };

export function useHeroAnimations(container: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const select = gsap.utils.selector(container);

        const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

        timeline
          .fromTo(
            select(".hero-eyebrow"),
            { ...hidden, y: 16 },
            { ...shown, y: 0, duration: 0.6 },
          )
          .fromTo(
            select(".hero-heading-line"),
            { ...hidden, y: 35 },
            { ...shown, y: 0, duration: 0.8, stagger: 0.12 },
            "-=0.3",
          )
          .fromTo(
            select(".hero-description"),
            { ...hidden, y: 18 },
            { ...shown, y: 0, duration: 0.65 },
            "-=0.4",
          )
          .fromTo(
            select(".hero-actions"),
            { ...hidden, y: 16 },
            { ...shown, y: 0, duration: 0.5 },
            "-=0.3",
          )
          .fromTo(
            select(".hero-social"),
            { ...hidden, y: 14 },
            { ...shown, y: 0, duration: 0.5 },
            "-=0.25",
          )
          .fromTo(
            select(".hero-portrait"),
            { ...hidden, scale: 0.94, y: 20 },
            { ...shown, scale: 1, y: 0, duration: 0.9 },
            "-=0.8",
          )
          .fromTo(
            select(".hero-floating-card"),
            { ...hidden, y: 15, scale: 0.95 },
            { ...shown, y: 0, scale: 1, duration: 0.55 },
            "-=0.45",
          );

        gsap.to(select(".hero-portrait-inner"), {
          y: -8,
          duration: 3.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(select(".hero-orbit"), {
          rotation: 360,
          duration: 55,
          repeat: -1,
          ease: "none",
        });
      });

      return () => media.revert();
    },
    { scope: container },
  );
}
