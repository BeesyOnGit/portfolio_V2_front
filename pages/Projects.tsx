import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import ProjectCard from '../components/ProjectCard';

const Projects: React.FC = () => {
  const { projectsData } = useAppContext();
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-center dark:text-dark-cyan">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectsData.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
