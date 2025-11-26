
import type { Project } from '../types';

export const projectsData: Project[] = [
  {
    id: "pro-analyzer",
    name: "Pro-Analyzer",
    description: "An AI-powered text analysis tool that provides sentiment analysis, entity recognition, and summarization for large documents.",
    tech: [
      { id: "react", name: "React", image: "" },
      { id: "typescript", name: "TypeScript", image: "" },
      { id: "tailwind", name: "Tailwind CSS", image: "" },
      { id: "gemini", name: "Gemini API", image: "" }
    ],
    demo: "#",
    repo: "#",
    year: 2023,
  },
  {
    id: "dashboard-kit",
    name: "Dashboard UI Kit",
    description: "A comprehensive and reusable component library for building data-rich dashboards quickly and efficiently.",
    tech: [
      { id: "react", name: "React", image: "" },
      { id: "recharts", name: "Recharts", image: "" },
      { id: "storybook", name: "Storybook", image: "" },
      { id: "styled", name: "Styled Components", image: "" }
    ],
    repo: "#",
    year: 2022,
  },
  {
    id: "task-manager",
    name: "Zenith Task Manager",
    description: "A sleek, Kanban-style task management application with real-time collaboration features.",
    tech: [
      { id: "nextjs", name: "Next.js", image: "" },
      { id: "firebase", name: "Firebase", image: "" },
      { id: "tailwind", name: "Tailwind CSS", image: "" },
      { id: "dndkit", name: "dnd-kit", image: "" }
    ],
    demo: "#",
    repo: "#",
    year: 2021,
  },
];
   