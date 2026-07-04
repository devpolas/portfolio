"use client"
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
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-background via-background to-muted" />

      <div className="container mx-auto py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <h2 className="text-4xl font-bold md:text-5xl">
            Skills &{" "}
            <span className="bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              Technologies
            </span>
          </h2>

          <p className="mt-6 text-sm leading-relaxed text-muted-foreground md:text-lg">
            Modern tools and technologies I use to build scalable web
            applications
          </p>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="frontEnd" className="w-full">
          <TabsList className="mx-auto mb-10 flex w-full flex-wrap justify-center gap-2">
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
                    className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 lg:gap-6"
                  >
                    {skills.map((skill) => (
                      <motion.div
                        key={skill.name}
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        <Card
                          className="group flex items-center gap-3 border p-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg md:p-5"
                          style={{
                            borderColor: skill.color,
                            background: skill.gradient,
                          }}
                        >
                          {/* Icon */}
                          <div className="relative h-6 w-6 shrink-0 lg:h-8 lg:w-8">
                            <Image
                              src={skill.icon}
                              alt={skill.name}
                              fill
                              className="object-contain"
                            />
                          </div>

                          {/* Name */}
                          <span
                            className="text-sm font-medium"
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
