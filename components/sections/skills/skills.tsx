"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import {
  Cloud,
  Database,
  Monitor,
  Server,
  ShieldCheck,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealGroup, RevealItem } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import { skillData } from "./data/data";

type CategoryKey = keyof typeof skillData;

const categories: {
  key: CategoryKey;
  label: string;
  description: string;
  icon: LucideIcon;
  /** Literal classes so Tailwind can detect them */
  span: string;
}[] = [
  {
    key: "frontEnd",
    label: "Frontend",
    description: "Interfaces, state, and motion",
    icon: Monitor,
    span: "md:col-span-4",
  },
  {
    key: "backEnd",
    label: "Backend",
    description: "APIs and server logic",
    icon: Server,
    span: "md:col-span-2",
  },
  {
    key: "database",
    label: "Database",
    description: "Data modeling and storage",
    icon: Database,
    span: "md:col-span-3",
  },
  {
    key: "authSystem",
    label: "Authentication",
    description: "Secure sign-in and sessions",
    icon: ShieldCheck,
    span: "md:col-span-3",
  },
  {
    key: "devopsCloud",
    label: "DevOps & Cloud",
    description: "Deployment and hosting",
    icon: Cloud,
    span: "md:col-span-3",
  },
  {
    key: "tools",
    label: "Tools",
    description: "Everyday workflow",
    icon: Wrench,
    span: "md:col-span-3",
  },
];

function SkillChip({
  name,
  icon,
  color,
}: {
  name: string;
  icon: string;
  color: string;
}) {
  return (
    <li
      style={{ "--skill": color || "var(--brand)" } as CSSProperties}
      className={cn(
        "group/chip inline-flex items-center gap-2 rounded-full",
        "border border-border/70 bg-background/60 py-1.5 pr-3.5 pl-2",
        "text-sm font-medium transition-all duration-300",
        "hover:-translate-y-0.5 hover:border-(--skill)",
        "hover:bg-[color-mix(in_oklab,var(--skill)_10%,transparent)]",
      )}
    >
      <span className='flex justify-center items-center bg-muted/60 rounded-full size-7 shrink-0'>
        <Image
          src={icon}
          alt=''
          width={20}
          height={20}
          className={cn(
            "size-4 object-contain group-hover/chip:scale-110 transition-transform duration-300",
            // Monochrome logos (no brand color) would vanish in dark mode
            !color && "dark:invert",
          )}
        />
      </span>
      {name}
    </li>
  );
}

export default function SkillsSection() {
  return (
    <Section id='skills' glow='right'>
      <SectionHeading
        align='left'
        eyebrow='Tech stack'
        title={
          <>
            Skills & <span className='text-brand'>technologies</span>
          </>
        }
        description='Modern tools and technologies I use to build scalable web applications.'
      />

      <RevealGroup className='gap-4 lg:gap-5 grid grid-cols-1 md:grid-cols-6'>
        {categories.map(({ key, label, description, icon: Icon, span }) => {
          const skills = skillData[key];

          return (
            <RevealItem key={key} className={cn("h-full", span)}>
              <Card
                className={cn(
                  "group gap-5 p-5 sm:p-6 rounded-2xl h-full",
                  "border-border/70 bg-card/80 shadow-sm",
                  "transition-all duration-500",
                  "hover:border-brand/30 hover:shadow-lg hover:shadow-brand/5",
                )}
              >
                <div className='flex items-center gap-3'>
                  <div className='flex justify-center items-center bg-brand/10 group-hover:bg-brand rounded-xl size-11 text-brand group-hover:text-brand-foreground transition-colors duration-300 shrink-0'>
                    <Icon aria-hidden='true' className='size-5' />
                  </div>

                  <div className='flex-1 min-w-0'>
                    <h3 className='font-semibold tracking-tight'>{label}</h3>
                    <p className='text-muted-foreground text-xs'>
                      {description}
                    </p>
                  </div>

                  <span className='bg-muted/60 px-2.5 py-1 border border-border/60 rounded-full font-medium tabular-nums text-muted-foreground text-xs'>
                    {skills.length}
                  </span>
                </div>

                <ul
                  aria-label={`${label} skills`}
                  className='flex flex-wrap gap-2'
                >
                  {skills.map((skill) => (
                    <SkillChip
                      key={skill.name}
                      name={skill.name}
                      icon={skill.icon}
                      color={skill.color}
                    />
                  ))}
                </ul>
              </Card>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
