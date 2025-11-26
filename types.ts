// FIX: Import React to make React types available in this file.
import React from "react";

export type SiteData = {
    id?: string;
    name: string;
    title: string;
    bio: string[];
    username: string;
    password: string;
    socials: {
        name: string;
        url: string;
        phone: string;
        // icon: React.FC<React.SVGProps<SVGSVGElement>>;
    }[];
};

export type Experience = {
    id?: string;
    role: string;
    company: string;
    start_period: string;
    end_period: string;
    description: string[];
    achievements: string[];
    technologies?: Technology[];
    technology_ids?: string[];
};

export type Project = {
    id?: string;
    name: string;
    description: string;
    tech: Technology[];
    technology_ids?: string[];
    demo?: string;
    repo?: string;
    year?: number;
};
export type Technology = {
    id: string;
    name: string;
    image: string;
};
