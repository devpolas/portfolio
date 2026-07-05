"use client"
import Link from "next/link"
import { motion } from "motion/react"
import { Mail, Phone, MapPin, SendHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { InputField } from "@/components/input/input-field"
import { TextareaField } from "@/components/input/textarea-field"

const contactInfo = [
  {
    title: "Email",
    value: "dpi.polas@gmail.com",
    href: "mailto:dpi.polas@gmail.com",
    icon: Mail,
  },
  {
    title: "Phone",
    value: "+8801732333951",
    href: "tel:+8801732333951",
    icon: Phone,
  },
  {
    title: "Location",
    value: "Bangladesh",
    href: "#",
    icon: MapPin,
  },
  {
    title: "GitHub",
    value: "github.com/devpolas",
    href: "https://github.com/devpolas",
    icon: FaGithub,
  },
  {
    title: "LinkedIn",
    value: "linkedin.com/in/lipcb",
    href: "https://linkedin.com/in/lipcb",
    icon: FaLinkedin,
  },
]

export default function Contact() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      id="contact"
      className="relative min-h-screen overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(40,10,60,1)_0%,rgba(10,5,20,1)_100%)] to-muted" />

      <div className="container mx-auto px-4 py-24">
        {/* Header */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <h2 className="text-2xl leading-tight font-bold md:text-3xl lg:text-5xl">
            Get In{" "}
            <span className="bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              Touch
            </span>
          </h2>

          <p className="mt-6 text-sm leading-relaxed text-muted-foreground md:text-lg">
            I&apos;m always excited to discuss new opportunities, collaborate on
            interesting projects. Feel free to reach out, and I&apos;ll get back
            to you as soon as possible.
          </p>
        </motion.div>

        {/* Content */}

        <div className="grid items-stretch gap-8 lg:grid-cols-5">
          {/* Contact Info */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <Card className="glass-morphism h-full pb-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(40,10,60,1)_0%,rgba(10,5,20,1)_100%)] to-muted" />
              <CardHeader>
                <CardTitle className="text-lg font-semibold md:text-xl">
                  Contact Information
                </CardTitle>

                <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                  Feel free to reach out through any of the following channels.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-2">
                {contactInfo.map((item) => {
                  const Icon = item.icon

                  return (
                    <Link
                      key={item.title}
                      href={item.href}
                      target={
                        item.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        item.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                    >
                      <Card className="glass-morphism mb-3 py-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(40,10,60,1)_0%,rgba(10,5,20,1)_100%)] to-muted" />
                        <CardContent className="flex items-center gap-4">
                          <div className="rounded-lg bg-primary/10 p-3">
                            <Icon className="h-4 w-4 text-primary" />
                          </div>

                          <div>
                            <p className="text-sm text-muted-foreground">
                              {item.title}
                            </p>

                            <p className="font-medium">{item.value}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  )
                })}
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <Card className="glass-morphism h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(40,10,60,1)_0%,rgba(10,5,20,1)_100%)] to-muted" />
              <CardHeader>
                <CardTitle className="text-lg font-semibold md:text-xl">
                  Send Me a Message
                </CardTitle>

                <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                  Fill out the form below and I&apos;ll reply as soon as
                  possible.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form className="space-y-5">
                  <div className="grid gap-5 md:grid-cols-2">
                    <InputField
                      id="name"
                      name="name"
                      label="Full Name"
                      placeholder="John Doe"
                      required
                    />

                    <InputField
                      id="email"
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  <InputField
                    id="subject"
                    name="subject"
                    label="Subject"
                    placeholder="Enter the subject"
                    required
                  />

                  <TextareaField
                    id="message"
                    label="Message"
                    placeholder="Tell me about your project..."
                    required
                  />

                  <Button
                    type="submit"
                    size="lg"
                    variant={"outline"}
                    className="group w-full transition-all duration-300 ease-out hover:-translate-y-0.5 hover:cursor-pointer hover:shadow-md active:translate-y-0 active:scale-[0.98]"
                  >
                    Send Message
                    <SendHorizontal className="h-4 w-4 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:-rotate-35" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
