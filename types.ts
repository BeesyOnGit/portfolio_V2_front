// FIX: Import React to make React types available in this file.
import React from 'react';

export interface SiteData {
  name: string;
  title: string;
  bio: string[];
  socials: {
    name: string;
    url: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
  }[];
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string[];
  achievements: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  tech: string[];
  links?: { demo?: string; repo?: string };
  year?: number;
}