"use client";

import { useEffect, useState } from "react";

export default function useActiveSectionId() {
  const [activeId, setActiveId] = useState("home");

  useEffect(() => {
    let frameId = 0;

    const updateActiveSection = () => {
      cancelAnimationFrame(frameId);

      frameId = requestAnimationFrame(() => {
        const sections = document.querySelectorAll<HTMLElement>("section[id]");

        if (!sections.length) return;

        const activationPoint = window.scrollY + window.innerHeight * 0.35;
        let currentId = sections[0].id;

        for (const section of sections) {
          if (activationPoint >= section.offsetTop) {
            currentId = section.id;
          } else {
            break;
          }
        }

        setActiveId((previousId) =>
          previousId === currentId ? previousId : currentId,
        );
      });
    };

    updateActiveSection();

    window.addEventListener("scroll", updateActiveSection, {
      passive: true,
    });
    window.addEventListener("resize", updateActiveSection, {
      passive: true,
    });

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  return activeId;
}
