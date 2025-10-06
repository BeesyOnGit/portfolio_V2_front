import React from 'react';
import { useAppContext } from '../hooks/useAppContext';

const Experience: React.FC = () => {
  const { experienceData } = useAppContext();
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center dark:text-dark-cyan">Work Experience</h1>
      <div className="relative border-l-2 border-gray-200 dark:border-gray-700">
        {experienceData.map((exp, index) => (
          <div key={index} className="mb-10 ml-6">
            <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-200 rounded-full -left-3 ring-8 ring-white dark:ring-dark-bg dark:bg-blue-900">
                <svg className="w-3 h-3 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
            </span>
            <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
              {exp.role} 
              <span className="text-sm font-medium ml-2 text-blue-800 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/50 px-2.5 py-0.5 rounded">
                {exp.company}
              </span>
            </h3>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{exp.period}</time>
            <ul className="list-disc list-inside mt-2 text-gray-600 dark:text-gray-400 space-y-1">
              {exp.description.map((d, i) => <li key={i}>{d}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
