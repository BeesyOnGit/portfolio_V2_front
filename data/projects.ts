
import type { Project } from '../types';

export const projectsData: Project[] = [
  {
    id: "pro-analyzer",
    name: "Pro-Analyzer",
    description: "An AI-powered text analysis tool that provides sentiment analysis, entity recognition, and summarization for large documents.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Gemini API"],
    links: { demo: "#", repo: "#" },
    year: 2023,
  },
  {
    id: "dashboard-kit",
    name: "Dashboard UI Kit",
    description: "A comprehensive and reusable component library for building data-rich dashboards quickly and efficiently.",
    tech: ["React", "Recharts", "Storybook", "Styled Components"],
    links: { repo: "#" },
    year: 2022,
  },
  {
    id: "task-manager",
    name: "Zenith Task Manager",
    description: "A sleek, Kanban-style task management application with real-time collaboration features.",
    tech: ["Next.js", "Firebase", "Tailwind CSS", "dnd-kit"],
    links: { demo: "#", repo: "#" },
    year: 2021,
  },
];
   