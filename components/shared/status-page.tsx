import type { ReactNode } from "react";
import Logo from "@/components/logo";

interface StatusPageProps {
  children: ReactNode;
  /**
   * Render as <main>. Leave false when your root layout already provides one
   * (nested <main> elements are invalid HTML).
   */
  asMain?: boolean;
}

export function StatusPage({ children, asMain = false }: StatusPageProps) {
  const Wrapper = asMain ? "main" : "div";

  return (
    <Wrapper className='flex flex-col justify-center items-center gap-8 px-4 py-16 w-full min-h-[75svh] brand-glow-bg'>
      <Logo priority />
      <div className='w-full'>{children}</div>
    </Wrapper>
  );
}
