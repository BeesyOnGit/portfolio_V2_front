
import React from 'react';
import type { Project } from '../types';
import { ExternalLinkIcon, GithubIcon } from './icons/ProjectIcons';

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="bg-white dark:bg-[#24283b] rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <div className="p-6 flex-grow">
        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-dark-cyan">{project.name}</h3>
        <p className="text-gray-600 dark:text-dark-fg mb-4 text-sm">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span key={tech.id} className="bg-blue-100 text-blue-800 dark:bg-dark-blue/20 dark:text-dark-blue text-xs font-medium px-2.5 py-0.5 rounded-full">
              {tech.name}
            </span>
          ))}
        </div>
      </div>
      <div className="p-6 pt-0 mt-auto flex justify-between items-center">
        <span className="text-sm text-gray-400 dark:text-dark-comment">{project.year}</span>
        <div className="flex items-center gap-4">
          {project.repo && (
            <a href={project.repo} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
              <GithubIcon className="h-5 w-5" />
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
              <ExternalLinkIcon className="h-5 w-5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
   