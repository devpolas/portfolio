"use client";

import { createContext, useContext, type ReactNode } from "react";

const SectionIdContext = createContext<string | undefined>(undefined);

/** Lets <Section id="x"> pass its id to any <SectionHeading> inside it. */
export function SectionIdProvider({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  return (
    <SectionIdContext.Provider value={id}>{children}</SectionIdContext.Provider>
  );
}

export function useSectionId() {
  return useContext(SectionIdContext);
}
