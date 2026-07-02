export default function HeroIntro() {
  return (
    <div className="space-y-4">
      <h1 className="text-4xl leading-tight font-bold md:text-6xl">
        Hi, I&apos;m
        <span className="bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent">
          Polas
        </span>
      </h1>

      <h2 className="text-2xl font-semibold text-muted-foreground md:text-4xl">
        Full Stack Developer
      </h2>

      <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
        I&apos;m a passionate Full Stack Web Developer who enjoys building
        modern, scalable, and user-focused web applications. I love turning
        ideas into real-world products using React, Next.js, Node.js,
        PostgreSQL, and MongoDB while continuously learning new technologies.
      </p>
    </div>
  )
}
