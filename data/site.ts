
import type { SiteData } from '../types';
import { GithubIcon, LinkedinIcon, MailIcon } from '../components/icons/SocialIcons';

export const siteData: SiteData = {
  name: "John Doe",
  title: "Senior Frontend Engineer",
  bio: [
    "I'm a passionate frontend engineer with a knack for building beautiful, functional, and accessible web applications.",
    "Specializing in React, TypeScript, and modern web technologies, I love turning complex problems into elegant solutions.",
  ],
  socials: [
    { name: "GitHub", url: "https://github.com", icon: GithubIcon },
    { name: "LinkedIn", url: "https://linkedin.com", icon: LinkedinIcon },
    { name: "Email", url: "mailto:john.doe@email.com", icon: MailIcon },
  ],
};
   