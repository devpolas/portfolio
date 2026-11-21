import {
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaTelegram,
  FaWhatsapp,
} from "react-icons/fa";

import type { IconType } from "react-icons";

import { profile } from "@/data/profile";

const socials = [
  {
    label: "GitHub",
    href: profile.social.github.url,
    icon: FaGithub,
  },
  {
    label: "LinkedIn",
    href: profile.social.linkedin.url,
    icon: FaLinkedin,
  },
  {
    label: "Facebook",
    href: profile.social.facebook.url,
    icon: FaFacebook,
  },
  {
    label: "Telegram",
    href: profile.social.telegram.url,
    icon: FaTelegram,
  },
  {
    label: "WhatsApp",
    href: profile.contact.whatsapp,
    icon: FaWhatsapp,
  },
];

export default function HeroSocialLinks() {
  return (
    <div className='flex items-center gap-2'>
      {socials.map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target='_blank'
          rel='noopener noreferrer'
          aria-label={`Visit my ${label} profile`}
          className='group inline-flex justify-center items-center bg-background/70 hover:bg-brand border border-border/70 hover:border-brand rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 size-10 text-muted-foreground hover:text-brand-foreground transition-all hover:-translate-y-1 duration-300'
        >
          <Icon className='size-4 group-hover:scale-110 transition-transform duration-300' />
        </a>
      ))}
    </div>
  );
}
