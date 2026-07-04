import HeroRight from "./hero-right"
import HeroLeft from "./hero-left"

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-background via-background to-muted" />

      <div className="container mx-auto px-4 pt-24 pb-10 lg:py-24 lg:pb-0">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left  */}
          <HeroLeft />

          {/* Right */}
          <HeroRight />
        </div>
      </div>
    </section>
  )
}
