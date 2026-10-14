import Navbar from "@/components/navbar";
import type { ReactNode } from "react";

export default function MainLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <main className='flex flex-col bg-background w-full min-h-screen'>
      <Navbar />

      <div className='flex-1 mx-auto px-4 py-6 w-full lg:max-w-10/12'>
        {children}
      </div>

      <footer>{/* <Footer /> */}</footer>
    </main>
  );
}
