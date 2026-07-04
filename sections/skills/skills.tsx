import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { skillData } from "./data/data"
import { motion, AnimatePresence } from "motion/react"

const categories = [
  { key: "frontEnd", label: "Frontend" },
  { key: "backEnd", label: "Backend" },
  { key: "database", label: "Database" },
  { key: "authSystem", label: "Auth" },
  { key: "devopsCloud", label: "DevOps" },
  { key: "tools", label: "Tools" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1 },
}

export default function SkillsSection() {
  return (
    <motion.section
      id="skills"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative flex min-h-screen overflow-hidden"
    >
      <div className="-z-10 absolute inset-0 bg-linear-to-b from-background via-background to-muted" />

      <div className="mx-auto px-6 py-16 container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <h2 className="font-bold text-4xl md:text-5xl">
            Skills &{" "}
            <span className="bg-clip-text bg-linear-to-r from-primary to-purple-500 text-transparent">
              Technologies
            </span>
          </h2>

          <p className="mt-6 text-muted-foreground text-sm md:text-lg leading-relaxed">
            Modern tools and technologies I use to build scalable web
            applications
          </p>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="frontEnd" className="w-full">
          <TabsList className="flex flex-wrap justify-center gap-2 mx-auto mb-10 w-full">
            {categories.map((cat) => (
              <TabsTrigger
                key={cat.key}
                className="hover:cursor-pointer"
                value={cat.key}
              >
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((cat) => {
            const skills = skillData[cat.key as keyof typeof skillData]

            return (
              <TabsContent key={cat.key} value={cat.key}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={cat.key}
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="gap-4 lg:gap-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
                  >
                    {skills.map((skill) => (
                      <motion.div
                        key={skill.name}
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        <Card
                          className="group flex items-center gap-3 bg-white hover:shadow-lg p-3 md:p-5 border transition-all hover:-translate-y-1 duration-300"
                          style={{
                            borderColor: skill.color,
                          }}
                        >
                          {/* Icon */}
                          <div className="relative w-6 lg:w-8 h-6 lg:h-8 shrink-0">
                            <Image
                              src={skill.icon}
                              alt={skill.name}
                              fill
                              className="object-contain"
                            />
                          </div>

                          {/* Name */}
                          <span
                            className="font-medium text-sm"
                            style={{ color: skill.color }}
                          >
                            {skill.name}
                          </span>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </TabsContent>
            )
          })}
        </Tabs>
      </div>
    </motion.section>
  )
}
