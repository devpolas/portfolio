import { ReactNode } from "react";
import { TooltipProvider } from "../components/ui/tooltip";
import ThemeProvider from "./theme-provider";

export default function Provider({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <TooltipProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </TooltipProvider>
  );
}
