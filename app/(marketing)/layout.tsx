import type { ReactNode } from "react";

export default function MainLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <main className='flex flex-col bg-background w-full min-h-screen'>
      <header>{/* <Navbar /> */}</header>

      <div className='flex-1 mx-auto px-4 py-6 w-full max-w-7xl'>
        {children}
      </div>

      <footer>{/* <Footer /> */}</footer>
    </main>
  );
}
