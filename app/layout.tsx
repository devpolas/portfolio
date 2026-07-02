import { Geist, Geist_Mono, Inter } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import Navbar from "@/components/navbar/navbar"
import Footer from "@/components/footer/footer"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body>
        <ThemeProvider>
          <header>
            <Navbar />
          </header>
          <main className="pt-16 pb-4">
            <div className="mx-auto max-w-11/12">{children}</div>
          </main>
          <footer className="mx-auto max-w-11/12">
            <Footer />
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
