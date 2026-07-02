import About from "@/sections/about/about"
import Contact from "@/sections/contact/contact"
import Education from "@/sections/education/education"
import Experience from "@/sections/experience/experience"
import Hero from "@/sections/hero/hero"
import Projects from "@/sections/projects/projects"
import Skills from "@/sections/skills/skills"

export default function page() {
  return (
    <div>
      <Hero />
      <About />
      <Skills />
      <Education />
      <Experience />
      <Projects />
      <Contact />
    </div>
  )
}
