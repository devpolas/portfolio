"use client";

import { type SyntheticEvent, useState } from "react";
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
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/shared/reveal";

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
] as const;

const topics = ["Project", "Job", "Collaboration", "Other"] as const;
type Topic = (typeof topics)[number];

const MESSAGE_MAX = 1000;

type FormStatus = "idle" | "pending" | "success" | "error";

function ContactRow({ item }: { item: (typeof contactInfo)[number] }) {
  const Icon = item.icon;

  const content = (
    <div className='group flex items-center gap-4 hover:bg-brand/5 p-3 border border-transparent hover:border-brand/20 rounded-xl transition-all duration-300'>
      <div className='flex justify-center items-center bg-brand/10 group-hover:bg-brand rounded-xl size-11 text-brand group-hover:text-brand-foreground transition-colors duration-300 shrink-0'>
        <Icon aria-hidden='true' className='size-5' />
      </div>

      <div className='flex-1 min-w-0'>
        <p className='font-medium text-muted-foreground text-xs'>
          {item.title}
        </p>

        <p className='mt-1 font-semibold text-sm truncate tracking-tight'>
          {item.value}
        </p>

        <p className='mt-1 text-muted-foreground text-xs'>{item.description}</p>
      </div>

      {item.href && (
        <ArrowUpRight
          aria-hidden='true'
          className='size-4 text-muted-foreground group-hover:text-brand transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 duration-300 shrink-0'
        />
      )}
    </div>
  );

  if (!item.href) return <div>{content}</div>;

  const isExternal = item.href.startsWith("http");

  // Plain <a>: mailto:, tel: and external links don't need next/link
  return (
    <a
      href={item.href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      aria-label={`${item.title}: ${item.value}${isExternal ? " (opens in a new tab)" : ""}`}
      className='block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2'
    >
      {content}
    </a>
  );
}

function ContactDetails() {
  return (
    <Card className='relative bg-card/80 shadow-sm border-border/70 rounded-2xl h-full overflow-hidden'>
      <div
        aria-hidden='true'
        className='-top-20 -right-20 absolute bg-brand/5 blur-3xl rounded-full size-56 pointer-events-none'
      />

      <CardHeader className='relative space-y-2 p-6 sm:p-8'>
        <p className='font-semibold text-brand text-xs uppercase tracking-[0.16em]'>
          Contact details
        </p>

        <CardTitle className='text-xl sm:text-2xl tracking-tight'>
          Let&apos;s connect
        </CardTitle>

        <CardDescription className='text-sm leading-7'>
          Choose the channel that works best for you. I&apos;ll do my best to
          get back to you.
        </CardDescription>
      </CardHeader>

      <CardContent className='relative space-y-1 px-4 sm:px-5 pb-6 sm:pb-8'>
        {contactInfo.map((item) => (
          <ContactRow key={item.title} item={item} />
        ))}

        <div className='mx-3 mt-5 pt-5 border-border/70 border-t'>
          <p className='text-muted-foreground text-xs leading-6'>
            I&apos;m always interested in meaningful projects, collaborative
            work, and opportunities to grow as a developer.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function ContactForm() {
  const [topic, setTopic] = useState<Topic>("Project");
  const [count, setCount] = useState(0);
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    // Honeypot: real users never fill this hidden field
    if (data.website) return;

    setStatus("pending");

    try {
      // TODO: replace with your server action or API route
      // await sendMessage(data);
      console.log(data);

      form.reset();
      setTopic("Project");
      setCount(0);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <Card className='bg-card/80 shadow-sm border-border/70 rounded-2xl h-full'>
      <CardHeader className='space-y-2 p-6 sm:p-8'>
        <p className='font-semibold text-brand text-xs uppercase tracking-[0.16em]'>
          Send a message
        </p>

        <CardTitle className='text-xl sm:text-2xl tracking-tight'>
          Tell me about your idea
        </CardTitle>

        <CardDescription className='text-sm leading-7'>
          A few details are enough to get started. I usually reply within 24
          hours.
        </CardDescription>
      </CardHeader>

      <CardContent className='px-6 sm:px-8 pb-6 sm:pb-8'>
        <form onSubmit={handleSubmit} className='gap-5 grid'>
          {/* Topic */}
          <fieldset>
            <legend className='mb-3 font-medium text-sm'>
              What&apos;s this about?
            </legend>

            <div className='flex flex-wrap gap-2'>
              {topics.map((t) => (
                <label key={t} className='cursor-pointer'>
                  <input
                    type='radio'
                    name='topic'
                    value={t}
                    checked={topic === t}
                    onChange={() => setTopic(t)}
                    className='sr-only peer'
                  />
                  <span
                    className={cn(
                      "inline-flex items-center px-4 border border-border/70 rounded-full h-9",
                      "font-medium text-muted-foreground text-sm transition-colors",
                      "hover:border-brand/40 hover:text-foreground",
                      "peer-checked:border-brand peer-checked:bg-brand/10 peer-checked:text-brand",
                      "peer-focus-visible:ring-2 peer-focus-visible:ring-brand peer-focus-visible:ring-offset-2",
                    )}
                  >
                    {t}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          {/* Name + email */}
          <div className='gap-5 grid sm:grid-cols-2'>
            <InputField
              id='name'
              name='name'
              label='Your name'
              placeholder='John Doe'
              autoComplete='name'
              required
            />

            <InputField
              id='email'
              name='email'
              label='Email address'
              type='email'
              placeholder='john@example.com'
              autoComplete='email'
              required
            />
          </div>

          {/* Subject only for "Other" */}
          {topic === "Other" && (
            <InputField
              id='subject'
              name='subject'
              label='Subject'
              placeholder='What would you like to discuss?'
              required
            />
          )}

          {/* Message */}
          <div className='gap-2 grid'>
            <TextareaField
              id='message'
              name='message'
              label='Message'
              placeholder='Tell me a little about your project, idea, or opportunity...'
              className='min-h-36'
              maxLength={MESSAGE_MAX}
              onChange={(e) => setCount(e.target.value.length)}
              required
            />

            <p className='tabular-nums text-muted-foreground text-xs text-right'>
              {count}/{MESSAGE_MAX}
            </p>
          </div>

          {/* Honeypot (hidden from users and screen readers) */}
          <div aria-hidden='true' className='sr-only'>
            <label>
              Website
              <input
                type='text'
                name='website'
                tabIndex={-1}
                autoComplete='off'
              />
            </label>
          </div>

          {/* Footer */}
          <div className='flex sm:flex-row flex-col sm:justify-between sm:items-center gap-4 pt-5 border-border/70 border-t'>
            <p className='sm:max-w-56 text-muted-foreground text-xs leading-5'>
              Your message is only used to respond to your inquiry.
            </p>

            <Button
              type='submit'
              size='lg'
              disabled={status === "pending"}
              className={cn(
                "group gap-2 bg-brand hover:bg-brand/90 shadow-sm hover:shadow-brand/10 hover:shadow-md",
                "w-full sm:w-auto sm:px-8 text-brand-foreground",
                "transition-all hover:-translate-y-0.5 active:translate-y-0 duration-300",
              )}
            >
              {status === "pending" ? "Sending…" : "Send message"}
              <Send
                aria-hidden='true'
                className='size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-1 duration-300'
              />
            </Button>
          </div>

          {/* Live feedback */}
          <p
            role='status'
            aria-live='polite'
            className={cn(
              "empty:hidden text-sm text-center",
              status === "success" && "text-brand-nature",
              status === "error" && "text-destructive",
            )}
          >
            {status === "success" && "Thanks! Your message is on its way."}
            {status === "error" && "Something went wrong. Please try again."}
          </p>
        </form>
      </CardContent>
    </Card>
  );
}

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
        description='Whether you have a project idea, an opportunity, or simply want to talk about technology, I’d be happy to hear from you. Let’s start a conversation.'
      />

      <div className='items-stretch gap-6 lg:gap-8 grid lg:grid-cols-5'>
        <Reveal className='lg:col-span-2'>
          <ContactDetails />
        </Reveal>

        <Reveal className='lg:col-span-3'>
          <ContactForm />
        </Reveal>
      </div>

      <Reveal className='mt-12 sm:mt-16 text-center'>
        <p className='font-medium text-brand text-sm'>
          Thoughtful engineering. Meaningful products.
        </p>

        <p className='mt-2 text-muted-foreground text-xs'>
          Looking forward to hearing from you.
        </p>
      </Reveal>
    </Section>
  );
}
