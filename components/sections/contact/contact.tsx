"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, Mail, MapPin, Phone, Send } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { InputField } from "@/components/input/input-field";
import { TextareaField } from "@/components/input/textarea-field";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { fadeUp, viewportOnce } from "@/lib/motion";

const contactInfo = [
  {
    title: "Email",
    value: "dpi.polas@gmail.com",
    href: "mailto:dpi.polas@gmail.com",
    icon: Mail,
    description: "For inquiries and opportunities",
  },
  {
    title: "Phone",
    value: "+8801732333951",
    href: "tel:+8801732333951",
    icon: Phone,
    description: "Available for direct contact",
  },
  {
    title: "Location",
    value: "Bangladesh",
    href: null,
    icon: MapPin,
    description: "Based in South Asia",
  },
  {
    title: "GitHub",
    value: "github.com/devpolas",
    href: "https://github.com/devpolas",
    icon: FaGithub,
    description: "Explore my code and projects",
  },
  {
    title: "LinkedIn",
    value: "linkedin.com/in/devpolas",
    href: "https://www.linkedin.com/in/devpolas/",
    icon: FaLinkedin,
    description: "Let's connect professionally",
  },
];

export default function Contact() {
  return (
    <Section id='contact' glow='right'>
      <SectionHeading
        align='left'
        eyebrow='Get in touch'
        title={
          <>
            Have something in <span className='text-brand'>mind?</span>
          </>
        }
        description="Whether you have a project idea, an opportunity, or simply want to talk about technology, I'd be happy to hear from you. Let's start a conversation."
      />

      <div className='items-stretch gap-6 lg:gap-8 grid lg:grid-cols-5'>
        {/* Contact details */}
        <motion.div
          variants={fadeUp}
          initial='hidden'
          whileInView='visible'
          viewport={viewportOnce}
          className='lg:col-span-2'
        >
          <Card className='relative bg-card/80 shadow-sm border-border/70 rounded-2xl h-full overflow-hidden'>
            <div
              aria-hidden='true'
              className='-top-20 -right-20 absolute bg-brand/5 blur-3xl rounded-full size-56 pointer-events-none'
            />

            <CardHeader className='relative space-y-2 p-6 sm:p-7'>
              <p className='font-semibold text-brand text-xs uppercase tracking-[0.16em]'>
                Contact details
              </p>

              <CardTitle className='text-xl sm:text-2xl tracking-tight'>
                Let&apos;s connect
              </CardTitle>

              <CardDescription className='text-sm leading-7'>
                Choose the channel that works best for you. I&apos;ll do my best
                to get back to you.
              </CardDescription>
            </CardHeader>

            <CardContent className='relative space-y-2 px-6 sm:px-7 pb-6 sm:pb-7'>
              {contactInfo.map((item) => {
                const Icon = item.icon;

                const content = (
                  <div className='group flex items-center gap-4 hover:bg-brand/5 p-3 border border-transparent hover:border-brand/20 rounded-xl transition-all duration-300'>
                    <div className='flex justify-center items-center bg-brand/10 group-hover:bg-brand rounded-xl size-11 text-brand group-hover:text-brand-foreground transition-colors duration-300 shrink-0'>
                      <Icon className='size-5' />
                    </div>

                    <div className='flex-1 min-w-0'>
                      <p className='font-medium text-muted-foreground text-xs'>
                        {item.title}
                      </p>

                      <p className='mt-1 font-semibold text-sm truncate tracking-tight'>
                        {item.value}
                      </p>

                      <p className='mt-1 text-muted-foreground text-xs'>
                        {item.description}
                      </p>
                    </div>

                    {item.href && (
                      <ArrowUpRight className='size-4 text-muted-foreground group-hover:text-brand transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 duration-300 shrink-0' />
                    )}
                  </div>
                );

                return item.href ? (
                  <Link
                    key={item.title}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    aria-label={`${item.title}: ${item.value}`}
                  >
                    {content}
                  </Link>
                ) : (
                  <div key={item.title}>{content}</div>
                );
              })}

              <div className='mt-5 pt-5 border-border/70 border-t'>
                <p className='text-muted-foreground text-xs leading-6'>
                  I&apos;m always interested in meaningful projects,
                  collaborative work, and opportunities to grow as a developer.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact form */}
        <motion.div
          variants={fadeUp}
          initial='hidden'
          whileInView='visible'
          viewport={viewportOnce}
          className='lg:col-span-3'
        >
          <Card className='bg-card/80 shadow-sm border-border/70 rounded-2xl h-full'>
            <CardHeader className='space-y-2 p-6 sm:p-7'>
              <p className='font-semibold text-brand text-xs uppercase tracking-[0.16em]'>
                Send a message
              </p>

              <CardTitle className='text-xl sm:text-2xl tracking-tight'>
                Tell me about your idea
              </CardTitle>

              <CardDescription className='text-sm leading-7'>
                Share a few details below. I&apos;d love to learn more about
                what you&apos;re working on.
              </CardDescription>
            </CardHeader>

            <CardContent className='px-6 sm:px-7 pb-6 sm:pb-7'>
              <form className='space-y-5'>
                <div className='gap-5 grid sm:grid-cols-2'>
                  <InputField
                    id='name'
                    name='name'
                    label='Your name'
                    placeholder='John Doe'
                    required
                  />

                  <InputField
                    id='email'
                    name='email'
                    label='Email address'
                    type='email'
                    placeholder='john@example.com'
                    required
                  />
                </div>

                <InputField
                  id='subject'
                  name='subject'
                  label='Subject'
                  placeholder='What would you like to discuss?'
                  required
                />

                <TextareaField
                  id='message'
                  name='message'
                  label='Message'
                  placeholder='Tell me a little about your project, idea, or opportunity...'
                  required
                />

                <Button
                  type='submit'
                  size='lg'
                  className='group gap-2 bg-brand hover:bg-brand/90 shadow-sm hover:shadow-brand/10 hover:shadow-md w-full text-brand-foreground transition-all hover:-translate-y-0.5 active:translate-y-0 duration-300'
                >
                  Send message
                  <Send className='size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-1 duration-300' />
                </Button>

                <p className='text-muted-foreground text-xs text-center leading-5'>
                  Your message is only used to respond to your inquiry.
                </p>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Closing statement */}
      <motion.div
        variants={fadeUp}
        initial='hidden'
        whileInView='visible'
        viewport={viewportOnce}
        className='mt-12 sm:mt-16 text-center'
      >
        <p className='font-medium text-brand text-sm'>
          Thoughtful engineering. Meaningful products.
        </p>

        <p className='mt-2 text-muted-foreground text-xs'>
          Looking forward to hearing from you.
        </p>
      </motion.div>
    </Section>
  );
}
