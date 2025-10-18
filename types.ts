// FIX: Import React to make React types available in this file.
import React from "react";

export type SiteData = {
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
    role: string;
    company: string;
    startPeriod: string;
    endPeriod: string;
    description: string[];
    achievements: string[];
};

export type Project = {
    id: string;
    name: string;
    description: string;
    tech: Technology[];
    demo?: string;
    repo?: string;
    year?: number;
};
export type Technology = {
    id: string;
    name: string;
    image: string;
};
