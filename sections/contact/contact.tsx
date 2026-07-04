"use client"

import Link from "next/link"
import { Mail, Phone, MapPin, SendHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
    <section
      id="contact"
      className="relative flex items-center min-h-screen overflow-hidden"
    >
      <div className="-z-10 absolute inset-0 bg-linear-to-b from-background via-background to-muted" />

      <div className="mx-auto px-6 py-20 container">
        {/* Header */}

        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="font-bold text-4xl md:text-5xl">
            Get In{" "}
            <span className="bg-clip-text bg-linear-to-r from-primary to-purple-500 text-transparent">
              Touch
            </span>
          </h2>

          <p className="mt-6 text-muted-foreground text-sm md:text-lg leading-relaxed">
            I&apos;m always excited to discuss new opportunities, collaborate on
            interesting projects. Feel free to reach out, and I&apos;ll get back
            to you as soon as possible.
          </p>
        </div>

        {/* Content */}

        <div className="items-stretch gap-8 grid lg:grid-cols-5">
          {/* Contact Info */}

          <div className="lg:col-span-2">
            <Card className="hover:shadow-xl pb-2 h-full transition-all hover:-translate-y-1 duration-300">
              <CardHeader>
                <CardTitle className="font-semibold text-lg md:text-xl">
                  Contact Information
                </CardTitle>

                <CardDescription className="text-muted-foreground text-sm leading-relaxed">
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
                      <Card className="hover:shadow-md mb-3 py-4 transition-all hover:-translate-y-1 duration-300">
                        <CardContent className="flex items-center gap-4">
                          <div className="bg-primary/10 p-3 rounded-lg">
                            <Icon className="w-4 h-4 text-primary" />
                          </div>

                          <div>
                            <p className="text-muted-foreground text-sm">
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
          </div>

          {/* Contact Form */}

          <div className="lg:col-span-3">
            <Card className="hover:shadow-xl h-full transition-all hover:-translate-y-1 duration-300">
              <CardHeader>
                <CardTitle className="font-semibold text-lg md:text-xl">
                  Send Me a Message
                </CardTitle>

                <CardDescription className="text-muted-foreground text-sm leading-relaxed">
                  Fill out the form below and I&apos;ll reply as soon as
                  possible.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form className="space-y-5">
                  <div className="gap-5 grid md:grid-cols-2">
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
                    variant={"secondary"}
                    className="group hover:shadow-md w-full active:scale-[0.98] transition-all hover:-translate-y-0.5 active:translate-y-0 duration-300 ease-out hover:cursor-pointer"
                  >
                    Send Message
                    <SendHorizontal className="w-4 h-4 group-hover:-rotate-35 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 duration-300 ease-out" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
