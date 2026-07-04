import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import AboutCard from "./about-card"

const cardContent = [
  {
    id: 1,
    cardTitle: "🚀 My Journey",
    firstPart:
      "My journey into programming began with curiosity about how websites work. What started as learning HTML and CSS quickly grew into a passion for MERN stack, JavaScript, React, Mongodb and modern web development.",
    secondPart:
      "Over the past few years, I've focused on mastering the PERN Stack, Next.js, TypeScript, PostgreSQL, and building secure RESTful APIs. Every project has strengthened my problem-solving skills and deepened my understanding of writing clean, maintainable code.",
  },
  {
    id: 2,
    cardTitle: "💻 What I Love Building",
    firstPart:
      "I enjoy creating modern web applications that are fast, responsive, and intuitive. My interests include authentication systems, dashboards, REST APIs, reusable component libraries, and scalable full-stack architectures.",
    secondPart:
      "I'm always looking for opportunities to solve real-world problems with technology while keeping performance, accessibility, and user experience at the center of every project.",
  },
  {
    id: 3,
    cardTitle: "📚 Continuous Learning",
    firstPart:
      "Technology evolves rapidly, and I enjoy learning something new every day. Whether it's exploring new frameworks, improving backend architecture, or understanding best practices, continuous learning is an essential part of my journey.",
    secondPart:
      "I believe consistent growth is the key to becoming a better developer and creating better software.",
  },
  {
    id: 4,
    cardTitle: "🌱 Beyond Programming",
    firstPart:
      "Outside of coding, I enjoy exploring new technologies, contributing to personal projects, reading technical articles, and experimenting with modern development tools.",
    secondPart:
      " I'm passionate about continuous self-improvement, collaborating with others, and building software that makes people's lives easier.",
  },
]

export default function About() {
  return (
    <section id="about" className="relative flex min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-background via-background to-muted" />

      <div className="container mx-auto px-6 py-16">
        {/* Heading */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h1 className="text-4xl leading-tight font-bold md:text-6xl">
            About
            <span className="bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              Me
            </span>
          </h1>

          <p className="mt-6 text-sm leading-relaxed text-muted-foreground md:text-lg">
            I&apos;m a Full Stack Web Developer who enjoys transforming ideas
            into scalable, user-friendly, and high-performance web applications.
            I believe great software combines clean code, thoughtful design, and
            meaningful user experiences.
          </p>
        </div>

        {/* Content */}
        <div className="grid gap-4 lg:grid-cols-2">
          {cardContent.map((content) => (
            <AboutCard key={content.id} content={content} />
          ))}
        </div>
      </div>
    </section>
  )
}
